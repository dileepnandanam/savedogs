# frozen_string_literal: true

module Api
  class StraydogsController < Api::BaseController
    def index
      @dogs = StraydogFinder.new(params[:lat], params[:lngt], params[:mine], current_user)
                            .find
                            .includes(:user)
                            .paginate(per_page: 5, page: params[:page])

      render json: {
        dogs: @dogs.map { |dog| attributes_for(dog) },
        next_page: @dogs.next_page ? params[:page].to_i + 1 : nil
      }
    end

    def create
      authorize Straydog.new
      @straydog = Straydog.new straydog_params.merge(user_id: current_user.id)
      if @straydog.save
        render json: attributes_for(@straydog)
      else
        render json: @straydog.errors.messages
      end
    end

    def update
      @straydog = Straydog.find_by(id: params[:id])
      authorize @straydog
      @straydog.update(straydog_params)
      if @straydog.valid?
        render json: attributes_for(@straydog)
      else
        render json: @straydog.errors.messages
      end
    end

    def show
      straydog = Straydog.live.find_by(id: params[:id])
      render plain: 'not found', status: :not_found and return unless straydog

      result = attributes_for straydog
      render json: result
    end

    def destroy
      straydog = Straydog.find_by(id: params[:id])
      straydog.update(state: 'deleted') if current_user == straydog.user
    end

    protected

    def straydog_params
      params.require(:straydog).permit(:image, :description, :lat, :lngt)
    end

    def attributes_for(dog)
      {
        id: dog.id,
        user_id: dog.user_id,
        image: image_url(dog),
        lat: dog.lat,
        lngt: dog.lngt,
        place: dog.place,
        description: description_segments_of(dog.description),
        created_at: dog.created_at.strftime('%d %B %Y'),
        attachment_type: video_or_image?(dog.image),
        dog_update_count: dog.dog_update_count
      }
    end

    def image_url(dog)
      if Rails.env.production?
        dog.image.attachment.service_url
      else
        rails_blob_path(dog.image, only_path: true)
      end
    end

    def video_or_image?(image)
      if image.content_type.start_with? 'video'
        'video'
      else
        'image'
      end
    end
  end
end

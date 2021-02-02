class Api::StrayDogsController < ApplicationController
  def index
    @dogs = Dog.order('created_at DESC')
      .paginate(per_page: 5, page: params[:page])

    render json: {
      dogs: @dogs.map{|dog| attributes_for(dog)},
      next_page: @dogs.next_page ? params[:page].to_i + 1 : nil
    }
  end

  def create
    @stray_dog = StrayDog.new stray_dog_params
    if @stray_dog.save
      render json: attributes_for(@stray_dog)
    else
      render json: @stray_dog.errors.messages
    end
  end

  def show
    result = attributes_for StrayDog.find_by_id(params[:id])
    render json: result
  end

  protected

  def stray_dog_params
    params.require(:stray_dog).permit(:image, :description)
  end

  def attributes_for(dog)
    {
      id: dog.id,
      image: image_url(dog),
      lat: dog.lat,
      lngt: dog.lngt,
      description: dog.description
    }
  end

  def image_url(dog)
    if Rails.env.production?
      dog.image.attachment.service_url
    else
      rails_blob_path(dog.image, only_path: true)
    end
  end
end

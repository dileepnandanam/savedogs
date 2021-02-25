class DogUpdatesController < ApplicationController
  def index
    @dog_updates = DogUpdate.where(dog_id: params[:dog_id])
  end

  def create
    @dog_update = DogUpdate.new(dog_update_params.merge(user_id: current_user.id))
    if @dog_update.save
      render json: attributes_for(@dog_update)
    else
      render json: @dog_update.errors.messages, status: 422
    end
  end

  def destroy
    @dog_update = DogUpdate.where(id: params[:id], user_id: current_user.id)
    if @dog_update && @dog_update.delete
      render json: {success: true}
    else
      render json: {success: false}, status: 401
    end
  end

  protected

  def dog_update_params
    params.require(:dog_update).permit(:description, :image, :dog_id)
  end

  def attributes_for(dog_update)
    {
      description: dog_update.description,
      created_at: dog_update.created_at,
      user_id: dog_update.user_id,
      image: image_url(dog_update),
      attachment_type: video_or_image?(dog_update.image)
    }
  end

  def image_url(dog_update)
    if Rails.env.production?
      dog_update.image.attachment.service_url
    else
      rails_blob_path(dog_update.image, only_path: true)
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

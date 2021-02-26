class Api::StrayDogsController < Api::BaseController
  def index
    @dogs = StrayDogFinder.new(params[:lat], params[:lngt], params[:mine], current_user)
      .find
      .includes(:user)
      .paginate(per_page: 5, page: params[:page])

    render json: {
      dogs: @dogs.map{|dog| attributes_for(dog)},
      next_page: @dogs.next_page ? params[:page].to_i + 1 : nil
    }
  end

  def create
    @stray_dog = StrayDog.new stray_dog_params.merge(user_id: current_user.id)
    if @stray_dog.save
      render json: attributes_for(@stray_dog)
    else
      render json: @stray_dog.errors.messages
    end
  end

  def update
    @stray_dog = StrayDog.find_by_id(params[:id])
    @stray_dog.update(stray_dog_params)
    if(@stray_dog.valid?)
      render json: attributes_for(@stray_dog)
    else
      render json: @stray_dog.errors.messages
    end
  end

  def show
    stray_dog = StrayDog.live.find_by_id(params[:id])
    unless stray_dog
      render plain: 'not found', status: 404 and return
    end
    result = attributes_for stray_dog
    render json: result
  end

  def destroy
    stray_dog = StrayDog.find_by_id(params[:id])
    if(current_user == stray_dog.user)
      stray_dog.update(state: 'deleted')
    end
  end

  protected

  def stray_dog_params
    params.require(:stray_dog).permit(:image, :description, :lat, :lngt)
  end

  def attributes_for(dog)
    {
      id: dog.id,
      user_id: dog.user.id,
      image: image_url(dog),
      lat: dog.lat,
      lngt: dog.lngt,
      place: dog.place,
      description: dog.description,
      created_at: dog.created_at.strftime('%d %B %y'),
      attachment_type: video_or_image?(dog.image)
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

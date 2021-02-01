class Api::DogsController < ApplicationController
  def index
    @dogs = Dog.order('created_at DESC')
      .paginate(per_page: 12, page: params[:page])

    render json: {
      dogs: @dogs.map{|dog| index_attributes_for(dog)}
    }
  end

  protected

  def index_attributes_for(dog)
    {
      id: dog.id,
      image: dog.image.url,
      lat: dog.lat,
      lngt: dog.lngt,
      description: dog.description
    }
  end
end

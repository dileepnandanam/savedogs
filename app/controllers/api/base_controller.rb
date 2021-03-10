class Api::BaseController < ApplicationController
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  def description_segments_of(description)
    description.split("\n")
  end

  protected

  def user_not_authorized(exception)
    render json: {message: 'not_authorized'}, status: 401 and return
  end
end
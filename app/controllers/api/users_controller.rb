class Api::UsersController < ApplicationController
  def email_taken
    email = params[:email]
    render json: {
      email_taken: User.find_by_email(email).present?
    }
  end
end
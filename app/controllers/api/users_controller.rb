class Api::UsersController < ApplicationController
  def email_taken
    email = params[:email]
    render json: {
      email_taken: User.find_by_email(email).present?
    }
  end

  def get_current_user
    render json: {
      name: current_user.name,
      address: current_user.address,
      id: current_user.id
    }
  end

  def update_current_user
    user_params = params.require(:user).permit(:address, :name)
    @user = current_user
    @user.update(user_params)
    if @user.valid?
      render plain: 'updated'
    else
      render json: @user.errors.messages, status: 422
    end
  end
end
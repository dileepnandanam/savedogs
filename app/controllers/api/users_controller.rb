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

  def log_as_guest
    name = "guest_#{User.count}"
    password = Devise.friendly_token
    @user = User.create(
      email: "#{name}@savedogs.com",
      password: password,
      password_confirmation: password,
      name: name
    )
    tokens = @user.create_new_auth_token                      
    @user.save
    @user.confirm
    headers['access-token'] = (tokens['access-token']).to_s
    headers['client'] =  (tokens['client']).to_s
    headers['expiry'] =  (tokens['expiry']).to_s
    headers['uid'] =@user.uid             
    headers['token-type'] = (tokens['token-type']).to_s
    render json: {
      data: {
        id: @user.id
      }
    }
  end
end
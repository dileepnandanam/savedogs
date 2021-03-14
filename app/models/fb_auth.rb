# frozen_string_literal: true

require 'httparty'
class FbAuth
  def initialize(access_token)
    @access_token = access_token
  end

  def login
    @user = build_user
    @user
  end

  def build_user
    response = fetch_user_from_fb
    @user = User.first_or_initialize(email: response['email']).tap do |user|
      user.provider = 'facebook_oauth2'
      user.uid = response['email']
      user.name = response['name']
      user.password = Devise.friendly_token[0, 20]
      user.password_confirmation = user.password
      user.save!
      user.confirm
    end
    @user
  end

  def base_url
    'https://graph.facebook.com'
  end

  def fetch_user_from_fb
    HTTParty.get("#{base_url}/me?fields=name,email&access_token=#{@access_token}")
            .parsed_response
  end
end

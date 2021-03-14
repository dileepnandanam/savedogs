# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    def description_segments_of(description)
      description.split("\n")
    end

    protected

    def user_not_authorized(_exception)
      render json: { message: 'not_authorized' }, status: :unauthorized and return
    end
  end
end

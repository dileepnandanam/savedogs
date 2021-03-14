# frozen_string_literal: true

module Api
  class AppConfigsController < ApplicationController
    def index
      render json: AppConfig.all.map { |con|
        [con.name, con.value]
      }.to_h
    end
  end
end

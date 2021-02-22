class Api::AppConfigsController < ApplicationController
  def index
    render json: AppConfig.all.map {|con| 
      [con.name, con.value]
    }.to_h
  end
end
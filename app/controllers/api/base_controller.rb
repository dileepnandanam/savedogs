class Api::BaseController < ApplicationController
  def description_segments_of(description)
    description.split("\n")
  end
end
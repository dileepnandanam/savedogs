# frozen_string_literal: true

class DogUpdate < ApplicationRecord
  has_one_attached :image
  belongs_to :dog
  after_commit do
    dog.update(dog_update_count: dog.dog_updates.live.count)
  end

  scope :live, -> { where state: 'new' }
end

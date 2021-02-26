class DogUpdate < ApplicationRecord
  has_one_attached :image
  belongs_to :dog
  after_commit do
    dog.update(dog_update_count: dog.dog_update_count + 1)
  end
end

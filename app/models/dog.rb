class Dog < ApplicationRecord
  has_one_attached :image
  belongs_to :user, optional: true 
  has_many :dog_updates

  reverse_geocoded_by :lat, :lngt
  before_save :assign_address

  def assign_address
    self.place = Geocoder.search([lat, lngt]).first.try(:address)
  end

  scope :live, -> {where state: 'new'}
end

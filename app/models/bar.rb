class Bar < ActiveRecord::Base
  attr_accessible :adress, :latitude, :longitude, :name, :price
  geocoded_by :adress
  after_validation :geocode
  has_many :notice
  belongs_to :user
end

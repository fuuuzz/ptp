class Bar < ActiveRecord::Base
  attr_accessible :adress, :latitude, :longitude, :name, :price
  geocoded_by :adress
  after_validation :geocode
<<<<<<< HEAD
  has_many :notice
  belongs_to :user
=======

>>>>>>> 2ef19ebbebcd32777c673978e08bb721a531341f
end

class Bar < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :location, :name, :price, :member_id, :start_happy, :end_happy, :price_happy

  belongs_to :member
  has_many :comments, dependent: :destroy

  validates :name, presence: true
  validates :price, presence: true,
            numericality: { only_float: true }
  validates :address, presence: true,
            length: { minimum: 10 }

  validates_uniqueness_of :address

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude, :address => :address
  after_validation :geocode, :reverse_geocode

end

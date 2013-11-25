class Notice < ActiveRecord::Base
  attr_accessible :content, :rating
  has_one :bar
  belongs_to :user
end

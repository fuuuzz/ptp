class Notice < ActiveRecord::Base
  attr_accessible :content, :rating
  belongs_to :bar
end

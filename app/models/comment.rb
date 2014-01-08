class Comment < ActiveRecord::Base

  belongs_to :bar
  belongs_to :user

  attr_accessible :commenter, :rate, :author

  validates :rate, presence: true,
            length: { is: 1 },
            numericality: { only_integer: true }

  validates_uniqueness_of :author, :scope => :bar_id
end

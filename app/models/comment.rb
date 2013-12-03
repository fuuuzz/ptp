class Comment < ActiveRecord::Base

  belongs_to :bar
  belongs_to :member

  attr_accessible :commenter, :rate, :author



  validates :commenter, presence: true,
            length: { maximum: 140 }
  validates :rate, presence: true,
            length: { is: 1 },
            numericality: { only_integer: true }

  validates_uniqueness_of :author, :scope => :bar_id
end

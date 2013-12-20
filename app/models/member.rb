class Member < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :password, :email, :password_confirmation, :remember_me


  validates_presence_of :email, :name, :password
  validates_uniqueness_of :email, :case_sensitive => false

  has_many :bars
  has_many :comments, dependent: :destroy
end

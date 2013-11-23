class User < ActiveRecord::Base
  attr_accessible :content, :name, :password, :rating
end

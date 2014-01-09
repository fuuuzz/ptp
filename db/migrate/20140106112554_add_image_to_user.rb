class AddImageToUser < ActiveRecord::Migration
  def change
    add_column :users, :image, :string
    add_column :users, :friends, :string
  end
end

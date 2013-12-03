class AddLocationToBars < ActiveRecord::Migration
  def change
    add_column :bars, :location, :string
  end
end

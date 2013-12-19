class AddHappyHoursToBars < ActiveRecord::Migration
  def change
    add_column :bars, :start_happy, :time
    add_column :bars, :end_happy, :time
    add_column :bars, :price_happy, :float
  end
end

class CreateBars < ActiveRecord::Migration
  def change
    create_table :bars do |t|
      t.string :name
      t.float :price
      t.float :latitude
      t.float :longitude
      t.string :address

      t.timestamps
    end
  end
end

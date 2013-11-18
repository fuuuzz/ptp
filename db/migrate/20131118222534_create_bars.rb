class CreateBars < ActiveRecord::Migration
  def change
    create_table :bars do |t|
      t.string :name
      t.string :adress
      t.float :latitude
      t.float :longitude
      t.float :price

      t.timestamps
    end
  end
end

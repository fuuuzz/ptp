class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.text :content
      t.float :rating

      t.timestamps
    end
  end
end

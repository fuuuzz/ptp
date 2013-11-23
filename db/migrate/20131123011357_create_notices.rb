class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.integer :id_user
      t.integer :id_bar
      t.string :content
      t.float :rating

      t.timestamps
    end
  end
end

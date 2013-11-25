class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.text :content
      t.float :rating

      t.timestamps
    end
  end
end

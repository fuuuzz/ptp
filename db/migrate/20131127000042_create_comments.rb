class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :commenter
      t.integer :rate
      t.references :bar

      t.timestamps
    end
    add_index :comments, :bar_id
    #add_index :comments, :member_id
    #add_index :comments, [:bar_id, :member_id], :unique => true
  end
end
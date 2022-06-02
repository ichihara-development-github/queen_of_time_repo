class CreateMessages < ActiveRecord::Migration[5.2]

  def change
    create_table :rooms do |t|
      t.integer :chief_id
      t.integer :companion_id
      t.timestamps
    end
    add_index :rooms, :chief_id
    add_index :rooms, :companion_id
    add_index :rooms, [:chief_id, :companion_id], unique: true
 
    create_table :messages do |t|
      t.references :room
      t.references :employee
      t.string :content
      t.string :image_url
      t.text :mention
      t.boolean :read
      t.timestamps
      t.datetime :deleted_at
    end
  end
end

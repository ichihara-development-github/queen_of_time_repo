class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.references :employee
      t.integer :received_employee
      t.string :name
      t.string :icon
      t.string :title
      t.string :content
      t.boolean :read
      t.timestamps
    end
  end
end

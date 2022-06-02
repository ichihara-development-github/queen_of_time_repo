class AddEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.references :organization
      t.string :name, null:false, default: "sample"
      t.string :image, default: "employees-default.jpg"
      t.boolean :chief, default: false
      t.boolean :admin, default: false
      t.datetime :deleted_at
      t.timestamps
    end

    create_table :profiles do |t|
      t.references :employee, null: false, forgin_key: true
      t.string :telephone, null: false, default: "090-0000-0000"
      t.string :address, null: false, default: "Osaka"
      t.string :email, null: false, default: "sample.employee@employee.com"
      t.string :password_digest, null: false
      t.integer :transportation_expenses, default: 0
      t.float :latitude, default: 35.6815171
      t.float :longitude, default: 139.7567439
      t.timestamps
    end


    create_table :organizations do |t|
      t.string :name, null: false
      t.string :image, default: "organizations-default.jpg"
      t.string :address, null: false, default: "Tyokyo"
      t.float :latitude, default: 35.6815171
      t.float :longitude, default: 139.7567439
      t.datetime :deleted_at
      t.timestamps
    end

    create_table :configures do |t|
      t.references :organization, null: false, forgin_key: true
      t.integer :open, null: false, default: 9
      t.integer :close, null: false, default: 18
      t.integer :min_work_time, default: 1
      t.date :submittable_start, null: false, default: Date.today()
      t.date :submittable_end, null: false, default: Date.today() + 7
      t.timestamps
    end
  end
end

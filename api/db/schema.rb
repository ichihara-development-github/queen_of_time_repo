# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_03_081016) do

  create_table "calendars", force: :cascade do |t|
    t.integer "organization_id"
    t.string "title"
    t.date "start"
    t.string "end"
    t.string "date"
    t.text "description"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_calendars_on_organization_id"
  end

  create_table "configures", force: :cascade do |t|
    t.integer "organization_id", null: false
    t.integer "open", default: 9, null: false
    t.integer "close", default: 18, null: false
    t.integer "min_work_time", default: 1
    t.date "submittable_start", default: "2022-05-23", null: false
    t.date "submittable_end", default: "2022-05-30", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_configures_on_organization_id"
  end

  create_table "employees", force: :cascade do |t|
    t.integer "organization_id"
    t.string "name", default: "sample", null: false
    t.string "image", default: "employees-default.jpg"
    t.boolean "chief", default: false
    t.boolean "admin", default: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_employees_on_organization_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "room_id"
    t.integer "employee_id"
    t.string "content"
    t.string "image_url"
    t.text "mention"
    t.boolean "read"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["employee_id"], name: "index_messages_on_employee_id"
    t.index ["room_id"], name: "index_messages_on_room_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "employee_id"
    t.integer "received_employee"
    t.string "name"
    t.string "icon"
    t.string "title"
    t.string "content"
    t.boolean "read"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_notifications_on_employee_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.string "image", default: "organizations-default.jpg"
    t.string "address", default: "Tyokyo", null: false
    t.float "latitude", default: 35.6815171
    t.float "longitude", default: 139.7567439
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.string "telephone", default: "090-0000-0000", null: false
    t.string "address", default: "Osaka", null: false
    t.string "email", default: "sample.employee@employee.com", null: false
    t.string "password_digest", null: false
    t.integer "transportation_expenses", default: 0
    t.float "latitude", default: 35.6815171
    t.float "longitude", default: 139.7567439
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_profiles_on_employee_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.integer "chief_id"
    t.integer "companion_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chief_id", "companion_id"], name: "index_rooms_on_chief_id_and_companion_id", unique: true
    t.index ["chief_id"], name: "index_rooms_on_chief_id"
    t.index ["companion_id"], name: "index_rooms_on_companion_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.integer "employee_id"
    t.string "name", null: false
    t.date "date", null: false
    t.float "attendance_time"
    t.float "leaving_time"
    t.text "comment"
    t.boolean "rest", default: false
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_shifts_on_employee_id"
  end

  create_table "timestamps", force: :cascade do |t|
    t.integer "employee_id"
    t.string "name", null: false
    t.date "date", null: false
    t.integer "attendance_time"
    t.integer "leaving_time"
    t.integer "updated_attendance_time"
    t.integer "updated_leaving_time"
    t.integer "updated_rest_time"
    t.integer "rest_time"
    t.integer "working_time"
    t.integer "overtime"
    t.integer "midnight_time"
    t.integer "midnight_overtime"
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_timestamps_on_employee_id"
  end

end

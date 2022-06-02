class Room < ApplicationRecord

    has_many :messages, dependent: :destroy

    belongs_to :companion, class_name: "Employee"
    belongs_to :chief, class_name: "Employee"
    # errormessage

end
class Employee < ApplicationRecord 
    acts_as_paranoid

    belongs_to :organization

    has_one :profile, dependent: :destroy

    has_many :shifts, dependent: :destroy
    has_many :timestamps
    has_many :notifications,  dependent: :destroy
    has_many :messages

    has_many :rooms, class_name: "Room",
                                foreign_key: "chief_id",
                                dependent: :destroy

    has_one :belongs_room, class_name: "Room",
                            foreign_key: "companion_id",
                            dependent: :destroy

    has_many :room_companions, through: :rooms,  source: :companion
    has_one :room_chief, through: :belongs_room, source: :chief

    ## --------------------------------------------

    validates :name, uniqueness: {scope: :organization}

    ## --------------------------------------------

    

    def invitable?(employee)
        !room_companions.find_by(id: employee.id)
    end


end
class Message < ApplicationRecord
    acts_as_paranoid

    belongs_to :room
    belongs_to :employee

end

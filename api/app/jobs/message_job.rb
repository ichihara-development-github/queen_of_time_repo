class MessageBroadcastJob < ApplicationJob
    queue_as :default
  
    def perform()
      ActionCable.server.broadcast 'message_channel'
    end

module Api
    module V1
        class MessagesController < ApplicationController

            def index
                room = Room.find(params[:room_id])
                messages = room.messages
                render json: {
                    companion: room.companion.name,
                    messages: messages
                    }, status: :ok
            end

            def create
                room = Room.find(params[:room_id])
                message = room.messages.create(
                    employee_id: @current_employee.id,
                    content: params[:messages])

                notice_param = {
                    name: @current_employee.name,
                    image:""
                }

                render json: {
                    message: message.attributes.merge(notice_param)
                    }, status: :created
            end

            def destroy

            end
        end
    end
end

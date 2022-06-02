module Api
    module V1
        class RoomsController < ApplicationController

            def index
                render json: {
                    rooms: send_rooms, 
                    tempId:@current_employee.id
                    }, staus: :ok
            end

            # def index
            #     room = {
            #     id: @current_employee.belongs_room.id,
            #     name:  @current_employee.room_chief.name
            #     }
                     

            #     render json: {
            #         rooms: [room], 
            #         tempId:@current_employee.id
            #         }, staus: :ok
            # end

            def invite_employees
                sleep(2)
                employees = @current_employee.organization.employees
                .where.not(id: @current_employee.room_companions.ids.push(@current_employee.id))
                render json: {employees: employees}, staus: :ok
            end

            def create
                companion = Employee.find(params[:rooms][:id])
                render json: {}, status: :internal_server_error unless @current_employee.invitable?(companion) 
                
                room = @current_employee.rooms.build(
                    companion_id: params[:rooms][:id]
                )
                if room.save!
                     render json: {rooms: send_rooms}, status: :created
                end
            end


            def send_rooms
               rooms = @current_employee.room_companions.map{|c|
                {
               id: c.belongs_room.id,
               name: c.name,
               image: c.image
                 }
            }
            end
            
        end

    end
end

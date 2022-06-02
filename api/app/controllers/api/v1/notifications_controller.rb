module Api
    module V1
        class NotificationsController < ApplicationController

            def index
                Notification.all.update_all(read: false)
                return  render json: {
                    notifications:   Notification.recent(@current_employee)
                            }, status: :ok  
            end

            def all_notifications
                return  render json: {
                    notifications:   Notification.all_notifications(@current_employee)
                            }, status: :ok 
            end

            def create
                params[:notification].each do |param|
                    timestamp = Timestamp.find(param[:id])
                    @current_employee.notifications.new(
                        title: "【#{timestamp.date.to_s}】の勤怠の件",
                        name: "#{}",
                        content: param[:message],
                        received_employee: timestamp.employee.id
                    ).save
                end
                return  render json: {}, status: :created  
                
            end

            def destroy
            end

            def update_notification_read
                Notification.find(params[:id]).update(read: true)
                return  render json: {notifications: Notification.unread(1)}, status: :ok  
            end

        end
    end

end

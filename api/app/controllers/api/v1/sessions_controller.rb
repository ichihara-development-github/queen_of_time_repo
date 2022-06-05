module Api
    module V1
        class SessionsController < ApplicationController

            include ::ActionController::Cookies


            def login
                prof = Profile.find_by(email: session_params[:email]) 
                return (render json: {}, status: :forbidden) unless (prof&.employee && prof&.authenticate(session_params[:password]))
                p "hoge"
                  session[:employee_id] = prof.employee.id
                  payload = { 
                      chief: prof.employee.chief,
                              name: prof.employee.name }
                  render json: payload
            end 

            def logout
                session[:employee_id] = nil
                render json: {}, status: :ok
            end

            def check_session
                render json: {
                    name: @current_employee.name,
                    chief: @current_employee.chief,
                    badges: @current_employee.chief ? badge_params : {}},
                    status: :ok if @current_employee
            end


            private

            def session_params
                params.require(:session).permit(:email, :password)
            end

            def badge_params

                params = {
                    attendance: @organization.timestamps.where(confirmed: false).count,
                    shift:  @organization.shifts.where(confirmed: false).count,
                    notification:  @current_employee.notifications.unread.count,
                }
            end


        end

    end

end
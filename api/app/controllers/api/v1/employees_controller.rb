module Api
    module V1

        class EmployeesController < ApplicationController


            def index
                employees = @organization.employees.order(:name)
                render json: {employees: Employee.all}, status: :ok
            end


            def  initial_notifications
                render json: {
                    badges: {
                        employees:0,
                        attendance:Timestamp.where(employee_id: @current_employee.organization.employees.ids, confirmed: false).length,
                        chat:0,
                        notification:Notification.unread(@current_employee.id).length,
                        shift:0,
                    }
                        }, status: :ok

            end

            def create
                employee = @organization.employees.build(
                    employee_params
                )

                profile = employee.build_profile(
                    profile_params
                )
                
                if profile.save!
                    render json: {
                        employees: @organization.employees
                    }, status: :created
                else
                    render json: {}, status: :intternal_server_error
                end

            end

            def update
            end

            def destroy
                if Employee.find(params[:id]).destroy
                    render json: {
                        employees: @organization.employees
                    }, status: :ok
                else
                    render json: {}, status: :intternal_server_error
                end
            end

            private

            def employee_params
                params.require(:employees).permit(:name)
            end

            def profile_params
                params.require(:employees).permit(:telephone, :email, :address, :transportation_expenses, :password)
            end

        end

    end

end
module Api
    module V1
        class OrganizationsController < ApplicationController

            before_action :set_organization, only: %i[update_notification_read]

            def organization
                organizations = Organization.all
                render json: {
                    organizations: organizations
                        }, status: :ok
            end

            def show 
            end

            def employees_shifts
                render json: {
                    shifts: @organization.shifts.attend.from_last_year
                            }, status: :ok
            end

            
            def manage_timestamps
                timestamps = Timestamp.where(employee_id: @organization.employees.ids)
                .order(:confirmed)
                return  render json: {
                    attendances: timestamps
                            }, status: :ok
            end  

        end

    end

end
module Api
    module V1

        class ShiftsController < ApplicationController

        def assign_member
            employees = Employee.where(id: 
                @organization.employees.ids -
                @organization.shifts.assigned_member_ids(Date.parse(params[:date]))
            )
          
           
            render json: {employees: employees}, status: :ok
        end


        def index
            render json: {
                shifts: @current_employee.shifts.attend.this_month
                        }, status: :ok
        end

        def new 
            dates = (Date.today...Date.today+10).map{|d| d }
            submitted_dates = @current_employee.shifts.pluck(:date)
            render json: {
                dates: 
                (dates- submitted_dates).map{|date|
                 {date: date,attendance_time:"", leaving_time:"",rest: false}
                }
            }, status: :ok
        end
    

        def create
            ActiveRecord::Base.transaction do
                shift_params.each do |param|
                    shift = @current_employee.shifts.new(shift_params)
                    shift.update(
                        name: @current_employee.name,
                        date: Date.parse([shift_params[:date]])
                        )
                    shift.save!
                end
            end
           
            render json: {}, status: :created
        end

        def assign
            ActiveRecord::Base.transaction do
                employee = Employee.find(params[:shifts][:id])
                @shift = employee.shifts.new(shift_params)
                @shift.update(
                    name: employee.name,
                     date: Date.parse(shift_params[:date])
                     )
                @shift.save!
            end
            render json: {shift: @shift}, status: :created
        end

        def update
            Shift.update_coumns()
        end

        def determine_shifts
            debugger
            params[:shifts].each do |s|
                shift = Shift.find(s[:id])
                shift.update_columns(
                    attendance_time: s[:attendance_time],
                    leaving_time: s[:leaving_time],
                    confirmed: true
                )
            end
            render json: {
                shifts: @organization.shifts
                        }, status: :ok

            
        end

        def destroy

            Shift.find(params[:id]).destroy
            render json: {
                shifts: @organization.shifts
                        }, status: :ok
        end

        private

        def shift_params
            params.require(:shifts).permit(:date, :attendance_time,:leaving_time,:rest, :comment, :confirmed)
        end

    end

    end
end
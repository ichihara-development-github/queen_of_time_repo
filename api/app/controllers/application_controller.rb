class ApplicationController < ActionController::API

    include ActionController::Cookies
    include ActionController::RequestForgeryProtection

    
    protect_from_forgery except: :login
    before_action :logged_in?, except: :login
    before_action :set_csrf_token
    
  
    def set_csrf_token
      cookies['CSRF-TOKEN'] = {
        domain: 'localhost',
        value: form_authenticity_token
      }
    end

      private
    
      def logged_in?
        @current_employee = Employee.find_by(id: session[:employee_id])
        unless @current_employee
          render json: {}, status: :forbidden
        else
          @organization = @current_employee.organization
          return 
        end
      end

end

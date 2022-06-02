Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
   
      resources :organizations do
        collection  do
          get :manage_timestamps
          get :employees_shifts
          resources :calendars, only: %i[index create update destroy]
        end
      end
      resources :rooms, only: %i[index create update destroy] do
        get :invite_employees, on: :collection    
        resources :messages, only: %i[index create destroy]
     end

      resources :employees, only: %i[index create destroy] do
        resources :profiles, only: %i[show]
        collection  do
          resources :shifts, only: %i[index new create update destroy] do
            collection do
              post :assign
              patch :determine_shifts
            end
          end
             resources :timestamps, only: %i[index new create] do
                collection do
                  patch :update
                  patch :modulate_timestamps
                end
              end
          resources :notifications, only: %i[index create destroy] do
              collection do
                patch :update_notification_read
                get :all_notifications
              end
          end
          get :initial_notifications
        end
      end      
 
      # resources :employees do
      #   resources :timestamps, only: %i[index new create] do
      #     collection do
      #       patch :update
      #       patch :modulate_timestamps

      #     end
      #   end
      #   resources :notifications, only: %i[index create destroy] do
      #     collection do
      #       patch :update_notification_read
      #       get :all_notifications
      #     end
      #   end
      #   get :initial_notifications, on: :member
      
      # end
      get "employees/shifts/assign_member/:date", to: "shifts#assign_member"
      patch "timestamps/approve", to: "timestamps#approve"
      
      get "/check_session", to: "sessions#check_session"
      post "/login", to: "sessions#login"
      delete "/logout", to: "sessions#logout"

    end
  end
  
end


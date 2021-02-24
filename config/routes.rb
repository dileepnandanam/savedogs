Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api', module: 'api' do
    resources :stray_dogs
    resources :users do
      post :log_as_guest, on: :collection
      get :email_taken, on: :collection
      get :get_current_user, on: :collection
      put :update_current_user, on: :collection
    end

    resources :app_configs
  end
  root to: 'apps#index'
  get '/', to: 'apps#index'
  get '/email_confirm',  to: 'apps#index'
  get '/home/*path', to: 'apps#index'
  get '/user/*path', to: 'apps#index'

  default_url_options :host => "localhost:3000"
end

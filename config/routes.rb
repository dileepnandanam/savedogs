Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api', module: 'api' do
    resources :stray_dogs
  end
  root to: 'apps#index'
  get '/', to: 'apps#index'
  get '/home/*path', to: 'apps#index'
  get '/auth/*path', to: 'apps#index'

end

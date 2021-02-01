Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api', module: 'api' do
    resources :dogs
  end
  root to: 'apps#index'
  get '*path', to: 'apps#index'
end

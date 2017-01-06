Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'dashboard#index'

  get '/argumentation', to: "dashboard#argumentation", as: 'argumentation'
  post '/argumentation', to: "dashboard#argumentation"

  resources :argumentations, only: [ :index ]
  get '/search', to: "argumentations#search"
  post '/search', to: "argumentations#search"
end

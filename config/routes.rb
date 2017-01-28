Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #root 'dashboard#index'
  root "dashboard#argumentation"

  get '/logout', to: "dashboard#logout"

  get '/argumentation', to: "dashboard#argumentation", as: 'argumentation'
  post '/argumentation', to: "dashboard#argumentation"

  resources :argumentations, only: [ :index, :show, :create, :update]
  post '/destroyargumentation', to: "argumentations#destroyargumentation"
  get '/search', to: "argumentations#search"
  post '/search', to: "argumentations#search"

  get '/myargumentations', to: "argumentations#myargumentations"
  get '/sanitizepreview', to: "argumentations#sanitizepreview"

  post '/searchtitle', to: "argumentations#searchtitle"

  get '/getcomments', to: "argument_comments#getcomments"
  get '/getmycomments', to: "argument_comments#getmycomments"

  get '/getcurrentuser', to: "dashboard#get_current_user"

  resources :argument_comments
end
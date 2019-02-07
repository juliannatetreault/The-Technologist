Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'reviews#index'

  get "/login", to: "sessions#new", as: "login"
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#logout", as: "logout"
  get "/signup", to: "users#new", as: "signup"
  post "/signup", to: "users#create"

  get "/auth/:provider/callback", to: "sessions#github_auth"
  get 'auth/failure', to: redirect('/')

  resources :reviews, only: [:index, :show, :new, :edit, :create, :update, :destroy]

  resources :users do 
    resources :reviews, only: [:show, :new, :edit]
  end 

  resources :categories do 
    resources :reviews,  only: [:index, :show]
  end
end




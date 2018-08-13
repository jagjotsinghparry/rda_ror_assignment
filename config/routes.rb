Rails.application.routes.draw do
  root 'pages#index'

  get 'boxes' => 'boxes#index'
  patch 'boxes/:number' => 'boxes#update'
end

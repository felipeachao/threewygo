Rails.application.routes.draw do
  resources :courses do
    collection do
      get 'active', to: 'courses#active_courses'
      get 'video_sizes_report', to: 'courses#video_sizes_report' 
    end
  end
end

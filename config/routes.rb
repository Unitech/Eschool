Eschool::Application.routes.draw do
  resources :subjects


  scope :controller => :sandbox, :as => :sandbox, :path => 'sandbox' do
    get '/' => :index, :as => :index
    post '/compile' => :compile, :as => :compile
  end

  # Must be the last route
  scope :controller => :home, :as => :main do
    get '/:url_indice' => :show_chapter, :as => :chapter
    get '/:url_indice/:chapter_nb(/:section_nb)' => :show_sections, :as => :sections
  end
  

  root :to => 'home#index'
end

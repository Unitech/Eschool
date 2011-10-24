class HomeController < ApplicationController
  # List subjects
  def index
    @subjects = Subject.all
  end
  
  def show_chapter
    @subject = Subject.first(:conditions => ['url_indice = ?', params[:url_indice]], :include => [:chapters])
    # @subject = Subject.where(:url_indice => params[:url_indice]).includes(:chapters, {:sections}).first
    print @subject
  end
  
  def show_sections
    # @sections = Chapter.first(:conditions => ['chapter_number = ?', params[:chapter_number]]
  end

  def about
  end

end

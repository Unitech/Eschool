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
    @subject = Subject.first(:conditions => ['url_indice = ?', params[:url_indice]], :include => [:chapters])
    @chapter = @subject.chapters.where(:chapter_number => params[:chapter_nb]).first
    @section = @chapter.sections.where(:section_number => params[:section_nb]).first
  end

  def about
  end

end

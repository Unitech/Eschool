class ApplicationController < ActionController::Base
  protect_from_forgery
  
  protected
  def admin_logged
    if current_user.present? and current_user.admin == true
      return true
    end
    redirect_to root_path
  end
    
end

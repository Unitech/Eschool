module ApplicationHelper
  def markdown(text)
    if (text == nil)
      return ''
    end
    options = [:hard_wrap, :filter_html, :autolink, :no_intraemphasis, :fenced_code, :gh_blockcode]
    dt = Redcarpet.new(text, *options).to_html.html_safe
    content_tag(:div, dt, :id => 'markdown')
  end
  
  def admin_logged?
    if current_user.present? and current_user.admin == true
      return true
    end
    return false
  end
end

module ApplicationHelper
  def markdown(text)
    if (text == nil)
      return ''
    end
    options = [:hard_wrap, :filter_html, :autolink, :no_intraemphasis, :fenced_code, :gh_blockcode]
    dt = Redcarpet.new(text, *options).to_html.html_safe
    content_tag(:div, dt, :id => 'markdown')
  end
  
  def link_to_remove_fields(name, f)
    f.hidden_field(:_destroy) + link_to_function(name, "remove_part(this)")
  end

  def link_to_add_fields(name, f, association, css_class)
    new_object = f.object.class.reflect_on_association(association).klass.new
    fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|
      render(association.to_s.singularize + "_form", :f => builder)
    end
    print fields
    link_to_function(name, "add_fields(this, '#{association}', '#{escape_javascript(fields)}')", :class => css_class)
  end
end

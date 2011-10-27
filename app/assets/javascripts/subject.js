
// Cf application_helper.rb

function expand_chapter(el) {
    $(el).parent().find('.chapter-each-display').toggle();
}

function expand_section(el) {
    $(el).parent().find('.section-each-display').toggle();
}

function remove_part(link) {
    $(link).parent().find('input[type=hidden]').val(1);
    $(link).parent().parent().parent().remove();
    homogenize_relative_id();
}

function homogenize_relative_id() {
    var chapters_relative_id = 1;
    var sections_relative_id = 1;

    $('.chapter-each').each(function() {
	$(this).find('.chapter_number_relative_id').val(chapters_relative_id++);
	var sections = $(this).find('.section_number_relative_id');
	sections_relative_id = 1;
	sections.each(function() { 
	    $(this).val(sections_relative_id++);
	});
    });
}

function add_fields(link, association, content) {
    var el = $(link).parent();
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g");

    el.append(content.replace(regexp, new_id));
    
    homogenize_relative_id();
}

$().ready(function() {

    homogenize_relative_id();

});
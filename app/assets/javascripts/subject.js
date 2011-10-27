
// Cf application_helper.rb

function expand_chapter(el) {
    $(el).parent().find('.chapter-each-display').toggle();
}

function expand_section(el) {
    $(el).parent().find('.section-each-display').toggle();
}

function remove_part(link) {
    $(link).parent().find('input[type=hidden]').val(1);
    $(link).parent().parent().parent().hide();
}

function add_fields(link, association, content) {
    var el = $(link).parent();
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g");
	
    el.append(content.replace(regexp, new_id));
}

//$().ready(function() {});
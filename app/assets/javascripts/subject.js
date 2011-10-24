

$().ready(function() {
    $('#chapters-expand').click(function() {
	$('.chapters').toggle();
    });

    $('.sections-expand').each(function() {
	$(this).click(function() {
	    $(this).parent().find('.section-display').toggle();
	});
    });
    
    $('.chapter-show-each').each(function() {
	$(this).click(function() {
	    $(this).parent().find('.chapter-each-display').toggle();
	});
    });
    // $('#sections-expand').click(function() {
    // 	$('.sections').toggle();
    // });
});
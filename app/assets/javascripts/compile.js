
$().ready(function() {
    console.log('ready');
    $('#submit-code').click(function() {
	var data = {'code' : $('#code-source').val(), 'authenticity_token' : window._token};
	$.ajax({
	    data : data,
	    type : 'POST',
	    url : '/sandbox/compile',
	    beforeSend : function() {
		$('#title-compile').append('<span class="label important">Compiling...</span>');
	    },
	    success : function(data) {
		$('#title-compile').find('.label').remove();
		console.log(data.output);
	    }
	});
    });
});
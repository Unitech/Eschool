
$().ready(function() {
    window.console ? console.log('ready') : '';
    $('#submit-code').click(function() {

	var data = {
	    language_indice : 0,
	    'code' : $('#code-source').val(), 
	    //'authenticity_token' : window._token
	    params : false
	};

	$.ajax({
	    data : data,
	    type : 'POST',
	    url : 'http://lvh.me:3001/api/compile',
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
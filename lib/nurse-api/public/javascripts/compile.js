
$().ready(function() {
    window.console ? console.log('ready') : '';
    
    $.get('/api/languages', function(data) {
	var markup;
	
	markup = '<option value="${indice}">${language} (${version})</option>';
	$.template("optionLang", markup);
	$.tmpl("optionLang", data.languages.root).appendTo('#list-language');
    });


    $('#submit-code').click(function() {
	var data = {
	    language_indice : $('#list-language').val(),
	    code : $('#code-source').val(), 
	    //'authenticity_token' : window._token
	    params : false
	};

	$.ajax({
	    data : data,
	    type : 'POST',
	    url : '/api/compile',
	    beforeSend : function() {
		//$('#title-compile').append('<span class="label important">Compiling...</span>');
	    },
	    success : function(data) {
		//$('#title-compile').find('.label').remove();
		$('#output').html(data.output);
		console.log(data.infos);
	    }
	});
    });
});
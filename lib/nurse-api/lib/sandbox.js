//var EventEmitter = require('events').EventEmitter;
//module.exports = new EventEmitter(); 
//module.exports.emit('ready');

var exec = require('child_process').exec, child;
var fs = require('fs'); 
var util = require('util');
var color = require('./ainsi-color').set;


function generateId(elements) {
    elements |= 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < elements; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

// 
// Generate a file in /tmp folder
// and write the code sent into it
//
function createTmpFile(code, cmd_lang, callback) {
    var tmpFile = '/tmp/tmp-' + generateId() + cmd_lang.extension;
    
    fs.writeFile(tmpFile, code, function(err) {
	if (err) {
	    console.log('Error while writting in file');
	    callback(null, {
		success : false,
		info : 'Not able to write in file'
	    });
	}
	else {
	    console.log('+--- File ' + tmpFile + ' written with code : \n'
			+ code);
	    callback(tmpFile, null);
	}
    });    
}

function findExec(indice, languages_handled, callback) {
    console.log('+--- Finding command ' + indice);
    var cmd_lang = languages_handled.root[parseInt(indice)];
    if (cmd_lang == undefined) {
	// Not found
	callback(null, {
	    success : false,
	    info : 'Language not found'
	});
    }
    else {
	console.log('Language found = ' + util.inspect(cmd_lang));
	callback(cmd_lang, null);
    }
}

function executeScript(data, file, cmd_lang, callback) {
    var cmd = cmd_lang.cmd + ' ' + file;

    console.log('+--- Executing script = ' + cmd);
    child = exec(cmd, function (error, stdout, stderr) {
	if (error !== null) {
	    console.log('exec error: ' + error);
	    callback(null, {
		success : false,
		info : 'Exec error : ' + error
	    });	    
	}
	else {
	    console.log(color(stdout, 'red'));
	    callback(stdout, null);
	}
    });
}

//
// TODO (need ./a.out different)
function executeCompilater(data, file, cmd_lang, callback) {
    var cmd_comp = cmd_lang.cmd + ' ' + file;

    console.log('+--- Executing compilation = ' + cmd_comp);
    exec(cmd_comp, function (error, stdout, stderr) {
	if (error !== null) {
	    console.log('exec error: ' + error);
	    callback(null, {
		success : false,
		info : 'Exec error : ' + error
	    });	    
	}
	else {
	    console.log(color(stdout, 'red'));
	    callback(stdout, null);
	}
    });
}

function executeFile(data, file, cmd_lang, callback) {
    // Is an interpreted language (1 step)
    if (cmd_lang.lang_type == 0) {
	executeScript(data, file, cmd_lang, function(out, err) {
	    callback(out, err);
	});
	
    }
    // Is an compiled language (2 steps)
    else if (cmd_lang.lang_type == 1) {
    }

}

//
// Main entry
// - languages = list of languages handled
// - data = { language, code, params }
// - callback
//
exports.exec = function(languages_handled, data, callback) {
    console.log(color('\n===== Entering in Nurse Sandbox =====',
		      'red'));
    console.log('+--- Object inspection :');
    console.log(util.inspect(data));
    // Find compiler
    findExec(data.language_indice, languages_handled, function(cmd_lang, err) {
	if (err != null) {
	    console.log(color('Language not found : ' 
			      + util.inspect(err), 
			      'red+bold'));
	    callback(null, err);
	    return;
	}
	// Generate file + write in it
	createTmpFile(data.code, cmd_lang, function(file, err) {
	    
	    // Execute the file
	    executeFile(data, file, cmd_lang, function(out, err) {
		// Delete it
		console.log('+--- Deleting file');
		fs.unlink(file);
		console.log(color('========= End Nurse Sandbox =========\n', 'red'));
		callback(out, err);  
	    });
	});
    });
}

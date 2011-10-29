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
function createTmpFile(code, callback) {
    var tmpFile = '/tmp/tmp-' + generateId();
    
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
    var cmd_lang = languages_handled.root[indice];
    if (cmd_lang == undefined) {
	// Not found
	callback(null, {
	    success : false,
	    info : 'Language not found'
	});
    }
    else {
	callback(cmd_lang, null);
    }
}

function executeFile(data, file, callback) {
    var cmd = 'ruby ' + file;
    console.log('+--- Executing command = ' + cmd);
    child = exec(cmd, function (error, stdout, stderr) {
	// console.log('stdout: ' + stdout);
	// console.log('stderr: ' + stderr);
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
    // Generate file + write in it
    findExec(data.language_indice, languages_handled, function(cmd_lang, err) {
	if (err != null) {
	    console.log(color('Language not found : ' 
			      + util.inspect(err), 
			      'red+bold'));
	    callback(null, err);
	    return;
	}
	createTmpFile(data.code, function(file, err) {
	    
	    // Execute the file
	    executeFile(data, file, function(out, err) {
		// Delete it
		console.log('+--- Deleting file');
		fs.unlink(file);
		console.log(color('========= End Nurse Sandbox =========\n', 'red'));
		callback(out, err);  
	    });
	});
    });
}

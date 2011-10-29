
/**
 * Module dependencies.
 */

var express = require('express');
var util = require('util');


try {
    var sandbox = require('./lib/sandbox');
} catch(e) {
    console.log(e.message);
}


var app = module.exports = express.createServer();

var languages_handled = { root : 
			  [{
			      indice : 0,
			      language : "Ruby",
			      cmd : "ruby",
			      extension : ".rb",
			      version : "1.9.1",
			      lang_type : 0
			  },
			   {
			       indice : 1,
			       language : "Gcc",
			       cmd : "gcc",
			       extension : ".c",
			       version : "4.4.1",
			       lang_type : 1
			   },
			   {
			       indice : 2,
			       language : "G++",
			       cmd : "g++",
			       extension : ".cpp",
			       version : "4.4.1",
			       lang_type : 1
			   }]
			};

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());

    app.use(express.logger());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index', {
	title: 'Express'
    });
});



app.get('/api', function(req, res) {
    res.json({
	'data' : 'Welcome to Nurse Sandbox API',
	'api' : util.inspect(app)
    });
});

app.get('/api/ping', function(req, res) {
    res.json({
	pong : true, 
	success : true
    });
});

app.post('/api/ping', function(req, res) {
    res.send(req.body);
});

app.get('/api/languages', function(req, res) {
    res.json({
	languages : languages_handled,
	success : true
    });
});

app.get('/api/compile', function(req, res) {
    res.json({
	languages_indice : 'X',
	code : 'The code',
	params : 'The params'
    });
});

app.get('/api/error', function(req, res) {
    res.json({
	success : false,
	output : false,
	infos : 'The information about the error'
    });
});

app.post('/api/compile', function(req, res) {
    try {
	// Exec unsafe command by
	// calling exec from sandbox module
	// (sandbox.js)
	sandbox.exec(languages_handled, req.body, 
		     // CB
		     function(out, err) {
			 var data = {};
			 if (err === null) {
			     data = {
				 success : true,
				 output : out
			     };
			 }
			 else {
			     data = {
				 success : false,
				 output : false,
				 infos : err.info
			     };
			 }
			 // End of Sandboxing
			 res.json(data);
		     });
    } catch (e) {
	// If error in sandbox.js
	// it will be thrown here
	console.log(e.message);
    }

    // res.json({
    // 	'data' : 'Welcome to Nurse Sandbox API',
    // 	'api' : util.inspect(app)
    // });
});

// app.get('/api/', function(req, res) {
//     res.send({
// 	'data' : 'Welcome to Nurse Sandbox API',
// 	'api' : util.inspect(app)
//     });
// });



app.listen(3005);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

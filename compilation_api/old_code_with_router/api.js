//
//
// API Bridge between the system and the world
// Used with seccomp-nurse
//
// Journey : http://github.com/cloudhead/journey
//
// Thanks to the help of http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs
//

var http = require('http');
var journey = require('journey');
var util = require('util');

try {
    var sandbox = require('./sandbox');
} catch(e) {
    console.log(e.message);
}

var token, router = new journey.Router({ 
    strict: false,
    strictUrls: false,
    api: 'basic'
});

var languages_handled = { root : 
			  [{
			      indice : 0,
			      language : "Ruby",
			      cmd : "ruby",
			      version : "1.9.1"
			  },
			   {
			       indice : 1,
			       language : "Gcc",
			       cmd : "gcc",
			       version : "4.4.1"	    
			   },
			   {
			       indice : 2,
			       language : "G++",
			       cmd : "g++",
			       version : "4.4.1"
			   }]
			};


router.path('/api', function() {

    //
    // Welcome message
    //
    this.get().bind(function (res) {
	res.send(200, {}, { 
	    'data' : 'Welcome to Nurse Sandbox API',
	    'api' : util.inspect(router)
	});
    });
    
    //
    // GET /ping: 
    //   * Responds with 200
    //   * Responds with `{ pong: true }`
    //
    this.get('/ping').bind(function (res) {
	util.inspect(router);
	res.send(200, {}, { 
	    pong : true, 
	    success : true
	});
    });

    //
    // POST /ping
    //   * Responds with 200
    //   * Responds with the data posted
    //
    this.post('/ping').bind(function (res, data) {
	//console.log(data);
	res.send(200, {}, data);
    });

    //
    // GET /languages: 
    //   * Responds with 200
    //   * Responds with list of handled languages
    //
    this.get('/languages').bind(function (res) {
	res.send(200, {}, { 
	    languages : languages_handled,
	    success : true
	});
    });


    this.post('/compile').bind(function(res, data) {
	try {
	    // Exec unsafe command by
	    // calling exec from sandbox module
	    // (sandbox.js)
	    sandbox.exec(languages_handled, data, 
			 // CB
			 function(out, err) {
			     if (err === null) {
				 res.send(200, {}, {
				     success : true,
				     output : out
				 });
			     }
			     else {
				 res.send(200, {}, {
				     success : false,
				     output : false,
				     infos : err.info
				 });
			     }
			 });
	} catch (e) {
	    // If error in sandbox.js
	    // it will be thrown here
	    console.log(e.message);
	}
    });

    // If get send message
    this.get('/compile').bind(function(res, data) {
	res.send(200, {}, {
	    success : false,
	    info : 'Method not allowed (POST not GET)'
	});
    });
});

//
// Create a simple HTTP server to 
// consume our router.
//
http.createServer(function (request, response) {
    var body = "";

    request.addListener('data', function (chunk) { body += chunk });
    request.addListener('end', function () {
	//
	// Dispatch the request to the router
	//
	router.handle(request, body, function (result) {
	    response.writeHead(result.status, result.headers);
	    response.end(result.body);
	});
    });
}).listen(3001);

console.log('····· ✓ API Succesfully launcher');
console.log('····· Ready to run unsafe code');


//
//
//
//
//
// From tutorial
//
//

// function isAuthorized (req, body, next) {
//     return parseInt(req.headers['x-test-authorized'], 10) !== token 
// 	? next(new journey.NotAuthorized())
// 	: next();
// }



// //
// // GET /login
// //   * Responds with 200
// //   * Responds with { token: /\d+/ }
// //
// router.get('/login').bind(function (res) {
//     if (!token) {
// 	token = Math.floor(Math.random() * 100);
//     }
//     res.send(200, {}, { token: token });
// });

// //
// // Filter requests to /restricted using isAuthorized.
// //
// router.filter(isAuthorized, function () {
//     //
//     // GET /restricted
//     //   * Responds with 200
//     //   * Responds with { authorized: true }
//     //
//     this.get('/restricted').bind(function (res) {
// 	res.send(200, {}, { authorized: true });
//     });
// });


//
//
// Here is the test for the
// API Bridge between the system and the world
//
// Api easy : http://indexzero.github.com/api-easy/
// Vows : http://vowsjs.org/
//
//

var APIeasy = require('api-easy');
var suite = APIeasy.describe('api');
var assert = require('assert');
//var sys = require('process');

suite
    .discuss('When using the API')
    .use('localhost', 3005)
    .setHeader('Content-Type', 'application/json');

//Test 1
suite
    .get('/api/ping')
    .expect(200, { pong: true, success : true });

// Test 2
suite
    .post('/api/ping', { dynamic_data: true })
    .expect(200, { dynamic_data: true });


//Test 3 - Ruby test hello world
suite
    .post('/api/compile', { 
	language_indice : 0, // Ruby indice
	code : 'puts "hello world"',
	params : false
    }).expect(200, {
	success : true, 
	output : 'hello world\n' 
    });

// Test 4 - Unknown language
suite
    .discuss('Unknow indice language sent')
    .post('/api/compile', { 
	language_indice : 99,
	code : process.argv[2] ? process.argv[2] : '',
	params : false
    }).expect(200, { 
	success : false,
	output : false,
	infos : "Language not found"
    });


// Test 3
// suite
//     .discuss('When authenticating')
//     .get('/login')
//     .expect(200)
//     .expect('should respond with the authorize token', function (err, res, body) {
// 	var result = JSON.parse(body);
// 	assert.isNotNull(result.token);

// 	suite.before('setAuth', function (outgoing) {
//             outgoing.headers['x-test-authorized'] = result.token;
//             return outgoing;
// 	});
//     })
//     .next()
//     .get('/restricted')
//     .expect(200, { authorized: true });

suite.export(module);

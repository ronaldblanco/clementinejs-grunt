'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var passportTwitter = require('passport');
var session = require('express-session');

var compression = require('compression');
var winston = require('winston');
  require('winston-daily-rotate-file');
var fs = require('fs');
var functions = require('./app/common/functions.js');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);
require('./app/config/passport-twitter')(passportTwitter);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//CHECK FOLDER LOG AND CREATE IT////////////////////////////////////
functions.ensureExists(__dirname + '/log', '0744', function(err) {
    if (err) console.error(err);
    else console.log('Folder Log was created or existed');
});
//////////////////////////////////////////////////

//LOGGER//////////////////////////////////////////
var logger = new (winston.Logger)({
    transports: [
      functions.transport
    ]
  });
functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
/////////////////////////////////////////////////

///TESTS////////////////////////////////////////////////////
var Promise = require('bluebird');
function wrap(genFn) {
    var cr = Promise.coroutine(genFn); // 2
    return function (req, res, next) { // 3
        cr(req, res, next).catch(next); // 4
    };
}
///////////////////////////////////////////////////////

//Forzing Cache of static/////////////////////////
app.use(functions.cacheIt);
/////////////////////////////////////////////////

//COMPRESSION////////////////////////////////////
app.use(compression({filter: functions.shouldCompress}));
/////////////////////////////////////////////////

routes(app, passport, passportTwitter);

//Uncomment to used the Websocket Controller
//using: socket.io http and model config.js as test
//WEBSOCKET///////////////////////////
/*var server = require('http').createServer(app);
var io = require('socket.io')(server);
var webSocketHandler = require(process.cwd() + '/app/controllers/webSocketHandler.server.js');

var numClients = 0;
var endpoint = io
  .of('/')
  .on('connection', function (socket) {
      webSocketHandler.respond(endpoint,socket);
  });
  
  var port = process.env.PORT || 8080;
  server.listen(port,  function () {
	console.log('Node.js with WebSocket listening on port ' + port + '...');
});*/
//WEBSOCKET//////////////////////////

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

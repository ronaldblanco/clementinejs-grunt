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

//LOGGER//////////////////////////////////////////
var transport = new winston.transports.DailyRotateFile({
    filename: './log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  });
  
  var logger = new (winston.Logger)({
    transports: [
      transport
    ]
  });
  logger.info('//////////////////STARTING LOGGER INFO////////////////////////');
/////////////////////////////////////////////////

//Forzing Cache of static/////////////////////////
app.use(function (req, res, next) {
    logger.info(req.url);
    //console.log(req.url);
    //console.log(req);
    /*if (req.url.match(/^\/(css|js|img|font|png|map)\/.+/)) {
        res.set('Cache-Control', 'public, max-age=3600');
    }*/
    if (req.url.match('/public/css/bootstrap.min.css.map')) {
        logger.info('Cache bootstrap');
        res.set('Cache-Control', 'public, max-age=3600');//seconds
    }
    if (req.url.match('/login') || req.url.match('/profile')) {
        logger.info('Cache Login or Profile');
        res.set('Cache-Control', 'public, max-age=120');//seconds
    }
    next();
});
/////////////////////////////////////////////////

//COMPRESSION////////////////////////////////////
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header 
    return false;
  }
  // fallback to standard filter function 
  return compression.filter(req, res);
}
app.use(compression({filter: shouldCompress}));
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

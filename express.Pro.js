'use strict';

var express = require('express');
//var session = require('express-session');
var cookieSession = require('cookie-session');
var passport = require('passport');
var functions = require('./common/functions.server.js');
var compression = require('compression');

var app = express();

/////EMAIL CONFIG////////////////////////////////////////////////////////////////////////////
app.use('/emailjs', express.static(process.cwd() + '/node_modules/emailjs'));
////////////////////////////////////////////////////////////////////////////////////

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/dist', express.static(process.cwd() + '/dist'));
app.use('/socket', express.static(process.cwd() + '/node_modules/socket.io-client/dist'));

//////////////////////////////////////////////
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
//////////////////////////////////////////////

/*app.use(session({
    secret: 'secretClementine',
	resave: false,
	saveUninitialized: true,
	name: 'sessionId'//Good practices Production
}));*/

app.set('trust proxy', 1); // trust first proxy
 
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
 
/*app.use(function (req, res, next) {
  var n = req.session.views || 0;
  req.session.views = n++;
  res.end(n + ' views');
});*/

app.use(passport.initialize());
app.use(passport.session());

//Forzing Cache of static/////////////////////////
app.use(functions.cacheIt);
/////////////////////////////////////////////////

//COMPRESSION////////////////////////////////////
app.use(compression({filter: functions.shouldCompress}));
/////////////////////////////////////////////////

//Production Good Practices
var helmet = require('helmet');
app.use(helmet());
///////////////////////////

module.exports = app;
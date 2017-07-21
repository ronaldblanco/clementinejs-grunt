'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var DataHandler = require(path + '/app/controllers/dataHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');

//var Promise = require('bluebird');

module.exports = function (app, passport, passportTwitter, passportLocal, emailServer) {
	
	function isLoggedIn (req, res, next) {
		//console.log(req.user);
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	function isNotLoggedIn (req, res, next) {
		return next();
	}
	
	///bluebird and Promise////////////////////////////////////////////	
	//var Promise = require('bluebird');
	
	/*function wrap(genFn) {
    	var cr = Promise.coroutine(genFn); // 2
    	return function (req, res, next) { // 3
        	cr(req, res, next).catch(next); // 4
    	};
	}
	
	app.use(function (err, req, res, next) {
		if(err) throw err;
		//console.log(err);
		//functions.logIt(logger,err);
	});*/
	/////////////////////////////////////////////////////////////////
	
	var clickHandler = new ClickHandler();
	var dataHandler = new DataHandler();
	var userHandler = new UserHandler(emailServer);
	
	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	/*app.route('/')
		.get(isLoggedIn, wrap(function* (req, res) {
			//throw new Error('oh no!');
			res.sendFile(path + '/public/index.html');
		}));*/
		
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.login);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
		
	app.route('/auth/twitter')
		.get(passportTwitter.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passportTwitter.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	/////////////////////////////////////////////////////////////////	
	app.route('/authlocal')
		.get(function (req, res) {
			res.sendFile(path + '/public/loginlocal.html');
		});
		
	app.route('/auth/local') 
		.get(passportLocal.authenticate('local', { 
			failureRedirect: '/authlocal' }),
		function(req, res) {
    		res.redirect('/');
		})
		.post(passportLocal.authenticate('local', { 
			failureRedirect: '/authlocal' }),
		function(req, res) {
    		res.redirect('/');
		});
		
	app.route('/auth/localnew')
		.post(isNotLoggedIn, userHandler.addUser);
		
	app.route('/auth/localnewreset')
		.post(isNotLoggedIn, userHandler.resetPass);
	
	app.route('/auth/localnewok')
		.get(function (req, res) {
			res.sendFile(path + '/public/usercreationOK.html');
		});
	/////////////////////////////////////////////////////////////////
	
	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/:id/info')
		.get(isLoggedIn, dataHandler.getDatas);
		
	app.route('/api/:id/infoadd')
		.post(isLoggedIn, dataHandler.addData);
		
	app.route('/api/:id/infodel')
		.delete(isLoggedIn, dataHandler.deleteData);
		
	//COMPRESSION Server-Sent Events/////////////////////
	app.route('/api/:id/events')
		.get(function (req, res) {
			res.setHeader('Content-Type', 'text/event-stream');
			res.setHeader('Cache-Control', 'no-cache');
 
			// send a ping approx every 2 seconds 
			var timer = setInterval(function () {
    			res.write('data: ping\n\n');
 
    			// !!! this is the important part 
    			res.flush();
			}, 2000);
 
			res.on('close', function () {
    			clearInterval(timer);
			});
	});
	////////////////////////////////////////////////
		
};

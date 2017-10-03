var path = process.cwd();
var Users = require(path + '/app/models/users.js');
var message = require(path + '/server/models/message.js');
var email = require(path + "/node_modules/emailjs/email");
var url = require("urlparser");
var ClickHandler = require(path + '/server/controllers/clickHandler.server.js');
var DataHandler = require(path + '/server/controllers/dataHandler.server.js');
var UserHandler = require(path + '/server/controllers/userHandler.server.js');

module.exports = function (app, passport, passportTwitter, passportLocal, emailServer, loginConfig) {
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	function isNotLoggedIn (req, res, next) {
		return next();
	}
	
	var clickHandler = new ClickHandler(Users);
	var dataHandler = new DataHandler(Users, url);
	var userHandler = new UserHandler(Users, emailServer, message, email);
	
	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/min/index.min.html');
		});
	
	var login = '';	
	if (loginConfig[0] === 'noEXT_AUTH') login = '/public/min/loginlocal.min.html';
	else login = '/public/min/login.min.html';
		
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + login);
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/min/profile.min.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.login);
		});
		
	if (loginConfig.length === 0){
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
	}

	/////////////////////////////////////////////////////////////////	
	app.route('/authlocal')
		.get(function (req, res) {
			res.sendFile(path + '/public/min/loginlocal.min.html');
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
		
	app.route('/auth/localnewmessage')
		.get(isNotLoggedIn, userHandler.message);
	
	app.route('/auth/localnewok')
		.get(function (req, res) {
			res.sendFile(path + '/public/min/usercreationOK.min.html');
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

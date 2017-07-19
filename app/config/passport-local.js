'use strict';

var localStrategy = require('passport-local').Strategy;

//var twitterStrategy = require('passport-twitter').Strategy;
//var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
//var configAuth = require('./auth');

module.exports = function (passportLocal) {
	// Configure the local strategy for use by Passport.
	//
	// The local strategy require a `verify` function which receives the credentials
	// (`username` and `password`) submitted by the user.  The function must verify
	// that the password is correct and then invoke `cb` with a user object, which
	// will be set at `req.user` in route handlers after authentication.
	
	passportLocal.use(new localStrategy(
		function(username, password, cb) {
    		User.findOne({ 'login.username': username, 'login.password': password}, function(err, user) {
    			if (err) { return cb(err); }
    			if (!user) { return cb(null, false); }
    			//if (user) { return cb(null, false); }
    			return cb(null, user);
    		});
		}));
	

	passportLocal.serializeUser(function (user, cb) {
		cb(null, user.id);
	});

	passportLocal.deserializeUser(function (id, cb) {
		User.findById(id, function (err, user) {
			cb(err, user);
		});
	});

	/*passportLocal.use(new localStrategy({
		
	},
	
	function (token, refreshToken, username, password, cb) {
		process.nextTick(function () {
			User.findOne({ 'login.username': username, 'login.password': password}, function (err, user) {
				if (err) {
					return cb(err);
				}

				if (user) {
					return cb(null, user);
				} else {
					var newUser = new User();
					
					newUser.login.username = username;
					newUser.login.password = password;
					newUser.login.id = randomize('0', 7);
					//newUser.login.username = profile.username;
					//newUser.login.displayName = profile.displayName;
					//newUser.github.publicRepos = 0;
					//newUser.login.photo = profile.photos[0].value;
					//newUser.nbrClicks.clicks = 0;
					//newUser.geolocation.city = '';
					//newUser.geolocation.state = '';

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return cb(null, newUser);
					});
				}
			});
		});
	}));*/
};

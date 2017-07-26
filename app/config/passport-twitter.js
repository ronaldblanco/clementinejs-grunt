

var twitterStrategy = require('passport-twitter').Strategy;
//var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth')(process);

module.exports = function (passportTwitter) {
	'use strict';
	passportTwitter.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passportTwitter.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	/*passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},*/
	passportTwitter.use(new twitterStrategy({
		consumerKey: configAuth.twitterAuth.clientID,
		consumerSecret: configAuth.twitterAuth.clientSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'login.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.login.id = profile.id;
					newUser.login.username = profile.username;
					newUser.login.displayName = profile.displayName;
					//newUser.github.publicRepos = 0;
					newUser.login.photo = profile.photos[0].value;
					//newUser.nbrClicks.clicks = 0;
					//newUser.geolocation.city = '';
					//newUser.geolocation.state = '';

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};

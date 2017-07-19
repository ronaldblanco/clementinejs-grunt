'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	login: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number,
      photo: String,
      email: String,
      password: String
	},
	info: {
      data: Array
   },
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);

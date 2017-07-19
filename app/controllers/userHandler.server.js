'use strict';

var Users = require('../models/users.js');
//var url = require("urlparser");
var randomize = require('randomatic');

function UserHandler () {
    
    this.addUser = function (req, res) {//Add Local user
		
		var newUser = new Users();
					
		newUser.login.username = req.body.username;
		newUser.login.password = req.body.password;
		newUser.login.id = randomize('0', 7);
		newUser.login.displayName = req.body.display;
		//console.log(req.body);
		newUser.save(function (err) {
			if (err) {
				throw err;
			}

			res.redirect('/auth/localnewok');
		});	

	};
    
}

module.exports = UserHandler;
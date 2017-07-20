'use strict';

var Users = require('../models/users.js');
//var emailCheck = require('email-check');
var randomize = require('randomatic');
var md5Hex = require('md5-hex');
// Helper to validate email based on regex
const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
/////////////////////////////////////////////////////
function validateEmail (email) {
  if (typeof email === 'string' && email.length > 5 && email.length < 61 && EMAIL_REGEX.test(email)) {
    return email.toLowerCase();
  } else {
    return false;
  }
}
/////////////////////////////////////////////////////

function UserHandler () {
    
    this.addUser = function (req, res) {//Add Local user
    
    	
    	Users
			.findOne({ 'login.username': req.body.username/*, 'login.password': md5Hex(req.body.password) */}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				console.log(result);
				if(result === null){
					
					
					
					var newUser = new Users();
					
					newUser.login.username = req.body.username;
					var email = validateEmail(req.body.username);
					if(email != false) newUser.login.email = email;
					newUser.login.password = md5Hex(req.body.password);
					newUser.login.id = randomize('0', 7);
					newUser.login.displayName = req.body.display;
					//console.log(req.body);
					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						res.redirect('/auth/localnewok');
					});	
					
					
					
				} else res.redirect('/auth/localnewok');
			});
    	
    
    	

	};
    
}

module.exports = UserHandler;
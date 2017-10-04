

//var Users = require('../models/users.js');
//var message = require('../models/message.js');
//var Users1 = require('../models/users.js');
//var email = require("emailjs/email");
var randomize = require('randomatic');
var md5Hex = require('md5-hex');
//var url = require("urlparser");

var winston = require('winston');
require('winston-daily-rotate-file');
//var fs = require('fs');
var functions = require('../common/functions.server.js');

//LOGGER//////////////////////////////////////////
var logger = new (winston.Logger)({
    transports: [
      functions.transport
    ]
  });
//functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
/////////////////////////////////////////////////

// Helper to validate email based on regex
var EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
/////////////////////////////////////////////////////
function validateEmail (email) {
	'use strict';
  if (typeof email === 'string' && email.length > 5 && email.length < 61 && EMAIL_REGEX.test(email)) {
    return email.toLowerCase();
  } else {
    return false;
  }
}
/////////////////////////////////////////////////////

function UserHandler (Users, emailServer, message, email) {
	'use strict';
	var server 	= email.server.connect({
		'user':    emailServer.user, 
		'password': emailServer.password, 
		'host':    emailServer.host,
		'port': emailServer.port,
		'ssl':     true
	});

    this.addUser = function (req, res) {//Add Local user
    
    	Users
			.findOne({ 'login.username': req.body.username/*, 'login.password': md5Hex(req.body.password) */}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				if(result === null){
				
					var newUser = new Users();
					
					newUser.login.username = req.body.username;
					var email = validateEmail(req.body.username);
					if(email != false) {newUser.login.email = email;}
					newUser.login.password = md5Hex(req.body.password);
					newUser.login.id = randomize('0', 7);
					newUser.login.displayName = req.body.display;
					//console.log(req.body);
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						/////////////Email send!!////////////////////
						if(email != false){
							
							// send the message and get a callback with an error or details of the message that was sent 
							//console.log(server);
							server.send({
							text:    "Welcome to Clementine Pnald version!", 
							from:    "Admin <"+emailServer.user+">", 
							//to:      "someone <rblanco@gammaseafood.com>, another <another@your-email.com>",
							to:      "New User <"+ email +">",
							//cc:      "else <else@your-email.com>",
							subject: "Welcome Email!"
							}, function(err, message) { functions.logIt(logger, err || message); });               
						}
						////////////////////////////////
						
						message.message = "The User was created correctly!";
						message.type = "alert alert-success";
						//res.send({});
						res.redirect('/auth/localnewok');
					});	
		
				} else{
					//res.send({'message':'The username is in the database!'});
					message.message = "The User already exist in the database!";
					message.type = "alert alert-info";
					//res.send({});
					res.redirect('/auth/localnewok');
				} 
			});
 
	};
	
	this.resetPass = function (req, res) {//Reset Password
	
		var username = req.originalUrl.toString().split('?name=')[1];
		var newPass = randomize('0', 7);
		
		var email = validateEmail(username);
		if(email != false){
    	
    	Users
			.findOneAndUpdate({ 'login.username': username}, { 'login.password': md5Hex(newPass) })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				// send the message and get a callback with an error or details of the message that was sent 
				//console.log(server);
				server.send({
					text:    "Your new password is: "+newPass, 
					from:    "Admin <"+emailServer.user+">", 
					//to:      "someone <rblanco@gammaseafood.com>, another <another@your-email.com>",
					to:      "New User <"+ username +">",
					//cc:      "else <else@your-email.com>",
					subject: "Your password was reset!"
				}, function(err, message) { functions.logIt(logger, err || message); });//res.redirect('/auth/localnewok');
				message.message = "The password was reset correctly; an email was send to the user!";
				message.type = "alert alert-success";
				res.send({"message":"The password was reset correctly; an email was send to the user!"});
				
			});
			
		} else {
			message.type = "alert alert-warning";
			message.message = "The username it is not a valid email account!";
			res.send({"message":"The username it is not a valid email account!"});
		}
 
	};
	
	this.message = function(req, res){
		res.send(message);
	};
    
}

module.exports = UserHandler;
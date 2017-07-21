'use strict';

var Users = require('../models/users.js');
var email = require("emailjs/email");
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

function UserHandler (emailServer) {
	
	var server 	= email.server.connect({
		'user':    emailServer.user, 
		'password': emailServer.password, 
		'host':    emailServer.host,
		'port': emailServer.port,
		'ssl':     false
	});

    this.addUser = function (req, res) {//Add Local user
    //console.log(emailServer);
    	
    	Users
			.findOne({ 'login.username': req.body.username/*, 'login.password': md5Hex(req.body.password) */}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				//console.log(result);
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
						/////////////Email send!!////////////////////
						if(email != false){
							
						// send the message and get a callback with an error or details of the message that was sent 
						//console.log(server);
						server.send({
						   text:    "Welcome to Clementine Pnald version!", 
						   from:    "Admin <rblanco@gammaseafood.com>", 
						   //to:      "someone <rblanco@gammaseafood.com>, another <another@your-email.com>",
						   to:      "New User <"+ email +">",
						   //cc:      "else <else@your-email.com>",
						   subject: "Welcome Email!"
						}, function(err, message) { console.log(err || message); });
						
						}
						////////////////////////////////
						//res.send({'message':'User was created correctly!'});
						res.redirect('/auth/localnewok');
					});	
					
					
					
				} else{
					//res.send({'message':'The username is in the database!'});
					res.redirect('/auth/localnewok');
				} 
			});
    	
    
    	

	};
    
}

module.exports = UserHandler;
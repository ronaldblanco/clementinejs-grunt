var email 	= require("./node_modules/emailjs/email");
var server 	= email.server.connect({
   user:    "rblanco@gammaseafood.com", 
   password:"", 
   host:    "mail.gammaseafood.com",
   port: 1025,
   ssl:     false
});

/*var server 	= email.server.connect({
   user:    process.env.EMAILUSER, 
   password:process.env.EMAILPASS, 
   host:    process.env.EMAILHOST,
   port: process.env.EMAILPORT,
   ssl:     false
});*/
 
// send the message and get a callback with an error or details of the message that was sent 
server.send({
   text:    "i hope this works", 
   from:    "you <rblanco@gammaseafood.com>", 
   //to:      "someone <rblanco@gammaseafood.com>, another <another@your-email.com>",
   to:      "someone <rblanco@gammaseafood.com>",
   //cc:      "else <else@your-email.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });
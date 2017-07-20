var emailCheck = require('email-check');
var email = 'rblanco';
// With custom options 
		/*emailCheck(email, {
		from: 'rblanco@gammaseafood.com',
		host: 'mail.gammaseafood.com',
		timeout: 3000
		})
		.then(function (result) {
			console.log(email);
    		console.log(result);
    	})
		.catch(function (err) {
    		console.error(err);
		});*/

// Helper to validate email based on regex
const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function validateEmail (email) {
  if (typeof email === 'string' && email.length > 5 && email.length < 61 && EMAIL_REGEX.test(email)) {
    return email.toLowerCase();
  } else {
    return false;
  }
}

console.log(validateEmail(email));
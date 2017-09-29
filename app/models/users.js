
function Users() {
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
//return {mongoose: mongoose, Schema: Schema, User: User};
return mongoose.model('User', User);
}

//Exporting the result, not the function
module.exports = Users();

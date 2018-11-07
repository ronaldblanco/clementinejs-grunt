

//var Users = require('../models/users.js');
//var url = require("urlparser");

function DataHandler (Users, url) {
	'use strict';
	this.getDatas = function (req, res) {
		Users
			.findOne({ 'login.id': req.user.login.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.info);
			});
	};

	this.addData = function (req, res) {
		
		//var myUrl = url.parse(req.originalUrl);
		var myUrl = req.originalUrl.split('=')[1] + "=" + req.originalUrl.split('=')[2];
		//console.log(req.originalUrl)
		//console.log(myUrl.query.params.name)
		//console.log(myUrl)
		//var newData = {'name': unescape(myUrl.query.params.name)};
		var newData = {'name': myUrl};
		Users
			.findOneAndUpdate({ 'login.id': req.user.login.id }, { $push: { 'info.data': newData } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.info);
				}
			);		
   
	};

	this.deleteData = function (req, res) {
		//var myUrl = url.parse(req.originalUrl);
		var myUrl = req.originalUrl.split('=')[1] + "=" + req.originalUrl.split('=')[2];
		//unescape(myUrl.query.params.name)
		Users
			.findOneAndUpdate({ 'login.id': req.user.login.id }, { $pull: { 'info.data': { name:myUrl} }  })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.info);
				}
			);
	};
	
	this.getAllDatas = function (req, res) {
		Users
			.find({}, {})
			.exec(function (err, result) {
				if (err) { throw err; }
				
				var final = [];
				result.forEach(function(user){
					user.info.data.forEach(function(data){
						final.push(data);
					});
					
				});
				//console.log(final);
				res.send(final);
			});
	};

}

module.exports = DataHandler;

'use strict';

var routes = require('./app/routes/index.js');
var app = require('./express.js');

var mongoose = require('mongoose');
var passport = require('passport');
var passportTwitter = require('passport');
var passportLocal = require('passport');

var winston = require('winston');
require('winston-daily-rotate-file');
var functions = require('./app/common/functions.server.js');

require('dotenv').load();
require('./app/config/passport')(passport);
require('./app/config/passport-twitter')(passportTwitter);
require('./app/config/passport-local')(passportLocal);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

/////EMAIL CONFIG////////////////////////////////////////////////////////////////////////////
var emailServer = {
    'user' : process.env.EMAILUSER,
    'password' : process.env.EMAILPASS,
    'host' : process.env.EMAILHOST,
    'port' : process.env.EMAILPORT
};
////////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === 'development'){
    //Grunt build execution
    functions.execute('grunt build');
    /////////////////////////
    //CHECK FOLDER LOG AND CREATE IT////////////////////////////////////
    functions.ensureExists(__dirname + '/log', '0744', function(err) {
        if (err) console.error(err);
        else console.log('Folder Log was created or existed');
    });
    //////////////////////////////////////////////////

    //LOGGER//////////////////////////////////////////
    var logger = new (winston.Logger)({
        transports: [
        functions.transport
        ]
    });
    functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
    /////////////////////////////////////////////////
}

routes(app, passport, passportTwitter, passportLocal, emailServer);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
	console.log(process.env.NODE_ENV + ' ENV!');
});

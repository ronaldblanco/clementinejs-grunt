'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var passportTwitter = require('passport');
var passportLocal = require('passport');

var winston = require('winston');
require('winston-daily-rotate-file');

require('dotenv').load();
if (process.env.EXT_AUTH === 'TRUE') {
    require('./app/config/passport')(passport);
    require('./app/config/passport-twitter')(passportTwitter);
} 
require('./app/config/passport-local')(passportLocal);

var loginConfig = [];
if (process.env.EXT_AUTH === 'FALSE' || process.env.EXT_AUTH === undefined) loginConfig.push('noEXT_AUTH');

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

//process.env.NODE_ENV asignation and check
if (process.argv.length > 2){
    if (process.argv[2] !== undefined || process.argv[2] !== null) {process.env.NODE_ENV = process.argv[2]}
} else if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === null) {
    process.env.NODE_ENV = 'production';
}

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production'){
    console.log("Using folder SERVER for server side, PUBLIC/MIN for client html and Good Practices for Production!");
    var routes = require('./server/routes/index.js');
    var app = require('./server/express.js');
    var functions = require('./server/common/functions.server.js');
} else if (process.env.NODE_ENV === 'development'){
    console.log("Using folder APP for server side and PUBLIC for client html!");
    var routes = require('./app/routes/index.Dev.js');
    var app = require('./express.Dev.js');
    var functions = require('./app/common/functions.server.js');
}
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
    functions.execute('grunt build-dev');
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

routes(app, passport, passportTwitter, passportLocal, emailServer, loginConfig);

//PORT config
var port = process.env.PORT || 8080;

if (process.env.SOCKET === 'TRUE'){
    //Uncomment to used the Websocket Controller
    //using: socket.io http and model config.js as test
    //WEBSOCKET///////////////////////////
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    //Changes in case of production
    if (process.env.NODE_ENV === 'production'){
        //Development as default
        var webSocketHandler = require(process.cwd() + '/server/controllers/webSocketHandler.server.js');
        var config = require(process.cwd() + '/server/models/socketData.js');
    } else if (process.env.NODE_ENV === 'development'){
        //Development as default
        var webSocketHandler = require(process.cwd() + '/app/controllers/webSocketHandler.server.js');
        var config = require(process.cwd() + '/app/models/socketData.js');
    }
  
    var endpoint = io
        .of('/')
        .on('connection', function (socket) {
            webSocketHandler.respond(endpoint, socket, true, config, 0);
    });

    server.listen(port,  function () {
	    console.log('Node.js with WebSocket listening on port ' + port + '...');
    });
    //WEBSOCKET//////////////////////////
    
} else if (process.env.SOCKET === 'FALSE' || process.env.SOCKET === undefined || process.env.SOCKET === null){
    app.listen(port,  function () {
	    console.log('Node.js listening on port ' + port + '...');
    });
}

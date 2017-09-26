var fs = require('fs');
var compression = require('compression');
var winston = require('winston');
  require('winston-daily-rotate-file');
var rimraf = require('rimraf');
var exec = require('child_process');

//LOGGER///////////////////////////////////////////
var transport= new winston.transports.DailyRotateFile({
    filename: './log/log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
  });
var logger = new (winston.Logger)({
    transports: [
      transport
    ]
  });
function logIt (logger, info){
  'use strict';
    logger.info(info);
}
//functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
/////////////////////////////////////////////////

module.exports = {
  
  execute: function(cmd){
    exec.exec(cmd, function (err, stdout, stderr) {
      if (err) {
        console.log(cmd + ' was not execute!');
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(cmd + ' was execute!');
      //console.log('stdout: ' + stdout);
      if(stderr) {console.log('stderr: ' + stderr);}
    });
  },
  
  logIt: function(logger, info){
    'use strict';
    logger.info(info);
  },
  
  cacheIt: function(req, res, next) {
    'use strict';
    var cache;
    if (process.env.NODE_ENV === 'development'){
      logIt(logger,req.url);
      cache = '0';
    } else if (process.env.NODE_ENV === 'production') {cache = '3600';}
    //console.log(req.url);
    //if (req.url.match(/^\/(css|js|img|font|png|map)\/.+/)) {
        //res.set('Cache-Control', 'public, max-age=3600');
    //}
    if (req.url.match('/dist/bootstrap.min.css.map')) {
        //logger.info('Cache bootstrap');
        res.set('Cache-Control', 'public, max-age=3600');//seconds
    }
    //res = functions.cache(req, res, '/public/css/bootstrap.min.css.map', '3600');
    if (req.url.match('/login') || req.url.match('/profile')) {
        //logger.info('Cache Login or Profile');
        res.set('Cache-Control', 'public, max-age=' + cache);//seconds
    }
    next();
  },
  
  //TESTS ONLY
  checkIt: function(req, res, next) {
    'use strict';
    next();
  },
    
  ensureExists: function (path, mask, cb) {
    'use strict';
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = '0777';
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {cb(null);} // ignore the error if the folder already exists
            else {cb(err);} // something else went wrong
        } else {cb(null);} // successfully created folder
    });
  },
  
  deleteFolder: function (path,  cb) {
    'use strict';
    rimraf(path, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {cb(null);} // ignore the error if the folder already exists
            else {cb(err);} // something else went wrong
        } else {cb(null);} // successfully created folder
    });
  },
  
  shouldCompress: function (req, res) {
    'use strict';
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    console.log(req.url+' not Compressed');
    return false;
  }
  // fallback to standard filter function 
  //console.log(req.url + ' Compressed');
  return compression.filter(req, res);
  },
  
  transport: new winston.transports.DailyRotateFile({
    filename: './log/log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
  }),
  
};
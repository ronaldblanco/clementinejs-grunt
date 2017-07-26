var fs = require('fs');
var compression = require('compression');
var winston = require('winston');
  require('winston-daily-rotate-file');

//LOGGER//////////////////////////////////////////
var transport= new winston.transports.DailyRotateFile({
    filename: './log/log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
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
  
  logIt: function(logger, info){
    'use strict';
    logger.info(info);
  },
  
  cacheIt: function(req, res, next) {
    'use strict';
    logIt(logger,req.url);
    //console.log(req.url);
    //if (req.url.match(/^\/(css|js|img|font|png|map)\/.+/)) {
        //res.set('Cache-Control', 'public, max-age=3600');
    //}
    if (req.url.match('/public/css/bootstrap.min.css.map')) {
        //logger.info('Cache bootstrap');
        res.set('Cache-Control', 'public, max-age=3600');//seconds
    }
    //res = functions.cache(req, res, '/public/css/bootstrap.min.css.map', '3600');
    if (req.url.match('/login') || req.url.match('/profile')) {
        //logger.info('Cache Login or Profile');
        res.set('Cache-Control', 'public, max-age=120');//seconds
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
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
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
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  }),
  
};
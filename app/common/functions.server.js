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
  
  getDateTime: function() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
  },
  
  getLinks: function(arr, antiCaptChaApi){
    if(arr != undefined && arr != null){
      arr.forEach(function(object){
        console.log(object.name);
      });
    }
  },
  
  antiCaptchaBalance: function(antiCaptChaApi){
      if (!antiCaptChaApi.isBalanceGreaterThan(10)) {
        // You can dispatch a warning using mailer or do whatever.
        console.warn("Take care, you're running low on money !");
      }
    },
    
  antiCaptchaResolver: function(url,antiCaptChaApi){
    var myUrl = url.split("?")[0];
    var key = url.split("=")[1];
    var taskId = antiCaptChaApi.createTask(
      myUrl,
      key
      //"http://www.some-site.com", // The page where the captcha is
      //"7Lfh6tkSBBBBBBGN68s8fAVds_Fl-HP0xQGNq1DK", // The data-site-key value
    );
  },
  
  waitResolution: function(taskId,antiCaptChaApi){
    // Waiting for resolution and do something
    var response = antiCaptChaApi.getTaskResult(taskId);
    /* response example:
     {
    status: "ready" | "processing";
    solution: { gRecaptchaResponse: string };
    cost: number;
    ip: string;
    createTime: number;
    endTime: number;
    
     * Number of workers who tried to complete your task
     *
     * @type {number} 
     * @memberof IGetTaskResponse
     
    solveCount: number;
 }
    */
    return response;
  }
  
};
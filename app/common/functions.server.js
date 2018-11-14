/*jshint esversion: 6 */
/*Do not Uglify this file*/

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

function antiCaptchaBalance(antiCaptChaApi){
      if (!antiCaptChaApi.isBalanceGreaterThan(3)) {
          // You can dispatch a warning using mailer or do whatever.
          console.log("Take care, you're running low on money!");
        }
        else {
          console.log("Your money it is OK!");
        }
}

function* waitResolution(taskId,antiCaptChaApi){
    // Waiting for resolution and do something
    //setTimeout(function(){}, 5000); //time
    try{
        var response = yield antiCaptChaApi.getTaskResult(taskId);
        //console.log(yield response);
    }
    catch(error){
        console.log(error);
    }
    //console.log(response);
    /*while(response.status == "processing" || response.status == undefined){
      setTimeout(function(){}, 5000); //time
      response = antiCaptChaApi.getTaskResult(taskId);
      //console.log(response.status);
    }*/
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
    //return response;
}

function* antiCaptchaResolver(urlG,antiCaptChaApi){
    var key = String(urlG.split("=")[1]);
    var myUrl = String(urlG.split("?")[0]);
    console.log(myUrl);
    console.log(key);
    //CHECK BALANCE///////////////////
    antiCaptchaBalance(antiCaptChaApi);
    ///////////////////////////////
    try{
        var taskId = yield antiCaptChaApi.createTask(myUrl,key);
        //console.log(yield taskId);
    }
    catch(error){
        console.log(error);
    }
    
    //return taskId;
    //Final URL with captcha solution
    //var finalUrl = url; //+ "&g-recaptcha-response=" + response.solution;
    //var finalUrlG1 = "https://www.google.com/recaptcha/api2/reload?k=" + response.solution; //post
    //var finalUrlG2 = "https://www.google.com/recaptcha/api2/userverify?k=" + response.solution; //post
    //return url + "&g-recaptcha-response=" + response.solution;
    //urlSubmit(finalUrl,finalUrlG1,finalUrlG2,request,Spooky);
}

function urlSubmit(url,g1,g2,antiCaptChaApi,Spooky,grecaptcharesponse){
  
  console.log(url);
  url = String(url.split("&k=")[0]);
  console.log(url);

  var spooky = new Spooky({
      child: {
        transport: 'http'
      },
      casper: {
        logLevel: 'debug',
        verbose: true,
        //pageSettings:{grecaptcharesponse: grecaptcharesponse}
      }
  }, function (err) {
      if (err) {
        var e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
      }

      spooky.start(url);
      spooky.then(function () {
        this.emit('error', 'GET errorText = ' + this.evaluate(function () {
          return document.getElementsByClassName("errorText").item(0).textContent;
        }));
      });
      spooky.then([{grecaptcharesponse: grecaptcharesponse},function(){
        this.emit('error', grecaptcharesponse);
        this.evaluate(function(grecaptcharesponse) {
          document.getElementById('g-recaptcha-response').value = grecaptcharesponse;
          //document.getElementById('Passwd').value = password;
          //document.getElementById("gaia_loginform").submit();
        });
        //this.getElementById("g-recaptcha-response").value = grecaptcharesponse;//Problem!
        //document.querySelector('textarea[name="g-recaptcha-response"]').value = grecaptcharesponse;
        //document.getElementById("g-recaptcha-response").value = grecaptcharesponse;
      }]);
      spooky.then(function(){
        this.emit('hello','Submiting The Form!');
        this.click('input[name="send_form"]');
      });
      spooky.then(function () {
        this.emit('error', 'GET errorText = ' + this.evaluate(function () {
          return document.getElementsByClassName("errorText").item(0).textContent;
        }));
      });
    spooky.run();
  });

  spooky.on('error', function (e, stack) {
    console.error(e);
    if (stack) {
      console.log(stack);
    }
  });

// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
/*spooky.on('console', function (line) {
    console.log(line);
});*/

  spooky.on('hello', function (greeting) {
    console.log(greeting);
  });

  spooky.on('log', function (log) {
    if (log.space === 'remote') {
      console.log(log.message.replace(/ \- .*/, ''));
    }
  });
    

}




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
  
  getLinks: function(arr,antiCaptChaApi,request,Spooky){
    if(arr != undefined && arr != null){
      arr.forEach(function(object){
        //antiCaptchaBalance(antiCaptChaApi);
        console.log(object.name);
        var captResult = antiCaptchaResolver(object.name,antiCaptChaApi);
        console.log(captResult);
        var urlG = "https://www.google.com/recaptcha/api2/userverify?k=" + String(object.name.split("&k=")[1]);
        
try{
    let taskId = antiCaptchaResolver (urlG,antiCaptChaApi).next().value;
        //setTimeout(function(){
            taskId.then(function(tId) {
                console.log(tId);
                let result = waitResolution(tId,antiCaptChaApi).next().value;
                //setTimeout(function(){
                    result.then(function(res){
                        console.log(res);
                        console.log(String(res.solution.gRecaptchaResponse));
                        urlSubmit(object.name,1,1,antiCaptChaApi,Spooky,String(res.solution.gRecaptchaResponse));
                    });
                //}, 0000); //time
            });
        //}, 0000); //time
}
catch(error){
    console.log(error);
}
        

        
      });
    }
  },
  
};
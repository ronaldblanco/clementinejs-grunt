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


function urlSubmit(url,g1,g2,request,Spooky){
    
    //url ="https://anti-captcha.com/recaptcha";
    /*var requestP = request;
    request.get(url,{},function(err, res, body){
      if(err == null){
          //console.log(body.search("Es necesario que revises los campos que están resaltados en color rojo, para poder enviar los datos"));
          //console.log(body.search("Texto del anuncio"));
          console.log(body.search("Some random form question:"));
          console.log(body.search("Prove you are a human first!"));
          //console.log(body);
          //console.log(res.headers);
          
          
          
          
          request.post(
            url,
            {
              form:{
                //txtSearch: 'something',
                name: 'insertad',
                btnSubmit: 'send_form',
                method: 'POST'
              },
              headers: res.headers,
              body: body,
            },
            function (errP, resP, bodyP){
              if(errP == null){
                //console.log(bodyP.search("Es necesario que revises los campos que están resaltados en color rojo"));
                //console.log(bodyP.search("Texto del anuncio"));
                //console.log(bodyP);
                console.log(bodyP.search("Some random form question:"));
                console.log(bodyP.search("Prove you are a human first!"));
              }
            }
          );
          
          
          
        }
    });*/
    
    
    /////////////////////////////////////////
    /*casper.start();

casper
  .then(function(){
    console.log("Casper Start:");
  })
  .thenOpen(url)
  .then(function(){
    // scrape something
    //this.echo(this.getHTML('h1#foobar'));
  })
  .thenClick("#send_form")
  .then(function(){
    // scrape something else
    this.echo(this.getHTML('h2#foobar'));
  })
  .thenClick("#button2")
  .thenOpen("http://myserver.com", {
    method: "post",
    data: {
        my: 'data',
    }
  }, function() {
      this.echo("data sent back to the server")
  });

casper.run();*/
   ///////////////////////////////////// 
   
    
    //First step is to open a URL
/*spooky.start().thenOpen(url, function() {
    console.log("URL website opened");
});
 
//Second step is to click to the Sign-in button
spooky.then(function(){
   this.evaluate(function(){
      document.getElementByName("send_form").children[0].click();
   });
});

//Wait to be redirected to the Home page, and then make a screenshot
spooky.then(function(){
    console.log("Make a screenshot and save it as AfterClick.png");
    this.capture('AfterClick.png');
});
 
spooky.run();*/
    
    
    
    var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            var e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start(url);
        spooky.then(function () {
            this.click('input[name="send_form"]');
            this.emit('hello', 'Hello, from ' + this.evaluate(function () {
                return document.title;
            }));
            //this.click('input[name="send_form"]');
            /*this.emit('hello Click', 'Hello Click, from ' + this.evaluate(function () {
                return document.title;
            }));*/
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
spooky.on('console', function (line) {
    console.log(line);
});

spooky.on('hello', function (greeting) {
    console.log(greeting);
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});
    
    
    
   /* var spooky = new Spooky({
  casper: {
    //configure casperjs here
    logLevel: 'debug',
    verbose: true
  }
}, function (err) {
  if(err == null){
  // NODE CONTEXT
  console.log('We in the Node context');
  spooky.start(url);
  spooky.then(function() {
    // CASPERJS CONTEXT
    console.log('We in the CasperJS context');
    //this.emit('consoleWe can also emit events here.');
    this.click('send_form');
    //document.getElementByName("send_form").click();
  spooky.then(function() {
    // CASPERJS CONTEXT
    var size = this.evaluate(function() {
    // PAGE CONTEXT
    console.log('....'); // DOES NOT GET PRINTED OUT
    //__utils__.echo('We in the Page context'); // Gets printed out
    this.capture('screenshot.png');
    //var $selectsize = $('select#myselectlist option').size();
      //return $selectsize;
    });
  });
  });
  
  spooky.run();
  }
});  */
    
    
    
    
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
        //console.log(object.name);
        //this.antiCaptchaResolver(object.name,antiCaptChaApi,request); //https://anti-captcha.com/recaptcha
        urlSubmit(object.name,1,1,request,Spooky);
        //urlSubmit("https://anti-captcha.com/recaptcha",1,1,request);
      });
    }
  },
  
  antiCaptchaBalance: function(antiCaptChaApi){
      if (!antiCaptChaApi.isBalanceGreaterThan(10)) {
        // You can dispatch a warning using mailer or do whatever.
        console.warn("Take care, you're running low on money !");
      }
    },
    
  antiCaptchaResolver: function(url,antiCaptChaApi,request){
    this.antiCaptchaBalance(antiCaptChaApi);
    var myUrl = url.split("?")[0];
    var key = url.split("=")[1];
    var taskId = antiCaptChaApi.createTask(
      myUrl,
      key
      //"http://www.some-site.com", // The page where the captcha is
      //"7Lfh6tkSBBBBBBGN68s8fAVds_Fl-HP0xQGNq1DK", // The data-site-key value
    );
    var response = this.waitResolution(taskId,antiCaptChaApi);
    //Final URL with captcha solution
    var finalUrl = url; //+ "&g-recaptcha-response=" + response.solution;
    var finalUrlG1 = "https://www.google.com/recaptcha/api2/reload?k=" + response.solution; //post
    var finalUrlG2 = "https://www.google.com/recaptcha/api2/userverify?k=" + response.solution; //post
    //return url + "&g-recaptcha-response=" + response.solution;
    this.urlSubmit(finalUrl,finalUrlG1,finalUrlG2,request);
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
  },
  
  
  
};
var fs = require('fs');
var compression = require('compression');

module.exports = {
    
  ensureExists: function (path, mask, cb) {
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
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    console.log(req.url+' not Compressed');
    return false;
  }
  // fallback to standard filter function 
  console.log(req.url + ' Compressed');
  return compression.filter(req, res);
},
  
  cache: function(req, res, match ,maxAge){
      if (req.url.match(match)) {
        console.log('Cache bootstrap');
        res.set('Cache-Control', 'public, max-age=' + maxAge);//seconds
        return res;
    }
  }  
  
};
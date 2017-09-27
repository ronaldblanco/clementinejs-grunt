var functions = require('./app/common/functions.server.js');

//CHECK FOLDER PUBLIC AND CREATE IT////////////////////////////////////
functions.ensureExists(__dirname + '/public', '0744', function(err) {
    if (err) console.error(err);
    else console.log('Folder Public was created or existed');
});
//////////////////////////////////////////////////
//CHECK FOLDER SERVER AND CREATE IT////////////////////////////////////
functions.ensureExists(__dirname + '/server', '0744', function(err) {
    if (err) console.error(err);
    else console.log('Folder Server was created or existed');
});
//////////////////////////////////////////////////
//CHECK FOLDER /dist/css AND CREATE IT////////////////////////////////////
functions.ensureExists(__dirname + '/dist/css', '0744', function(err) {
    if (err) console.error(err);
    else console.log('Folder /dist/css was created or existed');
});
//////////////////////////////////////////////////
//CHECK FOLDER /dist/js AND CREATE IT////////////////////////////////////
functions.ensureExists(__dirname + '/dist/js', '0744', function(err) {
    if (err) console.error(err);
    else console.log('Folder /dist/js was created or existed');
});
//////////////////////////////////////////////////
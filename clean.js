var functions = require('./app/common/functions.server.js');

//RM FOLDER PUBLIC AND CREATE IT////////////////////////////////////
functions.deleteFolder(__dirname + '/public', function(err) {
    if (err) console.error(err);
    else console.log('Folder Public was clean');
});
//////////////////////////////////////////////////
//RM FOLDER /dist/css AND CREATE IT////////////////////////////////////
functions.deleteFolder(__dirname + '/dist/css', function(err) {
    if (err) console.error(err);
    else console.log('Folder /dist/css was clean');
});
//////////////////////////////////////////////////
//RM FOLDER /dist/js AND CREATE IT////////////////////////////////////
functions.deleteFolder(__dirname + '/dist/js', function(err) {
    if (err) console.error(err);
    else console.log('Folder /dist/js was clean');
});
//////////////////////////////////////////////////
//RM FOLDER log AND CREATE IT////////////////////////////////////
functions.deleteFolder(__dirname + '/log', function(err) {
    if (err) console.error(err);
    else console.log('Folder /log was clean');
});
//////////////////////////////////////////////////
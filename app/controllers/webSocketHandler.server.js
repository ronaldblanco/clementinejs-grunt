// no require needed here, at least, I don't think so
//var io = require('socket.io');
//require(process.cwd() + '/app/controllers/publicHandler.server.js');
var config = require('../models/config.js');
var numClients = 0;
// Controller agrees to implement the function called "respond"

function sendAdd(io){
    io.emit('stats', { numClients: numClients, data: config }); 
    io.emit('broadcast', 'A new Stock was Add by a Client, please update the chart!');
}
function sendDel(io){
    io.emit('stats', { numClients: numClients, data: config }); 
    io.emit('broadcast', 'A Stock was remove by a Client, please update the chart!');
}

module.exports.respond = function(endpoint,socket){
    
    var io = endpoint;
    socket.on('event', function(data) {
        console.log('WEBSOCKETSERVER->'+config.data.datasets.length);
        console.log('A client sent us this message:', data.message);
        if(data.message == 'I did add a stock to the chart!'){
            //setTimeout(sendAdd(io), 11);
            io.emit('stats', { numClients: numClients, data: config }); 
            io.emit('broadcast', 'A new Stock was Add by a Client, please update the chart!');
        } 
        else if(data.message == 'I did remove a stock from the chart!'){
            //setTimeout(sendDel(io), 11);
            io.emit('stats', { numClients: numClients, data: config }); 
            io.emit('broadcast', 'A Stock was remove by a Client, please update the chart!');
        }
        else if(data.message == 'Send me again please!'){
            
            //io.emit('stats', { numClients: numClients, data: config }); 
            
        }
    });
	//console.log('socked.io->New Client Connected');
	//socket.emit('announcements', { message: 'A new user has joined!' });
	
	numClients++;
    io.emit('stats', { numClients: numClients, data: config });

    console.log('Connected clients:', numClients);

    socket.on('disconnect', function() {
        numClients--;
        io.emit('stats', { numClients: numClients, data: config });

        console.log('Connected clients:', numClients);
    });
   
};
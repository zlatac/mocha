// var express = require('express');
// var path = require('path')
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// app.set('port', process.env.PORT || 8000);
// server.listen(app.get('port'));

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/www/index.html');
//    });
// app.use(express.static(path.resolve(__dirname, 'www')));
//app.set('port', process.env.PORT || 8000);
// app.listen(app.get('port'), function() {
//  console.log('listening to Port', app.get('port'));
// });

var express = require('express');
var path = require('path')
var app = express();
app.use(express.static(path.resolve(__dirname, 'www')));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
 console.log('listening to Port', app.get('port'));
});

//websocket testing code
// io.on('connection', function(client) {  
//     console.log('Client connected...');

//     client.on('join', function(data) {
//         console.log(data);
//         client.emit('messages', 'Hello from server');
//     });

//     client.on('messages', function(data) {
//         //client.emit('broad', data);
//         client.broadcast.emit('broad',data);
//         console.log(data, client.id);
//     });
// });
// io.listen(3100);

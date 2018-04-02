var express = require('express');
var path = require('path')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var axios = require('axios');
app.set('port', process.env.PORT || 8000);
server.listen(app.get('port'));

app.get('/live', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/info/index.html');
});
app.use(express.static(path.resolve(__dirname, 'www')));

//stock Mocha server
// var express = require('express');
// var path = require('path')
// var app = express();
// app.use(express.static(path.resolve(__dirname, 'www')));
// app.set('port', process.env.PORT || 3000);
// app.listen(app.get('port'), function() {
//  console.log('listening to Port', app.get('port'));
// });

//websocket testing code
io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });

    client.on('messages', function(data) {
        //client.emit('broad', data);
        client.broadcast.emit('broad',data);
        console.log(data, client.id);
    });

    client.on('remoteControl', function(data) {
        console.log(data);
        client.broadcast.emit('question', data);
    });
    
    client.on('audience', function(data) {
        console.log(data);
        client.broadcast.emit('answer', data);
    });
});
// io.listen(3100);
/*
axios({
    method: 'post',
    url: 'https://us11.api.mailchimp.com/3.0/lists/bb67cef29f/members',
    // data: {
    //   name: 'MOCHAx_TEST',
    //   contact: {'company':'mochax','address1':'lagos nigeria','city':'toronto','state':'ontario','country':'naija','zip':'345678'},
    //   permission_reminder: 'you are now subscribed to mochaX',
    //   campaign_defaults: {'from_name':'mochaX','from_email':'mochax@gmail.com','subject':'mochaX is here bitch','language':'english'},
    //   email_type_option: false,
    // },
    data: {
        email_address: 'mochax@gmail.com',
        status: 'subscribed',

    },
    auth: {
        username: 'mocha',
        password: '664ccf2c51a9522fc66b747f7e70b010-us11'
    }
  })
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log('error', err);
  });
*/
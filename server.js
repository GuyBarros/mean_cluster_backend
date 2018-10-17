var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var rfi = require('./controllers/rfi');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');
var consul = require('consul')();
consul.host =  process.env.CONSUL_URL;
//consul.host =  consul.service.consul
var port = 5000;
var mongodbport = 27017;

consul.agent.members(function(err, result) {
  if (err) throw err;
// console.log("consul members : ", result );
});

consul.agent.service.list(function(err, result) {
  if (err) throw err;
console.log("consul services : ", result);
});

consul.catalog.node.services('mongodb', function(err, result) {
  if (err) throw err;
console.log("consul response : ", result);
});

var Request = require("request");

Request.get("http://"+consul.host+":8500/v1/catalog/service/mongodb", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    retorno = JSON.parse(body);
     mongodbport = retorno[0].ServicePort;
 console.log("Service Port : ", retorno[0].ServicePort)

});


//MongoDb Connection
//mongoose.connect('mongodb://localhost:27017/test');

mongoose.connect('mongodb://mongodb.service.consul:'+mongodbport+'/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected successfully to server");
});


//Middleware
app.use(bodyParser.json());
app.use(cors);


//Requests
app.get('/api/message',message.get)
app.post('/api/message',checkAuthenticated, message.post)
app.get('/api/rfi',rfi.get)
app.post('/api/rfi',checkAuthenticated, rfi.post)
app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)

//Start the Server
var server = app.listen(port, function(){
    console.log('listening on port ', server.address().port)
})

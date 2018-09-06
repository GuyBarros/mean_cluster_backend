var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var rfi = require('./controllers/rfi');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');
//const args = require('yargs').argv;
var port = 5000;

/**
try {

  port = args.port
} catch (error) {
  console.error(error);    
}
**/

//MongoDb Connection
mongoose.connect('mongodb://localhost:27017/test');
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

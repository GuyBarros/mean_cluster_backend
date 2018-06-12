var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected successfully to server");
});
var msgSchema = mongoose.Schema({
    msg: String
  });

  var Message = mongoose.model('Message', msgSchema);

app.use(bodyParser.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/api/message', function(req,res){
    console.log(req.body);
    var msg = new Message(req.body);
    msg.save();

    res.status(200);
})



var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
})

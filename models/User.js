
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String ,
    pwd: String
  });

  module.exports = mongoose.model('User', userSchema);


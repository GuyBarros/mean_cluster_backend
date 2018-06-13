
var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    msg: String
  });

  module.exports = mongoose.model('Message', msgSchema);


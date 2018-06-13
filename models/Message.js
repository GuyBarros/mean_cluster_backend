
var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    msg: String ,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
  });

  module.exports = mongoose.model('Message', msgSchema);



var mongoose = require('mongoose');

var rfiSchema = mongoose.Schema({
    question: String ,
    answer: String ,
    tags: String ,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
  });

  module.exports = mongoose.model('Rfi', rfiSchema);


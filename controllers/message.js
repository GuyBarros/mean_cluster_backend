var Message = require('../models/message');

module.exports = {
    get:function (req,res){
        Message.find({}).exec(function(er, result){
           res.send(result);
        })
    
    },
    post: function(req,res){
        console.log(req.body);
        var msg = new Message(req.body);
        msg.save();
    
        res.status(200);
    }
}

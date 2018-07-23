var Message = require('../models/Message');

module.exports = {
    get:function (req,res){
        Message.find({}).populate('user','-pwd').exec(function(er, result){
           res.send(result);
        })
    
    },
    post: function(req,res){
        console.log(req.body, req.user);
        req.body.user = req.user;
        var msg = new Message(req.body);
        msg.save();
    
        res.status(200);
    }
}

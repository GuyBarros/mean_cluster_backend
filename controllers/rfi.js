var Rfi = require('../models/Rfi');

module.exports = {
    get:function (req,res){
        Rfi.find({}).populate('user','-pwd').exec(function(er, result){
           res.send(result);
        })
    
    },
    post: function(req,res){
        req.body.rfi.user = req.user;
        var rfi = new Rfi(req.body.rfi);
        rfi.question = req.body.rfi.question
        rfi.answer = req.body.rfi.answer
        rfi.tags = req.body.rfi.tags
        rfi.user = req.body.rfi.user
        console.log("rfi: ",rfi);
        rfi.save();
    
        res.status(200);
    }
}

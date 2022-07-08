const express = require("express");
const router = express.Router();
const chat= require('./controllers/chat.controllres');


router.get('/all',function(req,res){
    chat.list(function(err,messages){
        if(err){
            res.status(404);
            res.json({
                error:"Messages not found"
            });
        }else{
            res.json(messages)
        }
    })
});

router.post('/add',function(req,res){
    chat.addMessages(req.body,function(err,message){
        if(err){
            res.status(404);
            res.json({
                error:'Messages not created'
            })
        }else{
            res.json(message)
        }
    })
});

router.put('/addResponse/:id', function (req, res) {
    chat.response([req.params.id, req.body], function (err, messages) {
        if (err) res.send(err)
        res.json(messages)
    })
});

module.exports=router
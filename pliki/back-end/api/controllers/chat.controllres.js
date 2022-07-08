const Message = require('../models/Message')


function chatMessage(cb){
    Message.find().lean().sort({ updatedAt: -1 }).limit(10).exec(function(err, messages) {
        if(err) {
            cb(err)
        } else {
            cb(null, messages)
        }
    });
};

function messageAdd(data, cb) {
    let newMessage = new Message(data);

    newMessage.save(function(err, message) {

        if(err) {
            cb(err);
        } else {
            cb(null, message);
        }

    });
};

function responseAdd(data, cb) {
    console.log( { response: data[1] });
    Message.updateOne(
        { _id: data[0] },
        { $push: { response: data[1] } },
        function (err, messages) {
            if (err) {
                cb(err)
            } else {
                cb(null, messages)
            }
        }
    )
};
module.exports={
    list:chatMessage,
    addMessages:messageAdd,
    response:responseAdd
}
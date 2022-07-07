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
}
module.exports={
    list:chatMessage,
    addMessages:messageAdd,
}
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const responseSchema = new mongoose.Schema({
    content: String,
    name: String,
    classNr: String,

}, {
    timestamps: true,
    
});
const messageSchema = new mongoose.Schema({
    title:String,
    content: String,
    name: String,
    classNr: String,
    responses: [responseSchema]
}, {
    timestamps: true,
    
});
module.exports = mongoose.model("Blog", messageSchema);
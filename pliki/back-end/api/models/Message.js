const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const Response = {
    content: String,
    name: String,
    classNr: String,
    timestamps: true,
}
const messageSchema = new mongoose.Schema({
    content: String,
    name: String,
    classNr: String
}, {
    timestamps: true,
    response: [Response]
});
module.exports = mongoose.model("Message", messageSchema);
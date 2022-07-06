const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const messageSchema = new mongoose.Schema({
    connect: String,
    name: String
}, {
    timestamps: true
});
module.exports = mongoose.model("Message", messageSchema);
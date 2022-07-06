require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http').Server(app);
const path = require('path');
const Message = require('./api/models/Message');
const io = require('socket.io')(http, {
    cors: {
        origin: " localhost:3000 ",
        methods: ["GET", "POST"]
    }
});
app.use(express.static(path.join(__dirname, '..', 'user', 'build')));
io.on('connection', (socket) => {
    Message.find().sort({ createAt: -1 }).limit(10).exec((err, messages) => {
        if (err) return console.error(err)
        socket.emit('init', messages)
    })
    socket.on('message', (msg) => {
        const message = new Message({
            content: msg.content,
            name: msg.name
        })
        message.save((err) => {
            if (err) return console.error(err);
            socket.broadcast.emit('push', msg)
        })
    })
});

const userApi = require("./api/userApi")
const config = {
    origin: 'http://' + process.env.DB_HOST
};

app.use(express.json());
app.use(cors());


app.use("/api/user", userApi)


app.get("/", cors(config), function (req, res) {
    res.status(219).json("Projekt Szkoła")
});

http.listen(process.env.PORT, function () {
    console.log(`Serwer na porcie ${process.env.PORT} działa bez zarzutów`);

});
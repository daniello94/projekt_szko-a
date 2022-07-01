require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

const userApi =require("./api/userApi")
const config ={
    origin: 'http://'+ process.env.DB_HOST
};

app.use(express.json());
app.use(cors());


app.use("/api/user",userApi)


app.get("/",cors(config),function(req,res){
    res.status(219).json("Projekt Szkoła")
});

app.listen(process.env.PORT,function(){
    console.log(`Serwer na porcie ${process.env.PORT} działa bez zarzutów`);

});
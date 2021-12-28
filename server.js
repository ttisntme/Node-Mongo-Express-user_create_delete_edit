const express = require('express')
const app = express()
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
});


mongoose.connect('mongodb://localhost:27017/assign7');

mongoose.connection.on("connected", function(){
    console.log("DB connected")
})


require("./app/routes")(app)

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

app.listen(3000)
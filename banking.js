
// Import Express Client Sessions and Body Parser

const express = require('express');
const sessions =require('client-sessions');
const bodyParser= require("body-parser");

//Create th express app.
var app=express();
app.use(sessions({
cookieName: 'session',
secret: 'random_string_goes_here',
duration: 30*60*1000,
activeDuration:5*60*1000,

}));
//Needed to use post/parse the request body
app.use(bodyParser.urlencoded({ extended: true}));
app.get('/',function(req,res){

res.sendFile(__dirname + "/index.html");



});
app.post('/login',function(req,res){

  res.send("Success!");




});
app.post('/create',function(req,res){

res.send("Success!");
}


app.listen(3000);

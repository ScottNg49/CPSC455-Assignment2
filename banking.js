
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
res.redirect('/login');

console.log(username);

});
app.post('/login',function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  console.log(username);



});
app.listen(3000);

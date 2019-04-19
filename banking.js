
// Import Express Client Sessions and Body Parser

const express = require('express');
const sessions =require('client-sessions');
const bodyParser= require("body-parser");

//Create th express app.
var app=express();
//Needed to use post/parse the request body
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/login',function(req,res)){




}
app.listen(3000);

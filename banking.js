
// Import Express Client Sessions and Body Parser

const express = require('express');
const sessions = require('client-sessions');
const bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
//Create the express app.
var app=express();
var fs=require('fs');
app.use(sessions({
cookieName: 'session',
secret: 'random_string_goes_here',
duration: 30*60*1000,
activeDuration:5*60*1000,

}));


// TEMP - stored users (Security Risk)
var authorizedUsers= [['John','Secret']]

//Needed to use post/parse the request body
app.use(bodyParser.xml());

app.get('/',function(req,res){
  if(req.session.username)
  {
    res.redirect("/dashboard");
  }
  else
  {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get('/register.html', function(req, res) {
	console.log("I got register");
	res.sendFile(__dirname + "/register.html");
});

app.post('/index', function(req, res) {

	//TODO: send user input to register to new account. Place into database
	console.log(req.body.first);
	console.log(req.body.last);
	console.log(req.body.email);
	console.log(req.body.password);
	res.sendFile(__dirname + "/index.html");
});

// Login script when the user inputs user name and password
app.post('/login',function(req,res){
	// get username and password from form


	var user = encodeHTML(req.body.account.username);
	var pass = encodeHTML(req.body.account.password);
	console.log(user);
	console.log(pass);

	var correctPass = undefined;

	// is valid user?
	for (let index = 0; index < authorizedUsers.length; index++) {
		if (authorizedUsers[index][0] == user) {
			console.log("We found a userName!");
      req.session.username=user;
			correctPass = authorizedUsers[index][1];
			break;
		}
	}

	// Check if username matches with input password
	if (correctPass && correctPass === pass) {
		// set the session

      res.redirect("/dashboard");

	} else {
		  res.send("Wrong");
	}

});
app.post('/create',function(req,res){
      console.log(req.body);
      res.send("Success!");
});
app.get('/dashboard',function(req,res){


      res.send("Success");


});
app.get('/logout', function(req, res){

    // Kill the session
    req.session.reset();

    res.redirect('/');
});

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
app.listen(3000);


// Import Express Client Sessions and Body Parser

const express = require('express');
const sessions = require('client-sessions');
const bodyParser = require("body-parser");

//Create the express app.
var app=express();
app.use(sessions({
cookieName: 'session',
secret: 'random_string_goes_here',
duration: 30*60*1000,
activeDuration:5*60*1000,

}));


// TEMP - stored users (Security Risk)
var authorizedUsers= [['John','Secret']]

//Needed to use post/parse the request body
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/',function(req,res){

    res.sendFile(__dirname + "/index.html");

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
	var userName = req.body.username;
	var password = req.body.password;
	console.log(userName);
	console.log(password);

	var correctPass = undefined;

	// is valid user?
	for (let index = 0; index < authorizedUsers.length; index++) {
		if (authorizedUsers[index][0] == userName) {
			console.log("We found a userName!");
			correctPass = authorizedUsers[index][1];
			break;
		}
	}

	// Check if username matches with input password 
	if (correctPass && correctPass === password) {
		// set the session
		req.session.username = userName;
		res.send("Success" + " " + username + " " + password);
		res.redirect('/dashboard');
	} else {
		res.send("Wrong");
	}

});
app.post('/create',function(req,res){

res.send("Success!");
});
app.get('/dashboard',function(req,res){


  res.sendfile(__dirname+"/Dashboard.html");


});

app.listen(3000);

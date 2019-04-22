const express = require('express');
const sessions = require('client-sessions');
const bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);

var app = express()
var fs=require('fs');
var os=require('os');

app.use(sessions({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30*60*1000,
    activeDuration:5*60*1000,
    }));

app.use(bodyParser.xml());

var authorizedUsers= [['John','Secret']]

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


	var user = (req.body.account.username);
	var pass = (req.body.account.password);
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
    var username = (req.body.account.username);
    var firstname = (req.body.account.fname);
    var lastname = (req.body.account.lname);
    var address= (req.body.account.address);
    var password=(req.body.account.password);
    found=false;


    for(let index = 0; index < authorizedUsers.length; index++)
{

    // A valid user?
    if(username === authorizedUsers[index][0])
    {
      found=true;
    }
  }
  if(found===false){
    var text= JSON.stringify(req.body);
    fs.open("mydb.txt",'a',function(err,id){
      fs.write(id,text+os.EOL,null,'utf8',function(){
        fs.close(id,function(){
          console.log('New User Successfully Registered');
          res.sendFile(__dirname+"/index.html");
        });
      });
    });
  }

  else{
    console.log("Username already exists");
  }

    res.redirect("/");

});

app.use('/dashboard', function(req,res) {
    // res.write(Users[0])
    var name = "Scott"
    var page = "<html>"
    page += "<title> NorthSide Dashboard</title>"
    page += "<body> <h1> Welcome back to NorthSide Banking, " + name + "</h1><br><br>"
    page += "<a href='http://localhost:3000/add_accounts'>"
    page += "<button>Add Accounts!</button> </a><br><br>"
    page += "<a href='http://localhost:3000/deposit'>"
    page += "<button>Deposit Money!</button> </a><br><br>"
    page += "<a href='http://localhost:3000/withdraw'>"
    page += "<button>Withdraw Money!</button> </a><br><br>"
    page += "<a href='http://localhost:3000/transfer'>"
    page += "<button>Transfer Money!</button> </a><br><br>"

    page += "</body></html>"

    // add accounts (button)
        // name (user_input_box)
    // withdraw money (button)
        // account_list (drop_down)
        // amount (user_input_box)
    // deposit money
        // account_list (drop_down)
        // amount (user_input_box)
    // transfer money
        // account_list_from (drop_down)
        // account_list_to (drop_down)
        // amount (user_input_box)
        
    // display accounts
    //
    res.send(page)

});

app.get('/deposit', function(req,res, ) {
    // res.send('deposit')
    var page = "<!DOCTYPE html>"
    page += "<html>"

    // xml data passing
    page += "<script>"
    page += "function loadDoc() {"
    page += "if(document.getElementById(\"deposit\").value > 10000) {"
    page += "alert('Maximum deposit $10000! Retry!'); "
    page += " } else if (document.getElementById(\"deposit\").value < 10) {"
    page += "alert('Minimum deposit $10! Retry!');"
    page += " } else {"
    page += "var message = \"<?xml version='1.0'?>\"+\"<username>\"+\"<account>\"+document.getElementById('account').value+"
    page += "\"</account>\"+\"<deposit>\"+document.getElementById(\"deposit\").value+\"</deposit>\"+\"</username>\";"
    page += "var xhttp = new XMLHttpRequest();"

    page += "xhttp.onreadystatechange= function() {"
    page += "if(xhttp.readyState == 4 && xhttp.status == 200) {"
    page += "alert('Attempting to Deposit $' + document.getElementById('deposit').value)}}; "

    page += "xhttp.open(\"POST\", \"/deposit_success\", false);"
    page += "xhttp.setRequestHeader('Content-type', 'text/xml');"
    page += "xhttp.send(message);"
    //page += "alert('Attempting to Deposit $' + document.getElementById(\"deposit\").value)"
    page += "}};"
    page += "</script>"

    page += "<body>"
    page += "<h1>Northside Banking Deposit Page</h1><br><br>"

    // start form
    page += "<form onsubmit='return loadDoc();'>"
    // page += "<form action='/deposit_success' method='POST'>"

    // drop down menu
    page += "<label for='account'>Choose an account   </label>"
    page += "<select id=account>"
    page += "<option value='Dummy_1'>Dummy_1</option>"
    page += "<option value='Dummy_2'>Dummy_2</option>"
    page += "<option value='Dummy_3'>Dummy_3</option>"
    page += "</select><br><br>"

    // deposit user input
    page += "<label for='deposit'>Deposit between $10 and $10000   </label>" 
    page += "<input type='number' id='deposit' name='deposit' value='0' min='10' max='10000' required>"
    page += "<input type='submit' value='Confirm'>"
    page += "</form>"
    
    // go to main page
    page += "<a href='http://localhost:3000/dashboard'>"
    page += "<button>Main Page</button> </a><br><br>"
    
    page += "</body></html>"

    res.send(page)

    next();
});

app.post('/deposit_success', function(req,res) {
    // do back end processing here
    console.log(req.body)
    console.log("Deposit Success")

    res.end()
});

app.get('/withdraw', function(req,res) {
    // needs to validate database for 

    var page = "<html>"

    // xml data passing
    page += "<script>"
    page += "function loadDoc() {"
    page += "if(document.getElementById(\"withdraw\").value > 10000) {"
    page += "alert('Maximum withdraw $10000! Retry!'); "
    page += " } else if (document.getElementById(\"withdraw\").value < 10) {"
    page += "alert('Minimum withdraw $10! Retry!');"
    page += " } else {"
    page += "var message = \"<?xml version='1.0'?>\"+\"<username>\"+\"<account>\"+document.getElementById('account').value+"
    page += "\"</account>\"+\"<withdraw>\"+document.getElementById(\"withdraw\").value+\"</withdraw>\"+\"</username>\";"
    page += "var xhttp = new XMLHttpRequest();"
    page += "xhttp.open(\"POST\", \"/withdraw_success\", false);"
    page += "xhttp.setRequestHeader('Content-type', 'application/xml');"
    page += "xhttp.send(message);"
    page += "alert('Attempting to wirthdraw $' + document.getElementById(\"withdraw\").value)"
    page += "}};"
    page += "</script>"

    page += "<body>"
    page += "<h1>Northside Banking Withdrawing Page</h1><br><br>"

    // start form
    page += "<form onsubmit='return loadDoc()'>"

    // drop down menu
    page += "<label for='account'>Choose an account   </label>"
    page += "<select id=account>"
    page += "<option value='Dummy_1'>Dummy_1</option>"
    page += "<option value='Dummy_2'>Dummy_2</option>"
    page += "<option value='Dummy_3'>Dummy_3</option>"
    page += '</select><br><br>'

    // withdraw user input
    page += "<label for='withdraw'>Withdraw between $10 and $10000 at a time  </label>" 
    page += "<input type='number' id='withdraw' name='withdraw' value='0' min='10' max='10000' required>"
    page += "<input type='submit' value='Confirm'>"
    page += "</form>"

    // go to main page
    page += "<a href='http://localhost:3000/dashboard'>"
    page += "<button>Main Page</button> </a><br><br>"

    page += "</body></html>"

    res.send(page)
});

app.post('/withdraw_success', function(req,res) {
    console.log(req.body)
    console.log("withdraw_success")

    res.end()

    // do back end processing here
})

app.get('/transfer', function(req,res) {
    var page = "<html>"

    // xml data passing
    page += "<script>"
    page += "function loadDoc() {"

    page += "var message = \"<?xml version='1.0'?>\"+\"<username>\"+"
    page += "\"<sender>\"+document.getElementById('sender').value+\"</sender>\"+"
    page += "\"<receiver>\"+document.getElementById(\"receiver\").value+\"</receiver>\"+"
    page += "\"<transfer>\"+document.getElementById('transfer').value+ \"</transfer>\"+"
    page += "\"</username>\";"
    page += "var xhttp = new XMLHttpRequest();"
    page += "xhttp.open(\"POST\", \"/transfer_success\", false);"
    page += "xhttp.setRequestHeader('Content-type', 'application/xml');"
    page += "xhttp.send(message);"
    page += "alert('Attempting to transfer $' + document.getElementById(\"transfer\").value + ' from ' + document.getElementById(\"sender\").value +"
    page += "' to ' + document.getElementById(\"receiver\").value)"
    page += "};"
    page += "</script>"

    page += "<body>"
    page += "<h1>Northside Banking Transfer Page</h1><br><br>"

    // form start
    page += "<form onsubmit='loadDoc()'>"
    page += "<label for='account'>Choose an account to transfer from   </label>"

    // drop down menu account 1
    page += "<select id=sender>"
    page += "<option value='Dummy_1'>Dummy_1</option>"
    page += "<option value='Dummy_2'>Dummy_2</option>"
    page += "<option value='Dummy_3'>Dummy_3</option>"
    page += '</select><br><br>'

    // drop down menu account 2
    page += "<label for='account'>Choose an account to transfer to   </label>"
    page += "<select id=receiver>"
    page += "<option value='Dummy_1'>Dummy_1</option>"
    page += "<option value='Dummy_2'>Dummy_2</option>"
    page += "<option value='Dummy_3'>Dummy_3</option>"
    page += '</select><br><br>'
    
    // transfer user input
    page += "<label for='transfer'>Transfer between $1 and $10000   </label>" 
    page += "<input type='number' id='transfer' value=0 name='transfer' min='1' max='10000' required>"
    page += "<input type='submit' value='Confirm'>"
    page += "</form>"

    // go to main page
    page += "<a href='http://localhost:3000/dashboard'>"
    page += "<button>Main Page</button> </a><br><br>"

    // closing tags
    page += "</body></html>"

    res.send(page)
});

app.post('/transfer_success', function(req,res) {
    console.log(req.body)
    console.log("transfer_success")

    res.end()
})

app.listen(3000);


// module for accessing db
// will be using txt file
// login, password, id, cookie

const fs = require('fs')
const express = require('express')
const sessions = require('client-sessions');
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.use(sessions({
    cookie_name: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    active_duration: 5 * 60 * 1000,
}));

app.get('/', function(req,res) {
    res.redirect('/loginpage')
    if (req.session.username) {
        res.redirect('/dashboard')
    } else {
        res.redirect ('/loginpage')
    }
})

app.get('/loginpage', function(req,res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/login', function(req,res) {
    // checks if user credentials are valid
    // looks into database
    // data sanitization
    
    // if (req.query.username)

    var login = req.body.username
    var password = req.body.password

    res.send(login)
    res.send(password)
    res.send('end')

    // sanitize login and password
        // do something

    // query database
    for (let index = 0; index < authorized_users.length; index++)
    {
        if(login === authorized_users[index][0])
            if(password === authorized_users[index][1]) {
                req.session.username = login
                res.redirect('/dashboard')
            } else {
                res.send("Wrong Password!")
                break;
            }
    }

    // return 

});

app.post('/register', function(req,resp) {
    // checks if entered credentials are valid or exist
});

var file = 'mydb.txt'
var authorized_users = fs.readFileSync(file,'utf-8')


app.listen(3000)
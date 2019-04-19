// database init 

console.log("123")
var mysql = require('mysql');
console.log("hello")

var con = mysql.createConnection({
    host: "localhost:3000",
    user: "yourusername",
    passsword: "yourpassword"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function(err){
        if (err) throw error;
        console.log("Database Connected");
    });
});
// module for accessing db
// will be using txt file

const fs = require('fs')
var file = 'mydb.txt'
var authorized_users = fs.readFileSync(file,'utf-8')

console.log(authorized_users)
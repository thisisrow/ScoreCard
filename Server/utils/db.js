import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "prathmesh",
    password: "password",
    database: "employeems"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error ",err)
    } else {
        console.log("Connected")
    }
})

export default con;


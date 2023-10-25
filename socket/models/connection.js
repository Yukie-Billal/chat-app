import mysql from 'mysql2'
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat-app"
})

connection.connect(err => {
  if (err) throw err
  console.log("Connection to mysql database")
})

export default connection
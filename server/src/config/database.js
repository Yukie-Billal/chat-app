import mysql from "mysql2"
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from './constant.js'

const connection = mysql.createConnection({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASS,
   database: DB_NAME,
})

connection.connect(err => {
   if (err) throw err
   console.log("Connection to mysql database")
})

export default connection
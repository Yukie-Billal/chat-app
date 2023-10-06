const mysql = require('mysql2')

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

const Users = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  registerUser: (username, password=null, name) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users VALUES (null, ?, ?, ?)', [username, password, name],(err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  getUser: (username) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE id = ?', [id], (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  setActiveUser(socketId, userId) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET socket_id= ? WHERE id = ?', [socketId, userId], (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  removeSocketId(socketId) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET socket_id=null WHERE socket_id=?', [socketId], (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  }
}

module.exports = Users
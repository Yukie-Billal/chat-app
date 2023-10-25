import connection from "./connection.js"

export default {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  registerUser: (username, password=null, email, name, socketId) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users VALUES (null, ?, ?, ?, ?, ?, null)', [username, password, email, name, socketId],(err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  getUser: (username) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE id = ?', [id], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  setActiveUser(socketId, userId) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET socket_id= ? WHERE id = ?', [socketId, userId], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  removeSocketId(socketId) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET socket_id=null WHERE socket_id=?', [socketId], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  setEmailStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE users SET email_status = ?'
      connection.query(sql, [status], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}
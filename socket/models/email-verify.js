const connection = require("./connection")

const EmailVerify = {
  getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM email-verification', (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  },
  createEmailVerify(email, OTP, ip, date) {
    return new Promise((resolve, reject) => {
      connection.query(
          'INSERT INTO email-verification VALUES (?, ?, ?, ?)',
          [email, OTP, ip, date, new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1)],
          (err, result) => {
            if (err) throw err
            resolve(result)
          })
    })
  },
  getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM email-verification WHERE email = ?', [email], (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  }
}

module.exports = EmailVerify
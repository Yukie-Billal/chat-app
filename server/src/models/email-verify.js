import connection from "../config/database.js"

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM email_verification', (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  createEmailVerify(email, OTP, ip, date) {
    return new Promise((resolve, reject) => {
      connection.query(
          'INSERT INTO email_verification VALUES (?, ?, ?, ?, ?)',
          [email, OTP, ip, date, new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1)],
          (err, result) => {
            if (err) reject(err)
            resolve(result)
          })
    })
  },
  getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM email_verification WHERE email = ?', [email], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
  deleteEmailVerify(otp) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM email_verification WHERE otp_password = ?'
      connection.query(sql, [otp], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}
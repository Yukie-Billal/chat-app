const express = require('express')
const app = express()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    port: 456,
    host: 'smtp.gmail.com',
    auth: {
        user: 'yukiembillal01@gmail.com',
        pass: 'password'
    },
    secure: true
})

app.get('/mails/send-verify', (req, res) => {
    const mailData = {
        from: 'yukiembillal@gmail.com',
        to: 'userwith.immortal@gmail.com',
        subject: 'Dont hate yourself',
        text: 'Why you hate yourself?',
        html: '<h1>Why you hate yourself?</h1>'
    }
    transporter.sendMail(mailData, (err, info) => {
        if (err) return console.log(err)
        res.send('Hello')
    })
})

app.listen(5000, '0.0.0.0', () => {
    console.log('berjalan di port 5000')
})

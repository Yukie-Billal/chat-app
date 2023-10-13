const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: 'yukiembillal01@gmail.com',
        pass: 'csct oast sxqd qtbr'
    },
    secure: true
})

app.post('/mails/send-verify', (req, res) => {
    const {to, otp} = req.body
    res.json({to, otp})
    // const mailData = {
    //     from: 'yukiembillal@gmail.com',
    //     to: to,
    //     subject: 'Dont hate yourself',
    //     text: `http://192.168.18.90:3000/mail/verify/${to}/${otp}`,
    //     html: `<a href="http://192.168.18.90:3000/mail/verify/${to}/${otp}">Verify gmail.</a>`
    // }
    // let message = ''
    // transporter.sendMail(mailData, (err, info) => {
    //     message += 'Hello'
    //     console.log(err, info, "IIIIIIINNNNN", message)
    //     if (err) {
    //         console.log(err)
    //         return false
    //     }
    // })
    // res.send(message + "World")
})

app.listen(5000, '0.0.0.0', () => {
    console.log('berjalan di port 5000')
})

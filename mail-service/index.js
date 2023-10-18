// #region initial import
import bodyParser from "body-parser";
import cors from 'cors'
import {config} from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
// #endregion


// #region app config & initial
const app = express()
config()

app.use(cors())
app.use(bodyParser.json())
const transporter = nodemailer.createTransport({
    port: parseInt(process.env.MAIL_PORT),
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    secure: true
})
// #endregion

// #region endpoint api
app.get('/test-service', (req, res) => {
    res.json({"message": "Testing service email"})
})

app.post('/mails/send-verify', (req, res) => {
    const {to, otp} = req.body
    const mailData = {
        from: process.env.MAIL_USER,
        to: to,
        subject: 'Verification Register Chat app',
        text: `http://192.168.18.90:3000/users/mail/verify/${to}/${otp}`,
        html: `<a href="http://192.168.18.90:3000/users/mail/verify/${to}/${otp}">Verify your chat app account gmail</a>`
    }
    let message = ''
    transporter.sendMail(mailData, (err, info) => {
        message += 'Hello '
        console.log(err, info, "IIIIIIINNNNN", message)
        if (err) {
            console.log(err)
            res.json({error: err})
        }
    })
    res.send(message + "World")
})

app.listen(parseInt(process.env.PORT), process.env.HOSTNAME, () => {
    console.log(`Aplikasi berjalan pada ${process.env.HOSTNAME}:${process.env.PORT}`)
})

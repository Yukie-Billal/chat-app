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
app.get('/', (req, res)=>res.json({message: "Hello world"}))
app.post('/mails/send-verify', (req, res) => {
    console.log("\n\nBerhasil menerima request kirim email\n")
    try {
        const {to, otp} = req.body
        const mailData = {
            from: process.env.MAIL_USER,
            to: to,
            subject: 'Verification Register Chat app',
            text: `http://localhost:3000/users/mail/verify/${to}/${otp}`,
            html: `<a href="http://localhost:3000/users/mail/verify/${to}/${otp}">Verify your chat app account gmail</a>`
        }
        let message = ''
        transporter.sendMail(mailData, (err, info) => {
            // console.log(err, info, "IIIIIIINNNNN", message)
            if (err) throw err
        })
        res.json({result: 'succcess'})
    } catch (e) {
        res.json({error: e.message})
    }
})

app.listen(parseInt(process.env.PORT), process.env.HOSTNAME, () => {
    console.log(`Aplikasi berjalan pada ${process.env.HOSTNAME}:${process.env.PORT}`)
})

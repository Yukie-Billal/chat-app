const express = require('express')
const router =  express.Router()
const UserModel = require('../models/user')
const EmailVerifyModel = require('../models/email-verify')
const generateOTP = require('../utils/generate-otp')
const http = require("http");
const create_log = require("../utils/create-logs");

router.get('/', async (req, res) => {
  try {
    const user = await UserModel.getAllUsers()
    res.json(user)
  } catch (e) {
    console.log(e)
    create_log(new Date() + " :" + e)
    res.status(500).json({message: e.message})
  }
})

router.post('/', async (req, res) => {
  try {
    const {email, username, password} = req.body
    const user = await UserModel.registerUser(username, password, email, username)

    // const OTP = generateOTP()
    // const emailVerify = await EmailVerifyModel.createEmailVerify(email, OTP, req.ip, new Date())

    // const debugText = `To: ${email}`
    // const mailPayload = {
    //   to: 'userwith.immortal@gmail.com',
    //   subject: 'Email verification' + debugText
    // }
    // fetch('http://192.168.18.90:5000/mails/send-verify', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({to: email, otp:OTP})})
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(err => {
    //       console.log("Err dimana fetch:", err)
    //     })
    // res.json("Waiting")
    // if (!!user.insertId || !!emailVerify.insertId) {
    if (!!user.insertId) {
      const userById = await UserModel.getUserById(user.insertId)
      res.json(userById)
    }
  } catch (e) {
    console.log(e)
    create_log(new Date() + " :" + e)
    res.status(500).json({message: e.message})
  }
})

router.post('/auth', async (req, res) => {
  try {
    const {username, password, name} = req.body
    const user = await UserModel.getUser(username)
    if (!!user.length) {
      res.json(user)
    } else {
      res.status(404).json({message: "User not found"})
    }
  } catch (e) {
    console.log(e)
    create_log(new Date() + " :" + e)
    res.status(500).json({message: e.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const user = await UserModel.deleteUser(id)
    res.json(user)
  } catch (e) {
    console.log(e)
    create_log(new Date() + " :" + e)
    res.status(500).json({message: e.message})
  }
})

router.get('/mail/verify/:email/:otp', async (req, res) => {
  try {
    const {email, otp} = req.params
    const checkEmail = await EmailVerifyModel.getByEmail(email)
    console.log(checkEmail)
    if (checkEmail.email === email && otp === checkEmail.otp_password===otp) {
      res.json({message:"Success"})
    } else {
      res.json({message:"Failed"})
    }
  } catch (e) {
    console.log(e)
    create_log(new Date() + " :" + e)
    res.status(500).json({message: e.message})
  }
})

module.exports = router
const express = require('express')
const router =  express.Router()
const UserModel = require('../models/user')
const EmailVerifyModel = require('../models/email-verify')
const generateOTP = require('../utils/generate-otp')
const http = require("http");

router.get('/', async (req, res) => {
  try {
    const user = await UserModel.getAllUsers()
    res.json(user)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.post('/', async (req, res) => {
  try {
    const {email, username, password} = req.body
    const user = await UserModel.registerUser(username, password, email, username)

    const OTP = generateOTP()
    const emailVerify = await EmailVerifyModel.createEmailVerify(email, OTP, req.ip, new Date())

    const mailPayload = {
      from: 'yukiembillal@gmail.com',
      to: 'userwith.immortal@gmail.com',
      subject: 'Email verification',
      text: 'http://192.168.100.10:3000/mail/verify/' + email,
      html: `<a href="http://192.168.100.10:3000/mail/verify/${email}">verify</a>`
    }
    http.request('http://localhost:5000/mail/verify', {method: 'POST', headers: {'Content-Type':'application/json'}}, (res) => {
      console.log(res)
    })
    if (!!user.insertId && !!emailVerify.insertId) {
      const userById = await UserModel.getUserById(user.insertId)
      res.json(userById)
    }
  } catch (e) {
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
    res.status(500).json({message: e.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const user = await UserModel.deleteUser(id)
    res.json(user)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.get('/mail/verify/:email', async (req, res) => {
  try {
    const {email} = req.params
    const checkEmail = await EmailVerifyModel.getByEmail(email)
    res.json({message:"Success"})
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

module.exports = router
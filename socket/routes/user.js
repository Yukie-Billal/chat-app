import {Router} from 'express'
import UserModel from '../models/user.js'
import EmailVerifyModel from '../models/email-verify.js'
const router = Router()


import {sendMailVerify} from "../utils/send-mail-verify.js";
import {io} from "../index.js";

router.get('/', async (req, res) => {
  try {
    const user = await UserModel.getAllUsers()
    res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: e.message})
  }
})

router.post('/', async (req, res) => {
  try {
    const {email = 'userwith.immortal@gmail.com', username, password, socketId} = req.body
    const user = await UserModel.registerUser(username, password, email, username, socketId)
    const {emailVerify} = sendMailVerify(req, email)

    if (!!user.insertId || !!emailVerify.insertId) {
      if (!!user.insertId) {
        const userById = await UserModel.getUserById(user.insertId)
        res.json(userById)
      }
    }
  } catch (e) {
    console.log(e)
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
    res.status(500).json({message: e.message})
  }
})

router.get('/mail/verify/:email/:otp', async (req, res) => {
  try {
    const {email, otp} = req.params
    const checkEmail = await EmailVerifyModel.getByEmail(email)
    if (checkEmail[0].email === email && checkEmail[0].otp_password === otp) {
      await EmailVerifyModel.deleteEmailVerify(otp)
      await UserModel.setEmailStatus('verify')
      console.log('INI EMAIL VERIFY')
      io.emit('verify-user', email)
      res.json({message: "Success"})
    } else {
      res.json({message: "Failed"})
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({message: e.message})
  }
})

export default router
const express = require('express')
const router =  express.Router()
const UserModel = require('../models/user')

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
    const {username, password, name} = req.body
    const user = await UserModel.registerUser(username, password, name)
    if (!!user.insertId) {
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

module.exports = router
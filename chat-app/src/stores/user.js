import {defineStore} from "pinia";
import {config} from "../utils/config.js";
import {socket} from "./socket.js";

const state = () => {
  return {
    users: [],
    isRegistered: false,
    waitingVerify: false,
    isVerify: false,
    user: {
      id: 0,
      username: ''
    }
  }
}

const actions = {
  async fetchAllUsers() {
    const response = await fetch(`${config.api_url}/users`)
    this.users = await response.json()
  },
  isLoggedIn() {
    if (this.user.id === 0) {
      this.isRegistered = false
      return false
    }
    return true
  },
  async doAuth(username, password, confirmPassword, email, haveAccount) {
    delete this.authError
    if (username.length < 3) throw new Error('Invalid username')
    if (!haveAccount && (password.length < 4 || confirmPassword.length < 4)) throw new Error("Invalid Password minimum char: 4")
    if (!haveAccount && password !== confirmPassword) {
      alert('Password not match: ' + `${password}:${confirmPassword}`)
      throw new Error('Password not match')
    }
    const payload = JSON.stringify({
      username: username,
      email: email,
      password: password,
      socketId: socket.id
    })
    const option = {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: payload
    }
    let url = `${config.api_url}/users`
    this.waitingVerify = true
    if (haveAccount) {
      this.waitingVerify = false
      url = `${config.api_url}/users/auth`
    }
    await this.sendAuthRequest(url, option)
  },
  verifyAccount() {
    this.waitingVerify = false
    this.isVerify = true
  },
  async sendAuthRequest(url, option) {
    const response = await fetch(url, option)
    if (response.status > 400) throw new Error('Invalid username or password')
    const data = await response.json()
    this.isRegistered = true
    this.user = data[0]
    socket.emit('join chat', this.user)
    // this.verifyAccount()
  }
}

export const useUserStore = defineStore('user', {
  state,
  actions
})
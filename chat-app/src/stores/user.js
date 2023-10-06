import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      users: [],
      isRegistered: false,
      user: {
        id: 0,
        username: ''
      }
    }
  },
  actions: {
     async fetchAllUsers() {
       const response = await fetch('http://192.168.100.10:3000/users')
       this.users = await response.json()
    }
  }
})
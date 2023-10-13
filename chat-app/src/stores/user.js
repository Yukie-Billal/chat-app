import {defineStore} from "pinia";
import {config} from "../utils/config.js";

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
       const response = await fetch(`${config.api_url}/users`)
       this.users = await response.json()
    }
  }
})
import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isRegistered: false,
      user: {
        id: 0,
        username: ''
      }
    }
  }
})
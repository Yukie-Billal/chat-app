import {defineStore} from 'pinia'
export const useChatStore= defineStore('chat', {
  state: () => {
    return {
      chats: []
    }
  },
  actions: {
    getNextId() {
      return this.chats.length - 1 + 1 > 0 ? this.chats[this.chats.length - 1].id + 1 : 1
    },
    clearChat(e) {
      e.preventDefault()
      this.chats = []
    }
  }
})
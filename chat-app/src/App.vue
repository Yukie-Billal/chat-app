<script setup>
import {useChatStore} from "./stores/chat.js";
import {useUserStore} from "./stores/user.js";
import {ref, watch} from "vue";
import Login from "./components/Auth/Login.vue";
import io from 'socket.io-client'

import {socket} from './stores/socket.js'
import ChatMessage from "./components/ChatMessage.vue";
const chatStore = useChatStore()
const userStore = useUserStore()

const message = ref('')

function sendChat(e) {
   e.preventDefault()
   try {
      checkAuth()
      if (message.value.length < 1) {
         throw new Error('message cannot be null')
      }
      const user = useUserStore()
      const chatId = chatStore.chats.length - 1 + 1 > 0 ? chatStore.chats[chatStore.chats.length - 1].id + 1 : 1

      const payload = {
         id: chatId,
         chat: message.value,
         userid: user.user.id,
         username: user.user.username
      }
      socket.emit('chat message', payload)
      message.value = ''
   } catch (e) {
      alert(e)
   }
}

function checkAuth() {
   if (userStore.user.id === 0) {
      userStore.isRegistered = false
      return false
   }
   return true
}

function clearChat(e) {
   e.preventDefault()
   chatStore.chats = []
}

socket.on('chat message', (chat) => {
   chatStore.chats.push(chat)
   const chatBox = document.querySelector('#chat-content')
   setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight - Math.ceil(window.innerHeight*(80/100))
   }, 200)
   if ((chat.userid !== userStore.user.id && chat.userid !== 0) || (!chat.chat.includes(userStore.user.username) && chat.userid === 0 )) playAudio()
})

socket.on('online user', () => [
   userStore.fetchAllUsers()
])

const playAudio = () => {
   const audioplayer = document.querySelector('#audioplayer')
   clearTimeout('*')
   audioplayer.play()
}
</script>

<template>
   <div id="chat" v-if="userStore.isRegistered">
      <ul id="chat-content">
         <li v-for="(chat, i) in chatStore.chats" :key="chat.id || i">
            <ChatMessage :chat="chat" />
         </li>
      </ul>
      <div id="input">
         <form @submit="sendChat">
            <input type="text" name="input" v-model="message">
            <button @click="">Say</button>
         </form>
         <div>
            <button @click="clearChat">Clear chat</button>
         </div>
      </div>
      <div id="user-list">
         <ul v-for="(user, i) in userStore.users" :key="user.id || i" class="user-list-wrapper">
            <li><span class="username">{{user.username}}</span> <span :class="user.socket_id ? 'online' : 'offline'"></span> </li>
         </ul>
      </div>
   </div>
   <Login v-else />
   <audio id="audioplayer" hidden>
      <source src="/mixkit-achievement-bell-600.mp3" type="audio/mp3">
   </audio>
</template>

<style scoped>
div#chat {
   width: 30vw;
   height: 100vh;
}
div#chat>ul {
   padding: 2rem;
   list-style: none;
   height: 80vh;
   max-height: 80vh;
   overflow-y: auto;
   color: white;
}

div#chat>ul>li {
   width: 100%;
   margin: 10px 0;
}

div#input {
   margin-top: 12px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 10vh;
   max-height: 10vh;
}

div#input form * {
   margin: 0 3px;
}

#user-list {
   position: absolute;
   display: inline-block;
   right: 2em;
   bottom: 2em;
   width: 360px;
   height: auto;
   max-height: 500px;
   overflow-y: auto;
}
.user-list-wrapper {
   text-align: left;
   text-transform: capitalize;
   margin: 4px 0;
}

.username {
   display: inline-block;
   min-width: 120px;
   letter-spacing: -.3px;
   font-weight: 400;
   font-size: 18px;
}

.online {
   display: inline-block;
   width: 15px;
   height: 15px;
   background-color: greenyellow;
   border-radius: 100%;
}
.offline {
   display: inline-block;
   width: 15px;
   height: 15px;
   background-color: darkgray;
   border-radius: 100%;
}
</style>
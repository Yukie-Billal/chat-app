<script setup>
import ChatMessage from "../ChatMessage.vue"
import {useChatStore} from "../../stores/chat.js"
import {useUserStore} from "../../stores/user.js"
import {socket} from "../../stores/socket.js";
import {playAudio} from "../../utils/AudioNotification.js";
const chatStore = useChatStore()
const userStore = useUserStore()

socket.on('chat message', (chat) => {
   chatStore.chats.push(chat)
   const chatBox = document.querySelector('#chat-content')
   setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight - Math.ceil(window.innerHeight*(80/100))
   }, 100)
   if ((chat.userid !== userStore.user.id && chat.userid !== 0) || (!chat.chat.includes(userStore.user.username) && chat.userid === 0 )) playAudio()
})

socket.on('online user', () => [
   userStore.fetchAllUsers()
])
</script>

<template>
   <ul id="chat-content">
      <li v-for="(chat, i) in chatStore.chats" :key="chat.id || i">
         <ChatMessage :chat="chat" :show-author="chat.userid === 0 || chat.userid === userStore.user.id || chatStore.chats[i-1]?.userid === chat.userid" />
      </li>
   </ul>
</template>

<style scoped>
div#chat>ul {
   padding: .8rem 1rem;
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
</style>
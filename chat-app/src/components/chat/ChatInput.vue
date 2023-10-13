<script setup>
import {clearChat} from "../../utils/chat/clearChat.js";
import {checkAuth} from "../../utils/checkAuth.js";
import {useUserStore} from "../../stores/user.js";
import {useChatStore} from "../../stores/chat.js";
import {socket} from "../../stores/socket.js";
import {ref} from "vue";

const chatStore = useChatStore()
const userStore = useUserStore()

const message = ref('')

function sendChat(e) {
   e.preventDefault()
   try {
      if (message.value.length < 1) throw new Error('message cannot be null')
      checkAuth(userStore)
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

</script>

<template>
   <div id="input" class="flex flex-col items-start justify-start">
      <form @submit="sendChat">
         <input type="text" name="input" v-model="message">
         <button @click="">Say</button>
      </form>
      <div class="my-3 md:my-0">
         <button @click="(e) => clearChat(e, chatStore)">Clear chat</button>
      </div>
   </div>
</template>

<style scoped>

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
</style>
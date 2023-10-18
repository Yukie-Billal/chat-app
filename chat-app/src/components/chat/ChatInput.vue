<script setup>
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
      userStore.isLoggedIn()
      const user = useUserStore()
      const chatId = chatStore.getNextId()

      socket.emit('chat message', {
         id: chatId,
         chat: message.value,
         userid: user.user.id,
         username: user.user.username
      })
      message.value = ''
   } catch (e) {
      alert(e.message)
      console.log(e)
      console.log(typeof e)
   }
}

</script>

<template>
   <div id="input" class="flex flex-col items-start justify-start">
      <form @submit="sendChat" class="flex justify-center">
         <input type="text" name="input" v-model="message">
         <button class="w-auto" @click="">Say</button>
      </form>
      <div class="my-3 w-full flex-center-start">
         <button class="w-auto" @click="(e) => chatStore.clearChat(e)">Clear chat</button>
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
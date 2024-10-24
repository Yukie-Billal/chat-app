<script setup>
import Login from "./components/Auth/Login.vue"
import UserList from "./components/UserList/UserList.vue"
import AudioNotification from "./components/AudioNotification.vue"
import ChatInput from "./components/chat/ChatInput.vue"
import ChatContent from "./components/chat/ChatContent.vue"

import {useUserStore} from "./stores/user.js"
const userStore = useUserStore()

console.log(userStore.isRegistered);
console.log(userStore.isVerify);
</script>

<template>
   <div id="chat" v-if="userStore.isRegistered" class="w-full md:w-[30vw] h-full">
      <ChatContent />
      <ChatInput />
      <user-list />
   </div>
   <Login v-else />
   <AudioNotification />
</template>
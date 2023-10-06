<script setup>
import {ref} from "vue";
import {useUserStore} from "../stores/user.js";
import {socket} from "../stores/socket.js";
import {extractWords} from "../utils/string-escape.js";

const userStore = useUserStore()

const username = ref('')

const haveAccount = ref(true)
const buttonText = ref('Login')
const linkText = ref('Registered')

const reverseSubmit = () => {
   if (haveAccount.value) {
      buttonText.value = 'Registered'
      linkText.value = 'Login'
   } else {
      buttonText.value = 'Login'
      linkText.value = 'Registered'
   }
   haveAccount.value = !haveAccount.value
}

async function handleSubmit (e) {
   e.preventDefault()
   try {
      username.value = extractWords(username.value)
      if (username.value.length < 3) {
         alert("Mas bro mencoba jail")
         throw new Error('Please use name')
      }
      const option = {
         method: 'POST',
         headers: {"Content-Type": 'application/json'},
         body: JSON.stringify({username: username.value})
      }
      let response
      if (haveAccount.value) {
         response = await fetch('http://192.168.100.10:3000/users/auth', option)
      } else {
         response = await fetch('http://192.168.100.10:3000/users', option)
      }
      if (response.status > 400) throw new Error('Invalid username or password')
      const data = await response.json()
      userStore.isRegistered = true
      userStore.user = data[0]
      socket.emit('join chat', userStore.user)
   } catch (e) {
      console.log(e)
      console.error(e)
      console.error(typeof e)
      userStore.authError = e.message
   }
}

</script>

<template>
    <div id="auth-wrapper">
       <form @submit="handleSubmit">
          <input type="text" v-model="username" placeholder="Your username">
          <button>{{buttonText}}</button>
       </form>
       <a style="cursor:pointer;" @click="reverseSubmit">{{linkText}}</a>
    </div>
</template>

<style scoped>
#auth-wrapper {
   height: 100vh;
   max-height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
button {
   margin: 0 6px;
}
a {
   display: inline-block;
   padding-top: 16px;
}
</style>
<script setup>
import {ref} from "vue";
import {useUserStore} from "../../stores/user.js";
import {socket} from "../../stores/socket.js";
import {extractWords} from "../../utils/string-escape.js";
import LoginInput from "./LoginInput.vue";
import {config} from "../../utils/config.js";

const userStore = useUserStore()

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
      const payload = JSON.stringify({
         username: username.value,
         email: email.value,
         password: password.value
      })
      const option = {
         method: 'POST',
         headers: {"Content-Type": 'application/json'},
         body: payload
      }
      let response
      if (haveAccount.value) {
         response = await fetch(`${config.api_url}/users/auth`, option)
      } else {
         if (password.value !== confirmPassword.value) {
            alert('Password not match: ' + `${password.value}:${confirmPassword.value}`)
            throw new Error('Invalid password')
         }
         response = await fetch(`${config.api_url}/users`, option)
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


const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>

<template>
    <div id="auth-wrapper">
       <form @submit="handleSubmit">
          <LoginInput name="email" label="Your email" placeholder="example@gmail.com" error-message="Invalid email" @input="v => email=v" />
          <LoginInput name="username" label="Your username" placeholder="example" error-message="Invalid username" @input="v => username=v" />
          <LoginInput type="password" name="password" label="Your password" placeholder="Password" error-message="Invalid password" @input="v => password=v" />
          <LoginInput type="password" v-if="!haveAccount" name="confirm-password" label="Confirm Password" placeholder="Confirm password" error-message="Invalid password" @input="v => confirmPassword=v" />
          <button>{{buttonText}}</button>
       </form>
       <a style="cursor:pointer;" @click="reverseSubmit">{{linkText}}</a>
    </div>
</template>

<style scoped>
#auth-wrapper {
   height: 100vh;
   max-height: 100vh;
   min-width: 40vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 0 32px;
}
button {
   width: 100%;
}
form {
   width: 100%;
}
a {
   display: inline-block;
   padding-top: 16px;
}
</style>
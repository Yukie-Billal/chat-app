<script setup>
import './login.css'
import {ref} from "vue";
import {extractWords} from "../../utils/string-escape.js"
import LoginInput from "./LoginInput.vue"
import {useUserStore} from "../../stores/user.js"
import {socket} from "../../stores/socket.js";
const userStore = useUserStore()

const haveAccount = ref(true)
const buttonText = ref('Sign In')
const linkText = ref('Create Account')

const reverseSubmit = () => {
   buttonText.value = 'Sign In'
   linkText.value = 'Create account'
   if (haveAccount.value) {
      buttonText.value = 'Create Account'
      linkText.value = 'Sign In'
   }
   haveAccount.value = !haveAccount.value
}

async function handleSubmit (e) {
   e.preventDefault()
   try {
      if (email.value.length < 5) throw new Error("Invalid email")
      await userStore.doAuth(extractWords(username.value), password.value, confirmPassword.value, email.value, haveAccount.value)
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

socket.on('verify-user', email => {
   if (email === userStore.user.email) userStore.verifyAccount()
})
</script>

<template>
    <div id="auth-wrapper" v-if="userStore.waitingVerify === false">
       <div v-if="'authError' in userStore" class="p-4 w-full bg-red-500 rounded">
         {{userStore.authError}}
       </div>
       <form @submit="handleSubmit">
          <LoginInput name="email" label="Your email" placeholder="example@gmail.com" error-message="Invalid email" @input="v => email=v" />
          <LoginInput name="username" label="Your username" placeholder="example" error-message="Invalid username" @input="v => username=v" />
          <LoginInput type="password" name="password" label="Your password" placeholder="Password" error-message="Invalid password" @input="v => password=v" />
          <LoginInput type="password" v-if="!haveAccount" name="confirm-password" label="Confirm Password" placeholder="Confirm password" error-message="Invalid password" @input="v => confirmPassword=v" />
          <button>{{buttonText}}</button>
       </form>
       <a style="cursor:pointer;" @click="reverseSubmit">{{linkText}}</a>
    </div>
   <div v-if="userStore.waitingVerify & userStore.isVerify === false" class="h-full w-full flex justify-center items-center">
      <h1>Waiting verify</h1>
   </div>
</template>

<style scoped>
#auth-wrapper {
   height: 100vh;
   max-height: 100vh;
   min-width: 40vh;
   padding: 0 32px;
}
a {
   display: inline-block;
   padding-top: 16px;
}
</style>
<script setup>
import {useUserStore} from "../stores/user.js";

const userStore = useUserStore()

defineProps(['chat', 'showAuthor'])
</script>

<template>
   <div id="chat-wrap"
     :class="{
      'right': chat.userid===userStore.user.id,
      'left': chat.userid!==userStore.user.id && chat.userid!==0,
      'center capital': chat.userid===0
   }">
      <p class="author" :class="showAuthor ? 'hidden' :''">{{ chat.username }}</p>
      <span>{{ chat.chat }}</span>
   </div>
</template>

<style scoped>
.hidden {
   display: none;
}
.left {
   text-align: left;
}

.right {
   text-align: right;
}

.center {
   text-align: center;
}
.author {
   font-size: 14px;
   padding: 2px 0 0 6px;
}
.capital {
   text-transform: capitalize;
}
#chat-wrap {
   max-width: 100%;
   word-wrap: break-word;
}

#chat-wrap>span {
   text-align: left;
   display: inline-block;
   max-width: 100%;
   background-color: #1a1a1a;
   padding: .6em .8em;
   border-radius: 6px;
}
</style>
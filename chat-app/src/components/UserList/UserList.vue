<script setup>
import {useUserStore} from "../../stores/user.js";
import UserListItem from "./UserListItem.vue";

const userStore = useUserStore()
</script>

<template>
   <div id="user-list" class="hidden lg:inline-block">
      <ul v-for="(user, i) in userStore.users" :key="user.id || i" class="user-list-wrapper">
         <UserListItem :user="user" />
      </ul>
   </div>
</template>

<style scoped>

#user-list {
   position: absolute;
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
</style>
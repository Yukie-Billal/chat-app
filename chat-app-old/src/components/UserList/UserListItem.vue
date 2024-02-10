<script setup>
defineProps(['user'])
</script>

<template>
   <li>
      <span class="username">{{user.username}}</span>
      <span :class="user.socket_id ? 'online' : 'offline'" />
   </li>
</template>
<style scoped>
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

.username {
   display: inline-block;
   min-width: 120px;
   letter-spacing: -.3px;
   font-weight: 400;
   font-size: 18px;
}
</style>
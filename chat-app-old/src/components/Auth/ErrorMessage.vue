<script setup>
defineProps(['message'])
</script>

<template>
   <small>{{message}}</small>
</template>

<style scoped>
small {
   color: #e81b1b;
   font-size: 14px;
   margin-top: -1px;
   letter-spacing: -0.1px;
}
</style>
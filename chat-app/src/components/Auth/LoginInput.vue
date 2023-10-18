<script setup>
import {ref, watch} from "vue";
import ErrorMessageComponent from "./ErrorMessage.vue";

const internalValue = ref('')
const emit = defineEmits(['input'])
defineProps(['errorMessage', 'name', 'placeholder', 'label', 'value', 'type'])
const errorStatus = ref(false)

watch(internalValue, (value) => {
   emit('input', value)
   errorStatus.value = value.length <= 0;
})
</script>

<template>
   <div class="input-wrapper">
      <label :for="`inp-`+name">{{ label }}</label>
      <input :type="type ? type : 'text' " :id="`inp-`+name" :name="name" :placeholder="placeholder" v-model="internalValue" />
      <error-message-component v-if="errorStatus" :message="errorMessage"/>
   </div>
</template>

<style scoped>
input {
   width: 100%;
}
</style>
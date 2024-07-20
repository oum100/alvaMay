<template>
    <div q-gutter-md>
      <q-btn @click="showDialog = true" label="Show Dialog" />
      <MyDialog
        v-model:modelValue="showDialog"
        title="MyDialog"
        message="Hello MyDialog"
        @confirm="handleConfirm"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import MyDialog from '~/components/MyDialog.vue';
  
  const showDialog = ref(false);
  
  const handleConfirm = () => {
    console.log('Dialog confirmed!');
  };
  </script>
  
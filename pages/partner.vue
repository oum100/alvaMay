<template>
  <NuxtPage/>
</template>
<script setup lang="ts">
  definePageMeta({
      layout:'partner',
      middleware:['auth']
  })
</script>
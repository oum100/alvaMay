<template>
    <h3>Backend Asset</h3>
</template>
<script setup  lang="ts">
    definePageMeta({
        layout:'partner',
        middleware: "auth",
        // auth:{
        //     unauthenticationOnly:false,
        //     navigateAuthenticatedTo: '/kiosk'
        // }
    })
</script>
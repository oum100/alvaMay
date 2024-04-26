<template>
    <h5>Forget Password</h5>
</template>

<script setup lang="ts">
    definePageMeta({
        // middleware: "auth",
        auth:{
            unauthenticationOnly:true,
            navigateAuthenticatedTo: '/forget_password'
        }
    }); 
</script>
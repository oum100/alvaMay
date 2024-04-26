<template>
    <h3>User Management</h3>
</template>

<script setup lang="ts">
    const {data} = useAuth()
    definePageMeta({
        middleware: "auth"
        // auth:{  //use to exception some page
        //     unauthenticationOnly:true,
        //     navigateAuthenticatedTo: '/backend'
        // }
    });
</script>
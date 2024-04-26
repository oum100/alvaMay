<template>
    <h3>Shop Dashboard</h3>
    {{ data }}
</template>

<script setup  lang="ts">
    const {data} = useAuth()
    definePageMeta({
        layout:'shop',
        // middleware: "auth",
        // auth:{
        //     unauthenticationOnly:false,
        //     navigateAuthenticatedTo: '/kiosk'
        // }
    })
</script>
<script setup lang="ts">
    import liff from '@line/liff'
    definePageMeta({
        // middleware: "auth",
        auth:{
            unauthenticationOnly:false,
            navigateAuthenticatedTo: '/kiosk'
        }
    });  

    const aa = ref('')
    console.log(useRuntimeConfig().GITHUB_CLIENT_SECRET)
    // const lineProfile = await liff.getProfile()
    // console.log(lineProfile)
</script>
<template>
    <h2>Hello Liff</h2>
    <!-- <h4>Hello Liff: {{ lineProfile.displayName }}</h4>
    <h4>UID:{{ lineProfile.userId }}</h4> -->
    <!-- <div>{{  lineProfile.pictureUrl }}</div> -->
 
    <img id="limeImage" width="100px" src="https://picsum.photos/id/237/200/300">

    
</template>


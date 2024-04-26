<script setup lang = "ts">
    import Github from 'next-auth/providers/github';

    const {status, data, signIn, signOut} = useAuth()
    const loggedIn = computed(() => status.value === 'authenticated')

    definePageMeta({
        // middleware: "auth",
        auth:{
            unauthenticationOnly:true,
            navigateAuthenticatedTo: '/backend'
        }
    });   

    // const {data} = await useFetch('/api/me')

    async function handleSignIn(){
        await signIn(undefined, { callbackUrl: '/backend' })
    }

    async function handleSignOut(){
        await signOut()
    }

    
</script>


<template>
  
    <div class="text-h4 q-pa-md">
        <div class="row justify-center">
            <h3>Welcome to Alvato-Auth</h3>
        </div>
        <div class="text-center">
            <img src="/images/alvato/underConstruction.jpeg"/>
        </div>
    </div>
    <!-- <div>{{ data }}</div> -->

    <!-- <div class="row justify-center q-mx-md">
        <button v-if="loggedIn" @click="handleSignOut">Sign Out</button>
        <button v-else @click="handleSignIn">Sign In</button>
    </div> -->
    
</template>
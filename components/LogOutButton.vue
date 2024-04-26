<script setup lang="ts">
    const {signOut} = useAuth()
</script>
<template>
    <q-btn flat dense icon="logout" class = "q-mx-md" @click="signOut({ callbackUrl: '/' })">
        &nbsp Sign Out
        <q-tooltip>Sign Out</q-tooltip>
    </q-btn>
</template>
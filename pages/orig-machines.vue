<template>
    <h3>Machines</h3>
</template>
<script setup  lang="ts">
    const {data} = useAuth()
    definePageMeta({
        middleware: "auth"
    });
</script>
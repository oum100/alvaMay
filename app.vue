<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import { useAuth, useRoute, useFetch, useRequestHeaders } from '#imports'

  const { data, status, lastRefreshedAt, getCsrfToken, getProviders, signIn, signOut, getSession } = useAuth()

  const providers = await getProviders()
  const csrfToken = await getCsrfToken()

  const headers = useRequestHeaders(['cookie']) as HeadersInit
  const { data: token } = await useFetch('/api/token', { headers })

  const route = useRoute()
</script>

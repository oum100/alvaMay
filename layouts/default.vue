<script setup lang="ts">
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'

</script>
<template>
    <q-layout view="hHh lpR fFf" container style="height: 1000px" >
        <Header />
            <q-page-container>
                <q-page>
                    <slot />
                </q-page>
            </q-page-container>
        <Footer/>
    </q-layout>
</template>
<template>
    <div class="row justify-center">
        
        <q-layout
        view="lhh LpR lff"
        container
        style="height: 500px; width:1000px"
        class="shadow-2 rounded-borders"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        >
            <q-header reveal :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
                <q-toolbar>
                    <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
                    <q-toolbar-title>Header</q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-page-container>
            <q-page style="padding-top: 60px" class="q-pa-md">
                <p v-for="n in 15" :key="n">
                    interface User {
                        email: string,
                        name: string,
                        password:string,
                        organization:string,
                        role: string,
                        permission:string,
                        partnerCode:string,
                        shop:[{
                            shopCode:string,
                            shopName:string
                        }]
                    }
                </p>

                <q-page-sticky position="top-left" :offset="[18, 68]">
                    <q-btn round color="red" icon="arrow_back" class="rotate-45" />
                </q-page-sticky>
                <q-page-sticky position="top-right" :offset="[18, 68]">
                    <q-btn round color="primary" icon="arrow_upward" class="rotate-45" />
                </q-page-sticky>
                <q-page-sticky position="bottom-left" :offset="[18, 18]">
                    <q-btn round color="primary" icon="arrow_forward" class="rotate-135" />
                </q-page-sticky>
                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn round color="primary" icon="arrow_forward" class="rotate-45" />
                </q-page-sticky>

                <!-- <q-page-sticky position="top" expand class="bg-primary text-white">
                    <q-toolbar>
                    <q-btn flat round dense icon="map" />
                    <q-toolbar-title>Title</q-toolbar-title>
                    </q-toolbar>
                </q-page-sticky> -->
            </q-page>

            <q-page-scroller position="bottom">
                <q-btn fab icon="keyboard_arrow_up" color="red" />
            </q-page-scroller>
        </q-page-container>
        </q-layout>

          
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'
  
    const drawerLeft = ref(false)
    const drawerRight = ref(true)
    
  </script>
  
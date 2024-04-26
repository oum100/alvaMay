
<template>
    <q-drawer
            v-model="drawerLeft"
            :width="200"
            :breakpoint="700"
            show-if-above
            :mini="miniState"
            @mouseover="miniState = false"
            @mouseout="miniState = true"
            class="bg-primary"
            >
                <q-scroll-area class="fit" >
                    <q-list padding class="menu-list" >
                        <template v-for="item,i in menus" :key="i" >
    
                            <div v-if="item.children?.length">
                                <q-expansion-item :label="item.title" :icon="item.icon" 
                                header-class="text-white" 
                                expand-icon-class="text-white"
                                >
                                    <div v-for="subitem,i in item.children" :key="i">
                                        <q-item clickable v-ripple :to="subitem.to" :inset-level="0.2">
                                            <q-item-section avatar><q-icon color="white" :name="subitem.icon" /></q-item-section>
                                            <q-item-section class="text-white" >{{subitem.title }}</q-item-section>
                                        </q-item>
                                    </div>
                                </q-expansion-item>
                            </div>
    
                            <q-item v-else clickable v-ripple  :to="item.to" >
                                <q-item-section avatar><q-icon color="white"  :name="item.icon" /></q-item-section>
                                <q-item-section class="text-white" >{{item.title }}</q-item-section>
                            </q-item>
                            <q-separator color="blue-4" inset :key="'sepa'+i" v-if="item.separator"/>     
    
                        </template>
                    </q-list>
                </q-scroll-area>  
    </q-drawer>
</template>

<script setup lang="ts">
    import menuItems from './partnerMenu'
    const drawerLeft = ref(true)
    const miniState = ref(false)
    const menus = ref(menuItems)
</script>

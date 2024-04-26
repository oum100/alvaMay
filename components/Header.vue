<template>
      <q-header class="bg-primary text-white">
        <q-toolbar>
            <q-toolbar-title>
              <q-btn flat to="/">
                <q-img
                alt="Washpoint_logo"
                src="/images/washpoint/washpoint1.png"
                style="width: 200px; height: 40px"
                class = "q-mr-md"
                to="/"
                />
              </q-btn>
              
            </q-toolbar-title>
            <div text-caption>v1.0.0</div>
            
            <div v-for="menu, i in menus" :key="i">
              <q-btn flat :label="menu.title" :icon="menu.icon" :to="menu.to"></q-btn>
            </div>
            <!-- <q-btn flat label="Kiosk" to="/kiosk"></q-btn>
            <q-btn flat label="Products" to="/product"></q-btn>
            <q-btn flat label="Dashboard" to="/backend"></q-btn> -->
          
          
            <q-space/>

            <!-- <LogOutButton v-if="loggedIn"/>
            <span v-else>
              <LoginButton/>
              <RegisterButton/>
            </span> -->


            <Profile v-if="loggedIn"/>
            <span v-else>
              <LoginButton/>
              <RegisterButton/>
            </span>
        </q-toolbar>
      </q-header>
  

      <div v-if="loggedIn">
        <SideMenu v-if="data?.user?.organization == 'PLATFORM'"/>
        <PartnerSideMenu v-if="data?.user?.organization == 'PARTNER'"/>
        <ShopSideMenu v-if="data?.user?.organization == 'SHOP'"/>
      </div>
      

</template>
  
<script setup lang="ts">
  import headerMenus from './headerMenu'

  const {status,data} = useAuth()
  const loggedIn = computed(() => status.value === 'authenticated')

  const menus = ref(headerMenus)

      

</script>
<template>
    <!-- <div class="q-pa-md q-gutter-md row justify-center">
        <q-card class="my-card bg-grey-5 text-white">
        <q-card-section>
            <div class="text-h6">ESP32 registration to platform example code.</div>
        </q-card-section>

        <q-card-section>
            <pre><code>{{ editor }}</code></pre>
            
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
        </q-card-actions>
        </q-card>
    </div> -->
    <div class="q-pa-md row justify-center">
    <q-layout view="lHh lpr lFf" container style="height: 500px; width:1000px" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-grey-9 ">
        <q-toolbar>
          <!-- <q-avatar >
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->

          <q-toolbar-title>
            Registration example code for ESP32.
          </q-toolbar-title>

          <q-btn flat round dense icon="content_copy">
            <q-tooltip>Copy raw code</q-tooltip>
          </q-btn>
        </q-toolbar>
      </q-header>

    <q-page-container class="bg-grey-8 text-white">
        <q-page>
            <!-- <q-page-sticky position="top-left" :offset="[900, 18]">
                <q-btn round color="accent" icon="content_copy" class="rotate-45">
                    <q-tooltip>Copy raw code</q-tooltip>
                </q-btn>
            </q-page-sticky> -->
            <pre><code>{{ editor }}</code></pre>
        </q-page>
      </q-page-container>
    
      
    </q-layout>

  </div>    
</template>
  
<script setup lang="ts">

    const editor = ref(`
        <template>
            <div>
            <div class="float-sm-left">
                Float left on viewports sized SM (small) or wider
            </div>
            <br>
            <div class="float-md-end">
                Float left on viewports sized MD (medium) or wider
            </div>
            <br>
            <div class="float-lg-left">
                Float left on viewports sized LG (large) or wider
            </div>
            <br>
            <div class="float-xl-left">
                Float left on viewports sized XL (extra-large) or wider
            </div>
            <br>
            </div>

            <div class="text-center text-xs-h5 text-md-h3 font-weight-black">
                Hello alvato
            </div>

            <div>
                <VBtn color="blue-darken-1" rounded="pill">
                    Hello
                </VBtn>
            </div>
        </template>
    `)

    async function  copyCode() {
        
    }
</script>
  

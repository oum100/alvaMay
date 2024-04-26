<template>
  <div class="row flex-center" style="height:200px">
    <div class="col-3 q-px-lg" >
      <q-card  class="text-white" style=" background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <div class="row">
              <div class="col-8" >
                <div class="col-4 text-h5 ">Member</div>
                <div class="col-4 "><q-icon name="groups" size="35px"/></div>
              </div>
              <div class="col col-4 self-center" >
                <div class="text-h5 text-center">88</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
    </div>
    <div class="col-3 q-px-lg" >
      <q-card class="text-white" style=" background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <div class="row">
              <div class="col-7" >
                <div class="col-4 text-h5 ">Shop</div>
                <div class="col-4 "><q-icon name="storefront" size="35px"/></div>
              </div>
              <div class="col col-5 self-center" >
                <div class="text-h5 text-center">88,888</div>
              </div>
            </div>
          </q-card-section>
      </q-card>
     
    </div>
    <div class="col-3 q-px-lg">
      <q-card class="text-white" style=" background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <div class="row">
              <div class="col-6" >
                <div class="col-4 text-h5 ">Transactions</div>
                <div class="col-4 "><q-icon name="toc" size="35px"/></div>
              </div>
              <div class="col col-6 self-center" >
                <div class="text-h5 text-center">888,888</div>
              </div>
            </div>
          </q-card-section>
      </q-card> 
    </div>
    <div class="col-3 q-px-lg">
      <q-card class="text-white" style=" background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <div class="row">
              <div class="col-6" >
                <div class="col-4 text-h5 ">Assets</div>
                <div class="col-4 "><q-icon name="local_laundry_service" size="35px"/></div>
              </div>
              <div class="col col-6 self-center" >
                <div class="text-h5 text-center">888,888</div>
              </div>
            </div>
          </q-card-section>
      </q-card>
    </div>
  </div>
  
  {{ data?.user }}

  <div v-if = "data?.user?.organization == 'PLATFORM'">
    <h6>Organization: PLATFORM</h6>
  </div>

  <div v-if = "data?.user?.organization == 'PARTNER'">
    <h6>Organization: PARTNER</h6>
  </div>

  <div v-if = "data?.user?.organization == 'SHOP'">
    <h6>Organization: PARTNER</h6>
  </div>

  <div class="row flex-center">

  </div>
</template>

<script setup lang="ts">
    const {data} = useAuth()
    definePageMeta({
        middleware: "auth"
    });
</script>

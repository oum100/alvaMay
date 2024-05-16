/* --------------- file: /pages/dashboard.vue --------------- */
<template>
  <div class="row flex-center" style="height:200px">
    <div class="col-3 q-px-lg" >
      <q-card  class="text-white" style=" background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <div class="row">
              <div class="col-8" >
                <div class="col-4 text-h5 ">Partners</div>
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
                <div class="col-4 text-h5 ">Shops</div>
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
  


  <div class="row flex-center">
    <div class="q-mx-lg">
      <!-- {{ data?.user }} -->
    <div v-if = "data?.user?.organization  == 'PLATFORM'">
      <h6>Organization: PLATFORM</h6>
    </div>

    <div v-if = "data?.user?.organization == 'PARTNER'">
      <h6>Organization: PARTNER</h6>
    </div>

    <div v-if = "data?.user?.organization == 'SHOP'">
      <h6>Organization: PARTNER</h6>
    </div>

    <div class="text-h6">
      {{ data?.user }}
    </div>

    <ClientOnly>
      <apexchart
      width="1200"
      height="400"
      type="line"
      :options="chartOptions"
      :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
  </div>
</template>

<script setup lang="ts">
    const {data} = useAuth()

    //For Test apexcharts 
    const chartOptions =  ref({
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      })
    const series = ref( [
        {
          name: "Washer",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 10, 30, 25, 45, 54, 60, 77, 98],
        },
        {
          name: "Dryer",
          data: [10, 30, 25, 45, 54, 60, 77, 98, 49, 60, 70, 91, 10, 30, 54, 60],
        },
        {
          name: "QR",
          data: [16, 20, 10, 35, 40, 34, 52, 83, 10, 30, 25, 45, 54, 60, 77, 98],
        },
        {
          name: "Coin",
          data: [5, 20, 10, 35, 40, 34, 52, 83, 35, 40, 98, 49, 60, 70, 91, 60],
        },
      ])
    //For Test apexcharts 


    definePageMeta({
        middleware: "auth"
    });
</script>

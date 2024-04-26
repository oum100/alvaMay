<script setup lang="ts">
    definePageMeta({
        // middleware: "auth",
        auth:{
            unauthenticationOnly:false,
            navigateAuthenticatedTo: '/topup'
        }
    });   

    const topupPrice = ref([
        {price:20,enable:true},
        {price:40,enable:true},
        {price:50,enable:true},
        {price:60,enable:true},
        {price:80,enable:true},
        {price:100,enable:true}
    ])

</script>

<template>
    <div class="row justify-start q-pa-md q-gutter-md">
        <q-card dark bordered style="width:800px; height:650px" class="bg-grey-6" disabled>
            <q-card-section class="row justify-center q-my-md">
                <div class="text-h2"><b>เลือกจำนวนที่ต้องการเติม</b></div> 
            </q-card-section>
            <q-card-section>
                <div class="row justify-center q-gutter-md">
                    <q-btn v-for="topupBtn,i in topupPrice" :key="i" round color="primary" class="q-mx-md" 
                    :label="topupBtn.price" size="55px"/>
                    <!-- <q-btn round color="primary" class="q-mx-md" label="40" size="55px"/>
                    <q-btn round color="primary" class="q-mx-md" label="50" size="55px"/> -->
                </div>
                <div class="row justify-center q-gutter-md q-my-md">
                    <q-btn color="green-9" rounded  dense label="ระบุจำนวน" size="40px" style="width:600px"/>
                </div>
            </q-card-section>

        </q-card>
    </div>
    
</template>
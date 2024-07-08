<script setup lang="ts">
    definePageMeta({
        layout:'kiosk',
        // middleware: "auth",
        auth:{
            unauthenticationOnly:true,
            navigateAuthenticatedTo: '/kiosk'
        }
    })

    // Test props
    // const props = defineProps({
    //     machines:{
    //         type: Array,
    //         required: true
    //     }
    // })


    function selectPrice(){

    }

    let toggleList = ref([])
    function makeToggleList(machine:any){
        function newProduct(product:any,index:number){
            let newPro = null
            if(index == 0){
                newPro = {
                index:index,
                label:product.product,
                value:String(product.price),
                tooltip: 'Price: ' + String(product.price) + ' Time: ' + product.product,
                slot:product.product,
                icon:'browse_gallery'
            }
            }else{
                newPro = {
                index:index,
                label:product.product,
                value:String(product.price),
                tooltip: 'Price: ' + String(product.price) + ' Time: ' + product.product,
                slot:product.product
            }
            }

            // console.log('new: ',xxx)
            return newPro
        }
        const newProductArray = machine.products.map(newProduct)
        // console.log("newArray: ",newProductArray)
        console.log("machineStatus: ",machine.status)
        
        return newProductArray
    }
    
    
    const machines = ref([
        {
            name:'DM-001',
            type:'dryer',
            status:"ready",
            disableMachine:false,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30},
                {product: '75M', price:50, stime:40 },
                {product: '90M', price:60, stime:50 },
            ]
        },
        {
            name:'WM-002',
            type:'washer',
            status:"ready",
            disableMachine:true,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-003',
            type:'dryer',
            status:"busy",
            disableMachine:false,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-004',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-005',
            type:'dryer',
            status:"booked",
            disableMachine:false,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-006',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-007',
            type:'dryer',
            status:"offline",
            disableMachine:true,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-008',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-009',
            type:'dryer',
            status:"offline",    
            disableMachine:true,        
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-010',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-011',
            type:'dryer',
            status:"offline",
            disableMachine:true,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-012',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-013',
            type:'dryer',
            status:"offline",
            disableMachine:true,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-014',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
        {
            name:'DM-015',
            type:'dryer',
            status:"offline",
            disableMachine:true,
            selectPrice:'40',
            products:[
                {product: '60M', price:40, stime:30 },
                {product: '75M', price:50, stime:40},
                {product: '90M', price:60, stime:50}
            ]
        },
        {
            name:'WM-016',
            type:'washer',
            status:"ready",
            disableMachine:false,
            selectPrice:'30',
            products:[
                {product: '30M', price:30, stime:30},
                {product: '60M', price:40, stime:40},
                {product: '90M', price:50, stime:50}
            ]
        },
    ])
    

    // const toggleBtn = machines.value.forEach(makeToggleList)
    const toggleBtn = machines.value.map(makeToggleList)
    
    // console.log("toggle: ",toggleBtn)
    
    // const dryerBtnToggle = ref([
    //     {label:'60M', value:'30', icon: 'browse_gallery' ,tooltip:'30Baht 60 Mins', slot:'60M'},
    //     {label:'75M', value:'40', tooltip:'40Baht 75 Mins',slot:'75M'},
    //     {label:'90M', value:'50', tooltip:'50Baht 90 Mins',slot:'90M'},
    // ])

    const selectorOption = ref('2')

</script>

<style>
 .text-h5 {
    font-family: 'Noto Sans Thai', sans-serif;
 }
</style>


<template>
    <div class="justify-center q-mt-md">
        <!-- <q-card bordered style="height:700px"> -->
                <!-- First row -->
                <div class="row justify-center  q-my-sm">
                    <div v-for="machine,i in machines" :key="i">
                        <q-card flat v-if="machine.type=='dryer'" style="width:140px; height:250px" :disable="machine.disableMachine" >
                           <!-- Machine name -->
                            <div class="row justify-center">
                                <div class="text-h5 text-center"><b>{{ machine.name }}</b></div>
                            </div>
                            
                            <!-- Selected Price -->
                            <div class="row justify-center">
                                <div class="text-h6 text-center text-red">Price: {{ machine.selectPrice }}</div>
                            </div>

                            <!-- Selector -->
                            <div class="row justify-center q-py-sm">
                                <!-- SelectorOption 1 -->
                                <q-btn-toggle
                                    v-if="selectorOption=='1'"
                                    v-model="machine.selectPrice" glossy rounded dense 
                                    color="blue-10" toggle-color="blue-5"
                                    :options=toggleBtn[i]
                                    :disable="machine.disableMachine"
                                >
                                    <template v-slot:60M>
                                        <q-tooltip>{{toggleBtn[i][0].tooltip}}</q-tooltip>
                                    </template>
                                    <template v-slot:75M>
                                        <q-tooltip>{{toggleBtn[i][1].tooltip}}</q-tooltip>
                                    </template>   
                                    <template v-slot:90M>
                                        <q-tooltip>{{toggleBtn[i][2].tooltip}}</q-tooltip>
                                    </template>                                 
                                </q-btn-toggle>              
                                
                                <!-- SelectorOption 2 -->
                                <q-select dense 
                                    v-if="selectorOption=='2'"
                                    label="Time (Mins)"
                                    v-model="machine.selectPrice" 
                                    :options="toggleBtn[i]"
                                    emit-value
                                    map-options
                                    stack-label
                                    style="width: 100px"
                                >
                                    <template v-slot:prepend>
                                    <!-- <q-icon name="browse_gallery" /> -->
                                    </template>
                                </q-select>
    
                            </div>

                            <!-- Machine Image -->
                            <div class="row justify-center">
                                <q-btn flat :disabled="machine.disableMachine">
                                    <img v-if="machine.status == 'ready' "src="/images/kiosk/NewDryer-Green.png" width="100%"/>
                                    <img v-else-if="machine.status == 'busy' "src="/images/kiosk/NewDryer-Red.png" width="100%"/>
                                    <img v-else-if="machine.status == 'booked' "src="/images/kiosk/NewDryer-Blue.png" width="100%"/>
                                    <img v-else-if="machine.status == 'offline' "src="/images/kiosk/NewDryer-Gray.png" width="100%"/>
                                    <q-tooltip 
                                    anchor="center middle" 
                                    self="center middle"
                                    class="bg-black"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                    >
                                      Status is {{ machine.status }}
                                    </q-tooltip>
                                </q-btn>
                            </div>
                        </q-card>
                    </div>
                </div>
                <!-- Secand row-->
                <div class="row justify-center q-my-xl">
                    <div v-for="machine,i in machines" :key="i">
                        <q-card flat v-if="machine.type=='washer'" style="width:140px; height:250px" :disable="machine.disableMachine" >
                           <!-- Machine name -->
                            <div class="row justify-center">
                                <div class="text-h5 text-center"><b>{{ machine.name }}</b></div>
                            </div>
                            
                            <!-- Selected Price -->
                            <div class="row justify-center">
                                <div class="text-h6 text-center text-red">Price: {{ machine.selectPrice }}</div>
                            </div>

                            <!-- Selector -->
                            <div class="row justify-center q-py-sm">
                                <!-- SelectorOption 1 -->
                                <q-btn-toggle
                                    v-if="selectorOption=='1'"
                                    v-model="machine.selectPrice" glossy rounded dense 
                                    color="blue-10" toggle-color="blue-5"
                                    :options=toggleBtn[i]
                                    :disable="machine.disableMachine"
                                >
                                    <template v-slot:60M>
                                        <q-tooltip>{{toggleBtn[i][0].tooltip}}</q-tooltip>
                                    </template>
                                    <template v-slot:75M>
                                        <q-tooltip>{{toggleBtn[i][1].tooltip}}</q-tooltip>
                                    </template>   
                                    <template v-slot:90M>
                                        <q-tooltip>{{toggleBtn[i][2].tooltip}}</q-tooltip>
                                    </template>                                 
                                </q-btn-toggle>              
                                
                                <!-- SelectorOption 2 -->
                                <q-select dense 
                                    v-if="selectorOption=='2'"
                                    label="Time (Mins)"
                                    v-model="machine.selectPrice" 
                                    :options="toggleBtn[i]"
                                    emit-value
                                    map-options
                                    stack-label
                                    style="width: 100px"
                                >
                                    <template v-slot:prepend>
                                    <!-- <q-icon name="browse_gallery" /> -->
                                    </template>
                                </q-select>
    
                            </div>

                            <!-- Machine Image -->
                            <div class="row justify-center">
                                <q-btn flat :disabled="machine.disableMachine">
                                    <img v-if="machine.status == 'ready' " src="/images/kiosk/NewWasher-Green1.png" width="100%"/>
                                    <img v-else-if="machine.status == 'busy' " src="/images/kiosk/NewWasher-Red.png" width="100%"/>
                                    <img v-else-if="machine.status == 'booked' " src="/images/kiosk/NewWasher-Blue.png" width="100%"/>
                                    <img v-else-if="machine.status == 'offline' " src="/images/kiosk/NewWasher-Gray.png" width="100%"/>
                                    <q-tooltip 
                                    anchor="center middle" 
                                    self="center middle"
                                    class="bg-black"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                    >
                                    Status is {{ machine.status }}
                                    </q-tooltip>
                                </q-btn>
                            </div>
                        </q-card>
                    </div>
                </div>
    </div>
</template>

<template>
    <div id="q-app" style="min-height: 100vh;">
        <div class="flex flex-center column bg-blue">
            <div class="text-h6">Flex playground example</div>
            <div class="row bg-blue-grey-2" style="min-height: 400px; width: 90%; padding: 24px;">
                <div id="parent" class="fit row wrap  bg-yellow-2 justify-center items-center content-center  " style="overflow: hidden; padding:5px">
                    <div class=" bg-grey-6" style="overflow: auto;">
                        <q-card class="no-border-radius bg-blue-2">
                            <q-card-section>
                                Child #1
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class=" bg-grey-8" style="overflow: auto;">
                        <q-card class="no-border-radius bg-green-2">
                            <q-card-section>
                                Child #2
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class=" bg-grey-6 " style="overflow: auto;">
                        <q-card class="no-border-radius bg-red-2">
                            <q-card-section>
                                Child #3
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class=" bg-grey-6" style="overflow: auto;">
                        <q-card class="no-border-radius bg-blue-2">
                            <q-card-section>
                                Child #4
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class=" bg-grey-6" style="overflow: auto;">
                        <q-card class="no-border-radius bg-green-2">
                            <q-card-section>
                                Child #5
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class=" bg-grey-6" style="overflow: auto;">
                        <q-card class="no-border-radius bg-red-2">
                            <q-card-section>
                                Child #6
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
                <div class="row fit bg-blue-4 justify-center">
                    <div class="col-xs-12 col-sm-6 col-md-4 q-px-xs">
                        <q-input label="Name"  rounded outlined dense bg-color="blue-3"></q-input>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4 q-px-xs">
                        <q-input label="LastName" rounded outlined dense></q-input>
                    </div>
                    <!-- <div class=" bg-grey-6 q-ma-sm" style="overflow: auto;">
                        <q-card class="my-card" style="width:500px">
                            <q-card-section>
                                <q-input label="Name" rounded outlined></q-input>
                                <q-input label="LastName" rounded outlined></q-input>
                            </q-card-section>
                        </q-card> 
                    </div> -->
                </div>
            </div>
            <div> <q-btn icon="person" color="secondary" @click="clickHere">Click Here</q-btn></div>
        </div>
    </div>
  
    <q-dialog v-model="showDialog">
        <q-card >
            <q-toolbar class="bg-primary text-weight-bold text-white">
                <q-toolbar-title><span class="text-weight-bold">New shop of partner:</span></q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            
            <q-card-section>
                <div class="row fit wrap  justify-center items-center content-center">
                    <div class="row fit  justify-center q-py-xs">
                        <div class="col-xs-12 col-sm-6 col-md-5 text-center q-mx-md" >
                            <q-input 
                                v-model="formShop.partnerCode"
                                outlined label="Partner Code" 
                                dense readonly
                            >
                                <template v-slot:prepend>
                                    <q-icon name="diversity_3" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-5 text-center q-mx-md" >
                            <q-input 
                                v-model="formShop.partnerName"
                                outlined label="Partner Name" 
                                dense readonly
                            >
                                <template v-slot:prepend>
                                    <q-icon name="diversity_3" />
                                </template>                             
                            </q-input>
                        </div>
                    </div>
                    <div class="row fit  justify-center q-py-xs">
                        <div class="col-xs-12 col-sm-6 col-md-5 text-center q-mx-md" >
                            <q-input 
                                v-model="formShop.shopCode"
                                outlined label="Shop Code" 
                                dense 
                                readonly
                            >
                                <template v-slot:prepend>
                                    <q-icon name="store" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-5 text-center q-mx-md" >
                            <q-input 
                                v-model="formShop.shopName"
                                outlined label="Shop Name" 
                                dense
                            >
                            <template v-slot:prepend>
                                <q-icon name="store" color="red"/>
                            </template>                           
                            </q-input>
                        </div>
                    </div>
                    <div class="row fit justify-center q-py-xs">
                        <div class="col-xs-12 col-sm-6 col-md-5 text-center q-mx-md" >
                            <q-input 
                                v-model="formShop.uuid" 
                                outlined label="uuid" 
                                dense readonly 
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-5 text-center q-mx-md" >
                            <q-select  v-model="formShop.uuid" 
                                outlined label="Shop Admin" 
                                :options="userList" dense
                                emit-value
                                map-options
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" color="red" />
                                </template>
                            </q-select>
                        </div>
                    </div>
                    
                    <div class="row fit justify-center">
                        <div class="col-xs-12 col-sm-6 col-md-11 q-gutter-sm text-center" >
                            <q-input outlined label="Description" dense></q-input>
                        </div>
                    </div>
                    
                </div>

            </q-card-section>
             <q-separator />
            <q-card-actions align="right">
                <q-btn color="green" label="New User" icon="add_circle"/>
                <q-btn color="primary" label="Save" icon="save" @click="handleSaveShop" />
                <q-btn color="negative" label="Cancel" icon="cancel" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    
    <!-- <div class="q-pa-md">
        <div class="row items-start q-gutter-md">
        <q-responsive :ratio="16/9" class="col">
            <div class="rounded-borders bg-primary text-white flex flex-center">
            Ratio 16:9
            </div>
        </q-responsive>

        <q-responsive :ratio="1" class="col">
            <div class="rounded-borders bg-primary text-white flex flex-center">
            Ratio 1:1
            </div>
        </q-responsive>
        </div>
    </div> -->
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'empty',
    })

    const showDialog = ref(false)
    const userList = ref([
        {label:"aaa", value:"3333"}
    ])

    const formShop = ref({
        partnerCode:'88875',
        partnerName:'Alvato',
        shopCode: '88875-003',
        shopName:'',
        uuid:'',
        description:''
    })


    async function handleSaveShop(){
    }

    async function clickHere(){
        showDialog.value = true
        formShop.value.partnerCode = ''
        formShop.value.partnerName = ''
        formShop.value.shopCode = ''
        formShop.value.shopName = ''
        formShop.value.uuid = ''
        formShop.value.description = ''
    }
</script>

<style lang="sass" scoped>
.my-card
  width: 90%
  max-width: 700px
  height: 80%
  max-height: 500px

.row-desc
  width:100%
  max-width: 700px
</style>
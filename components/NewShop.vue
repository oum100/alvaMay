<template>
    <q-card >
        <!-- {{shopInfo}} -->
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
</template>

<script setup lang="ts">
    const props = defineProps({
        shopInfo:{ type:Object, required:true}
    })

    const $q = useQuasar();
    const showDialog = ref(false)
    // const userList = ref([
    //     {label:"aaa", value:"3333"}
    // ])
    const userList:any = ref([])

    props.shopInfo.users.forEach((user:any) =>{
        // console.log("user here",user)
        if(user.role !== 'STAFF'){
            userList.value.push({label:user.name + " is " +user.role, value:user.uuid})
        }
        
        // console.log("UserList",userList)
    })

    const zeroPad = (num:number, places:number) => String(num).padStart(places, '0')

    const formShop = ref({
        partnerCode: props.shopInfo.partnerCode,
        partnerName: props.shopInfo.partnerName,
        shopCode: props.shopInfo.partnerCode + "-" + zeroPad(props.shopInfo._count.shops+1,3),
        shopName:'',
        uuid: '',
        description:''
    })


    async function handleSaveShop(){
        // console.log("formShop",formShop)

        const {status, error, data:resultData} = await useFetch('/api/shop/v1.0.0/newShop',{
            method:'POST',
            body:{
                shopCode: formShop.value.shopCode,
                shopName: formShop.value.shopName,
                partnerCode: formShop.value.partnerCode
            }
        })

        if(status.value == 'error'){
            console.log("error",error)
            $q.notify({
                message: "Failed to create the new shop. Please try again later.",
                type: 'negative',
                // color: "red-10",
                // textColor:"white",
                position: "center",
                icon: "error",
                iconColor: "white",
                // closeBtn:true,
                timeout: 2500,
                multiLine:true,
                actions: [
                    { 
                        label: 'CLOSE', 
                        color: 'white', 
                        handler: () => { /* ... */ } 
                    }
                ]
            })
        }else{
            $q.notify({
                message: 'Partner Created',
                color: "positive",
                position: "center",
                icon: "info",
                timeout: 2500
            })
            

            // location.reload()
        }

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
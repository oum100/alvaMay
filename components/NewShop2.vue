<template>
    <!-- <q-dialog v-model="visible" ref="dialogRef" @hide="onDialogHide"> -->
        <q-dialog v-model="visible">    
        <q-card class="q-dialog-plugin" style="width:800px; height: 340px;">
            <q-toolbar class="bg-primary text-weight-bold text-white">
                <q-toolbar-title><span class="text-weight-bold">New shop of partner: {{ formShop.partnerName }}</span></q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section>
                <!-- {{ shopInfo }} -->
                <q-form @submit="onSubmit" class="q-gutter-md">
                    <div class="row fit wrap  justify-center items-center content-center">
                        <div class="row fit  justify-center q-py-xs">
                            <div class="col-xs-12 col-sm-6 col-md-3 text-center q-mx-md" >
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
                            <div class="col-xs-12 col-sm-6 col-md-7 text-center q-mx-md" >
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
                            <div class="col-xs-12 col-sm-6 col-md-3 text-center q-mx-md" >
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
                            <div class="col-xs-12 col-sm-6 col-md-7 text-center q-mx-md" >
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
                            <div class="col-xs-12 col-sm-6 col-md-3 text-center q-mx-md" >
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
                            <div class="col-xs-12 col-sm-6 col-md-7 text-center q-mx-md" >
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



                </q-form>
            </q-card-section>
            <!-- buttons example -->
            <q-separator />
            <q-card-actions align="right">
                <q-btn color="red" label="Cancel" @click="close" />
                <q-btn  color="primary" label="OK" @click="confirm" :disabled="formShop.shopName === ''"/>
                
                <!-- <q-btn color="green" label="New User" icon="add_circle"/> -->
                <!-- <q-btn color="primary" label="Save" icon="save" @click="handleSaveShop" /> -->
                <!-- <q-btn color="negative" label="Cancel" icon="cancel" v-close-popup /> -->
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>




<script setup lang="ts">
    import { useDialogPluginComponent } from 'quasar'
    // import {ref} from 'vue'

    const formShop = ref({
        partnerCode:'',
        partnerName:'',
        shopCode:'',
        shopName:'',
        uuid:'',
        description:''
    })

    const userList:any = ref([])

    const props = defineProps({
        visibleFlag: Boolean,
        title:{type:String, default:"PartnerName"},
        shopInfo: { type: Object, required: true }
    })

    const zeroPad = (num:number, places:number) => String(num).padStart(places, '0')

    const emit = defineEmits(['update:visibleFlag','update:shopInfo','confirm'])

    const visible = ref(props.visibleFlag)

    //Watch update  for visible in this child component
    watch(visible,(val) =>{
        // console.log("child visible",val)
        emit('update:visibleFlag',val)
    })

    //Watch update visibleFlag from the parent
    watch(() => props.visibleFlag, (val) => {
        // console.log("parent visible",val)
        visible.value = val;
    });


    watch(formShop,(val) => {
        emit('update:shopInfo',val)
    })

    watch(() => props.shopInfo, (val)=> {
        console.log("watch shopInfo",val)
        formShop.value.partnerCode = val.partnerCode
        formShop.value.partnerName = val.partnerName
        formShop.value.shopCode = val.partnerCode + "-" + zeroPad(val._count.shops+1,3)
        formShop.value.shopName = ''
        formShop.value.uuid = ''
        formShop.value.description =''

        userList.value = []
        props.shopInfo.users.forEach((user:any) =>{
            console.log("Updated userList",user)
            if(user.role !== 'STAFF'){
                userList.value.push({label:user.name + " Role: " +user.role, value:user.uuid})
            }
        })
    })


    //Function to close dialog
    const close = () => {
        visible.value = false
    };
  
    //Function to submit form
    const confirm = () => {
        emit('confirm')
        close();
    };

    
    // console.log("shopInfo Here",props.shopInfo)
    
    // if(props.shopInfo.users){
    //     console.log("shopInfo User Here",shopInfo.users)
    // }

 
    // const emit = defineEmits(['update:shopInfo', 'selectedRow'])
    // props.shopInfo.users.forEach((user:any) =>{
    //     console.log("user here",user)
    //     if(user.role !== 'STAFF'){
    //         userList.value.push({label:user.name + " is " +user.role, value:user.uuid})
    //     }
    // })

    


    // console.log(props.shopInfo.partnerCode)




    


    // defineEmits([
    //     // REQUIRED; need to specify some events that your
    //     // component will emit through useDialogPluginComponent()
    //     ...useDialogPluginComponent.emits
    // ])



    // const { dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*...*/ }) - with payload
    // onDialogCancel //- Function to call to settle dialog with "cancel" outcome

    // console.log("dialogRef",dialogRef)






    // function onCancelClick(){
    //     visible.value = false
    //     onDialogCancel()
    // }

    // // this is part of our example (so not required)
    // function onOKClick () {
    //     // on OK, it is REQUIRED to
    //     // call onDialogOK (with optional payload)
    //     onDialogOK()
    //     // or with payload: onDialogOK({ ... })
    //     // ...and it will also hide the dialog automatically
    // }

    function onSubmit(){
        emit('confirm')
        close()
    }

    function onReset(){
        formShop.value.shopName = ''
        formShop.value.uuid = ''
    }

</script>

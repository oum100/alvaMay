<template>
    {{ props.user }}
    <q-card class="q-mx-xl" style="height:80%; max-height: 450px; width: 700px; max-width: 80vw;" >
        <q-bar>
            <q-space/>
            <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
        </q-bar>
        <q-card-section>
            <div class="text-h4 text-left text-weight-bold q-mt-md q-ml-sm">{{ props.title }}</div>
            <div class="text-subtitle1 text-left q-mt-sm q-ml-sm">{{props.desc}} </div>  
        </q-card-section>
        <q-card-section>
            <div class="q-gutter-md">
                <q-form>
                    <q-input class="q-mb-sm" color="gray-3" outlined v-model="props.user.name" label="Name" dense type="text">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>     
                    </q-input>
                    <q-input class="q-mb-sm" color="gray-3" outlined v-model="props.user.email" label="Email" dense type="email">
                        <template v-slot:prepend>
                            <q-icon name="email" />
                        </template>     
                    </q-input>
                    <q-input class="q-mb-sm" color="gray-3" outlined v-model="form.password" label="Default Password" dense :type="isPwd?'password':'text'">
                        <template v-slot:prepend>
                            <q-icon name="key" />
                        </template>    
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>   
                    </q-input>  
                    <q-select class="q-mb-sm" outlined v-model="props.user.role"  label="Role" :options="options" stack-label dense >
                        <template v-slot:prepend>
                            <q-icon name="manage_accounts" />
                        </template> 
                    </q-select>
                    <!-- <q-input color="gray-3" outlined v-model="form.confirm" label="Confirm Password" dense :type="isPwd?'password':'text'">
                        <template v-slot:prepend>
                            <q-icon name="key" />
                        </template>    
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>   
                    </q-input>                                   -->
                </q-form>
            </div>
            <!-- <div class="text-left q-mt-sm">
                <q-toggle
                    v-model="acceptTerms"
                    checked-icon="check"
                    color="green"
                    unchecked-icon="clear"
                    
                />
                <span class="text-capital">ยอมรับเงื่อนไขการใช้งาน&nbsp&nbsp</span>
                <NuxtLink to="/termcondition">
                    <span class="text-capital">รายละเอียดเงื่อนไข</span>
                </NuxtLink>
            </div> -->
            <q-btn label="Create Member" color="primary" class="q-mt-sm full-width text-subtitle1" 
            @click="handleRegister()" 
            :disable="isLoading"
            v-close-popup
            />
            <!-- <div class="row q-mt-sm" >
                <div class="col-6  text-left">
                    <div>
                        <q-btn stack to="/login" flat style="color:blue" class="item-start" icon="login">Sign In</q-btn>
                    </div>
                </div>
                <div class="col-6 text-right">
                    <div>
                        <q-btn  stack to="/forget_password" flat style="color:blue" icon="lock_open">Forget Password</q-btn>
                    </div>
                </div>
            </div> -->
        </q-card-section>

    </q-card>
</template>

<script setup lang="ts">

    const props = defineProps({
        title: String,
        desc: String,
        user: Array
    })

    console.log("UserForm->userData: ",props.user)
    // console.log("user Index: ",props.user.index)
    // console.log("user Name: ",props.user.name)

    const form = ref({
        name:'',
        email:'',
        password:'P@ssw0rd',
        confirm:'',
        role:''
    })

    const isPwd = ref(false)
    const  options = ref([
        'PARTNER_MANAGER','PARTNER_ADMIN','PARTNER_STAFF'
    ])

    

    async function handleRegister(){

    }
</script>
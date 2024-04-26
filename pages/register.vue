<template>
    <div class="row  items-center justify-center q-my-lg">
        <div class="col-3"></div>
        <div class="col-6">
            <div class="column justify-center">
                <q-card class="q-mx-xl" style="height:80%; max-height: 600px;" >
                    <q-card-section>
                        <div class="text-h4 text-left text-weight-bold q-mt-md q-ml-sm">Sign Up</div>
                        <div class="text-subtitle1 text-left q-mt-sm q-ml-sm">ป้อนอีเมล์/โซเชียล สำหรับการลงทะเบียน  </div>
                
                        <div v-if="socialLogin" class="row justify-center q-gutter-lg q-mt-xs">
                            <q-btn outline style="width:150px" @click = "signIn('github')">
                                <q-avatar size="28px">
                                    <img src="/images/logos/github/github.png">
                                </q-avatar>
                                <div> Github </div>
                            </q-btn>
                            <q-btn outline style="width:150px">
                                <q-avatar size="28px">
                                    <img src="/images/logos/github/github.png">
                                </q-avatar>
                                <div> Google </div>
                            </q-btn>
                        </div>
                        <div v-else class="row justify-center text-grey-5">
                            ------------ Social Login ------------
                        </div>
                       
        
                    </q-card-section>
                    <q-card-section>
                        <div class="q-gutter-md">
                            <q-form>
                                <q-input class="q-mb-sm" color="gray-3" outlined v-model="form.name" label="Name" dense type="text">
                                    <template v-slot:prepend>
                                        <q-icon name="person" />
                                    </template>     
                                </q-input>
                                <q-input class="q-mb-sm" color="gray-3" outlined v-model="form.email" label="Email" dense type="email">
                                    <template v-slot:prepend>
                                        <q-icon name="email" />
                                    </template>     
                                </q-input>
                                <q-input class="q-mb-sm" color="gray-3" outlined v-model="form.password" label="Password" dense :type="isPwd?'password':'text'">
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
                                <q-input color="gray-3" outlined v-model="form.confirm" label="Confirm Password" dense :type="isPwd?'password':'text'">
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
                            </q-form>
                        </div>
                        <div class="text-left q-mt-sm">
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
                        </div>
                        <q-btn label="ลงทะเบียน (Sign UP)" color="primary" class="q-mt-sm full-width text-subtitle1" 
                        @click="handleRegister()"
                        :disable="isLoading"
                        />
                        <div class="row q-mt-sm" >
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
                        </div>
                    </q-card-section>
                </q-card>
                
            </div>
        </div>
        <div class="col-3"></div>
    </div>

</template>

<script setup lang="ts">
    import { useQuasar } from "quasar";
    import { useRouter } from "vue-router"
    import { validateUserRegister } from '~/alvato/models/user'
    import { validateEmail, validateMatchPassword, validateRegisterBody } from '~/alvato/misc/helpers'


    definePageMeta({
        // middleware: "auth",
        auth:{
            unauthenticationOnly:true,
            navigateAuthenticatedTo: '/'
        }
    });  

    const {status,data,signIn} = useAuth()
    const $q = useQuasar();
    const router = useRouter()
    const isPwd = ref(true);
    const socialLogin = ref(false)
    const form = ref({
        name:'',
        email:'',
        password:'',
        confirm:''
    })

    const isLoading = ref(false)
    const acceptTerms = ref(false)

    async function handleRegister(){
        const validateError = await validateRegisterBody(form.value)
        if(validateError){
            console.log("abc: ",validateError)
            $q.notify({
                position: 'center',
                message: validateError,
                color:"red"
            })
            return
        }

        if(!acceptTerms.value){
            $q.notify({
                position: 'center',
                message: "Condition of Use must be accepted.",
                color:"red"
            })
            return
        }

        const {status,error} = await useFetch('/api/auth/register',{
                method: 'POST',
                body: form.value,            
        })
        
        if(status.value == "error"){
            $q.notify({
                position: 'center',
                message: error.value?.statusMessage + "or unique constraint",
                color:"red"
            })
            return
        }

        router.push("/login")

        
        // try{
        //     isLoading.value = true
        //     await useFetch('/api/auth/register',{
        //         method:"POST",
        //         body: form.value
        //     })
        //     // router.push("/login")
        // }
        // catch(e:any){
        //     console.log(e)
            
        //     // $q.notify({
        //     //     message: 'Jim pinged you.',
        //     //     color: 'purple',
        //     //     avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
        //     // })
        // }
        // finally{
        //     isLoading.value = false
        // }
        
        
        
    }



</script>
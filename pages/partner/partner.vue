<template>
  <!-- {{ data }} -->
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      done-color="primary"
      active-color="primary"
      inactive-color="grey-8"
      animated
    >
      <q-step
        :name="1"
        title="Step 1. New Partner"
        icon="settings"
        :done="step > 1"
        class="text-subtitle1"
      >
        1. สร้าง Partner เพื่อใช้เป็นชื่ออ้างอิงและเก็บข้อมูลกับแพลตฟอร์ม  แพลตฟอร์มจะสร้าง appKey และ appSecret 
        สำหรับนำไปใช้ในการพัฒนา Asset นำมาใช้งานกับแพลตฟอร์ม 
      </q-step>

      <q-step
        :name="2"
        title="Step 2. Register Asset"
        caption="(สร้าง Code ให้ MCU)"
        icon="create_new_folder"
        :done="step > 2"
        class="text-subtitle1"
      >
        2. ทำการรีจิสเตอร์​ Asset ด้วย appKey และ appSecret (ที่ได้จาก step 1) เพื่อให้เชื่อมต่อ บันทึก และควมคุม ร่วมกับแพลตฟอร์มได้  
      </q-step>

      <q-step
        :name="3"
        title="Step 3. New Shop"
        icon="assignment"
        :done="step > 3"
        class="text-subtitle1"
      >
        3. สร้าง Shop หรือร้านค้าซึ่งนำ Asset ไปใช้งาน
      </q-step>

      <q-step
        :name="4"
        title="Step 4.Assign assets to shop"
        icon="add_comment"
        class="text-subtitle1"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. .
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="onNext($refs.stepper)" color="primary" :label="step === 4 ? 'Finish' : 'Next'" />
          <q-btn v-if="step > 1" flat color="primary" @click="onBack($refs.stepper)" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>

  <div v-if="step === 1">
    <div class="row flex-center q-my-md">
        <div v-if="newPartner" >
            <div class="text-h6 text-center q-my-md">
              เนื่องจากคุณเป็นผู้ใช้ใหม่ จึงต้องให้คุณสร้างตัวตนหรือเรียกว่า partner 
              ซึ่งจะใช้แทนคุณในแฟลตฟอร์มนี้ เป็นอันดับแรก
            </div>
            <div class="text-h6 text-center q-my-md">
              Because you are a new user Therefore, we must create you as a partner first.
            </div>   
        </div>
        <!-- <div v-else class="text-h4 q-my-md">
          Partner Information
        </div> -->
    </div>
    <div v-if="newPartner" class="row flex-center">
        <q-btn  label="New Partner" color="primary" @click="newBtn = true"></q-btn>
        <q-dialog v-model="newBtn" >
          <div style="width:100%; max-width:500px" >
            <q-card >
              <q-card-section>
                <div class="text-h6">Partner Infomation</div>
              </q-card-section>

              <q-separator />

              <q-card-section class="scroll" >
                  <q-input v-model="partnerName" label="Partner Name" filled 
                    hint="Consists of at least 6 letters and numbers and a dash."
                  >
                    <template v-slot:prepend>
                          <q-icon name="branding_watermark" />
                    </template>                
                  </q-input>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup  />
                <q-btn flat label="Save" color="primary" v-close-popup @click="savePartner"/>
              </q-card-actions>
                  
            </q-card>
          </div>
        </q-dialog>
          
    </div>
    <div v-else class = "row justify-center">
        <q-card flat class="q-mx-xl" style="width:700px; height:80%; max-height: 40vh; " >
            <q-card-section class=" bg-primary text-white">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h4 text-white">
                    <q-popup-edit v-model="partnerName" class="bg-blue-9 text-white" v-slot="scope">
                      <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                        <template v-slot:append>
                          <q-icon name="edit" />
                        </template>
                      </q-input>
                    </q-popup-edit>
                      {{ partnerName }}
                      <q-tooltip>Click to edit</q-tooltip>
                    </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                    <q-btn flat round>
                      <q-avatar round size="60px">
                        <img :src=partnerLogo>
                        <q-tooltip>Logo</q-tooltip>
                      </q-avatar>
                    </q-btn>
                </q-item-section>
              </q-item>
            </q-card-section>
            <!-- <q-separator /> -->
            <q-card-section>
              <q-field label="Partner Code" stack-label>
                <template v-slot:prepend>
                      <q-icon name="123" />
                </template> 
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{partnerCode}}</div>
                </template> 
              </q-field>

              <q-field v-if="!editParnerName" label="Partner Name" stack-label>
                <template v-slot:prepend>
                  <q-icon name="diversity_3" />
                </template> 
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{partnerName}}</div>
                </template> 
                <template v-slot:append>
                  <q-icon name="edit" 
                    @click="partnerName_edit">
                    <q-tooltip>Edit</q-tooltip>
                  </q-icon>
                </template>
              </q-field>
              <q-input v-else filled label="Partner Name" v-model="partnerName" stack-label>
                <template v-slot:prepend>
                      <q-icon name="diversity_3" />
                </template> 
              </q-input>


              <!-- <q-field v-if="!editPartnerLogo" label="Partner Logo" stack-label >
                <template v-slot:prepend>
                      <q-icon name="image" />
                </template> 
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{partnerLogo}}</div>
                </template> 
                <template v-slot:append>
                  <q-icon name="edit" 
                    @click="partnerLogo_edit">
                    <q-tooltip>Edit</q-tooltip>
                  </q-icon>
                </template>
              </q-field> -->
              <!-- <q-input v-else filled label="Partner Logo" v-model="partnerLogo" stack-label>
                <template v-slot:prepend>
                      <q-icon name="image" />
                </template> 
              </q-input> -->
              <!-- <q-uploader  v-else
                url="http://localhost:3000/upload"
                accept=".jpg, image/*"
                style="width:100%; max-width: 700px"
              /> -->

              <!-- <q-file 
                :model-value="partnerLogo"
                :label=partnerLogo
                style="max-width: 700px"
                @update:model-value="updateFile"
              >
                <template v-slot:prepend>
                  <q-icon name="image" />
                </template> 
                <template v-slot:append>
                  <q-icon name="edit" />
                </template>
              </q-file> -->

              

              

              <q-field label="AppKey" stack-label>
                <template v-slot:prepend>
                      <q-icon name="key" />
                </template>  
                <template v-slot:append>
                  <q-icon :name="copyAppKey ? 'content_copy' : 'file_copy'" 
                    @click="appKey_copy">
                    <q-tooltip>Copy</q-tooltip>
                  </q-icon>
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{appKey}}</div>
                </template>             
              </q-field>

              <q-field class="q-my-sm" color="gray-3" v-model="appSecret" label="AppSecret" type="text" stack-label>
                  <template v-slot:prepend>
                      <q-icon name="vpn_key" />
                  </template>    
                  <template v-slot:append>
                      <q-icon :name="copyAppSecret ? 'content_copy' : 'file_copy'" 
                        @click="appSecret_copy">
                        <q-tooltip>Copy</q-tooltip>
                      </q-icon>
                  </template>     
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">{{appSecret}}</div>
                  </template>  
              </q-field>         
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup @click="cancel_btn"/>
              <q-btn flat label="Save" color="primary" v-close-popup />
            </q-card-actions>
            <q-card-actions align="left">
              <q-btn unelevated rounded label="Add Contact" @click="cancel_btn" icon="add" color="green" style="width:180px" v-close-popup />
              <q-btn unelevated rounded label="Add Shop" icon="add" color="green" style="width:180px" v-close-popup />
            </q-card-actions>
        </q-card>
    </div>
  </div>

  <div v-if="step === 2">
    <div class="text-h6 text-center q-my-md">
      เนื่องจากคุณเป็นผู้ใช้ใหม่ จึงต้องสร้างคุณเป็น partner เป็นอันดับแรก
    </div>
    <div class="text-h6 text-center q-my-md">
      Because you are a new user Therefore, we must create you as a partner first.
    </div>   
  </div>

  <div v-if="step === 3">

  </div>

  <div v-if="step === 4">

  </div>
</template>

<script setup lang = "ts">
    definePageMeta({
        layout:'partner',
        // middleware: "auth",
        // auth:{
        //     unauthenticationOnly:false,
        //     navigateAuthenticatedTo: '/kiosk'
        // }
    })
  
    const {data} = useAuth()
    const step = ref(1)

    const $q = useQuasar();
    const newBtn = ref(false)
    const address = ref('')
    const user = data.value?.user
    const newPartner = ref(true)
    const partnerName = ref('')
    const partnerName_before = ref('')
    const partnerLogo = ref('')
    const partnerLogo_before = ref('')
    const partnerCode = ref('')
    const appKey = ref('')
    const appSecret = ref('')

    const refreshIcon = ref(true)
    const copyAppKey = ref(true)
    const copyAppSecret = ref(true)
    const editParnerName = ref(false)
    const editPartnerLogo = ref(false)

    const fotosURL = ref([])

    const {getPartnerByUuid, createPartner} = useAlvatoApi()
    const {data:dataTable,status} = await getPartnerByUuid(data.value?.user?.uuid)
    console.log("partner: ",dataTable.value?.data)

    if(dataTable.value?.data.partnerCode !== null){
      newPartner.value = false
      partnerName.value = dataTable.value?.data.partner?.partnerName as string
      partnerLogo.value = dataTable.value?.data.partner?.partnerLogo as string
      partnerCode.value = dataTable.value?.data.partnerCode as string
      appKey.value = dataTable.value?.data.partner?.appKey as string
      appSecret.value = dataTable.value?.data.partner?.appSecret as string
    }else{
      newPartner.value = true
    }
  
    // const {data:partner,status} = await getPartnerByUuid(data.value?.user?.uuid)
    // console.log(partner)

    // if(status.value === 'success'){
    //   newPartner.value = false
    //   partnerName.value = partner.value?.partnerName 
    //   partnerLogo.value = partner.value?.partnerLogo 
    //   partnerCode.value = partner.value?.partnerCode 
    //   appKey.value = partner.value?.appKey 
    //   appSecret.value = partner.value?.appSecret 
    // }else{
    //   newPartner.value = true
    // }
    
    function onNext(r:any){
      r.next()
    }

    function onBack(r:any){
      r.previous()
    }

    async function appKey_copy() {
      copyAppKey.value = !copyAppKey.value
      
      await navigator.clipboard.writeText(appKey.value)

      $q.notify({
                position: 'center',
                message: 'AppKey copied to clipboard',
                color:"bg-secondary"
            })  
    }

    async function appSecret_copy() {
      copyAppSecret.value = !copyAppSecret.value
      await navigator.clipboard.writeText(appSecret.value)

      $q.notify({
                position: 'center',
                message: 'AppSecret copied to clipboard',
                color:"bg-secondary"
            })
    }

    async function appSecret_refresh() {

    }

    async function updateFile(){
      editPartnerLogo.value = true
      console.log(partnerLogo.value)
    }

    async function partnerName_edit(){
      editParnerName.value = true
      partnerName_before.value = partnerName.value
    }

    async function partnerLogo_edit(){
      editPartnerLogo.value = true
      partnerLogo_before.value = partnerLogo.value
    }

    async function savePartner(){
      const {data:partner,status} = await createPartner(
          data.value?.user?.uuid,
          partnerName.value
      )


      console.log('partner :>> ', partner.value?.data);
      // console.log('status :>> ', status);

      if(partner.value?.data.partnerCode !== null){
        newPartner.value = false
        partnerName.value = dataTable.value?.data.partner?.partnerName as string
        partnerLogo.value = dataTable.value?.data.partner?.partnerLogo as string
        partnerCode.value = dataTable.value?.data.partnerCode as string
        appKey.value = dataTable.value?.data.partner?.appKey as string
        appSecret.value = dataTable.value?.data.partner?.appSecret as string
      }else{
        newPartner.value = true
      }

    }

    async function updatePartner(){

    }

    async function cancel_btn() {
      editParnerName.value = false
      editPartnerLogo.value = false
      partnerName.value = partnerName_before.value
      partnerLogo.value = partnerLogo_before.value
    }

</script>

<style>
    /* html {
        font-family: "IBM Plex Sans Thai";
    } */
</style>

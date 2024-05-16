<template>
    <div class = "row justify-center">
        <q-card flat class="q-mx-xl" style="width:900px; height:80%; max-height: 40vh; " >
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
</template>
<template>
    <!-- {{ user }}  -->
    <div class="q-pa-md">
        <!-- <div class="row " style="height: 130px">
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">Total</div>
                        <div class="text-h4">{{count}}</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md ">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">Active</div>
                        <div class="text-h4">100</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">In Active</div>
                        <div class="text-h4">100</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #012a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">Available</div>
                        <div class="text-h4">100</div>
                    </q-card-section>
                </q-card>
            </div>   
        </div> -->
        
        <q-table
            flat bordered
            title="User List"
            :rows="rows"
            :columns="columns"
            row-key="index"
            selection="multiple"
            virtual-scroll
            :rows-per-page-options="[5,10,20,25]"
            :filter="filter"
            v-model:pagination="pagination"
            v-model:selected="selected"
            table-header-style="background: #eeeeee"
        >
            <template #top-left>
                <q-icon name="supervisor_account" size="40px"/>
                <div class="text-h5" >User List Of Partner </div>
            </template>
            <template #top-right>
                <div class="q-mr-md q-guttar-md">
                    <q-btn icon="add_circle" title="Create user" class="q-mx-md" @click="createUser">Create</q-btn>
                    <q-btn v-if="selected.length > 0" icon="delete" title="Delete" >Delete</q-btn>
                </div>
            </template>

            <!-- Customized field name -->
            <template #body-cell-name="props">
                <q-td :props = "props">
                    {{ props.row.name }}
                    <q-popup-edit v-model="props.row.name" v-slot="scope" title="Update Name" buttons>
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                </q-td>
            </template>


            <!-- Customized field "Role" -->
            <template #body-cell-role="props" >
                <q-td :props = "props" >
                    {{ props.row.role }}
                </q-td>
            </template>

            <!-- Customized field "Permission" -->
            <template #body-cell-permission="props" >
                <q-td :props = "props" >
                    {{ props.row.permission }}
                    <q-tooltip>Create, Read, Update, Delete</q-tooltip>
                </q-td>
            </template>
            



            <!-- Customized field "Action" -->
            <template #body-cell-actions="props">
                <q-td class="text-center">
                    <!-- <q-btn flat square size="md" icon="add" color="blue" title="Add Product" /> -->
                    <q-btn flat square size="md" icon="edit" color="green" title="Edit" @click="updateUser(props.row)"> </q-btn>
                    <q-btn flat square size="md" icon="lock_reset" color="blue" title="Reset Password" @click="resetPass(props.row)"> </q-btn>
                    <q-btn 
                        flat square size="md" 
                        icon="delete" 
                        color="red" 
                        title="Delete" 
                        :disabled = isOwner(props.row)
                        @click="deleteUser(props.row)"
                    > </q-btn>
                </q-td>
            </template>
        </q-table>
        <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div>
    </div>

    <q-dialog v-model="newUser">
            <UserForm 
                title="New Member User" 
                desc="ป้อนอีเมล์ ชื่อ และ role"
                :user="editedData"
            />
    </q-dialog>


    <q-dialog v-model="editUser">
            <UserForm 
                title="Edit User" 
                desc="แก้ไขเปลี่ยนแปลงข้อมูลผู้ใช้" 
                :user="editedData"
            />
    </q-dialog>    
 
</template>     
<script setup  lang="ts">
    import { useQuasar } from "quasar";

    definePageMeta({
        layout:'partner',
        // middleware: "auth",
        // auth:{
        //     unauthenticationOnly:false,
        //     navigateAuthenticatedTo: '/kiosk'
        // }
    })

    
    const columns = [   
        { 
            name: 'index', 
            required: true,
            label: 'No', 
            field: 'index', 
            align: 'left', 
            sortable: true, 
            field: row => row.index,
            format: val => `${val}`,
        },
        {name: 'uuid', label: 'uuid', field: 'uuid' , align: 'left',sortable: false},
        {name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true},
        {name: 'name', label: 'Name', field: 'name', align: 'left',sortable: false},
        {name: 'role', label: 'Role', field: 'role', align: 'left',sortable: false},
        {name: 'permission', label: 'Permission', field: 'permission', align: 'left', sortable: true},
        {name: 'updateAt', label: 'Update At', field: 'updatedAt', align: 'left', sortable: true},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center'},
    ]
    const tableRef = ref()
    const filter = ref('')
    const selected = ref([])
    const pagination= ref({
            // sortBy:'branch',
            // descending: false,
            page:1,
            rowsPerPage: 10,
            // rowsNumber:10
    })

    const {data:user,lastRefreshedAt,getSession} = useAuth()

    

    // console.log('Session: ', await getSession({ force: true }))
   
    // const data = [
    //     {
    //         uuid:"0000001",
    //         email: "partner01@gmail.com",
    //         name: "Partner01",
    //         role:"PARTNER_OWNER",
    //         // permission:["C","R","U","D"],
    //         updatedAt:"2024-03-11T15:26:55.108Z",
    //     },
    //     {
    //         uuid:"0000002",
    //         email: "l.teerin@gmail.com",
    //         name: "Teerin",
    //         role:"PARTNER_STAFF",
    //         // permission:["C","R","U","D"],
    //         updatedAt:"2024-03-11T15:26:55.108Z",
    //     }
    // ]

    

    const {partnerUserList} = useAlvatoApi()
    const {data:userslist} = await partnerUserList(user.value?.user?.partnerCode)
    // console.log("UserInfo: ",user.value?.user?.uuid)

    const data = JSON.parse(JSON.stringify(userslist.value))
    // console.log("Users array: ",data)

    const count = data.length
    // console.log("count: ",count)

    let rows: any[]= []
    rows = rows.concat(data)

    //Setting format for each row
    rows.forEach((row:any, inx:number) => {
        row.index = inx+1
        // row.updatedAt = new Date(row.updatedAt).toLocaleString('th-TH')

        row.updatedAt= new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Asia/Bangkok',
        }).format(new Date(row.updatedAt))
    })



    //Create new user
    const newUser = ref(false)
    async function createUser() {
        newUser.value = true
    }


    //Update user
    const editUser = ref(false)
    let editedData = ref([])
    async function updateUser(user){
        //Set edit flag
        editUser.value = true

        //Set origData
        // const origData = JSON.stringify(selected.value)
        editedData = user
        console.log("editedData: ",editedData)

        //Edited Data
        // editedData = origData
        console.log("User info: ",user)
        console.log("updateUser at index: ",user.index)
        console.log("updateUser at index: ",user.name)

        
    }

    const $q = useQuasar()
    async function resetPass(user){
        $q.notify ({
            message: "Do you want to reset password (Default Password) " + user.name ,
            position: "center",
            color: 'primary',
            timeout: 3000,
            actions: [
                {label:'Cancel', color: 'white', handler: () => { /* ... */ } },
                {label:'Reset', color: 'white', handler: () => {
                    actionResetPass(user)
                } }
            ]
        })

    }

    async function deleteUser(user){
        // console.log("deleteUser at index: ",user.index)
        $q.notify({
            message: "Do you want to delete " + user.name + " ?",
            position: 'center',
            color:'negative',
            icon:'delete',
            timeout: 3000,
            actions: [
                {label:'Cancel', color: 'white', handler: () => { /* ... */ } },
                {label:'Delete', color: 'white', handler: () => {
                    actionDeleteUser(user)
                } }
            ]
        })
    }

    async function actionDeleteUser(user){
        console.log("Deleted user: ", user)
    }

    async function actionResetPass(user){
        console.log("Reset Pass user: ", user)
    }   

    const ownerFlag = false
    function isOwner(udata){
        // console.log(user.value?.user?.uuid)
        // console.log(udata.role)
        if(udata.role === 'PARTNER_OWNER'){
            return true
        }else{
            return false
        }
    }


</script>
<template>
    <!-- {{userInfo?.user}} -->
    <div class="q-pa-md">
        <div class="row justify-center q-px-sm">
            <div class="col-xs-12 col-sm-6 col-md-4 q-pr-sm">
                <!-- <apexchart type="pie" height="200"  :options="chart3.chartOptions" :series="chart3.series"></apexchart> -->
                <q-card class="text-white" >
                    <q-card-section>
                        <apexchart type="pie"  height="220" :options="chart3" :series="chart3.series"></apexchart>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-px-xs">
                <q-card class="text-white">
                    <q-card-section>
                        <apexchart type="bar" height="220" :options="chart2" :series="chart2.series"></apexchart>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pl-sm">
                <q-card class="text-white">
                    <q-card-section>
                        <apexchart type="donut" height="220" :options="chart3" :series="chart3.series"></apexchart>
                    </q-card-section>
                </q-card>
            </div>    
        </div>
    
        <div class="row justify-center q-pa-sm">
            <div class="col-12">
                <q-table
                flat bordered
                dense 
                ref="tableRef"
                title="Partner List"
                :rows="rows"
                :columns = "columns"
                row-key = "index"
                selection="multiple"
                virtual-scroll
                :rows-per-page-options="[2,5,10,20,50,100]"
                v-model:pagination="pagination"
                v-model:selected="selected"
                :loading="loading"
                :filter="filter"
                binary-state-sort
                table-header-style="background: #eeeeee"
                @request="onRequest" 
            >

                <template #top>
                    <div class ="col-3 text-h6 text-blue">Partner List </div>
                    <q-space /> 
                    <!-- <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                        <q-select filled dense 
                            v-model="partnerSelected" 
                            :options="listPartnerOption" 
                            label="Filter by Partner" 
                            emit-value
                            map-options
                            style="width: 200px"
                            @update:model-value="updateInfo()"
                        />
                    </div>

                    <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                        <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
                    </div> -->
                    <div v-if="userInfo.user?.organization =='PLATFORM' && userInfo.user?.role !== 'STAFF'" class="q-mx-md q-gutter-md" style="max-width: 200px">
                        <q-btn id="new" icon="add_circle" color="green" @click="addPartner">&nbspPartner</q-btn>
                    </div>
                </template>
                
                <template #body-cell="props" >
                    <q-td  :props = "props" >
                        <div v-if="((props.col.name).indexOf('partnerCode') == -1)
                            && ((props.col.name).indexOf('owner') == -1) 
                            && ((props.col.name).indexOf('index') == -1)
                            && ((props.col.name).indexOf('action') == -1)
                        ">
                            <q-btn flat rounded dense @click="cellClick(props.row.partnerCode,props.col.name)"> 
                                {{ props.value }}
                                <q-tooltip>To view {{props.col.name}} of {{ props.row.partnerName }}</q-tooltip>
                            </q-btn>
                        </div>
                        <div v-else>
                            {{ props.value }}
                        </div>
                    </q-td>
                </template>

                <!-- <template #body-cell-asset="props" >
                    <q-td :props = "props" >
                        {{ props.row.assetName }}
                    </q-td>
                </template>
                -->

                <template #body-cell-actions="props" >
                    <q-td :props = "props" >
                        <q-btn flat rounded dense icon="person_add" color='primary' @click="clickNewUser(props.row.index)">
                            <q-tooltip>New User</q-tooltip>
                        </q-btn>
                        <q-btn flat rounded dense icon="storefront" color='primary' @click="clickNewShop(props.row.index)">
                            <q-tooltip>New Shop</q-tooltip>
                        </q-btn>
                        <q-btn flat rounded dense icon="developer_board" color='primary' @click="clickNewAsset(props.row.index)">
                            <q-tooltip>New Asset</q-tooltip>
                        </q-btn>
                        <q-btn flat rounded dense icon="room_preferences" color='primary' @click="clickNewConfig(props.row.index)">
                            <q-tooltip>New Config</q-tooltip>
                        </q-btn>
                        <q-btn flat rounded dense icon="category" color='primary' @click="clickNewProduct(props.row.index)">
                            <q-tooltip>New Product</q-tooltip>
                        </q-btn>
                        <q-btn flat rounded dense icon="local_laundry_service" color='primary' @click="clickNewProduct(props.row.index)">
                            <q-tooltip>New Machine</q-tooltip>
                        </q-btn>

                        <q-btn flat rounded dense icon="edit" color="primary" @click="clickEditProfile(props.row.index)">
                            <q-tooltip>Edit Profile</q-tooltip>
                        </q-btn>
                        <q-btn flat rounded dense icon="delete" @click="clickDel(props.row.index)"color="red" ></q-btn>
                    </q-td>
                </template>
            </q-table>
            </div>

        </div>


           
            <div class="q-mt-md">
                Selected: {{ JSON.stringify(selected) }}
            </div>
        
       
    </div>

    <!-- New Partner Dialog -->
    <div class="q-gutter-md">
        <q-dialog 
        v-model="newPartnerFlag"  
        persistent transition-show="flip-down" transition-hide="flip-up"
        backdrop-filter="blur(4px) saturate(150%)"
        >
            <q-card  style="width:400px; max-width:80vw; height: 260px;">
                <q-toolbar class="bg-primary text-white">
                    <q-avatar>
                    <img src="/images/alvato/Alvato.png">
                    </q-avatar>
                    <q-toolbar-title><span class="text-weight-bold">New Partner</span></q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>
                <q-card-section>
                    <div class="row">
                        <div class="col-12 ">
                            <!-- <q-input label="Uuid" filled dense v-model="newPartner.uuid"></q-input> -->
                            <q-select
                                filled
                                v-model="newPartner.uuid"
                                :options="userList"
                                label="User"
                                emit-value
                                map-options
                                dense
                            />
                            <q-input label="Uuid" v-model="newPartner.uuid" dense readonly></q-input>
                            <q-input label="Name" v-model="newPartner.name" dense></q-input>
                        </div>
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                    <q-btn color="primary" label="Cancel" v-close-popup />
                    <q-btn color="primary" label="Save" @click="saveNewPartner" />
                </q-card-actions>
            </q-card>

        </q-dialog>

    </div>


    <!-- <NewShop partnerCode="test"/> -->
    <!-- <q-dialog v-model="clickNewShopFlag">
        <NewShop :shopInfo="selectedRow"/>
    </q-dialog>  -->

    <!-- <NewShop2 v-model="newShopFlag" @shopRow="selectedRow" /> -->
    <NewShop2 v-model:visibleFlag="newShopFlag" :shopInfo="selectedRow" />
    <!-- <NewDialog v-model="newAssetFlag" :shopInfo="selectedRow"/> -->
     
</template>

<script setup lang="ts">
    import { useRouter } from "vue-router"
    import Profile from "~/components/Profile.vue"
    import NewShop from "~/components/NewShop.vue"

    const router = useRouter()
    const {data:userInfo} = useAuth()
    const $q = useQuasar();
    
    const tableRef = ref()
    // let rows = ref([])
    // let rows: any[]= []
    let rows = ref([])
    const filter = ref('')
    const loading = ref(false)
    const selected = ref([])
    const pagination= ref({
        sortBy: 'desc',
        descending: false,
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
    })

    const userList:any = ref([])

    const clickDeleteFlag = ref(false)
    const newPartnerFlag = ref(false)
    const newAssetFlag = ref(false)
    const newConfigFlag = ref(false)
    const newProductFlag = ref(false)
    const newShopFlag = ref(false)

    const selectedRow:any = ref({})

    const newPartner:any = ref({
        // uuid:String,
        // name:String,
    })
   
    var chart1 = {
        series: [76, 67, 61, 90],
        chart: {
          height: 200,
          type: 'pie',
        },
        chartOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              offsetX: -8,
              fontSize: '16px',
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
            },
          }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
                show: false
            }
          }
        }]
    };

    const chart2 = ref({
        series: [{
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
    })  

    const chart3 = ref({
        series: [4, 3, 13, 20, 3, 1],
          plotOptions: {
            chart: {
              height:300,
              width: 300,
              type: 'pie',
            },
            title: {text:"Total"},
            // colors:['#1ab7ea', '#0084ff', '#39539E', '#0077B5','#045500'],
            labels: ['User', 'Shop', 'Asset', 'Machine', 'Product', 'Config'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            // tooltip: {
            //   y: {
            //     formatter: function (val:any) {
            //       return "$ " + val + "Baht"
            //     }
            //   }
            // },
          },
    })  



    const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: false,style: 'width: 30px'},
        {name: 'partners', label: 'Partner', field: 'partnerName', align: 'left', sortable: true,style: 'width: 30px'},
        {name: 'partnerCode', label: 'PartnerCode', field: 'partnerCode' , align: 'left',sortable: true,style: 'width: 30px'},
        {name: 'owner', label: 'Owner', field: 'owner', align: 'left', sortable: false, style: 'width:30px'},
        {name: 'users', label: '#Users', field: 'user', align: 'center', sortable: false, style: 'width: 15px'},
        {name: 'shops', label: '#Shops', field: 'shop', align: 'center', sortable: false, style: 'width: 15px'},
        {name: 'assets', label: '#Assets', field: 'asset' ,align: 'center', sortable: false,style: 'width: 15px' },
        {name: 'configs', label: '#Configs', field: 'config', align: 'center', sortable: false,style: 'width: 15px'},
        {name: 'products', label: '#Products', field: 'product', align: 'center', sortable: false,style: 'width: 15px'},
        {name: 'machines', label: '#Machines', field: 'machine', align: 'center', sortable: false,style: 'width: 15px'},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false,style: 'width: 100px'}
    ]


    onMounted(() => {
        // get initial data from server (1st page)
        tableRef.value.requestServerInteraction()
        
    })

    // function shopRow(user){
    //     console.log("shopRow",user)
    // }


    async function onRequest(props:any){

        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter 

        // console.log("sortBy: ",sortBy)
        // console.log("descending: ", descending)
        

        const totalResult = await getRowsNumberCount(filter)
        // console.log("totalResult: ",totalResult)

        pagination.value.rowsNumber = totalResult?.value?.totalCount as number
        // console.log("pagination-rowsNumber: ", pagination.value.rowsNumber)
    
                // Step 3: calculate and setting pagination
        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage
    
        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        //Fetch data from server here


        //setting new pagination
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending


        //Fetch from srver
        // const {data:dataTable} = await useFetch('/api/asset/v1.0.0/getAll')
        loading.value = true
        const {data:dataTable} = await $fetch('/api/partner/v1.0.0/listByPagination',{
            method:'POST',
            body: {
                // "partnerCode":partnerSelected.value,
                "page":startRow,
                "rowsPerPage":rowsPerPage,
                "rowsNumber":fetchCount,
            }
        })
        console.log('dataTable: ',dataTable)

        rows.value = dataTable as any
        // console.log('Rows: ',rows.value)
        rows.value.forEach((row:any,index:number) => {
            row.index = startRow+index+1
            row.owner = row.users[0].name
            row.shop = row._count.shops
            row.user = row._count.users
            row.asset = row._count.assets
            row.config = row._count.configs
            row.product = row._count.products
            row.machine = row._count.machines
            
            // row.partnerName = row.partner?.partnerName        
        }) 

        loading.value = false
        
    }

    async function updateInfo(){
        // console.log('Partner: ',partnerSelected.value)
        // console.log("shop: ",shopSelected.value)

        // filter.value = {
        //     partner: partnerSelected.value,
        //     shop: shopSelected.value
        // }
        // tableRef.value.requestServerInteraction()
    }



    async function getRowsNumberCount(filter:any){
        // console.log('filter1: ',filter.partner)
        // console.log('filter2: ',filter.shop)

        const {data:rowsCount} = await useFetch('/api/partner/v1.0.0/recordsCount')
        // console.log("ResultGetRow: ",rowsCount)
        return rowsCount
    }


    async function cellClick(partnerCode:string, field:string){
        
        // This funcition handle when cell click and redirect to field of that parterCode
        // console.log("partnerCode: ",partnerCode, field)
        
        const target = "/" + field + "/" +partnerCode
        // console.log("Target: ",target)
        // $q.notify({
        //     position: 'center',
        //     message: target,
        //     color:"red"
        // })

        router.push(target)
    }

    async function addPartner(){
        // Prepair user list
        const {data:resultData} = await $fetch('/api/user/v1.0.0/userList',{
            method: 'GET',
        })

        userList.value = []
        resultData.forEach((user:any) => {
            // if(user.role === 'OWNER'){
                userList.value.push({
                    label:user.name,
                    value:user.uuid
                })
            // }
            
        })

        // console.log("List",userList)
        newPartnerFlag.value = !newPartnerFlag.value
        newPartner.value.uuid = userInfo?.value?.user?.uuid
    }

    async function saveNewPartner(){
        if(!newPartner.value.name){
            $q.notify({
                message: 'Please enter name',
                    color: "positive",
                    position: "center",
                    icon: "warning",
                    timeout: 2500,
            })
        }else{
            const resultData = await useFetch('/api/partner/v1.0.0/newPartner',{
                method: 'POST',
                body:{
                    uuid: newPartner.value.uuid,
                    name: newPartner.value.name
                }
            })

            $q.notify({
                message: 'Partner Created',
                color: "positive",
                position: "center",
                icon: "info",
                timeout: 2500
            })
            newPartnerFlag.value = false
            location.reload();
        }

    }


    async function clickEditProfile(inx:any){

    }

    async function clickDel(inx:any){
        clickDeleteFlag.value = !clickDeleteFlag.value

        $q.notify({
                message: "Confirm delete partner: "+ rows.value[inx-1].partnerName + "?",
                color: 'primary',
                position: "center",
                type:"positive",
                multiLine: true,
                // icon: "info",
                // timeout: 2500
                actions: [
                    { label: 'Delete', color: 'yellow', handler: () => { deletePartner(inx)} },
                    { label: 'Cancel', color: 'yellow', handler: () => { /* ... */ } }
                ]
            })
    }

    async function deletePartner(inx:any){
        const {status,error,data:resultData} = await useFetch('/api/partner/v1.0.0/delPartner',{
            method: 'POST',
            body:{
                partnerCode: rows.value[inx-1].partnerCode
            }
        })

        // console.log("error",resultData)

        if(status.value == 'error'){
            $q.notify({
                message: "Delete failed. This partner are in used.",
                color: 'red',
                position: "center",
                multiLine: true,
                icon:"error",
                actions: [
                    { label: 'Ok', color: 'yellow', handler: () => { /* ... */ } }
                ]
            })
        }else{
            location.reload()
        }
        clickDeleteFlag.value = false
        

    }

    async function clickNewShop(inx:any){
        newShopFlag.value = true
        selectedRow.value = rows.value[inx-1]
        // console.log("selectedRow: ", selectedRow)

    }

    async function handleSaveShop(){

    }

    async function clickNewConfig(inx:any){
        
    }

    async function clickNewProduct(inx:any){
        
    }

    async function clickNewAsset(inx:any){
        newAssetFlag.value = true
        selectedRow.value = rows.value[inx-1]
    }
    
    async function clickNewUser(inx:any){
        
    }    

</script>
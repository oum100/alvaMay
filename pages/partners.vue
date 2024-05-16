<template>
    
    <div class="q-pa-md">
        <q-table
            flat bordered
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
                <div class ="col-3 text-h4 text-blue">Partner List </div>
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
            </template>
            
            <!-- <template #body-cell-partnerName="props" >
                <q-td :props = "props" >
                    {{ props.row.partnerName }}
                </q-td>
            </template>

            <template #body-cell-partnerCode="props" >
                <q-td :props = "props">
                    {{ props.row.partnerCode }}
                </q-td>
            </template> -->

            <template #body-cell="props" >
                <q-td  :props = "props" >
                    <div v-if="((props.col.name).indexOf('partner') == -1) 
                        && ((props.col.name).indexOf('index') == -1)
                        && ((props.col.name).indexOf('action') == -1)
                    ">
                        <q-btn flat rounded @click="cellClick(props.row.partnerCode,props.col.name)"> 
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

            <template #body-cell-assetCode="props" >
                <q-td :props = "props" >
                    {{ props.row.assetCode }}
                </q-td>
            </template> -->
        </q-table>           
        <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from "vue-router"

    const {data:userInfo} = useAuth()
    const $q = useQuasar();
    const router = useRouter()
    const tableRef = ref()
    // let rows = ref([])
    // let rows: any[]= []
    let rows = ref([])
    const filter:any = ref('')
    const loading = ref(false)
    const selected = ref([])
    const pagination= ref({
        sortBy: 'desc',
        descending: false,
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
    })

   


    const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: false,style: 'width: 30px'},
        {name: 'partnerName', label: 'partnerName', field: 'partnerName', align: 'left', sortable: true,style: 'width: 150px'},
        {name: 'partnerCode', label: 'partnerCode', field: 'partnerCode' , align: 'left',sortable: true,style: 'width: 100px'},
        {name: 'shops', label: '#Shops', field: 'shop', align: 'center', sortable: false, style: 'width: 30px'},
        {name: 'users', label: '#Users', field: 'user', align: 'center', sortable: false, style: 'width: 30px'},
        {name: 'assets', label: '#Assets', field: 'asset' ,align: 'center', sortable: false,style: 'width: 30px' },
        {name: 'configs', label: '#Configs', field: 'config', align: 'center', sortable: false,style: 'width: 30px'},
        {name: 'products', label: '#Products', field: 'product', align: 'center', sortable: false,style: 'width: 30px'},
        {name: 'machines', label: '#Machines', field: 'machine', align: 'center', sortable: false,style: 'width: 30px'},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'left', sortable: false,style: 'width: 300px'}
    ]


    onMounted(() => {
        // get initial data from server (1st page)
        tableRef.value.requestServerInteraction()
        
    })



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
        console.log('Rows: ',rows.value)
        rows.value.forEach((row:any,index:number) => {
            row.index = startRow+index+1
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
        console.log("partnerCode: ",partnerCode, field)
        const target = "/" + field + "/" +partnerCode
        console.log("Target: ",target)
        // $q.notify({
        //     position: 'center',
        //     message: target,
        //     color:"red"
        // })

        router.push(target)
    }
</script>
<template>
    <!-- {{ data }} -->
    <div class="q-pa-md">
        <q-table
            flat bordered
            ref="tableRef"
            title="Asset List"
            :rows="rows"
            :columns="columns"
            row-key="index"
            selection="single"
            virtual-scroll
            :rows-per-page-options="[20,30,50,100]"
            :filter="filter"
            v-model:pagination="pagination"
            v-model:selected="selected"
            table-header-style="background: #eeeeee"
            binary-state-sort
            @request="onRequest"
        >
            
            <template #top>
                <div class ="col-3 text-h4 text-blue">Asset List</div>
                <q-space/>
                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-select filled dense 
                        v-model="shopSelected" 
                        :options="listShopOption" 
                        label="Shop" 
                        style="width: 200px"
                        @update:model-value="showTrans()"
                    />
                </div>

                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
                </div>
            
            </template>  

            <!-- <template #body-cell-assetCode="props" >
                <q-td :props = "props" >
                    {{ props.row.assetCode }}
                </q-td>
            </template> -->

            <!-- <template #body-cell-assetName="props" >
                <q-td :props = "props" >
                    {{ props.row.assetName }}
                </q-td>
            </template> -->

 

        </q-table>
        <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
    const {data} = useAuth()
    const {getAssetByPartner} = useAlvatoApi()
    definePageMeta({
            layout:'partner',
            // middleware: "auth",
            // auth:{
            //     unauthenticationOnly:false,
            //     navigateAuthenticatedTo: '/kiosk'
            // }
    })

    const tableRef = ref()
    const selected = ref([])
    const filter = ref('')
    const loading = ref(false)
    // let rows: any[]= []
    let rows = ref()
    let shopSelected = ref('ALL')
    let listShopOption = ref(['ALL','rgh18','washpoint'])
    let typeSelected = ref('ALL')
    let listTypeOption = ref('ALL')
    const pagination= ref({
                sortBy:'desc',
                descending: false,
                page:1,
                rowsPerPage: 25,
                rowsNumber:1,
        })

    const columns = [
        {name:'index', label: 'No', field: 'index', align: 'left'},
        { name: 'assetName', label: 'Name', field: 'assetName', align: 'left', sortable: true },
        {
        name: 'assetCode',
        label: 'Code',
        align: 'left',
        field: 'assetCode',
        sortable: true
        },
        
        // { name: 'desc', label: 'Description', field: 'description' },
        { name: 'assetType', label: 'Type', field: 'assetTyper', align: 'left', sortable: true },
        { name: 'assetStatus', label: 'Status', field: 'assetStatus', align: 'left', sortable: true },
        { name: 'shopName', label: 'Shop', field:'shopName',align:'left', sortable:true },
        // { name: 'deviceName', label: 'Device', field:'deviceName',align:'left', sortable:true },
        { name: 'config', label: 'Config', field: 'configCode', align: 'left', sortable: true},
        { name: 'product', label: 'Products', field: 'productSKU' ,align: 'left', sortable: true },
        { name: 'updatedAt', label: 'Update', field: 'updatedAt', align: 'left', sortable: true }
    ]


    onMounted(() => {
            // get initial data from server (1st page)
            tableRef.value.requestServerInteraction()   
    })

    async function onRequest(props:any){
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter    

        const totalResult = await getRowsNumberCount(shopSelected.value)
        console.log("totalResult: ",totalResult.value?.totalCount._count)

        pagination.value.rowsNumber = totalResult.value?.totalCount._count as number
        console.log("pagination-rowsNumber: ", pagination.value.rowsNumber)
    
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


        // const {data:dataTable} = await getAssetByPartner(data.value?.user?.partnerCode)
        const {data:dataTable} = await useFetch('/api/asset/v1.0.0/getAll')
        console.log("dataTable:",dataTable.value)

        const count = dataTable.value?.data.length
        //   console.log("count:",count)

        // rows.value  = rows.value.concat(dataTable.value?.data)
        rows.value = dataTable.value?.data
        // console.log('rows: ',rows)

        rows.value.forEach((row:any,index:number) => {
            row.index = index+1
            row.shopName = row.shop?.shopName
            row.deviceName = row.device.deviceName
            // row.assetCount = row.assets.length
            row.updatedAt= new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'short',
                    timeStyle: 'medium',
                    timeZone: 'Asia/Bangkok',
                }).format(new Date(row.updatedAt))
        })  


    }


    async function getRowsNumberCount(filter:any){
        console.log("Filter Value: ",filter)

        //Without filter
        // if(!filter){
            const {data:rowsCount} = await useFetch('/api/asset/v1.0.0/recordsCount',{
                query:{filter:filter}
            })
            console.log("Result: ",rowsCount)
            return rowsCount
        // }

        //With filter
        // const rowsCount:any = await $fetch('/api/asset/v1.0.0/recordCount?filter='+filter)
        // console.log("Result:",rowsCount)
        // return rowsCount
    }



    async function showTrans(){
        console.log("shopName: ",shopSelected.value)
        tableRef.value.requestServerInteraction()
    }

    async function resetFilter(){
        shopSelected.value = 'ALL'
        tableRef.value.requestServerInteraction()
    }    


</script>
  
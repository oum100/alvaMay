<template>
    
    <div class="q-pa-md">
        <q-table
            flat bordered
            ref="tableRef"
            title="Asset List"
            :rows="rows"
            :columns ="columns"
            row-key = "index"
            selection="single"
            virtual-scroll
            :rows-per-page-options="[25,50,100]"
            v-model:pagination="pagination"
            :filter="filter"
            binary-state-sort
            @request="onRequest" 
        >

            <template #top>
                <div class ="col-3 text-h4 text-blue">Asset Infomation </div>
                <q-space /> 
                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-select filled dense 
                        v-model="shopSelected" 
                        :options="listShopOption" 
                        label="Filter by Partner" 
                        style="width: 200px"
                        @update:model-value="showTrans()"
                    />
                </div>
                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-select filled dense 
                        v-model="shopSelected" 
                        :options="listShopOption" 
                        label="Filter by shop" 
                        style="width: 200px"
                        @update:model-value="showTrans()"
                    />
                </div>

                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
                </div>

                
            </template>
            <!-- <template #body-cell-shopName="props" >
                <q-td :props = "props" >
                    {{ props.row.shop.shopName }}
                </q-td>
            </template> -->

            <template #body-cell-assetName="props" >
                <q-td :props = "props" >
                    {{ props.row.assetName }}
                </q-td>
            </template>

            <template #body-cell-assetCode="props" >
                <q-td :props = "props" >
                    {{ props.row.assetCode }}
                </q-td>
            </template>
        </q-table>           
       
        
    </div>
</template>

<script setup lang="ts">
    const {data:userInfo} = useAuth()
    const tableRef = ref()
    const rows = ref()
    const filter = ref('')
    const pagination= ref({
        sortBy: 'desc',
        descending: false,
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
    })

    let shopSelected = ref('ALL')
    let listShopOption = ref(['ALL','RGH18','WASHPOINT'])


    const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'assetName', label: 'Asset Name', field: 'assetName', align: 'left', sortable: true},
        {name: 'assetCode', label: 'Asset Code', field: 'assetCode' , align: 'left',sortable: false},
        {name: 'assetType', label: 'AssetType', field: 'assetType', align: 'left', sortable: true},
        {name: 'assetStatus', label: 'Status', field: 'assetStatus', align: 'left', sortable: false},
        {name: 'config', label: 'Config', field: 'configCode', align: 'left', sortable: true},
        {name: 'product', label: 'Products', field: 'productSKU' ,align: 'left', sortable: true },
        {name: 'partnerName', label: 'Partner Name', field: 'partnerName', align: 'left', sortable: true},
        {name: 'shopName', label: 'Shop Name', field: 'shopName', align: 'left', sortable: true},
        // {name: 'updatedAt', label: 'Last Update', field: 'updatedAt', align: 'left', sortable: false},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false}
    ]


    onMounted(() => {
        // get initial data from server (1st page)
        tableRef.value.requestServerInteraction()
        
    })

    async function onRequest(props:any){

        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter 

        const totalResult = await getRowsNumberCount(shopSelected.value)
        console.log("totalResult: ",totalResult)

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

        const {data:dataTable} = await useFetch('/api/asset/v1.0.0/getAll')
        console.log('dataTable: ',dataTable.value)

        const count = dataTable.value?.data.length

        rows.value = dataTable.value?.data
        console.log('Rows: ',rows.value)

        rows.value.forEach((row:any,index:number) => {
            row.index = index+1
            row.partnerName = row.partner?.partnerName
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

    async function showTrans(){
        console.log("shopName: ",shopSelected.value)
        
        tableRef.value.requestServerInteraction()
    }

    async function resetFilter(){
        shopSelected.value = 'ALL'
 
        tableRef.value.requestServerInteraction()
    }

    async function getRowsNumberCount(filter:any){
        const {data:rowsCount} = await useFetch('/api/asset/v1.0.0/recordsCount',{
                query:{filter:filter}
            })
            console.log("Result: ",rowsCount)
            return rowsCount
    }
</script>
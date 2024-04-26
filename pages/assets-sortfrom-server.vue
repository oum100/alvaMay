<template>
    
    <div class="q-pa-md">
        <q-table
            flat bordered
            ref="tableRef"
            title="Asset List"
            :rows="rows"
            :columns ="columns"
            row-key = "index"
            selection="multiple"
            virtual-scroll
            :rows-per-page-options="[2,5,10,20,50]"
            v-model:pagination="pagination"
            v-model:selected="selected"
            :filter="filter"
            binary-state-sort
            table-header-style="background: #eeeeee"
            @request="onRequest" 
            
        >

            <template #top>
                <div class ="col-3 text-h4 text-blue">Asset Infomation </div>
                <q-space /> 
                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
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
                    <q-select filled dense 
                        v-model="shopSelected" 
                        :options="listShopOption" 
                        label="Filter by shop" 
                        emit-value
                        map-options
                        style="width: 200px"
                        @update:model-value="updateInfo()"
                    />
                </div>

                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
                </div>

                
            </template>
            <template #body-cell-partner="props" >
                <q-td :props = "props" >
                    {{ props.row.partnerName }}
                </q-td>
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
        <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { allow } from 'joi';

    const {data:userInfo} = useAuth()
    const tableRef = ref()
    const rows = ref()
    const filter:any = ref('')
    const selected = ref([])
    const pagination= ref({
        sortBy: 'desc',
        descending: false,
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
    })

    let partnerSelected = ref('ALL')
    let listPartnerOption = ref()
    // let listPartnerOption = ref(['ALL','xyz','Alvato'])
    // let listPartnerOption = ref([
    //     {label: 'ALL',value:'ALL'},
    //     {label: 'XYZ',value:'88875'},
    //     {label: 'Alvato',value:'41492'}
    // ])

    const {data:result} = await useFetch('/api/partner/v1.0.0/getPartnerQSelectOption')
    listPartnerOption.value = result.value?.data
    // console.log('alist:',listPartnerOption)

    let shopSelected = ref('ALL')
    let listShopOption = ref()
    // let listShopOption = ref(['ALL','RegentHome18'])
    // let listShopOption = ref([
    //     {label:'ALL',value:'ALL'},
    //     {label:'RGH18',value:'88875-001'},
    // ])
    const {data:shopResult} = await useFetch('/api/shop/v1.0.0/getShopQSelectOption')
    listShopOption.value = shopResult.value?.data



    filter.value = {
        partner: partnerSelected.value,
        shop: shopSelected.value
    }

    const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'assetName', label: 'Asset Name', field: 'assetName', align: 'left', sortable: true},
        {name: 'assetCode', label: 'Asset Code', field: 'assetCode' , align: 'left',sortable: true},
        {name: 'assetType', label: 'AssetType', field: 'assetType', align: 'left', sortable: false},
        {name: 'assetStatus', label: 'Status', field: 'assetStatus', align: 'left', sortable: false},
        {name: 'config', label: 'Config', field: 'configCode', align: 'left', sortable: false},
        {name: 'product', label: 'Products', field: 'productSKU' ,align: 'left', sortable: false },
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
        const {data:dataTable} = await useFetch('/api/asset/v1.0.0/listByPagination',{
            method:'POST',
            body: {
                "partnerCode":partnerSelected.value,
                "shopCode": shopSelected.value,
                "page":startRow,
                "rowsPerPage":rowsPerPage,
                "rowsNumber":fetchCount,
            }
        })
        // console.log('dataTable: ',dataTable.value)

        rows.value = dataTable.value?.data
        // console.log('Rows: ',rows.value)

        rows.value.forEach((row:any,index:number) => {
            row.index = startRow+index+1
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

    async function updateInfo(){
        console.log('Partner: ',partnerSelected.value)
        console.log("shop: ",shopSelected.value)

        filter.value = {
            partner: partnerSelected.value,
            shop: shopSelected.value
        }
        tableRef.value.requestServerInteraction()
    }

    async function resetFilter(){
        partnerSelected.value = 'ALL'
        shopSelected.value = 'ALL'
        filter.value = {
            partner: partnerSelected.value,
            shop: shopSelected.value
        }

        tableRef.value.requestServerInteraction()
    }

    async function getRowsNumberCount(filter:any){
        // console.log('filter1: ',filter.partner)
        // console.log('filter2: ',filter.shop)

        const {data:rowsCount} = await useFetch('/api/asset/v1.0.0/recordsCount',{
            query:{
                partner:filter.partner,
                shop:filter.shop
            }
        })
        // console.log("ResultGetRow: ",rowsCount)
        return rowsCount
    }

</script>
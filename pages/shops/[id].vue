<template>
    
    <div class="q-pa-md">
        <q-table
            flat bordered
            ref="tableRef"
            title="Shop List"
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
                <div class ="col-3 text-h4 text-blue">Shop List </div>
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
                    <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
                </div>

                <div class="q-mx-md q-gutter-md" style="max-width: 200px">
                    <q-btn id="new" icon="add_circle" color="green">&nbspShop</q-btn>
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
    const route = useRoute()

    const {data:userInfo} = useAuth()
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

    //To Create list of ListPartnerOption
    let partnerSelected = ref('ALL')
    let listPartnerOption = ref([{label:'ALL',value:'ALL'}])
    const {data:partnerResult} = await useFetch('/api/partner/v1.0.0/getPartnerQSelectOption')
    partnerResult.value?.data.forEach( (item:any) => {
      // console.log("Each Item:",item)
      listPartnerOption.value.push(item)
    })
    // console.log('PartnerlistOption:',listPartnerOption)
    if(route.params.id != '0'){
    partnerSelected.value = route.params.id
    }

    //To create list of ListShopOption
    // let shopSelected = ref('ALL')
    // let listShopOption = ref([{label:'ALL',value:'ALL'}])
    // const {data:shopResult} = await useFetch('/api/shop/v1.0.0/getShopQSelectOption')
    // shopResult.value?.data.forEach( (item:any) => {
    //   // console.log("Each Item:",item)
    //   listShopOption.value.push(item)
    // })


    filter.value = {
        partner: partnerSelected.value,
        // shop: shopSelected.value
    }

    const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'shopName', label: 'Shop Name', field: 'shopName', align: 'left', sortable: true},
        {name: 'shopCode', label: 'Shop Code', field: 'shopCode' , align: 'left',sortable: true},
        {name: 'partnerName', label: 'Partner Name', field: 'partnerName', align: 'left', sortable: true},
        // {name: 'partnerCode', label: 'Partner Code', field: 'partnerCode', align: 'left', sortable: false},
        {name: 'asset', label: 'Total Assets', field: 'asset' ,align: 'center', sortable: true },
        {name: 'user', label: 'Manage By', field: 'email', align: 'left', sortable: true},
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

        console.log("sortBy: ",sortBy)
        console.log("descending: ", descending)
        

        const totalResult = await getRowsNumberCount(filter)
        console.log("totalResult: ",totalResult)

        pagination.value.rowsNumber = totalResult?.value?.totalCount as number
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


        //Fetch from srver
        // const {data:dataTable} = await useFetch('/api/asset/v1.0.0/getAll')
        loading.value = true
        const {data:dataTable} = await $fetch('/api/shop/v1.0.0/listByPagination',{
            method:'POST',
            body: {
                "partnerCode":partnerSelected.value,
                "page":startRow,
                "rowsPerPage":rowsPerPage,
                "rowsNumber":fetchCount,
            }
        })
        console.log('dataTable: ',dataTable)
        // rows = rows.concat(dataTable.value?.data)
        // console.log("Rows: ",rows)

        // rows.forEach((row:any,index:number) => {
        //     row.index = startRow+index+1
        //     row.partnerName = row.partner?.partnerName
        //     row.email = row.user?.email
        //     row.asset = row._count.assets
        // }) 

        rows.value = dataTable as any
        console.log('Rows: ',rows.value)

        const data2 = rows.value.slice()
        // const data2 = dataTable.value?.data.slice()
        console.log("Sorted->Data Before",data2)
        if(sortBy){
          const sortFn = 
            sortBy ==='partnerName'
            ?(descending
              ?(a:any, b:any) => (a.partner.partnerName > b.partner.partnerName ? -1 : a.partner.partnerName < b.partner.partnerName ? 1: 0)
              :(a:any, b:any) => (a.partner.partnerName > b.partner.partnerName ? 1 : a.partner.partnerName < b.partner.partnerName ? -1: 0)
            )
            :sortBy === 'shopName'
            ?(descending
              ?(a:any, b:any) => (a.shopName > b.shopName ? -1 : a.shopName < b.shopName ?  1: 0)
              :(a:any, b:any) => (a.shopName > b.shopName ?  1 : a.shopName < b.shopName ? -1: 0)               
            )
            :sortBy === 'shopCode'
            ?(descending
              ?(a:any, b:any) => (a.shopCode > b.shopCode ? -1 : a.shopCode < b.shopCode ?  1: 0)
              :(a:any, b:any) => (a.shopCode > b.shopCode ?  1 : a.shopCode < b.shopCode ? -1: 0)               
            )            
            :(descending
              ?(a:any, b:any) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
              :(a:any, b:any) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            )
  
          rows.value = data2?.sort(sortFn)
          console.log("Sorted->returnedData",data2)
        }       

        rows.value.forEach((row:any,index:number) => {
            row.index = startRow+index+1
            row.partnerName = row.partner?.partnerName
            row.email = row.user?.email
            row.asset = row._count.assets
        })  
        loading.value = false
    }

    async function updateInfo(){
        console.log('Partner: ',partnerSelected.value)
        // console.log("shop: ",shopSelected.value)

        filter.value = {
            partner: partnerSelected.value,
            // shop: shopSelected.value
        }
        tableRef.value.requestServerInteraction()
    }

    async function resetFilter(){
        partnerSelected.value = 'ALL'
        // shopSelected.value = 'ALL'
        filter.value = {
            partner: partnerSelected.value,
            // shop: shopSelected.value
        }

        tableRef.value.requestServerInteraction()
    }

    async function getRowsNumberCount(filter:any){
        // console.log('filter1: ',filter.partner)
        // console.log('filter2: ',filter.shop)

        const {data:rowsCount} = await useFetch('/api/shop/v1.0.0/recordsCount',{
            query:{
                partner:filter.partner,
                shop:filter.shop
            }
        })
        // console.log("ResultGetRow: ",rowsCount)
        return rowsCount
    }

</script>
<template>
    <div class="q-pa-md">
      <q-table
        id="table1"
        flat bordered
        ref="tableRef"
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="index"
        :rows-per-page-options="[10,20,30,50,100]"
        v-model:pagination="pagination"
        v-model:selected="selected"
        selection="multiple"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequest"
      >
        <template #top>
            <!-- Header Information  -->
            <div class ="col-3 text-h4 text-blue">Asset Infomation </div>
            <q-space /> 
  
            <!-- Filter by partner  -->
            <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                <q-select id="selectPartner" filled dense 
                    v-model="partnerSelected" 
                    :options="listPartnerOption" 
                    label="Filter by Partner" 
                    emit-value
                    map-options
                    style="width: 200px"
                    @update:model-value="updateInfo()"
                />
            </div>
  
            <!-- Filter by shop  -->
            <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                <q-select id="selectShop" filled dense 
                    v-model="shopSelected" 
                    :options="listShopOption" 
                    label="Filter by shop" 
                    emit-value
                    map-options
                    style="width: 200px"
                    @update:model-value="updateInfo()"
                />
            </div>
  
            <!-- Reset filter  -->
            <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                <q-btn id="resetFilter" icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
            </div>
        </template>
  
        <!-- Customize column  -->
        <!-- <template #body-cell-partner="props" >
            <q-td :props = "props" >
                {{ props.row.partnerName }}
            </q-td>
        </template> -->
        
        <!-- Function Search -->
        <!-- <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->
  
      </q-table>
      <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
      </div>
    </div>
  </template>
    
    <script setup lang="ts">
    //   import { useRouter } from "vue-router"

      const route = useRoute()

      console.log("partner: ",route.params.id)

      const tableRef = ref()
      const rows = ref([])
      const filter:any = ref('')
      const loading = ref(false)
      const selected = ref([])
      //Setting pagination properties
      const pagination = ref({
        sortBy:'asc',
        descending:false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 20
      })
      
      //Define columns to display on screen
      const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'partnerName', label: 'Partner Name', field: 'partnerName', align: 'left', sortable: true},
        {name: 'shopName', label: 'Shop Name', field: 'shopName', align: 'left', sortable: true},
        {name: 'assetName', label: 'Asset Name', field: 'assetName', align: 'left', sortable: true},
        {name: 'assetCode', label: 'Asset Code', field: 'assetCode' , align: 'left',sortable: false},
        {name: 'assetType', label: 'AssetType', field: 'assetType', align: 'left', sortable: true},
        {name: 'assetStatus', label: 'Status', field: 'assetStatus', align: 'left', sortable: true},
        {name: 'config', label: 'Config', field: 'configCode', align: 'left', sortable: false},
        {name: 'product', label: 'Products', field: 'productSKU' ,align: 'left', sortable: false },
        // {name: 'updatedAt', label: 'Last Update', field: 'updatedAt', align: 'left', sortable: false},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false}
      ]
  
  
  
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
      let shopSelected = ref('ALL')
      let listShopOption = ref([{label:'ALL',value:'ALL'}])
      const {data:shopResult} = await useFetch('/api/shop/v1.0.0/getShopQSelectOption')
      shopResult.value?.data.forEach( (item:any) => {
        // console.log("Each Item:",item)
        listShopOption.value.push(item)
      })
  
      // Fetch data from server by call to api listByPagination
      async function fetchFromServer (startRow:any, count:any, rowsPerPage:any, filter:any, sortBy:any, descending:any) {
        // console.log("descending: ",descending)
        // console.log("testPage sort: ",sortBy)
  
        // const {data:dataTable} = await useFetch('/api/asset/v1.0.0/listByPagination',{
        //     method:'POST',
        //     body: {
        //         "partnerCode":partnerSelected.value,
        //         "shopCode": shopSelected.value,
        //         "page":startRow,
        //         "rowsPerPage":rowsPerPage,
        //         "rowsNumber":count,
        //         // "sortBy":sortBy||'asc',
        //         // "descending": descending
        //     }
        // })
        // return dataTable.value?.data   
  
        const dataTable = await $fetch('/api/asset/v1.0.0/listByPagination',{
            method:'POST',
            body: {
                "partnerCode":partnerSelected.value,
                "shopCode": shopSelected.value,
                "page":startRow,
                "rowsPerPage":rowsPerPage,
                "rowsNumber":count,
                // "sortBy":sortBy||'asc',
                // "descending": descending
            }
        })
        // console.log("dataTable: ",dataTable)
        return dataTable.data  
      }
    
  
      //-------------  Handle every request for web page ---------------
      async function onRequest (props:any) {
        // console.log("Pagination: ",props.pagination)
  
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter
  
        loading.value = true
  
        
       
        // update rowsCount with appropriate value
        const totalResult =  await getRowsNumberCount(filter)
        // pagination.value.rowsNumber = totalResult.value?.totalCount as number
        pagination.value.rowsNumber = totalResult.totalCount as number
        console.log("page-rowsNumber: ",pagination.value.rowsNumber)
  
        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage
  
        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage
  
        // fetch data from "server"
        const returnedData = await fetchFromServer(startRow, fetchCount, rowsPerPage, filter, sortBy, descending)
        console.log("returnData: ",returnedData)
  
        rows.value = returnedData as any
  
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
              ?(a:any, b:any) => (a.shop.shopName > b.shop.shopName ? -1 : a.shop.shopName < b.shop.shopName ?  1: 0)
              :(a:any, b:any) => (a.shop.shopName > b.shop.shopName ?  1 : a.shop.shopName < b.shop.shopName ? -1: 0)               
            )
            :sortBy === 'assetName'
            ?(descending
              ?(a:any, b:any) => (a.assetName > b.assetName ? -1 : a.assetName < b.assetName ?  1: 0)
              :(a:any, b:any) => (a.assetName > b.assetName ?  1 : a.assetName < b.assetName ? -1: 0)               
            )           
            :sortBy === 'assetType'
            ?(descending
              ?(a:any, b:any) => (a.assetType > b.assetType ? -1 : a.assetType < b.assetType ?  1: 0)
              :(a:any, b:any) => (a.assetType > b.assetType ?  1 : a.assetType < b.assetType ? -1: 0)               
            )   
            :sortBy === 'assetStatus'
            ?(descending
              ?(a:any, b:any) => (a.assetStatus > b.assetStatus ? -1 : a.assetStatus < b.assetStatus ?  1: 0)
              :(a:any, b:any) => (a.assetStatus > b.assetStatus ?  1 : a.assetStatus < b.assetStatus ? -1: 0)               
            )  
            :(descending
              ?(a:any, b:any) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
              :(a:any, b:any) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            )
  
          rows.value = data2?.sort(sortFn)
          console.log("Sorted->returnedData",data2)
        }
  
        //Prepare for display
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
        // clear out existing data and add new
        // rows.value.splice(0, rows.value.length, ...returnedData)
  
        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
  
        // ...and turn of loading indicator
        loading.value = false
        
      }
    
      onMounted(() => {
        // get initial data from server (1st page)
        tableRef.value.requestServerInteraction()
      })
  
      async function getRowsNumberCount (filter:any) {
        // const {data:rowsCount} = await useFetch('/api/asset/v1.0.0/recordsCount',{
        //Nust recommended to use $fetch because of useFetch is for mouthed components
        const rowsCount = await $fetch('/api/asset/v1.0.0/recordsCount',{
            // query:{
            //     partner:filter.partner,
            //     shop:filter.shop
            // }
        })
        // console.log("ResultGetRow: ",rowsCount.value)
        return rowsCount
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
      
    </script>
    
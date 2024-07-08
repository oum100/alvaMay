<template>
    <div class="q-pa-md">
      <q-table
        id="table1"
        flat bordered
        ref="tableRef"
        title="Device List"
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
            <div class ="col-3 text-h4 text-blue">Device List </div>
            
  
            <!-- Filter by partner  -->
            <div class="q-mx-md q-guttar-md" style="max-width:180px">
                <q-select id="selectPartner" filled dense 
                    v-model="partnerSelected" 
                    :options="listPartnerOption" 
                    label="Filter by Partner" 
                    emit-value
                    map-options
                    style="width: 150px"
                    @update:model-value="updateInfo()"
                />
            </div>
  
            <!-- Filter by shop  -->
            <div class="q-mx-md q-guttar-md" style="max-width: 180px">
                <q-select id="selectShop" filled dense 
                    v-model="shopSelected" 
                    :options="listShopOption" 
                    label="Filter by shop" 
                    emit-value
                    map-options
                    style="width: 150px"
                    @update:model-value="updateInfo()"
                />
            </div>
  
            <!-- Reset filter  -->
            <div class="q-mx-md q-guttar-md" style="max-width: 180px">
                <q-btn id="resetFilter" 
                  icon="restart_alt" 
                  title="Set filter to default" 
                  @click="resetFilter"
                  style="width: 150px"
                  >Reset Filter</q-btn>
            </div>

            <!-- Add Device -->
            <div class="q-mx-md q-gutter-md" >
                <q-btn id="ota" 
                  icon="vertical_align_top" 
                  :color="selected.length>0?'green':'grey'" 
                  round
                  :disable="selected.length>0?'enable':'disable'"
                >
                  <q-tooltip>OTA</q-tooltip>
                </q-btn>

                <q-btn 
                  id="ota" 
                  icon="power_off" 
                  :color="selected.length>0?'green':'grey'" 
                  round
                  :disable="selected.length>0?'enable':'disable'"
                >
                  <q-tooltip>OFFLINE</q-tooltip>
                </q-btn>

                <q-btn 
                  id="ota" 
                  icon="power" 
                  :color="selected.length>0?'green':'grey'" 
                  round
                  :disable="selected.length>0?'enable':'disable'"
                >
                  <q-tooltip>ONLINE</q-tooltip>
                </q-btn>

                <q-btn 
                  id="ota" 
                  icon="restart_alt" 
                  :color="selected.length>0?'green':'grey'" 
                  round
                  :disable="selected.length>0?'enable':'disable'"
                >
                  <q-tooltip>RESET</q-tooltip>
                </q-btn>

                <q-btn 
                  id="add" 
                  icon="add_circle" 
                  color="green" 
                  unelevated rounded
                  >&nbspDevice
                </q-btn>

                <q-btn 
                  id="ota" 
                  icon="delete" 
                  :color="selected.length>0?'green':'grey'" 
                  round
                  :disable="selected.length>0?'enable':'disable'"
                >
                  <q-tooltip>DELETE</q-tooltip>
                </q-btn>
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
        <template #body-cell-actions="props">
          <q-td :props = "props" >
              <q-btn flat round icon="edit"><q-tooltip>Edit</q-tooltip></q-btn>
              <q-btn flat round icon="swap_horizontal_circle"><q-tooltip>Replace</q-tooltip></q-btn>
              <q-btn flat round icon="delete" color="red"><q-tooltip>Delete</q-tooltip></q-btn>
          </q-td>
        </template>
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
      const topBtnDisable = ref('disable')
      
      //Define columns to display on screen
      const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'deviceMac', label: 'MAC Address', field: 'deviceMac', align: 'left', sortable: true},
        {name: 'deviceName', label: 'Name', field: 'deviceName', align: 'left', sortable: true},
        {name: 'assetName', label: 'Asset Name', field: 'assetName', align: 'left', sortable: true},
        {name: 'firmware', label: 'Firmware', field: 'firmware' , align: 'left',sortable: true},
        {name: 'board', label: 'Board', field: 'board', align: 'left', sortable: true},
        {name: 'deviceType', label: 'Type', field: 'deviceType', align: 'left', sortable: true},
        {name: 'deviceStatus', label: 'Status', field: 'deviceStatus', align: 'left', sortable: true},
        {name: 'replaceBy', label: 'replaceBy', field: 'replaceBy', align: 'left', sortable: false},
        {name: 'replacedAt', label: 'replacedAt', field: 'replacedAt' ,align: 'left', sortable: false },
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
        partnerSelected.value = route.params.id as string
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
        const dataTable = await $fetch('/api/device/v1.0.0/listByPagination',{
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
          console.log("Sort By: ",sortBy)
          const sortFn = 
            sortBy ==='deviceMac'
            ?(descending
              ?(a:any, b:any) => (a.deviceMac > b.deviceMac ? -1 : a.deviceMac < b.deviceMac ? 1: 0)
              :(a:any, b:any) => (a.deviceMac > b.deviceMac ? 1 : a.deviceMac < b.deviceMac ? -1: 0)
            )
            :sortBy === 'deviceName'
            ?(descending
              ?(a:any, b:any) => (a.deviceName > b.deviceName ? -1 : a.deviceName < b.deviceName ?  1: 0)
              :(a:any, b:any) => (a.deviceName > b.deviceName ?  1 : a.deviceName < b.deviceName ? -1: 0)               
            )
            :sortBy === 'firmware'
            ?(descending
              ?(a:any, b:any) => (a.firmware > b.firmware ? -1 : a.firmware < b.firmware ?  1: 0)
              :(a:any, b:any) => (a.firmware > b.firmware ?  1 : a.firmware < b.firmware ? -1: 0)               
            )           
            :sortBy === 'deviceType'
            ?(descending
              ?(a:any, b:any) => (a.deivceType > b.deviceType ? -1 : a.deviceType < b.deviceType ?  1: 0)
              :(a:any, b:any) => (a.deivceType > b.deviceType ?  1 : a.deviceType < b.deviceType ? -1: 0)               
            )   
            :sortBy === 'deviceStatus'
            ?(descending
              ?(a:any, b:any) => (a.deviceStatus > b.deviceStatus ? -1 : a.deviceStatus < b.deviceStatus ?  1: 0)
              :(a:any, b:any) => (a.deviceStatus > b.deviceStatus ?  1 : a.deviceStatus < b.deviceStatus ? -1: 0)               
            )  
            :sortBy === 'assetName'
            ?(descending
              ?(a:any, b:any) => (a.asset.assetName > b.asset.assetName ? -1 : a.asset.assetName < b.asset.assetName ?  1: 0)
              :(a:any, b:any) => (a.asset.assetName > b.asset.assetName ?  1 : a.asset.assetName < b.asset.assetName ? -1: 0)               
            )     
            :sortBy === 'board'
            ?(descending
              ?(a:any, b:any) => (a.board > b.board ? -1 : a.board < b.board ?  1: 0)
              :(a:any, b:any) => (a.board > b.board ?  1 : a.board < b.board ? -1: 0)               
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
            row.assetName = row.asset.assetName

            if(row.replacedAt != null){
              row.replacedAt= new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'short',
                timeStyle: 'medium',
                timeZone: 'Asia/Bangkok',
              }).format(new Date(row.replacedAt))
            }

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
    
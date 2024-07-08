<template>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-column-table"
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
        dense
      >
        <template #top>
            <!-- Header Information  -->
            <div class ="col-3 text-h4 text-blue">Asset Management</div>
            <q-space /> 

            <q-input borderless dense debounce="300" filled v-model="filter" placeholder="Search" style="width: 150px">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
  
            <!-- Filter by partner  -->
            <div class="q-mx-md q-guttar-md" style="max-width: 200px">
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
            <div class="q-mx-md q-guttar-md" style="max-width: 200px">
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
            <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                <q-btn id="resetFilter" icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
            </div>

            <!-- Add Device -->
            <div class="q-mx-md q-gutter-md" style="max-width: 200px">
                <q-btn id="new" icon="add_circle" color="green">&nbspAsset</q-btn>
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
        <!-- <template #header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-italic text-purple"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template> -->

        <template #body-cell-assetName="props">
          <q-td :props="props">
            <div class="text-bold">{{ props.row.assetName }}</div>
            <!-- <q-tooltip anchor="center right" self="center middle">{{ props.row.assetCode }}</q-tooltip> -->
          </q-td>
        </template>

        <template #body-cell-assetType="props">
          <q-td :props="props">
            <q-icon v-if="props.row.assetType == 'WASHER'" name="local_laundry_service" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">WASHER</q-tooltip>
            </q-icon>
            <q-icon v-else-if="props.row.assetType == 'DRYER'" name="dry_cleaning" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">DRYER</q-tooltip>
            </q-icon>
            <q-icon v-else-if="props.row.assetType == 'FUEL'" name="local_gas_station" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">Gas Station</q-tooltip>
            </q-icon>
            <q-icon v-else-if="props.row.assetType == 'WATER'" name="local_drink" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">Water Station</q-tooltip>
            </q-icon>
            <q-icon v-else-if="props.row.assetType == 'COFFEE'" name="coffee_maker" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">Coffee Machine</q-tooltip>
            </q-icon>
            <q-icon v-else-if="props.row.assetType == 'EVCHARGER'" name="ev_charger" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">EV Charger</q-tooltip>
            </q-icon>
            <q-icon v-else-if="props.row.assetType == 'ROBOT'" name="toys" size="sm" color="grey">
              <q-tooltip anchor="center right" self="center middle">Toys</q-tooltip>
            </q-icon>
            <div v-else class="text-grey text-weight-bold">{{ props.row.assetType }}</div>
          </q-td>
        </template>

        <template #body-cell-assetStatus="props">
          <q-td :props="props">
            <div v-if="props.row.assetStatus == 'ACTIVATED'" class="text-teal text-weight-medium">{{ props.row.assetStatus }}</div>
            <div v-if="props.row.assetStatus == 'READY'" class="text-green text-bold">{{ props.row.assetStatus }}</div>
            <div v-if="props.row.assetStatus == 'BUSY'" class="text-red text-bold">{{ props.row.assetStatus }}</div>
            <div v-if="props.row.assetStatus == 'OFFLINE'" class="text-grey text-bold">{{ props.row.assetStatus }}</div>
            <div v-if="props.row.assetStatus == 'BOOKED'" class="text-blue text-bold">{{ props.row.assetStatus }}</div>
            <div v-if="props.row.assetStatus == 'FAILED'" class="text-red text-bold">
              <q-icon name="close" size="sm"/>
              {{ props.row.assetStatus }}
            </div>
          </q-td>
        </template>

        <template #body-cell-device="props">
          <q-td :props="props">
            <q-btn flat rounded class="text-weight-regular" @click="cellClick(props.row.deviceMac,props.col.name)">{{ props.value }}</q-btn>
          </q-td>
        </template>

        <template #body-cell-machine="props">
          <q-td :props="props">
            <q-btn flat rounded class="text-weight-regular" @click="cellClick(props.row.machineSN,props.col.name)">{{ props.value }}</q-btn>
          </q-td>
        </template>

        <template #body-cell-config="props">
          <q-td :props="props">
            <q-btn flat rounded class="text-weight-regular" @click="cellClick(props.row.config,props.col.name)">{{ props.value }}</q-btn>
          </q-td>
        </template>
        
        <template #body-cell-product="props">
          <q-td :props="props" >
            <q-badge v-for="prod,inx in props.row.products" class="q-mx-xs" rounded>
                {{ prod.price }}
                <q-tooltip>Price:{{prod.price}}, Time:{{ prod.qty }} M</q-tooltip>
            </q-badge>        
            <!-- <div v-for="prod,inx in props.row.products">
              <q-badge v-if="inx==0" color="green" class="q-mx-xs">
                {{ prod.price }}
                <q-tooltip>Price:30, Time:35M, Temp:30°C, Rinse:2</q-tooltip>
              </q-badge>
              <q-badge v-if="inx==1" color="blue" class="q-mx-xs">
                {{ prod.price }}
                <q-tooltip>Price:30, Time:35M, Temp:30°C, Rinse:2</q-tooltip>
              </q-badge>
              <q-badge v-if="inx==2" color="red" class="q-mx-xs">
                {{ prod.price }}
                <q-tooltip>Price:30, Time:35M, Temp:30°C, Rinse:2</q-tooltip>
              </q-badge>
            </div> -->
          </q-td>
        </template>        

        <template #body-cell-actions="props">
          <q-td :props = "props" >
              <q-btn flat rounded icon="edit" @click="clickEdit(props.row.index)"></q-btn>
              <q-btn flat rounded icon="delete" color="red" ></q-btn>
          </q-td>
        </template>
  
      </q-table>
      <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
      </div>
      
      <q-dialog v-model="editFlag">
        <q-card>
          <q-card-section>
            <div class="text-h5">Edit Asset</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
        </q-card>
      </q-dialog>
      

    </div>
  </template>
    
<script setup lang="ts">
  import { useRouter } from "vue-router"
  const route = useRoute()
  const router = useRouter()

  // console.log("partner: ",route.params.id)

  const tableRef = ref()
  const rows = ref([])
  const filter:any = ref('')
  const loading = ref(false)
  const selected = ref([])
  const editFlag = ref(false)
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
    {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true,  style:'width:10px'},
    {name: 'partnerName', label: 'Partner Name', field: 'partnerName', align: 'left', sortable: true, style:'width:100px'},
    {name: 'shopName', label: 'Shop Name', field: 'shopName', align: 'left', sortable: true,style:'width:100px'},
    {name: 'assetName', label: 'Asset Name', field: 'assetName', align: 'left', sortable: true, style:'width:100px'},
    {name: 'assetCode', label: 'Asset Code', field: 'assetCode' , align: 'left',sortable: true, style:'width:100px'},
    {name: 'assetType', label: 'Asset Type', field: 'assetType', align: 'center', sortable: true, style:'width:50px'},
    {name: 'assetStatus', label: 'Status', field: 'assetStatus', align: 'center', sortable: true, style:'width:50px'},
    {name: 'device', label: 'Device', field: 'deviceName' , align: 'center',sortable: false, style:'width:100px'},
    {name: 'machine', label: 'Machine', field: 'machine', align: 'center', sortable: true, style:'width:100px'},
    {name: 'config', label: 'Config', field: 'configCode', align: 'center', sortable: false, style:'width:50px'},
    {name: 'product', label: 'Products', field: 'products' ,align: 'left', sortable: false, style:'width:100px'},
    // {name: 'updatedAt', label: 'Last Update', field: 'updatedAt', align: 'left', sortable: false, style: 'width: 30px'},
    {name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false, style:'width:100px'}
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
    const dataTable = await $fetch('/api/asset/v1.0.0/listByPagination',{
        method:'POST',
        body: {
            "partnerCode":partnerSelected.value,
            "shopCode": shopSelected.value,
            "page":startRow,
            "rowsPerPage":rowsPerPage,
            "rowsNumber":count,
        }
    })
    // console.log("dataTable: ",dataTable)
    return dataTable
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


    rows.value = returnedData.data
    const data2 = rows.value.slice()

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
        :sortBy === 'assetCode'
        ?(descending
          ?(a:any, b:any) => (a.assetCode > b.assetCode ? -1 : a.assetCode < b.assetCode ?  1: 0)
          :(a:any, b:any) => (a.assetCode > b.assetCode ?  1 : a.assetCode < b.assetCode ? -1: 0)               
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
        row.deviceName = row.device?.deviceName
        row.deviceMac = row.device?.deviceMac
        // row.machine = row.machine?.serialNumber
        row.machine = row.machine?.name
        // row.machineSN = row.machine?.serialNumber
        // row.machine = "Serial Number"
        row.updatedAt= new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Asia/Bangkok',
        }).format(new Date(row.updatedAt))
        
        row.products = row.product.map(myFunction)
        console.log(row.products)
        // row.product.forEach((prod:any) => {
        //   console.log("Product List")
        //   // console.log(prod)
        //   // console.log(prod.sku)
        //   // console.log(prod.price)
        //   // cosnsole.log(prod.qty)
        //   // console.log(prod.unit)
        //   // row.products
        //   // console.log(row.products)
        // })
    })  

    function myFunction(value:any){
      return{
        sku: value.sku,
        price: value.price,
        qty: value.qty,
        unit: value.unit
      }
    }


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

  async function clickEdit(inx:any){
    editFlag.value = true

    console.log("inx: ",inx)
    console.log("rowNow: ", rows.value[inx-1])
  }
  
  async function cellClick(target:string, field:string){
    // This funcition handle when cell click and redirect to field of that parterCode

    const linkTo = "/" + field + "/" + target
    router.push(linkTo)
  }
</script>
    
<style lang="sass">
  .my-sticky-header-column-table
    /* height or max-height is important */
    //height: 310px

    /* specifying max-width so the example can
      highlight the sticky column on any browser window */
    //max-width: 600px

    td:first-child
      /* bg color is important for td; just specify one */
      //background-color: #00b4ff

    tr th
      position: sticky
      /* higher than z-index for td below */
      z-index: 2
      /* bg color is important; just specify one */
      background: #c0e2f8

    /* this will be the loading indicator */
    thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
      /* highest z-index */
      z-index: 3
    thead tr:first-child th
      top: 0
      z-index: 1
    tr:first-child th:first-child
      /* highest z-index */
      z-index: 3

    td:first-child
      z-index: 1

    td:first-child, th:first-child
      position: sticky
      left: 0

    /* prevent scrolling behind sticky top row on focus */
    tbody
      /* height of all previous header rows */
      scroll-margin-top: 48px
</style>
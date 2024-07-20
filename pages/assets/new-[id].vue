<template>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-column-table"
        id="table1"
        flat
        bordered
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
        :dense="$q.screen.lt.md"
      >
        <template #top>
          <div class="row full-width q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6 col-md-3 text-h5 text-blue">Asset Management</div>
            <q-space />
            
            <div class="col-12 col-sm-6 col-md-3">
              <q-input borderless dense debounce="300" filled v-model="filter" placeholder="Search" class="full-width">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
  
            <div class="col-12 col-sm-6 col-md-3">
              <q-select id="selectPartner" filled dense 
                  v-model="partnerSelected" 
                  :options="listPartnerOption" 
                  label="Filter by Partner" 
                  emit-value
                  map-options
                  class="full-width"
                  @update:model-value="updateInfo()"
              />
            </div>
  
            <div class="col-12 col-sm-6 col-md-3">
              <q-select id="selectShop" filled dense 
                  v-model="shopSelected" 
                  :options="listShopOption" 
                  label="Filter by shop" 
                  emit-value
                  map-options
                  class="full-width"
                  @update:model-value="updateInfo()"
              />
            </div>
  
            <div class="col-12 col-sm-6 col-md-3">
              <q-btn id="resetFilter" icon="restart_alt" label="Reset Filter" class="full-width" @click="resetFilter" />
            </div>
  
            <div class="col-12 col-sm-6 col-md-3">
              <q-btn id="new" icon="add_circle" color="green" label="Asset" class="full-width" />
            </div>
          </div>
        </template>
  
        <!-- Rest of the template remains the same -->
  
      </q-table>
  
      <!-- Rest of the component remains the same -->
  
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
  
    @media (max-width: 600px)
      td:first-child, th:first-child
        position: static
        left: auto
  
    // Add more media queries as needed for different screen sizes

  </style>
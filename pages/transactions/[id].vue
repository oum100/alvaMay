<template>
    <div class="row q-my-md" style="height: 250px" >
        <div class="col-6 q-px-md" >
            <!-- <q-card style="background: radial-gradient(circle, #ffffff 30%, #80daff 70%, #35a2ff 100%)" class="text-white">
                <q-card-section> -->
                    <apexchart type="bar"  width="600" height="250" :options="chart2.chartOptions" :series="chart2.series"></apexchart>
                <!-- </q-card-section>
            </q-card> -->
        </div>
        <div class="col-3 q-px-md">
            <q-card class="text-white" style="width: 300px; height:250px">
                <q-card-section>
                    <apexchart type="donut"  width="280" height="250" :options="chart3.chartOptions" :series="chart3.series"></apexchart>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-3 q-px-md">
            <q-card class="text-white" style="width: 300px; height:250px">
                <q-card-section>
                    <apexchart type="donut"  width="280" height="250" :options="chart3.chartOptions" :series="chart3.series"></apexchart>
                </q-card-section>
            </q-card>
        </div>
    </div>
    <div class = "q-pa-md">
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
            dense
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
                    <q-tooltip anchor="top middle">
                      assetCode: 
                      {{ props.row.assetCode }}
                    </q-tooltip>
                </q-td>
            </template>

            <template #body-cell-price="props">
              <q-td :props = "props" > 
                  {{ props.row.price }}
                <q-tooltip anchor="top middle">
                  Price: {{ props.row.productPrice }}<br>
                  SKU: {{props.row.productSku}}<br>
                  QTY: {{  props.row.productQty }} {{ props.row.asset.product[0].unit }}
                </q-tooltip>
              </q-td>
            </template>

            <template #body-cell-paidNotify = "props">
              <q-td :props = "props" >
                <q-btn flat rounded @click="clickPaidNotify(props.row.index)">
                  {{ props.row.paidNotify }}
                  <q-tooltip anchor="top middle">
                    Transactions_id: {{props.row.paymentTrans}}
                  </q-tooltip>
                </q-btn>
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
            Selected: {{JSON.stringify(selected) }}
        </div>
    </div>

  
    <div>
      <q-dialog v-model="clickPaidNotifyFlag" 
      persistent transition-show="flip-down" transition-hide="flip-up"
      backdrop-filter="blur(4px) saturate(150%)"
      >
        <q-card style="width:800px;max-width: 80vw; height: 450px;">
          <q-toolbar class="bg-primary text-white">
            <q-avatar>
              <img src="/images/alvato/Alvato.png">
            </q-avatar>

            <q-toolbar-title><span class="text-weight-bold">Payment Information</span></q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <!-- <q-card-section class="row items-center q-pb-none bg-teal text-white" >
            <div class="text-h6">Paid Notify Information</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section> -->
          <q-card-section v-if="selectedRow.paymentBy == 'CASH'">
            Payment By: {{ selectedRow.paymentBy }}
            <div class="text-weight-bold">Payment Request:</div>
          </q-card-section>
          <q-card-section v-else>
            <div class="row">
              <div class="col-6 q-gutter-sm">
                <div><span class="label text-weight-bold ">Payment By: </span>{{ selectedRow.paymentBy }}</div>
                <div><span class="label text-weight-bold ">Transaction ID: </span> {{ selectedRow.cyberpayPaidNotify.transaction_id }}</div>
                <div><span class="label text-weight-bold ">Reference 1: </span> {{selectedRow.cyberpayPaidNotify.ref_1}}</div>
                <div><span class="label text-weight-bold ">Reference 2: </span> {{selectedRow.cyberpayPaidNotify.ref_2}}</div>
                <div><span class="label text-weight-bold ">Reference 3: </span>{{selectedRow.cyberpayPaidNotify.ref_3}}</div>
                <div><span class="label text-weight-bold ">Service Fee: </span> {{selectedRow.cyberpayPaidNotify.service_fee }}</div>
              </div>
              <div class="col-6 q-gutter-sm">
                <span class="label text-weight-bold text-deep-orange">Payment Request:</span>
                {{ selectedRow.cyberpayPaidNotify.paymentRequest.id }}

                <q-input label="QR Text" v-model="selectedRow.cyberpayPaidNotify.paymentRequest.qrText" autogrow>
                  <template v-slot:label>
                    <span class="text-weight-bold text-deep-orange">QR Text</span>
                  </template>
                  <template v-slot:append>
                    <q-icon name="content_copy" />
                    <q-tooltip>copy QR text</q-tooltip>
                  </template>
                </q-input>
                <br>
                <span class="label text-weight-bold text-deep-orange">QR Image</span>
                <div class="text-center">
                  <img :src="qrImage + selectedRow.cyberpayPaidNotify.paymentRequest.qrImage" width="150" height="150">
                </div>
              </div>
            </div>

          </q-card-section>
          <!-- <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions> -->
        </q-card>
      </q-dialog>
    </div> 
 

</template>


<script setup  lang="ts">
    // definePageMeta({
    //     layout:'partner',
    //     // middleware: "auth",
    //     // auth:{
    //     //     unauthenticationOnly:false,
    //     //     navigateAuthenticatedTo: '/kiosk'
    //     // }
    // })

    //----------------------- Chart -----------------------
    const chart2 = ref({
        series: [{
            name: 'CASH',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66,33,49,87]
          }, {
            name: 'QR',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 98, 87, 105]
          }, {
            name: 'Total',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 98, 87, 105]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 200,
            //   width:600
            },
            title: {text:"Revenue"},
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val:any) {
                  return "$ " + val + "Baht"
                }
              }
            },
          },
    })

    const chart3 = ref({
        series: [44, 55, 13, 43, 22],
          chartOptions: {
            chart: {
                height:200,
            //   width: 350,
              type: 'donut',
            },
            title: {text:"Assets"},
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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

    // ----------------------- Table -----------------------
    const route = useRoute()

    const {data:userInfo} = useAuth()
    const tableRef = ref()
    // let rows = ref([])
    // let rows: any[]= []
    let rows = ref([])
    const filter:any = ref('')
    const loading = ref(false)
    const selected = ref([])
    const selectedRow:any = ref([])
    const pagination= ref({
        sortBy: 'desc',
        descending: false,
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
    })

    let clickEditFlag = ref(false)
    const clickPaidNotifyFlag = ref(false)
    let qrImage = ref('data:image/png;base64,')

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
        {name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true},
        {name: 'assetName', label: 'Asset Name', field: 'assetName' ,align: 'center', sortable: true },
        // {name: 'assetCode', label: 'Asset Code', field: 'assetCode' ,align: 'center', sortable: true },
        // {name: 'partnerName', label: 'Partner', field: 'partnerName', align: 'left', sortable: true},
        // {name: 'shopName', label: 'Shop', field: 'shopName', align: 'left', sortable: true},

        {name: 'paymentBy', label: 'Payment By', field: 'paymentBy', align: 'left', sortable: true},
        {name: 'price', label: 'Price', field: 'price', align: 'left', sortable: true},
        {name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true},
        {name: 'jobStatus', label: 'Job Status', field: 'jobStatus', align: 'left', sortable: true},
        {name: 'paidNotify', label: 'Paid Notify', field: 'paidNotify', align: 'left', sortable: true},
        

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
        const {data:dataTable} = await $fetch('/api/transaction/v1.0.0/listByPagination',{
            method:'POST',
            body: {
                "partnerCode":partnerSelected.value,
                "page":startRow,
                "rowsPerPage":rowsPerPage,
                "rowsNumber":fetchCount,
            }
        })
        console.log('Transaction: ',dataTable)
 

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
            row.date =  new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'short',
                timeStyle: 'medium',
                timeZone: 'Asia/Bangkok',
            }).format(new Date(row.createdAt))
            row.paidNotify = row.paidNotify_id
            row.assetName = row.asset.assetName
            row.paymentBy = row.paymentBy
            row.price = row.amount
            row.jobStatus = row.jobRemain
            row.productSku = row.asset.product[0].sku
            row.productPrice = row.asset.product[0].price
            row.productQty = row.asset.product[0].qty
     
            // console.log("cyberpayPaidNotify",row.cyberpayPaidNotify.transaction_id)
            // console.log("cashPaidNotify",row.cashPaidNotify.transaction_id)

            switch(row.paymentBy){
              case 'CYBERPAY':
                row.paymentTrans = row.cyberpayPaidNotify.transaction_id
                break;
              case 'CASH':
                row.paymentTrans = row.cashPaidNotify.transaction_id
                // row.paymentTrans = row.paymentBy
                break;
            }

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

    async function clickEdit(inx:any){

    }

    async function clickPaidNotify(inx:any){
      clickPaidNotifyFlag.value = true
      console.log("Index: ",inx-1)
      selectedRow.value = rows.value[inx-1]
      console.log(selectedRow.value)
    }

</script>


<style lang="scss" scoped>
    .my-sticky-dynamic{
        height: 650px;
      
        .q-table__top,
        .q-table__bottom{
            thead, tr:first-child, th{
                /* bg color is important for th; just specify one */
                background-color: #cccccc       
            } 
            thead, tr, th {
                position: sticky;
                z-index: 1;
            }     
            thead, tr:last-child, th{
                top: 48px;
            }
            thead, tr:first-child, th{
                top: 0;
            }
            tbody{
                scroll-margin-top: 48px;
            }
        }
    }
</style>
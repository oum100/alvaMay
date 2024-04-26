<template>
    <!-- {{ data }} -->
    <div class="q-pa-md">
      <q-table
        flat bordered
        title="Shop List"
        :rows="rows"
        :columns="columns"
        row-key="index"
        selection="single"
        virtual-scroll
        :rows-per-page-options="[20,30,50,100]"
        :filter="filter"
        :pagination="pagination"
        v-model:selected="selected"
        table-header-style="background: #eeeeee"
        :selected-rows-label="getSelectedString"
      />
  
      <div class="q-mt-md">
        Selected: {{ JSON.stringify(selected) }}
      </div>
    </div>
</template>
  
<script setup lang="ts">
  const {data} = useAuth()
  const {getShopByPartner} = useAlvatoApi()
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
  let rows: any[]= []
  const pagination= ref({
            // sortBy:'branch',
            // descending: false,
            page:1,
            rowsPerPage: 25,
            // rowsNumber:10
    })

  const columns = [
    {name:'index', label: 'No', field: 'index', align: 'left'},
    {
      name: 'shopCode',
      label: 'Code',
      align: 'left',
      field: 'shopCode',
      sortable: true
    },
    { name: 'shopName', label: 'Name', field: 'shopName', align: 'left', sortable: true },
    // { name: 'desc', label: 'Description', field: 'description' },
    { name: 'shopOwner', label: 'User', field: 'shopUser', align: 'left', sortable: true },
    { name: 'shopUser', label: 'Role', field: 'userRole', align: 'left', sortable: true },
    { name: 'assetCount', label: '#Assets', field: 'assetCount', align: 'center', sortable: true },
    { name: 'updatedAt', label: 'Update', field: 'updatedAt', align: 'left', sortable: true }
  ]

  const {data:dataTable} = await getShopByPartner(data.value?.user?.partnerCode)
  console.log("dataTable:",dataTable.value)

  const count = dataTable.value?.data.length
  console.log("count:",count)

  rows = rows.concat(dataTable.value?.data)

  rows.forEach((row:any,index:number) => {
    row.index = index+1
    row.shopUser = row.user.name
    row.userRole = row.user.role
    row.assetCount = row.assets.length
    row.updatedAt= new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Asia/Bangkok',
        }).format(new Date(row.updatedAt))
  })

  const getSelectedString = ()=> {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
  }
</script>
  
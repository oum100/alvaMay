<template>
    <div> This is machine 0 page</div>
    {{ dataTable.data }}
</template>

<script setup lang="ts">
  const route = useRoute()

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

  const dataTable = await $fetch('/api/asset/v1.0.0/listByPagination',{
    method: 'POST',
    body: {
            "partnerCode":"ALL",
            "shopCode": "ALL",
            "page":0,
            "rowsPerPage":10,
            "rowsNumber":10,
    }
  })

  console.log("Machine dataTable: ",dataTable.data)

</script>
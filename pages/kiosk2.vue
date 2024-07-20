<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>เครื่องซักผ้าและอบผ้า</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="row q-col-gutter-md q-mb-md">
          <div v-for="dryer in dryers" :key="dryer.id" class="col-3">
            <MachineCard :machine="dryer" @select="selectMachine" />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div v-for="washer in washers" :key="washer.id" class="col-3">
            <MachineCard :machine="washer" @select="selectMachine" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { washers, dryers, initMachines, toggleMachineStatus } = useMachines()

  onMounted(() => {
    initMachines()
  })

  const selectMachine = (machine: any, price: number) => {
    $q.dialog({
      title: 'ยืนยันการเลือก',
      message: `คุณเลือก${machine.type === 'washer' ? 'เครื่องซัก' : 'เครื่องอบ'}หมายเลข ${machine.number} ราคา ${price} บาท ใช่หรือไม่?`,
      ok: 'ยืนยัน',
      cancel: 'ยกเลิก'
    }).onOk(() => {
      toggleMachineStatus(machine)
    })
  }
</script>
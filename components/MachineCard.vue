<template>
    <q-dialog class="q-gutter-md">
      <q-card :class="{ 'bg-green-1': isAvailable, 'bg-red-1': !isAvailable }">
        <q-card-section>
          <div class="text-h6">{{ machine.type === 'washer' ? 'เครื่องซัก' : 'เครื่องอบ' }} #{{ machine.number }}</div>
          <div>สถานะ: {{ machine.status === 'available' ? 'พร้อมใช้งาน' : 'กำลังทำงาน' }}</div>
        </q-card-section>
        <q-card-section v-if="isAvailable">
          <div>ราคา:</div>
          <q-btn-group spread>
            <q-btn v-for="(price, index) in machine.prices" :key="index" 
                  color="primary" :label="`${price} บาท`"
                  @click="$emit('select', machine, price)" />
          </q-btn-group>
        </q-card-section>
      </q-card>
    </q-dialog>

  </template>
  
  <script setup lang="ts">
  interface Machine {
    id: string
    type: string
    number: number
    status: 'available' | 'busy'
    prices: number[]
  }
  
  const props = defineProps<{
    machine: Machine
  }>()
  
  const isAvailable = computed(() => props.machine.status === 'available')
  
  defineEmits(['select'])
  </script>
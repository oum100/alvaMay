// pages/kiosk.vue
<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Kiosk</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div
            v-for="machine in machines"
            :key="machine.id"
            class="col-xs-6 col-sm-4 col-md-3"
          >
            <q-btn @click="selectMachine(machine)">
              <q-icon :name="machine.type === 'washer' ? 'mdi-washing-machine' : 'mdi-tumble-dryer'" />
              <div>{{ machine.name }}</div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const machines = ref([
  { id: 1, name: 'Dryer 1', type: 'dryer' },
  { id: 2, name: 'Washer 1', type: 'washer' },
  { id: 3, name: 'Dryer 2', type: 'dryer' },
  { id: 4, name: 'Washer 2', type: 'washer' },
  // Add more machines as needed
]);

const selectMachine = (machine) => {
  // Handle machine selection logic here
  console.log(`Selected machine: ${machine.name}`);
};
</script>

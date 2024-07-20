<template>
    <q-dialog v-model="visible">
      <q-card style="width: 800px; height: 330px;">
        <q-toolbar class="bg-primary text-weight-bold text-white">
            <q-toolbar-title><span class="text-weight-bold">New shop of partner: {{ title }}</span></q-toolbar-title>
            <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <!-- <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section> -->
  
        <q-card-section>
          <p>{{ message }}</p>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="close" />
          <q-btn flat label="OK" color="primary" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: Boolean,
    title: {
      type: String,
      default: 'Default Title'
    },
    message: {
      type: String,
      default: 'Default Message'
    }
  });
  
  const visible = ref(props.modelValue);

  const emit = defineEmits(['update:modelValue', 'confirm']);
  
  //At Child
  watch(visible, (val) => {
    console.log("vis",val)
    emit('update:modelValue', val);
  });
  
  //At Parent
  watch(() => props.modelValue, (val) => {
    console.log("prop.modelValue",val)
    visible.value = val;
  });
  
  const close = () => {
    visible.value = false;
  };
  
  const confirm = () => {
    emit('confirm');
    close();
  };
</script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  
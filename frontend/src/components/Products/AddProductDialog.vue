<template>
  <q-dialog :model-value="visible">
    <q-card style="min-width: 80%">
      <ProductsSearch 
        :productsManipulation="'add'"
        v-on:add="handleAdd"
        :routineView="props.routineView"
        :careType="props.careType"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ProductsSearch from 'src/components/Products/ProductsSearch.vue';
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  visible: boolean,
  routineView: boolean,
  careType: string
}>()
const emit = defineEmits(['add'])
const handleAdd = (id: number) => { emit('add', id) }
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
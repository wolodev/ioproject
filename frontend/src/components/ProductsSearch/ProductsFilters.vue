<template>
  <div padding class="row no-wrap fit">
    <q-select
      id="categories-select"
      label="Category"
      multiple
      :options="options"
      v-model="categories">
    </q-select>
    <q-input v-model="query" placeholder="Search" class="col"></q-input>
    <q-btn right icon="search" round dense flat id="search-button" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const options = ['Płyny', 'Serum', 'Kremy', 'Oleje']
const categories = ref([])
const query = ref('')
</script>

<style lang="scss">
#categories-select {
  width: 250px;
}
#search-button {
  width: 56px !important;
}
</style>

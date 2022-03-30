<template>
  <div padding class="row items-center justify-center">
    <q-select multiple :options="options" v-model="categories"></q-select>
    <q-input v-model="query"></q-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const options = ['Zaznacz wszystkie', 'Odznacz wszystkie', 'Płyny', 'Serum', 'Kremy', 'Oleje']
const categories = ref([])
const query = ref('')
</script>

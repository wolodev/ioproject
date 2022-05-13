<template>
  <div padding class="row no-wrap fit">
    <q-input v-model="query" placeholder="Search" class="col"></q-input>
    <q-select
      v-if="!routineView"
      id="categories-select"
      label="Category"
      single
      :options="options"
      v-model="category">
    </q-select>
    <!-- <q-btn right icon="search" round dense flat id="search-button" /> -->
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import { usePropsModel } from '../../composables/usePropsModel';

const options = ['Skin', 'Hair']
const emit = defineEmits(['update:category', 'update:query'])
const props = defineProps(['category', 'query', 'routineView'])
const category = usePropsModel(props, emit, 'category')
const query = usePropsModel(props, emit, 'query', 500)
</script>

<style lang="scss">
#categories-select {
  width: 250px;
}
#search-button {
  width: 56px !important;
}
</style>

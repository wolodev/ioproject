<template>
  <q-card>
    <q-card-section>
      <ProductsFilters />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <ProductsGrid />
    </q-card-section>
  </q-card>
</template>

<script setup>
import ProductsFilters from './ProductsFilters.vue';
import ProductsGrid from './ProductsGrid.vue';
</script>

<style lang="scss" scoped>

</style>

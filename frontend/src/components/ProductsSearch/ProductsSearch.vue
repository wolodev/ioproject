<template>
  <q-card class="column" id="products-filters">
    <q-card-section class="col-grow">
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
<style lang="scss" scoped>
#products-filters {
  width: 90%;
}
</style>

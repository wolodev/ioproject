<template>
  <q-card class="column" id="products-filters">
    <q-card-section class="col-grow">
      <ProductsFilters 
        v-model:category="filters.category"
        v-model:query="filters.input"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <ProductsGrid :products="products" />
    </q-card-section>
    {{products}}
  </q-card>
</template>

<script setup lang="ts">
import useProducts from '../../composables/useProducts';
import { reactive, watch,  ref } from 'vue'
import ProductsFilters from './ProductsFilters.vue';
import ProductsGrid from './ProductsGrid.vue';
const filters: {
  input: string,
  category: careType
} = reactive({
  category: 'skin',
  input: ''
})
const products = ref([])
const { getAll } = useProducts()


watch(filters, async (newFilters) => {
  const x = await getAll(newFilters.category)
  console.log('SZUKAM', newFilters, x);
})


</script>

<style lang="scss" scoped>

</style>
<style lang="scss" scoped>
#products-filters {
  width: 90%;
}
</style>

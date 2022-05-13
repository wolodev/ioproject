<template>
  <q-card class="column" id="products-filters">
    <q-card-section class="col-grow">
      <ProductsFilters 
        v-model:category="filters.category"
        v-model:query="filters.input"
        :routineView="props.routineView"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <ProductsGrid 
        :productsManipulation="props.productsManipulation"
        v-on:add="handleAdd"
        :products="products"
        :loading="loading"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import useProducts from '../../composables/useProducts';
import { reactive, watch, ref, defineProps, unref, defineEmits } from 'vue'
import type { Ref } from 'vue';
import ProductsFilters from './ProductsFilters.vue';
import ProductsGrid from './ProductsGrid.vue';

const emit = defineEmits(['add'])
const handleAdd = (id: number) => { emit('add', id) }
type Props = {
  routineView: boolean,
  careType: careType,
  productsManipulation: string
}

const props = defineProps<Props>()
const filters: {
  input: string,
  category: careType
} = reactive({
  category: 'skin',
  input: ''
})
if (props.careType) {
  filters.category = unref(props.careType);
}
const products: Ref<Product[]> = ref([])
const loading = ref(true);
const { query: productsQuery } = useProducts()

watch(filters, async (newFilters) => {
  loading.value = true;
  const data = await productsQuery({
    type: newFilters.category,
    query: newFilters.input
  })
  products.value = data.slice(0, 20);
  loading.value = false
}, {
  immediate: true
})


</script>

<style lang="scss" scoped>

</style>
<style lang="scss" scoped>
#products-filters {
  width: 90%;
}
</style>

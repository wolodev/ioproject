<template>
  <q-page padding class="row items-center justify-center">
    <ProductsSearch v-on:add="handleAdd" productsManipulation="add" :routineView="false" />
  </q-page>
</template>

<script setup lang="ts">
import ProductsSearch from 'src/components/Products/ProductsSearch.vue';
import { useQuasar } from 'quasar';
import { createParamsForDialog, addProduct } from '../components/Routine/SelectRotuineDialog';
const $q = useQuasar();

async function handleAdd(id: number) {
  $q.dialog((await createParamsForDialog())).onOk((routine: Routine) => {
    addProduct(routine, id);
  })
}

</script>
 
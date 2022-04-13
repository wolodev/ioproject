<template>
  <q-page padding class="column">
    <div class="row">
      <q-input :readonly="!editable" v-model="name" type="text" label="Name" class="col-11"/>
      <q-icon name="edit" class="col-1 clickable"  @click="editable = !editable"/>
    </div>
    <q-select :readonly="!editable" v-model="type" :options="['skin', 'care']" label="Type" />
    <q-select :readonly="!editable" v-model="time" :options="['morning', 'evening', ]" label="Time" />
    <div class="q-pa-md row items-center justify-between">
      <p class="q-mb-none flex items-center justify-center">Products</p>
      <q-btn disabled color="primary" icon="add" label="Dodaj produkt" @click="onClick" />
    </div>
    
    <ProductsGrid :products="products" :routineView="true"/>
  </q-page>
</template>

<script setup>
import ProductsGrid from '../components/ProductsSearch/ProductsGrid';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
const editable = ref(false);
const router = useRoute();

const url = 'routines/' + router.params.id
const response = await api.get(url)
const data = await response.data;

const name = ref(data.name);
const type = ref(data.type);
const ids = data.products.map(el => el.id).join(',')

const productsResponse = await api.get(`/products?id=${ids}`)
const products = productsResponse.data.slice(0, 2)
</script>

<style lang="scss" scoped></style>

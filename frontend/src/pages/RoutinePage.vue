<template>
  <q-page padding class="column">
    <div class="row">
      <q-input :readonly="!editable" v-model="name" type="text" label="Name" class="col-11"/>
      <q-icon size="20px" :name="editable ? 'save' : 'edit'" class="col-1 clickable"  @click="handleIconClick"/>
    </div>
    <q-select :readonly="!editable" v-model="type" :options="['skin', 'hair']" label="Type" />
    <div class="q-pa-md row items-center justify-between">
      <p class="q-mb-none flex items-center justify-center">Products</p>
      <q-btn disabled color="primary" icon="add" label="Dodaj produkt" @click="onClick" />
    </div>
    
    <ProductsGrid :products="products" :routineView="true"/>
  </q-page>
</template>

<script setup>
import useFirebase from 'src/composables/useFirebase';
import ProductsGrid from '../components/ProductsSearch/ProductsGrid';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

function confirm () {
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to turn on the wifi?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log('Robię Zapis')
    editable.value = !editable.value
    
  }).onCancel(() => {
    console.log('NIE ROBIE ZAPISU')
    // console.log('>>>> Cancel')
  })
}

const editable = ref(false);
const router = useRoute();

const { getFireStore } = useFirebase()
const fireStore = getFireStore();
console.log('FIRESTORE', fireStore);

const routine = await fireStore.doc(`routines/${router.params.id}`).get()

if (!routine.exists) {
  console.error('Routine', router.params.id, 'does not exist');
}
const data = routine.data();

const name = ref(data.name);
const type = ref(data.type);
const ids = [].map(el => el.id).join(',')


function handleIconClick() {
  if (editable.value) {
    confirm()
  } else {
    editable.value = !editable.value
  }
}


const productsResponse = await api.get(`/products?id=${ids}`)
const products = productsResponse.data.slice(0, 2)
</script>

<style lang="scss" scoped></style>

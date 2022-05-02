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

<script setup lang="ts">
import useFirebase from 'src/composables/useFirebase';
import ProductsGrid from '../components/ProductsSearch/ProductsGrid.vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const editable = ref(false);
const router = useRoute();

const { getFireStore } = useFirebase()
const fireStore = getFireStore();
console.log('FIRESTORE', fireStore);

const docReference = fireStore.doc(`routines/${router.params.id}`)
const routine = await docReference.get()

if (!routine.exists) {
  throw `Routine ${router.params.id} does not exist`;
}
const data = routine.data();
const name = ref('');
const type = ref('');
if (data) {
  name.value = data.name;
  type.value = data.type;
}

const ids = [].map(el => el.id).join(',')

function handleIconClick() {
  if (editable.value) {
    confirm()
  } else {
    editable.value = !editable.value
  }
}

function confirm () {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure to want to save changes?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log('Robię Zapis')
    editable.value = !editable.value
    docReference.update({
      'name': name.value,
      'type': type.value
    })
  }).onCancel(() => {
    console.log('NIE ROBIE ZAPISU')
    // console.log('>>>> Cancel')
  })
}



const productsResponse = await api.get(`/products?id=${ids}`)
const products = productsResponse.data.slice(0, 2)
</script>

<style lang="scss" scoped></style>

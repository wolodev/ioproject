<template>
  <q-page padding class="column">
    <div class="row">
      <q-input :readonly="!editable" v-model="name" type="text" label="Name" class="col-11"/>
      <q-icon size="20px" :name="editable ? 'save' : 'edit'" class="col-1 clickable"  @click="handleIconClick"/>
    </div>
    <q-select :readonly="!editable" v-model="type" :options="['skin', 'hair']" label="Type" />
    <q-select multiple 
    :readonly="!editable" 
    v-model="daysOfTheWeekModel" 
    :options="daysOfTheWeekOptions" label="Days of the week" 
    option-value="id"
    option-label="name"
    
    />
    <div class="q-pa-md row items-center justify-between">
      <p class="q-mb-none flex items-center justify-center">Products</p>
      <q-btn disabled color="primary" icon="add" label="Dodaj produkt"/>
    </div>
    
    <ProductsGrid :products="products" :routineView="true"/>
  </q-page>
</template>
 
<script setup lang="ts">

import ProductsGrid from '../components/Products/ProductsGrid.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import useRoutine from 'src/composables/useRoutine';
import { daysOfTheWeek } from 'src/consts';
const { get: getRoutine, update: updateRoutine } = useRoutine();
const router = useRoute();
const $q = useQuasar();
const daysOfTheWeekOptions = Object.entries(daysOfTheWeek).map(day => ({
    id: day[1],
    name: day[0]
}))
const editable = ref(false);
const id = router.params.id as string;
const data = await getRoutine(id);
const name = ref('');
const type = ref('');
const daysOfTheWeekModel = ref([])
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
    updateRoutine(id, {
      'name': name.value,
      'type': type.value
    })
  }).onCancel(() => {
    console.log('NIE ROBIE ZAPISU')
    // console.log('>>>> Cancel')
  })
}

</script>

<style lang="scss" scoped></style>

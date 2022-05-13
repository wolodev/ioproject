<template>
  <q-page padding class="column">
    <div class="row">
      <q-input :readonly="!editable" v-model="form.name" type="text" label="Name" class="col-11"/>
      <q-icon size="20px" :name="editable ? 'save' : 'edit'" class="col-1 clickable"  @click="handleIconClick"/>
    </div>
    <q-select :readonly="!editable" v-model="form.type" :options="['skin', 'hair']" label="Type" />
    <q-select multiple 
      :readonly="!editable" 
      v-model="form.weekdays" 
      :options="daysOfTheWeekOptions"
      label="Days of the week" 
      option-value="id"
      option-label="name"
      :emit-value="true"
      :map-options="true"
    />
    <div class="q-pa-md row items-center justify-between">
      <p class="q-mb-none flex items-center justify-center">Products</p>
      <q-btn :diasbled="!editable" color="primary" icon="add" label="Add product" @click="promptVisible = true"/>
    </div>
    
    <ProductsGrid :productsManipulation="editable ? 'remove' : null" v-on:remove="removeProduct" :products="products" :routineView="true"/>
    <AddProductDialog 
      v-on:add="addProduct"
      :careType="form.type"
      :routineView="true"
      :visible="promptVisible"
      @hide="promptVisible = false"
    />
  </q-page>
</template>
 
<script setup lang="ts">
import AddProductDialog from 'src/components/Products/AddProductDialog.vue';
import ProductsGrid from '../components/Products/ProductsGrid.vue';
import { useRoute } from 'vue-router';
import { ref, reactive, Ref } from 'vue';
import { useQuasar } from 'quasar';
import useRoutine from 'src/composables/useRoutine';
import { daysOfTheWeek } from 'src/consts';
import useProducts from 'src/composables/useProducts';
const { query: productsQuery } = useProducts();
const { get: getRoutine, update: updateRoutine } = useRoutine();
const router = useRoute();
const $q = useQuasar();
const daysOfTheWeekOptions = Object.entries(daysOfTheWeek).map(day => ({
    id: day[1],
    name: day[0]
}))
const promptVisible = ref(false)
const editable = ref(false);
const id = router.params.id as string;
const data = await getRoutine(id);
const form: Omit<Routine, 'id' | 'done'> = reactive({
  name: '',
  type: 'skin',
  weekdays: [],
  products: []
})

if (data) {
  form.name = data.name;
  form.type = data.type;
  form.weekdays = data.weekdays;
  form.products = data.products ? data.products : [];
}
const products: Ref<Product[]> = ref([])
products.value = await getProducts();

async function getProducts() {
  return await productsQuery({type: form.type, ids: form.products})
}

async function addProduct(id: number) {
  form.products?.push(id)
  products.value = await getProducts()
}

async function removeProduct(id: number) {
  form.products = form.products?.filter((productId) => productId !== id);
  products.value = await getProducts()
}

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
    console.log('Saving', form)
    editable.value = !editable.value
    updateRoutine(id, {
      'name': form.name,
      'type': form.type,
      'weekdays': form.weekdays,
      'products': form.products,
    })
  }).onCancel(() => {
    //
  })
}

</script>

<style lang="scss" scoped></style>

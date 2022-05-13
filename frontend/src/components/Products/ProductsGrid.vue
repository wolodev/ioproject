<template>
   <div class="q-pa-md">
    <q-table
      grid
      :rows="products"
      :columns="columns"
      row-key="name"
      hide-header
      :rows-per-page-options="[21, 37]"
      :loading="loading"
      loading-label="Loading..."
    >
      <template v-slot:item="props">
        <div class="q-pa-md col-xs-12 col-sm-4 col-md-3">
          <q-card class="justify-center items-center column relative">
            <div v-if="cmpProps.productsManipulation" class="absolute on-right plus cursor-pointer" @click="changeState(props.row.product_id)">
              <q-icon size="25px" :name="cmpProps.productsManipulation" />
            </div>
            <q-img
              :src="props.row.image_link"
              spinner-color="white"
              style="width: 100%"
            />
            <q-card-section class="text-center">
              <strong>{{ props.row.product_name }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="column flex-center">
              <div >{{ props.row.product_brand }}</div>
              <div>{{ Math.floor(Math.random()*100) }}$</div>
            </q-card-section>
          </q-card>
        </div>
      </template>

    </q-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
interface Props {
  readonly?: boolean,
  routineView?: boolean,
  products: Product[],
  loading?: boolean,
  productsManipulation: 'add' | 'remove'
}

const emit = defineEmits(['add', 'remove'])
const cmpProps = defineProps<Props>()

function changeState(id: number) {
  emit(cmpProps.productsManipulation, id)
}

const columns = [
  {
    field: 'product_brand',
  },
  {
    field: 'product_name',
  },
  { 
    field: 'image_link'
  },
  { 
    field: 'product_id'
  },
]

</script>

<style lang="scss" scoped>
.plus {
  top: 0px;
  z-index: 2;
  right: 5px;
  box-shadow: -2px 5px 12px 12px #FFFFFF;
}
</style>

<template>
   <div class="q-pa-md">
    <q-table
      grid
      :rows="products"
      :columns="columns"
      row-key="name"
      hide-header
      :rows-per-page-options="[21, 37]"
    >
      <template v-slot:item="props">
        <div class="q-pa-md col-xs-12 col-sm-4 col-md-3">
          <q-card class="justify-center items-center column">
            <img style="width:250px" :src="`https://picsum.photos/id/${Math.floor(Math.random()*50)}/250/250`" alt="">
            <q-card-section class="text-center">
              <strong>{{ props.row.name }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center">
              <div>{{ props.row.price }} $</div>
            </q-card-section>
          </q-card>
        </div>
      </template>

    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

type Product = {
  name: string,
  type: string,
  price: number,
}

interface Props {
  readonly?: boolean,
  routineView?: boolean,
  products: Product[]
}


defineProps<Props>()

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: 'name',
    sortable: true
  },
  { name: 'price', label: 'Price ($)', field: 'price' },
]

const rows = [
  {
    name: 'Pixi',
    price: 24
  },
  {
    name: 'Dixi',
    price: 37
  },
  {
    name: 'Lixi',
    price: 23
  },
  {
    name: 'Sixi',
    price: 67
  },
  {
    name: 'Kixi',
    price: 49
  },
  {
    name: 'Gixi',
    price: 94
  },
  {
    name: 'Nixy',
    price: 98
  },
  {
    name: 'Wyxi',
    price: 87
  },
  {
    name: 'Zyxi',
    price: 51
  },
  {
    name: 'Tyxi',
    price: 65
  },
  {
    name: 'Pixi',
    price: 24
  },
  {
    name: 'Dixi',
    price: 37
  },
  {
    name: 'Lixi',
    price: 23
  },
  {
    name: 'Sixi',
    price: 67
  },
  {
    name: 'Kixi',
    price: 49
  },
  {
    name: 'Gixi',
    price: 94
  },
  {
    name: 'Nixy',
    price: 98
  },
  {
    name: 'Wyxi',
    price: 87
  },
  {
    name: 'Zyxi',
    price: 51
  },
  {
    name: 'Tyxi',
    price: 65
  },
  {
    name: 'Pixi',
    price: 24
  },
  {
    name: 'Dixi',
    price: 37
  },
  {
    name: 'Lixi',
    price: 23
  },
  {
    name: 'Sixi',
    price: 67
  },
  {
    name: 'Kixi',
    price: 49
  },
  {
    name: 'Gixi',
    price: 94
  },
  {
    name: 'Nixy',
    price: 98
  },
  {
    name: 'Wyxi',
    price: 87
  },
  {
    name: 'Zyxi',
    price: 51
  },
  {
    name: 'Tyxi',
    price: 65
  }
]
const filter = ref('')
</script>

<style lang="scss" scoped>

</style>

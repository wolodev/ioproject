<template>
  <q-page padding class="row items-center justify-center">
    <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
      row-key="name"
      clickable
      @row-click="rowClicked"
    >

      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Add routine" @click="addRow" />
        <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove routine" @click="removeRow" />
        <q-space />
        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useFirebase from 'src/composables/useFirebase';
const { getFireStore } = useFirebase()
const fireStore = getFireStore();
const routinesCollection = await fireStore.collection('routines').get();
const routines = routinesCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'type',
    align: 'center',
    label: 'Type',
    field: 'type',
    sortable: true
  },
]
const loading = ref(false)
const filter = ref('')
const rowCount = ref(10)
const rows = ref([...routines])
const selected = ref([])
const router = useRouter()

function rowClicked (event, row) {
  router.push(`/routines/${row.id}`)
}
function addRow () {
  loading.value = true
  setTimeout(() => {
    const
      index = Math.floor(Math.random() * (rows.value.length + 1)),
      row = routines[ Math.floor(Math.random() * routines.length) ]

    if (rows.value.length === 0) {
      rowCount.value = 0
    }

    row.id = ++rowCount.value
    const newRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
    rows.value = [ ...rows.value.slice(0, index), newRow, ...rows.value.slice(index) ]
    loading.value = false
  }, 500)
}

function removeRow () {
  loading.value = true
  setTimeout(() => {
    const index = Math.floor(Math.random() * rows.value.length)
    rows.value = [ ...rows.value.slice(0, index), ...rows.value.slice(index + 1) ]
    loading.value = false
  }, 500)
}
</script>

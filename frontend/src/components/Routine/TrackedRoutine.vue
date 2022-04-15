<template>
    <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
      row-key="id"
      clickable
      @row-click="rowClicked"
    >
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Toggle done" @click="addRow" />
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
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
const response = await api.get('routines');
const originalRows = response.data.routines;
const loading = ref(false)
const filter = ref('')
const rowCount = ref(10)
const rows = ref([...originalRows])
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
      row = originalRows[ Math.floor(Math.random() * originalRows.length) ]

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
    const ids = selected.value.map(selected => selected.id);
    rows.value = rows.value.filter(row => !ids.includes(row.id))
    loading.value = false
  }, 500)
}
</script>

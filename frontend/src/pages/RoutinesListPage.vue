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
      row-key="id"
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
  <AddRoutineDialog :visible="promptVisible" v-on:close="promptVisible = false" v-on:routine-added="refreshRoutineList"/>
  </q-page>
</template>

<script setup lang="ts">
import AddRoutineDialog from 'src/components/Routine/AddRoutineDialog.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useFirebase from 'src/composables/useFirebase';
const promptVisible = ref(false)
const { getFireStore } = useFirebase()
const fireStore = getFireStore();
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: { name: string; }) => row.name,
    format: (val: string) => `${val}`,
    sortable: true
  },
  {
    name: 'type',
    align: 'center',
    label: 'Type',
    field: 'type',
    sortable: true
  }
]

const routines = await getRoutines();
const loading = ref(false)
const filter = ref('')
const rows = ref([...routines])
const selected = ref([])
const router = useRouter()

async function getRoutines() {
  const routinesCollection = await fireStore.collection('routines').get();
  return routinesCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
}

async function refreshRoutineList() {
  rows.value = await getRoutines();
};

function rowClicked (event: Event, row: { id: string }) {
  router.push(`/routines/${row.id}`)
}

function addRow () {
  promptVisible.value = true;
}

async function removeRow () {
  loading.value = true
  const iterations = selected.value.length;
  for (let i = 0; i < iterations; i++) {
    const element: {id: string} = selected.value[i];
    const docReference = fireStore.doc(`routines/${element.id}`)
    await docReference.delete()
    await refreshRoutineList()
  }
  loading.value = false
}
</script>


<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
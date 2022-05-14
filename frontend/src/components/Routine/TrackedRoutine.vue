<template>
    <div class="q-pa-md">
    <q-table
      title="Routines"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
      row-key="id"
      clickable
      @row-click="rowClicked"
      :selected-rows-label="emptyString"
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
          <!-- <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td> -->
        </q-tr>
        <!-- <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </q-td>
        </q-tr> -->
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import type { Ref } from 'vue';
import { useRouter } from 'vue-router'
import { find, omit } from 'lodash';
import useRoutine from '../../composables/useRoutine';

interface Props {
  day: string,
  weekday: dayNumber
}

const props = defineProps<Props>();

const { queryByDays, update } = useRoutine();
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

const originalRows =  await queryByDays(props.weekday);
const loading = ref(false)
const filter = ref('')
const rows:Ref<Routine[]> = ref([...originalRows])

const selected: Ref<Routine[]> = ref(
  originalRows.filter(row => {
    return row.done.includes(props.day)
  })
)
const router = useRouter()
watch(selected, (selected = [], prevSelected=[]) => {
  selected.forEach((routine: Routine) => {
    const shouldMark = !find(prevSelected, { 'id': routine.id })
    if (shouldMark) {
      console.log('Mark', routine, 'for', props.day )
      routine.done.push(props.day),
      update(routine.id, omit({
        ...routine
        }, 'id'))
    }
  })
  prevSelected.forEach((routine) => {
    const shouldUnMark = !find(selected, { 'id': routine.id })
    if (shouldUnMark) {
      console.log('Unmark', routine, 'for', props.day)
      routine.done = routine.done.filter(el => el !== props.day),
      update(routine.id, omit({
        ...routine
        }, 'id'))
    }
  })
})


function rowClicked (event: Event, row: Routine) {
  router.push(`/routines/${row.id}`)
}

const emptyString = () => '';
</script>
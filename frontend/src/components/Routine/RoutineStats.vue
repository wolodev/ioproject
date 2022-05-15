<template>
  <q-dialog :model-value="visible">\
    <div class="bg-light-green-1" style="min-width: 520px">
      <q-splitter
        v-model="splitterModel"
      >
        <template v-slot:before>
          <div class="q-pa-md row">
            <q-date
              readonly
              first-day-of-week="1"
              v-model="dateModel"
              :events="showDone ? props.routine.done : eventFn"
              event-color="orange"
            />
          </div>
        </template>

        <template v-slot:after>
          <q-card class="bg-light-green-1">
            <q-card-section class="column justify-center items-center">
              <q-circular-progress
                show-value
                font-size="12px"
                :value="value"
                size="100px"
                :thickness="0.22"
                color="teal"
                track-color="grey-3"
              >
                {{ value }}%
              </q-circular-progress>
            </q-card-section>
            <q-card-section class="column items-center justify-center">
              Done / All days posible
            </q-card-section>
            <q-card-section class="column items-center justify-center">
              <div>Show only done</div>
              <q-toggle
                v-model="showDone"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
              />
            </q-card-section>
          </q-card>
        </template>
      </q-splitter>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { date } from 'quasar'
import { ref, defineProps, computed } from 'vue'
import type { Ref } from 'vue';
const { formatDate, getDayOfWeek, startOfDate } = date;
//const date = date.extractDate('21/03/1985', 'DD/MM/YYYY')
const showDone = ref(false);
const timestamp = Date.now()
const today = formatDate(timestamp, 'YYYY/MM/DD')
const firstDayOfMonth = startOfDate(today, 'month');
const firstDayOfMonthWeekDay = getDayOfWeek(firstDayOfMonth)
const props: {
  routine: Routine
} = defineProps<{
  routine: Routine
  visible: boolean
}>();
const allDays: Ref<string[]> = ref([]);

function getWeekDayForDate(day: string): dayNumber {
  const dayDiff = Number(day.split('/')[2]) - 1;
  const weekday = (firstDayOfMonthWeekDay + dayDiff) % 7
  return (weekday ? weekday : 7) as dayNumber;
}

const eventFn = (day: string) => {
  if (dateModel.value < day) {
    return false;
  }
  if (props.routine.weekdays.includes(getWeekDayForDate(day))) {
    if (!allDays.value.includes(day)) {
      allDays.value.push(day);
    }
    return true
  }
  return false;
}

const value = computed(() => {
  let ins = 0;
  allDays.value.forEach(element => {
    if (props.routine.done.includes(element)) {
      ins +=1;
    }
  });
  const len = allDays.value.length
  return Math.floor(ins / len * 100)
})

const splitterModel= ref(62);
const dateModel = ref(today); // ref('2019/02/01')

</script>

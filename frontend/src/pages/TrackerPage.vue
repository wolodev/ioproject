<template>
  <q-page>
    <q-splitter
      v-model="splitterModel"
      style="height: 450px"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-date
            first-day-of-week="1"
            v-model="dateModel"
            :events="eventFn"
            event-color="orange"
            :options="optionsFn"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="dateModel"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          class="bg-light-green-1"
        >

          <q-tab-panel :key="dateModel" :name="dateModel">
            <Suspense v-if="eventFn(dateModel)">
              <TrackedRoutine
              :day="dateModel"
              :weekday="getWeekDayForDate(dateModel)"
              />
              <template #fallback>
                <q-spinner-hourglass
                    color="primary"
                    size="6em"
                    class="center"
                  />
              </template>
            </Suspense>
            <div v-else>
              <q-card class="my-card">
                <q-card-section>
                  <div class="text-h6">Whooops!</div>
                  <div class="text-subtitle2">It looks like you doent's have routine for this day of the week!</div>
                </q-card-section>
                <q-card-section>
                  <q-btn color="primary" label="Go to routine management" @click="onClick" to="/routinesList"/>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup lang="ts">
import { date } from 'quasar'
import { ref } from 'vue'
import { flatten, uniq } from 'lodash';
import TrackedRoutine from '../components/Routine/TrackedRoutine.vue'
import useRoutine from 'src/composables/useRoutine';
const { getAll } = useRoutine()
const { formatDate, getDayOfWeek, startOfDate } = date;
//const date = date.extractDate('21/03/1985', 'DD/MM/YYYY')

const timestamp = Date.now()
const today = formatDate(timestamp, 'YYYY/MM/DD')
const firstDayOfMonth = startOfDate(today, 'month');
const firstDayOfMonthWeekDay = getDayOfWeek(firstDayOfMonth)

const routines = await getAll()

const daysWithRoutines: dayNumber[] = uniq(flatten(routines.map(routine => routine.weekdays))) as dayNumber[]

function getWeekDayForDate(day: string): dayNumber {
  const dayDiff = Number(day.split('/')[2]) - 1;
  const weekday = (firstDayOfMonthWeekDay + dayDiff) % 7
  return (weekday ? weekday : 7) as dayNumber;
}

const eventFn = (day: string) => {
  if (daysWithRoutines.includes(getWeekDayForDate(day))) {
    return true
  }
  return false;
}

function optionsFn (day: string) {
  return day <= today;
}

const splitterModel= ref(20);
const dateModel = ref(today); // ref('2019/02/01')

</script>

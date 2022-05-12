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
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="dateModel"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
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
              WHooops ! Wygląda na to że nie masz jeszcze rutyny w tym dniu. Dodaj
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
import TrackedRoutine from '../components/Routine/TrackedRoutine.vue'
const { formatDate, getDayOfWeek, startOfDate } = date;
//const date = date.extractDate('21/03/1985', 'DD/MM/YYYY')

const timestamp = Date.now()
const today = formatDate(timestamp, 'YYYY/MM/DD')
const firstDayOfMonth = startOfDate(today, 'month');
const firstDayOfMonthWeekDay = getDayOfWeek(firstDayOfMonth)
const daysWithRoutines: dayNumber[] = [1, 3, 7]

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

const splitterModel= ref(30);
const dateModel = ref(today); // ref('2019/02/01')

</script>

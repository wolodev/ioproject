<template>
  <q-dialog :model-value="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Add routine</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
         <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
           <q-input required label="Name" v-model="form.name" autofocus @keyup.enter="onSubmit" />
          <q-select required v-model="form.type" :options="careTypes" default="skin" label="Type" />
        <div class="text-primary">
          <q-btn flat label="Cancel" @click="$emit('close')" class="q-ml-sm"/>
          <q-btn flat label="Add routine" type="submit" />
        </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits } from 'vue'
import useFirebase from 'src/composables/useFirebase';
import { careTypes } from 'src/consts';
const { getFireStore } = useFirebase()
const fireStore = getFireStore();
defineProps({
  visible: Boolean
})
const emit = defineEmits(['close', 'routine-added'])

const form = reactive({
  name: '',
  type: careTypes[0]
})

async function onSubmit() {
  const doc = await fireStore.collection('routines').add({
    name: form.name,
    type: form.type,
    done: [],
    weekdays: [],
    products: [],
  })
  const data = await doc.get()
  emit('routine-added', data.id)
  emit('close')
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
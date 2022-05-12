<template>
    <q-page class="column items-center justify-center">
    <q-card bordered class="column">
      <q-card-section class="column items-center">
        <q-avatar size="100px">
          <img :src="photoUrl" alt="">
        </q-avatar>
         <q-separator inset spaced/>
        {{ displayName }}
      </q-card-section>
      <q-separator inset />
      <q-card-section class="column items-center">
        <q-btn @click="logout" to="/login">Log out</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import useUserStore from '../stores/user';
import useFirebase from 'src/composables/useFirebase';

const { getAuth } = useFirebase();
const store = useUserStore()
// cannot destructure from above, because $reset needs store context 
const { displayName, photoUrl } = store;

function logout() {
  const auth = getAuth();
  auth.signOut()
  store.$reset()
}
</script>

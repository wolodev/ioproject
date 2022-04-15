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
        <q-btn @click="$reset" to="/login">Log out</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import useUserStore from '../stores/user';

const { displayName, photoUrl, $reset } = useUserStore();
</script>

<style lang="scss" scoped>

</style>

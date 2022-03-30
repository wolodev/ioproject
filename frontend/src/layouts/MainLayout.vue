<template>
  <q-layout view="Hhh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Skin and hair routine     {{displayName}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="id"
      v-model="leftDrawerOpen"
      bordered
      overlay
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import EssentialLink from 'components/EssentialLink.vue';
import useUserStore from 'src/stores/user';
const leftDrawerOpen = ref(false)
const { id, displayName } = storeToRefs(useUserStore());
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const linksList = [
  {
    title: 'Account',
    caption: '',
    icon: 'person',
    link: '/account',
    routerLink: true
  },
  {
    title: 'My Routines',
    caption: '',
    icon: 'checklist',
     link: '/routines',
    routerLink: true
  },
  {
    title: 'Products',
    caption: '',
    icon: 'inventory',
    link: '/products',
    routerLink: true
  },
  {
    title: 'Find product for yourself!',
    caption: '',
    icon: 'search',
    link: '/login',
    routerLink: true
  },
];
console.log('START', leftDrawerOpen.value)
</script>

<template>
  <q-layout id="bg" view="hhh lpR fFf">
    <q-page-container>
      <RouterView v-slot="{ Component }" :key="$route.fullPath">
        <template v-if="Component">
          <Transition mode="out-in">
            <Suspense>
              <component :is="Component"></component>
              <template #fallback>
                <q-spinner-hourglass
                    color="primary"
                    size="6em"
                    class="fixed-center"
                  />
              </template>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style lang="scss">
#bg {
  // todo image optimization
  background-image: url('~assets/skin-care-bg.jpg');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>

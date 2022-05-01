/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div id="auth-widget" class="flex column justify-center items-center">
    <img id="logo" width="100" src="~assets/logo.png" alt="">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script setup>
import useUserStore from '../stores/user';
import useFirebaseUI from '../composables/useFirebaseUi';
import { useRouter } from 'vue-router'
import { get } from 'lodash';
const { setUser } = useUserStore()
const router = useRouter()
function signInSuccessWithAuthResult(authResult) {
  console.log('AAAUTH RESULT', authResult)
  setUser(formatUser(authResult));
  router.push('/tracker')
}

function formatUser(authResult) {
  return {
    isNewUser: get(authResult, 'additionalUserInfo.isNewUser', true),
    email: get(authResult, 'user.email', ''),
    displayName: get(authResult, 'user.displayName', ''),
    phoneNumber: get(authResult, 'user.phoneNumber', ''),
    id: get(authResult, 'user.uid', ''),
    photoUrl: get(authResult, 'user.photoURL', ''),
  };
}

useFirebaseUI('#firebaseui-auth-container', {
  signInSuccessWithAuthResult
})
</script>

<style lang="scss">
#auth-widget {
  background: white;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  padding-top: 15px;
  #logo {
    padding-bottom: 10px;
  };

  .mdl-shadow--2dp {
    box-shadow: none !important;
  }
}
</style>
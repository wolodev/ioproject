/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import useStore from 'src/stores/user';
import { get } from 'lodash';
import { User } from 'src/stores/models';

export default defineComponent({
  name: 'FirebaseAuthentication',
  setup() {
    const { setUser } = useStore();

    const firebaseConfig = {
      apiKey: 'AIzaSyBjVB-cwjLfpAl6YL2H9xDg01z5av8ZmpY',
      authDomain: 'ioproject-8e826.firebaseapp.com',
      projectId: 'ioproject-8e826',
      storageBucket: 'ioproject-8e826.appspot.com',
      messagingSenderId: '262448260413',
      appId: '1:262448260413:web:c309faa5056f9fef019154',
      measurementId: 'G-JYHKVQXQG1',
    };
    function signInAttempSuccessful(authResult: any, redirectUrl: any): void {
      console.log('authResult', authResult);
      console.log('redirectUrl', redirectUrl);
      setUser(formatUser(authResult));
      // setUser(authResult)
      // Do what you wish with authResult... save to session, cookie, etc.
    }
    // Note, bad credentials is not a sign-in failure
    function signInAttempFailure(error: firebaseui.auth.AuthUIError): void {
      // eslint-disable-next-line no-alert
      alert('Sign in failed. See dev console for error response');
      console.log('error', error);
    }
    function firebaseUiShown(): void {
      console.log('Firebase UI widget rendered');
    }

    function formatUser(authResult: { additionalUserInfo: { isNewUser: boolean } }): User {
      return {
        isNewUser: get(authResult, 'additionalUserInfo.isNewUser', true),
        email: get(authResult, 'user.email', ''),
        displayName: get(authResult, 'user.displayName', ''),
        phoneNumber: get(authResult, 'user.phoneNumber', ''),
        id: get(authResult, 'user.uid', ''),
        photoUrl: get(authResult, 'user.photoURL', '')
      };
    }

    const firebaseConfigUI = {
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // These need to be independently enabled through the web console.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '/',
      // Privacy policy url/callback.
      privacyPolicyUrl() {
        window.location.assign('<your-privacy-policy-url>');
      },
      callbacks: {
        signInSuccessWithAuthResult: signInAttempSuccessful,
        signInFailure: signInAttempFailure,
        uiShown: firebaseUiShown,
      },
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = app.auth();
    // Initialize the FirebaseUI Widget using the Firebase app.
    const ui = new firebaseui.auth.AuthUI(auth);
    onMounted(() => {
      ui.start('#firebaseui-auth-container', firebaseConfigUI as any);
    })
    // The start method will wait until the DOM is loaded.
  },
});
</script>

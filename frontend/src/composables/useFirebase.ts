import { ref } from 'vue';
import type { Ref } from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBjVB-cwjLfpAl6YL2H9xDg01z5av8ZmpY',
  authDomain: 'ioproject-8e826.firebaseapp.com',
  projectId: 'ioproject-8e826',
  storageBucket: 'ioproject-8e826.appspot.com',
  messagingSenderId: '262448260413',
  appId: '1:262448260413:web:c309faa5056f9fef019154',
  measurementId: 'G-JYHKVQXQG1',
};

const app: Ref<null | firebase.app.App> = ref(null);
const auth: Ref<null | firebase.auth.Auth> = ref(null);
const firestore: Ref<null | firebase.firestore.Firestore> = ref(null);
export default function useFirebase() {
  function getFirebase() {
    if (!app.value) {
      app.value = firebase.initializeApp(firebaseConfig);
    }
    return app.value;
  }

  function getAuth() {
    if (!auth.value) {
      auth.value = getFirebase().auth();
    }
    return auth.value;
  }

  function getAuthProviders() {
    return [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ];
  }

  function getFireStore() {
    return firestore.value ? firestore.value : getFirebase().firestore();
  }

  return { getFireStore, getAuth, getAuthProviders };
}

import useFirebase from './useFirebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onMounted } from 'vue';
const { getAuth, getAuthProviders } = useFirebase();
const authProviders = getAuthProviders();

function signInSuccessWithAuthResult(authResult, redirectUrl) {
  console.log('authResult', authResult);
  console.log('redirectUrl', redirectUrl);
  setUser(formatUser(authResult));
  // Do what you wish with authResult... save to session, cookie, etc.
}
// Note, bad credentials is not a sign-in failure
function signInFailure(error) {
  // eslint-disable-next-line no-alert
  alert('Sign in failed. See dev console for error response');
  console.log('error', error);
}
function uiShown() {
  console.log('Firebase UI widget rendered');
}

export default function useFirebaseUi(
  containerId = '#firebaseui-auth-container',
  callbacks = {
    signInSuccessWithAuthResult,
    signInFailure,
    uiShown,
  }
) {
  const auth = getAuth();
  const ui = new firebaseui.auth.AuthUI(auth);
  const firebaseConfigUI = {
    signInSuccessUrl: '/account',
    signInOptions: [
      ...authProviders,
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
    callbacks,
    signInFlow: 'popup',
  };

  onMounted(() => {
    ui.start(containerId, firebaseConfigUI);
  });
  return {};
}

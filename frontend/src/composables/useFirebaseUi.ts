import useFirebase from './useFirebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onMounted } from 'vue';
const { getAuth, getAuthProviders } = useFirebase();
const authProviders = getAuthProviders();

/* tslint:disable-next-line */
function signInSuccessWithAuthResult(authResult: object, redirectUrl?: string) {
  console.log('authResult', authResult);
  console.log('redirectUrl', redirectUrl);
}
// Note, bad credentials is not a sign-in failure
function signInFailure(error: firebaseui.auth.AuthUIError) {
  alert('Sign in failed. See dev console for error response');
  console.error('error', error);
}

function uiShown() {
  console.log('Firebase UI widget rendered');
}

export default function useFirebaseUi(
  containerId = '#firebaseui-auth-container',
  callbacks = {}
) {
  const defaultCallbacks = {
    signInSuccessWithAuthResult,
    signInFailure,
    uiShown,
  };
  const auth = getAuth();
  const ui = new firebaseui.auth.AuthUI(auth);
  const firebaseConfigUI = {
    signInSuccessUrl: '/account',
    signInOptions: [
      ...authProviders,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/',
    // Privacy policy url/callback.
    privacyPolicyUrl() {
      window.location.assign('<your-privacy-policy-url>');
    },
    callbacks: { ...defaultCallbacks, ...callbacks },
    signInFlow: 'popup',
  } as firebaseui.auth.Config;

  onMounted(() => {
    ui.start(containerId, firebaseConfigUI);
  });
  return {};
}

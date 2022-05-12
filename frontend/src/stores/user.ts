import { defineStore } from 'pinia';
import { User } from './models';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useUserStore = defineStore('User', {
  state: (): User => ({
    displayName: '',
    email: '',
    id: '',
    isNewUser: false,
    phoneNumber: null,
    photoUrl: '',
  }),
  persist: true,
  actions: {
    setUser(user: User) {
      this.$state = user;
    },
  },
});

export default useUserStore;

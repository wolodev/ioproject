import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useStore = defineStore('storeId', {
  state: () => ({
    counter: 0,
    lastName: 'Michael',
    firstName: 'Jordan',
  }),
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`,
  },
  actions: {
    increment() {
      this.counter += 1;
    },
  },
});

export default useStore;

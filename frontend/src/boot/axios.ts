import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjUyMzc0MjM5LCJpYXQiOjE2NTIyODc4MzksInN1YiI6ImFkbWluIn0.h8IQiOGzcmxuVne8b3UcW2Qm5ezaQPLPIJkgCfmjFXcaf';
const headers = {
  Authorization: `Bearer ${token}`,
  'Access-Control-Allow-Origin': 'http://ioproject-backend.herokuapp.com/',
  'Content-Type': 'application/json',
  mode: 'no-cors',
};

const api = axios.create({
  baseURL: process.env.API,
  headers,
  withCredentials: true,
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

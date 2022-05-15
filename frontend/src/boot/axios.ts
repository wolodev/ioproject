import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import type { AxiosRequestConfig } from 'axios';

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
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjUyMzc0MjM5LCJpYXQiOjE2NTIyODc4MzksInN1YiI6ImFkbWluIn0.h8IQiOGzcmxuVne8b3UcW2Qm5ezaQPLPIJkgCfmjFXcaf';
// const headers = {
//   Authorization: `Bearer ${token}`,
//   // 'Access-Control-Allow-Origin': 'http://ioproject-backend.herokuapp.com/',
//   // 'Content-Type': 'application/json',
// };

const api = axios.create({
  baseURL: process.env.API,
  // headers,
  // withCredentials: true,
});


const axiosGet = api.get;
export default boot(async ({ app }) => {
  // terrible, but api does't implement token refreshing,
  // could have been secured by cors easily
  if (!(process.env.API && process.env.API_LOGIN && process.env.API_PASSWORD)) {
    console.log(process.env.API, 'XXX')
    throw 'Required Api Credentials are not definied' + process.env.API_PASSWORD
  }
  const response = await api.post('login',
    `username=${process.env.API_LOGIN}&password=${process.env.API_PASSWORD}`
  );
  const { access_token } = response.data;
  api.get = (url: string, config: AxiosRequestConfig = {}) => {
    config.headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return axiosGet(url, config);
  };

  console.log(response);
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

import axios, {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import * as SecureStore from "expo-secure-store";

const onFulfilled = (response: AxiosResponse) => {
  //TODO add some custom logic here
  return response;
};

const onRejected = async (error) => {
  //TODO add some custom logic here
};

const onRequest = async (config: InternalAxiosRequestConfig) => {
  const token = await SecureStore.getItemAsync('secure_token');
  config.headers.Authorization = "Bearer " + token;
  return config;
}

const onRequestError = async (error) => {
  return Promise.reject(error);
}

const axiosConfig = () => {
  // force axios to save cookie from every request
  axios.defaults.baseURL = 'https://3c73-193-82-234-207.au.ngrok.io';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  //Only here for using ngrok as backend
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
  axios.interceptors.request.use(onRequest, onRequestError)
  //TODO enable this if we want to use it
  // axios.interceptors.response.use(onFulfilled, onRejected);
};

export default axiosConfig;

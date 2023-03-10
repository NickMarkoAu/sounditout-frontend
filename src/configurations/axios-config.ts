import axios, { AxiosResponse } from 'axios';

const onFulfilled = (response: AxiosResponse) => {
  //TODO add some custom logic here
  return response;
};

const onRejected = async (error) => {
  //TODO add some custom logic here
};

const axiosConfig = () => {
  // force axios to save cookie from every request
  axios.defaults.baseURL = 'https://9b51-193-82-234-207.au.ngrok.io';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  //Only here for using ngrok as backend
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
  //TODO enable this if we want to use it
  // axios.interceptors.response.use(onFulfilled, onRejected);
};

export default axiosConfig;

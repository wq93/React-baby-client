import axios from 'axios';

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(response => {
  if(parseInt(response.data.code, 10) === 0) {
    return response.data.data
  }
}, error => {
  console.log('请求error', error.message);
  return Promise.reject(error);
})

export default axios

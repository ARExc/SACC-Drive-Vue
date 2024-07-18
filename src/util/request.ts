import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
});

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    //console.log(err); // for debug
    return Promise.reject(err);
  }
);
request.interceptors.response.use(
  // response interceptor
  (res) => {
    return res;
  },
  (err) => {
    // for debug
    return Promise.reject(err);
  }
);

export default request;

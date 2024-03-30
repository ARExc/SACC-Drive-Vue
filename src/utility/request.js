import axios from 'axios';
import router from '@/router';
const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
});
request.interceptors.request.use(
    // request interceptor
    (config) => {
        let token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
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
        if (err.response.status === 401){
            localStorage.removeItem('token');
            router.push('/Login'); 
        }
        

        return Promise.reject(err);
    }
);
export default request;
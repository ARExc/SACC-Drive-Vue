import './assets/css/global.css';  
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from '@/router/index.js'
import store from './store/store.js'
const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app')

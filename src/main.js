import './assets/css/global.css';  
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index.js'
import store from './store/store.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
    // 遍历 ElementPlusIconsVue 对象的键值对,注册组件到应用程序中
    app.component(key, component)
})

app.mount("#app");


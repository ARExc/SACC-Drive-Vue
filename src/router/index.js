import {createRouter, createWebHistory} from 'vue-router';
import Register from './views/Register.vue'
import Error from './views/Error.vue'
import Login from './views/Login.vue'
import Home from '../views/Home.vue'
import ResetPwd from './views/ResetPwd.vue'
import Recycle from '../views/Recycle.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Register',
            name: 'Register',
            component: Register
        },
        {
            path: '/error',
            name: 'Error',
            component: Error
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: 'Recycle',
                    name: 'Recycle',
                    component: Recycle
                },
                {
                    path: 'privateDisk',
                    component: () => import('../views/PrivateDisk.vue'),
                },
                {
                    path: 'publicDisk',
                    component: () => import('../views/PublicDisk.vue'),
                },
            ]
        },
        {
            path: '/ResetPwd',
            name: 'ResetPwd',
            component: ResetPwd
        },
    ],

})
router.afterEach((to, from) => {
    // console.log('路由切换', to, from)
})
export default router;

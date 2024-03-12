import Vue from 'vue'
import {createRouter, createWebHistory} from 'vue-router';
import Register from './views/register.vue'
import Error from './views/error.vue'
import Login from './views/login.vue'
import Home from '../views/Home.vue'
import ResetPwd from './views/resetPwd.vue'
import Recycle from '../views/Recycle.vue'
import FolderDetail from "@/views/FolderDetail.vue";

const router= createRouter({
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
            redirect: '/home/privateDisk'
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
                    children: [
                        {
                            path: ':folderName',
                            name: 'FolderDetail', // 给子路由指定一个名字
                            component: FolderDetail
                        }
                    ]
                },
                {
                    path: 'publicDisk',
                    component: () => import('../views/PublicDisk.vue')
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
export default router;
// router.beforeEach()
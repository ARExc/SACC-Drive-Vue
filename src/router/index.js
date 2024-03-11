import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'; 
import Login from './views/login.vue'
import Register from './views/register.vue'
import Error from './views/error.vue'
import Home from '../views/Home.vue'
import ResetPwd from './views/resetPwd.vue'
import Recycle from '../views/Recycle.vue'
export default new createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Login'},
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
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
          path: 'recycle',
          name: 'Recycle',
          component: Recycle
        },
        {
          path: 'privateDisk',
          component: () => import('../views/PrivateDisk.vue')
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
    

  ]
  
})
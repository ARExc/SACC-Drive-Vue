import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'; 
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Error from './views/Error.vue'
import Home from '../views/Home.vue'
import ResetPwd from './views/ResetPwd.vue'
import Recycle from '../views/Recycle.vue'
export default new createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Login'},
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
          component: () => import('../views/PrivateDisk.vue')
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
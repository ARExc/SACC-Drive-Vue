import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'; 
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Error from './views/Error.vue'
import Home from '../views/Home.vue'
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
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ]
  
})
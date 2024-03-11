import Vue from 'vue';  
import Vuex from 'vuex';  
  

  
export default new Vuex.Store({  
  state: {  
    token: null, 
    isLoggedIn: false, 
  },  
  mutations: {  
    setToken(state, token) {  
      state.token = token;  
      state.isLoggedIn = token !== null;  
    },  
    logout(state) {  
      state.token = null;  
      state.isLoggedIn = false;  
    },  
  },  
  getters: {  
    isLoggedIn: state => state.isLoggedIn,  
    getToken: state => state.token,  
  },  
});
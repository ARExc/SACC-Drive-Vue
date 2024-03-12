import Vue from 'vue';  
import Vuex from 'vuex';
  
export default new Vuex.Store({  
  state: {  
    token: null, 
    isLoggedIn: false,
    isUpload: false,
    fileType: null,
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
    setUpload(state, isUpload) {
      state.isUpload = isUpload;
    },
    setFileType(state, fileType) {
      state.fileType = fileType;
    }
  },  
  getters: {  
    isLoggedIn: state => state.isLoggedIn,  
    getToken: state => state.token,
    isUpload: state => state.isUpload,
    fileType: state => state.fileType,
  },  
});
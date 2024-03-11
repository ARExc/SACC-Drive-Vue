<template>
  <div>
    <h2>注册</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nickName">昵称:</label>
        <input type="text" id="nickName" v-model="nickName" required>
      </div>
      <div>
        <label for="studentId">学号:</label>
        <input type="text" id="studentId" v-model="studentId" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import request from '@/utility/request.js';
export default {
  data() {
    return {
      nickName:'',
      studentId:'',
      password:'',
      errorMessage:''
    };
  },
  methods: {
    submitForm() {
      if (!this.studentId || !this.nickName || !this.password) {
        this.errorMessage = '您输入的注册信息有误';
        return;
      }

      this.registerUser();
    },
    registerUser() {
      
        const response = request.post('/api/register', {
          studentId: this.studentId,
          password: this.password,
          nickName: this.nickName
        }).then(response => {
          if (response.status >= 200 && response.status < 300) {
            this.$router.push('/Login');
          }
        }).catch(error => {
          console.error(error);
        });
        
     
    }
  }
};
</script>

<style scoped>
</style>
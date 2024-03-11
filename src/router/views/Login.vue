<template>
  <div>
    <h2>登录</h2>
    <form @submit.prevent="login">
      <div>
        <label for="studentId">学号</label>
        <input type="text" v-model="studentId" id="studentId" required>
      </div>
      <div>
        <label for="password">密码</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">登录</button>
    </form>
    <router-link to="/Register">没有账号？点击这里注册</router-link>
  </div>
</template>

<script>
import request from '@/utility/request.js';
export default {
  data() {
    return {
      studentId:'',
      password:''
    }
  },
  methods: {
    login() {
      request.post('/api/login', {
        studentId: this.studentId,
        password: this.password
      }).then(response => {
        if(response.status>=200&&response.status<300)
        this.$store.commit('setToken', response.data.token);
        this.$router.push('/Home');
      }).catch(error => {
        this.$router.push('/Error');
      });
    }
  }
}
</script>
<style scoped>
</style>
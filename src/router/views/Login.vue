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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      studentId,
      password
    }
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:4523/m1/4072730-0-default/api/login', {
        studentId: this.studentId,
        password: this.password
      }).then(response => {
        const isLogin = true;
        this.$router.push('/Home');
      }).catch(error => {
       alert(error);
      });
    }
  }
}
</script>
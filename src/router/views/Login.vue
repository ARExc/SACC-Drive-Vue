<template>
  <div class="login">
   <div id="logo"> <img src="../../../public/sacc.png" alt="">
    <h2>SACC-DRIVE</h2>
    <h3>SACC NETWORK DISK SYSTEM</h3></div>
    <div class="form">
      <form @submit.prevent="login">
        <div>
          <input type="text" v-model="studentId" id="studentId" placeholder="输入账号">
        </div>
        <div>
          <input type="password" v-model="password" id="password" placeholder="输入密码">
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
    <router-link to="/register" class="register">注册</router-link>
    <!-- <router-link to="/resetPwd" class="resetpwd">修改密码</router-link> -->
  </div>
</template>

<script>
import request from "@/utility/request";
import router from "@/router/index";
import {ElMessage} from 'element-plus';
export default {
  data() {
    return {
      studentId: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
   
    login() {
      if (!this.studentId || !this.password) {
        ElMessage.error('账号和密码不能为空!')
        return;
      }
        request.post('/api/login', {
        studentId: this.studentId, 
        password: this.password,
      }).then(response => {
        if(response.status>=200&&response.status<300){
        this.$store.commit('setToken', response.data.data.token);
        this.$store.state.username = response.data.data.nickname;
        localStorage.setItem('token', response.data.data.token);
        this.$router.push('/home/privateDisk');}
        else{
          this.errorMessage = response.data.errorMsg || '登录失败，请重试';
          ElMessage.error(errorMessage);
        }
      }).catch(error => {
        // this.$router.push('/error');
        this.errorMessage = error.response.data.errorMsg || '登录失败，请检查您的网络';
        ElMessage.error(errorMessage)
      });

      this.$router.push('/home/privateDisk');

    }
  }
}
</script>
<style scoped>
@font-face {
  font-family: 'YouSheBiaoTiYuan';
  src: url('../../../public/YouSheBiaoTiYuan-2.otf') format('opentype');
}
.logo{
  position: relative;
  width: 100%;
}
.login {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-image: url('../../../public/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img {
  margin-top: 2vh;
  width: 101px;
  height: 101px;
  float: left;
}

h2 {
  font-size: 48px;
  font-weight: 400;
  line-height: 62.4px;
  font-family: 'YouSheBiaoTiYuan';
  margin-top: 20px;
  float: left;
}

h3 {
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  letter-spacing: 1px;
  font-family: 'YouSheBiaoTiYuan';
  margin-top: 10px;
}

.form {
  text-align: center;
  margin-top: 20px;
}

#studentId, #password {
  width: 288px;
  height: 45px;
  opacity: 1;
  border-radius: 14px;
  background: rgba(255, 255, 255, 1);
  border: none;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 18.47px;
  color: rgba(166, 166, 166, 1);
}

button {
  width: 140px;
  height: 46px;
  opacity: 1;
  border-radius: 23px;
  border: none;
  background: rgba(0, 43, 255, 1);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 26.38px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-top: 20px;
}

.register {
  font-size: 20px;
  letter-spacing: 2px;
  position: absolute;
  top: 3vh;
  right: 5vw;
}

.resetpwd {
  font-size: 10px;
  letter-spacing: 2px;
  position: absolute;
  top: 72vh;
  right: 5vw;
}

a:hover {
  color: blue;
}

@media (max-width: 768px) {
  h2 {
    font-size: 36px; /* 较小屏幕上减小字体大小 */
  }
  h3 {
    font-size: 14px;
  }
  #studentId, #password {
    width: 80%; /* 较小屏幕上增加宽度 */
  }
  button {
    width: 100px; /* 较小屏幕上调整按钮大小 */
  }
}
</style>./login.vue./login.vue
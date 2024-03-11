<template>
  <div class="login">
    <img src="../../../public/sacc.png" alt="">
    <h2>SACC网盘系统</h2>
    <h3>SACC NETWORK DISK SYSTEM</h3>
    <div class="form">
      <form @submit.prevent="login">
      <div>
        <input type="text" v-model="studentId" id="studentId" placeholder="输入账号" >
      </div>
      <div>
        <input type="password" v-model="password" id="password" placeholder="输入密码" >
      </div>
      <button type="submit">登录</button>
    </form>
    </div>
    <router-link to="/Register" class="register">注册</router-link>
    <router-link to="/ResetPwd" class="resetpwd">忘记密码</router-link>
  </div>
</template>

<script>
import request from '@/utility/request.js';
import {ElMessage} from 'element-plus';
export default {
  data() {
    return {
      studentId:'',
      password:'',
      errorMessage:''
    }
  },
  methods: {
    login() {

      // request.post('/api/login', {
      //   studentId: this.studentId,
      //   password: this.password
      // errorMessage:this.errorMessage
      // }).then(response => {
      //   if(response.status>=200&&response.status<300)
      //   this.$store.commit('setToken', response.data.token);
      //   this.$router.push('/Home');
      // }).catch(error => {
      //   // this.$router.push('/Error');
      //   ElMessage.error('errorMessage')
      // });
     

      this.$router.push('/home/privateDisk');

    }
  }
}
</script>
<style scoped>
@font-face {  
    font-family: 'YouSheBiaoTiYuan';  
    src: url('../../../public/YouSheBiaoTiYuan-2.otf') format('opentype');  /* 指定字体文件的路径和格式 */  
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
}
img {
  width: 101px;
  height: 101px;
  position: absolute;
  top: 23vh;
  left: 33vw;
}
h2 {
  font-size: 48px;
  font-weight: 400;
  line-height: 62.4px;
  font-family:'YouSheBiaoTiYuan';
  position: absolute;
  top: 25vh;
  left: 40vw;
}
h3 {
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  letter-spacing: 1px;
  font-family: 'YouSheBiaoTiYuan';
  position: absolute;
  top: 32vh;
  left: 41vw;
}
.form {
  position: absolute;
  top: 40vh;
  left: 40vw;
  text-align: center;
}
#studentId{
width: 288px;
height: 45px;
opacity: 1;
border-radius: 14px;
background: rgba(255, 255, 255, 1);
border: none;
margin-bottom: 5vh;
}
#password{
width: 288px;
height: 45px;
opacity: 1;
border-radius: 16px;
border: none;
background: rgba(255, 255, 255, 1);
margin-bottom: 5vh;
}
input {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 18.47px;
  color: rgba(166, 166, 166, 1);
  vertical-align: top;
}
button {
margin: 0,auto;
width: 140px;
height: 46px;
opacity: 1;
border-radius: 23px;
border: none;
background: rgba(0, 43, 255, 1);
font-size:20px;
font-weight:700;
letter-spacing:0px;
line-height:26.38px;
color: rgba(255, 255, 255, 1);
text-align: center;
vertical-align: top;
}
.register{
  position: absolute;
  font-size: 10px;
  letter-spacing: 2px;
  top: 72vh;
  left: 52vw;
}
.resetpwd{
  position: absolute;
  font-size: 10px;
  letter-spacing: 2px;
  top: 72vh;
  left: 55vw;
}
a:hover{
  color: blue;
}
</style>./login.vue
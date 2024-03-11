<template>
  <div class="register">
    <img src="../../../public/sacc.png" alt="">
    <h2>SACC网盘系统</h2>
    <h3>SACC NETWORK DISK SYSTEM</h3>
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" id="studentId" v-model="studentId" placeholder="账号" required>
      </div>
      <div>
        <input type="password" id="password" v-model="password" placeholder="密码" required>
      </div>
      <div>
        <input type="text" id="nickName" v-model="nickName" placeholder="想个酷酷的昵称吧" required>
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import request from '@/utility/request.js';
import {ElMessage} from 'element-plus';
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
      var password = document.getElementById("password").value; 
      var upperCaseLetters = /[A-Z]/g;  
      var lowerCaseLetters = /[a-z]/g;  
      var numbers = /[0-9]/g;  
      if (!this.studentId || !this.nickName || !this.password) {
        ElMessage.error('您输入的注册信息有误')
        return
      }
      
      if(password.match(upperCaseLetters) && password.match(lowerCaseLetters) && password.match(numbers)) {  
      } else {  
        ElMessage.error('密码请包含大小写字母和数字')
        return;
      }  
      this.registerUser();
    },
    registerUser() {
        const response = request.post('/api/register', {
          studentId: this.studentId,
          password: this.password,
          nickName: this.nickName,
          errorMessage:this.errorMessage
        }).then(response => {
          if (response.status >= 200 && response.status < 300) {
            this.$router.push('/login');
          }
        }).catch(error => {
          ElMessage.error(errorMessage)
        });
        
     
    },
    }
  }

</script>

<style scoped>
.register {
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
img{
  position: absolute;
  top: 23vh;
  left: 33vw;
  width: 101px;
  height: 101px;
  opacity: 1;
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
input {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 18.47px;
  color: rgba(166, 166, 166, 1);
  vertical-align: top;
}
form {
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
border: none;
margin-bottom: 3vh;
background: rgba(255, 255, 255, 1);
}
#password{
  width: 288px;
  height: 45px;
  opacity: 1;
  border-radius: 16px;
  border: none;
margin-bottom: 3vh;
  background: rgba(255, 255, 255, 1);}
#nickName{
  width: 288px;
  height: 45px;
  opacity: 1;
  border-radius: 16px;
  border: none;
margin-bottom: 3vh;
  background: rgba(255, 255, 255, 1);
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
  vertical-align: top;
}
</style>./register.vue./register.vue
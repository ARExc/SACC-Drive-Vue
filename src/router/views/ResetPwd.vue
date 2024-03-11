<template>
  <div class="resetpwd">
    <img src="../../../public/sacc.png" alt="">
    <h2>SACC网盘系统</h2>
    <h3>SACC NETWORK DISK SYSTEM</h3>
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" id="studentId" v-model="studentId" placeholder="账号" required>
      </div>
      <div>
        <input type="password" id="password" v-model="password" placeholder="请输入密码" required>
      </div>
      <div>
        <input type="password" id="newpwd" v-model="newpwd" placeholder="请输入新密码" required>
      </div>
      <div>
        <input type="password" id="check" placeholder="请确认新密码" required>
      </div>
      <button type="submit">确认修改</button>
    </form>
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
      newpwd:'',
      errorMessage:''
    };
  },
    methods: {
      submitForm() {
      if (!this.studentId || !this.newpwd || !this.password) {
        ElMessage.error('您输入的注册信息有误')
        return
      }
      var input1 = document.getElementById('newpwd').value;  
      var input2 = document.getElementById('check').value;  
    if (input1 === input2) {   
    } else {  
      ElMessage.error('您两次输入的新密码不一致') 
      return; 
    }  
      this.registerUser();
    },
    registerUser() {
        const response = request.post('/api/resetPwd', {
          studentId: this.studentId,
          password: this.password,
          newpwd:this.newpwd,
          errorMessage:this.errorMessage
        }).then(response => {
          if (response.status >= 200 && response.status < 300) {
            ElMessage({
                message: '修改密码成功，三秒后为您跳转登录界面',
                type: 'success',
        })
            setTimeout(() => {
              this.$router.push('/Login');
            },3000);
          }
        }).catch(error => {
          ElMessage.error(errorMessage)
        });
        
     
    },
    }
  }

</script>

<style scoped>
.resetpwd {
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
  background: rgba(255, 255, 255, 1);
  }
  #newpwd{
    width: 288px;
  height: 45px;
  opacity: 1;
  border-radius: 16px;
  border: none;
  margin-bottom: 3vh;
  background: rgba(255, 255, 255, 1);
  }
  #check{
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
</style>
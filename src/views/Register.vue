<template>
  <div class="register">

    <img src="../../public/sacc.png" alt="">
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
    <router-link to="/Login" class="login">返回登陆界面</router-link>
  </div>
</template>

<script>
import request from '@/utility/api/request.js';
import {ElMessage} from 'element-plus';
export default {
  data() {
    return {
      nickName: '',
      studentId: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    submitForm() {
      if (this.password.length < 8) {
        ElMessage.error('密码至少需要8位');
        return;
      }
      var password = document.getElementById("password").value;
      var upperCaseLetters = /[A-Z]/g;
      var lowerCaseLetters = /[a-z]/g;
      var numbers = /[0-9]/g;
      if (!this.studentId || !this.nickName || !this.password) {
        ElMessage.error('您输入的注册信息有误')
        return
      }

      if (password.match(upperCaseLetters) && password.match(lowerCaseLetters) && password.match(numbers)) {
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
        errorMessage: this.errorMessage
      }).then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.$router.push('/Login');
        }
      }).catch(error => {
        ElMessage.error('errorMessage')
      });
    },
  }
}

</script>

<style scoped>
@font-face {
  font-family: 'YouSheBiaoTiYuan';
  src: url('../../public/YouSheBiaoTiYuan-2.otf') format('opentype');
}

.register {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-image: url('../../public/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  position: relative;
  width: 100%;
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

input {
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

form {
  text-align: center;
  margin-top: 20px;
}

#studentId, #password, #nickName {
  width: 288px;
  height: 45px;
  opacity: 1;
  border-radius: 14px;
  border: none;
  margin-bottom: 20px;
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
  margin-top: 20px;
}

.login {
  position: absolute;
  font-size: 18px;
  letter-spacing: 2px;
  top: 3vh;
  left: 90vw;
}

a:hover {
  color: blue;
}

@media (max-width: 768px) {
  h2 {
    font-size: 36px;
  }
  h3 {
    font-size: 14px;
  }
  #studentId, #password, #nickName {
    width: 80%;
  }
  button {
    width: 100px;
  }
}
</style>./register.vue./register.vue
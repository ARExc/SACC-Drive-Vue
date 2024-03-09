<template>
  <div>
    <h2>注册</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nickName">学号:</label>
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
export default {
  data() {
    return {
      nickName: '',
      studentId: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    submitForm() {
      if (!this.studentId || !this.nickName || !this.password) {
        this.errorMessage = '';
        return;
      }

      this.registerUser();
    },
    async registerUser() {
      try {
        const response = await axios.post('http://127.0.0.1:4523/m1/4072730-0-default/api/register', {
          username: this.studentId,
          password: this.password,
          nickName: this.nickName
        });
        if (response.data.success) {
          this.$router.push('/Login');
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = '注册失败';
      }
    }
  }
};
</script>

<style scoped>
</style>
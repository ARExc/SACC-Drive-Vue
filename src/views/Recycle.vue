<template>
  <div class="container">
    <div class="main">

    </div>
  </div>
</template>

<script>
import request from '@/utility/request';
export default {
  data(){
    return ;
  },
  created(){
  request.post('/api/recycle/getRecycleList', {
        studentId: this.studentId,
        password: this.password,
        errorMessage:this.errorMessage
      }).then(response => {
        if(response.status>=200&&response.status<300)
        this.$store.commit('setToken', response.data.token);
        this.$router.push('/home');
      }).catch(error => {
        // this.$router.push('/error');
        ElMessage.error('errorMessage')
      });

}

}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1
}
</style>
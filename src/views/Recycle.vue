<template>
  <div class="container">
    <div>  
    <ul>  
      <li v-for="file in total" :key="id">  
        <img :src="fileCover" alt="文件封面"> 
        <h3>{{ fileName }}</h3>  
        <p>大小: {{ fileSize }}</p>  
        <p>创建时间: {{ createTime }}</p>  
      </li>  
    </ul>  
      </div>
  </div>
</template>

<script>
import request from '@/utility/request';
import {ElMessage} from 'element-plus';
export default {
  data(){
    return {
      pageNo:'',
      pageSize:'',
      total:'',
      id:'',
      filePid:'',
      fileName:'',
      fileSize:'',
      fileCover:'',
      createTime:'',
      lastUpdateTime:'',
      folderType:'',
      fileCategory:'',
      status:''
    }
  },
  methods:{
    getRecycleList(){
      request.get('/api/recycle/getRecycleList', {
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }).then(response => {
        if(response.code === 1)
        this.total = response.data.total
        this.id = response.data.id
        this.filePid = response.data.filePid
        this.fileName = response.data.fileName
        this.fileSize = response.data.fileSize
        this.fileCover = response.data.fileCover
        this.createTime = response.data.createTime
        this.lastUpdateTime = response.data.lastUpdateTime
        this.folderType = response.data.folderType
      }).catch(error => {
        // this.$router.push('/error');
        ElMessage.error('errorMessage')
      });
    }
  },
  created(){
    getRecycleList()
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
<template>
  <div class="container">
    <div class="folder" @contextmenu.prevent="showContextMenu($event)">
      
    <ul>  
      <li v-for="file in total" :key="id">  
        <img :src="fileCover" alt="文件封面"> 
        <h3>{{ fileName }}</h3>  
        <p>大小: {{ fileSize }}</p>  
        <p>创建时间: {{ createTime }}</p>  
      </li>  
    </ul>  
      </div>
      <div v-if="showMenu" class="custom-context-menu" :style="{top:menuPosition.y+'px',left:menuPosition.x+'px'}">
      <ul>
        <li>下载</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref, watch} from 'vue'
import router from '@/router/index'
import store from "@/store/store";
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
  // created(){
  //   getRecycleList()
// }，
 showContextMenu(e) {
  e.preventDefault()
  // if(e.innerHTML==null){
  //   c
  // }
  showMenu.value = true
  menuPosition.value = {x: e.pageX, y: e.pageY}//event.pageX和event.pageY是事件对象的属性，它们提供了事件发生时鼠标指针相对于整个文档的水平和垂直位置
}

}
const showMenu = ref(false)
const menuPosition = ref({x: 0, y: 0})
window.addEventListener('click', () => {
  showMenu.value = false
});
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
.custom-context-menu {
  position: fixed;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.custom-context-menu ul {

  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-context-menu ul li {
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.custom-context-menu ul li:hover {
  background-color: #f0f0f0;
}
</style>
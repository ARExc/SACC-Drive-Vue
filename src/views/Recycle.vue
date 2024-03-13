<template>
  <div class="container">
      <div class="file-item"   @contextmenu.prevent="showContextMenu($event)" style="height: 100px; width: 100px;"> 
        <!-- v-for="file in records"  -->
        <!-- :key="file.id" -->
        <!-- <img :src="src(file)" alt="文件封面"> 
        <h3>{{ file.fileName }}</h3>  
        <p>大小: {{ file.fileSize }}</p>  
        <p>创建时间: {{ file.createTime }}</p>   -->
      </div>
      <div v-if="showMenu" class="custom-context-menu" :style="{top:menuPosition.y+'px',left:menuPosition.x+'px'}">
      <ul>
        <li>恢复</li>
        <li>彻底删除</li>
      </ul>
    </div>
  </div>
</template>

<script setup>

import {onMounted, reactive, ref, watch} from 'vue'
import router from '@/router/index'
import store from "@/store/store";
import request from '@/utility/request';
import {ElMessage} from 'element-plus';
 
  
    const showMenu = ref(false)
    const menuPosition = ref({x: 0, y: 0})
    let records = ref([]);

     let pageNo ='';
     let pageSize='';
     let total = '';


     // created(){
  //   getRecycleList()
// }，


   function getRecycleList(){
      request.get('/api/recycle/getRecycleList', {
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }).then(response => {
        if(response.code === 1)
        this.total = response.data.total
       records.value = response.data.records
      }).catch(error => {
        // this.$router.push('/error');
        ElMessage.error('errorMessage')
      });
    }
   function showContextMenu(e) {
      e.preventDefault()
  // if(e.innerHTML==null){
  //   c
  // }
      showMenu.value = true
      menuPosition.value = {x: e.pageX, y: e.pageY}//event.pageX和event.pageY是事件对象的属性，它们提供了事件发生时鼠标指针相对于整个文档的水平和垂直位置
}
  
window.addEventListener('click', () => {
  showMenu.value = false
});
let src = (file) => {
  if (file.folderType === 1) {
    return require('@/assets/icon/folder.png')//这里的require函数调用告诉构建工具（比如Webpack），它需要处理（即包含在最终的构建结果中）这些图片资源。
  } else if (file.folderType===0) {
    //1：视频 2：音频 3：文档 4：图片 5：其他
    if (file.fileCategory === 1) {
      return require('@/assets/icon/video.png')
    } else if (file.fileCategory === 2) {
      return require('@/assets/icon/music.png')
    } else if(file.fileCategory === 3){
      return require('@/assets/icon/document.png')
    }else if(file.fileCategory === 4){
      return require('@/assets/icon/picture.png')
    } else{
      return require('@/assets/icon/file.png')
    }
  } else{
    return require('@/assets/icon/file.png')
  }
};

function deleteItem(){
  request.delete('/api/recycle/delFile', {
    id:this.$route.params.id
  }).then(response => {
    if(response.code === 1){
      ElMessage.success('删除成功')
      this.getRecycleList()
    }else{
      ElMessage.error('删除失败')
    }
  }).catch(error => {
    // this.$router.push('/error');
    ElMessage.error('errorMessage')
  })
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
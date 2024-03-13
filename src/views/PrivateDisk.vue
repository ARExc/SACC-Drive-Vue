<template>
  <HeaderBar></HeaderBar>
  <div class="folder" @contextmenu.prevent="showContextMenu($event)">
    <div class="folder-item" v-for="item in items" :key="item.fileId" @click="preview(item)">
      <img :src="src(item)" alt="File Icon">
      <span>{{ item.fileName }}</span>
    </div>
    <div v-if="showMenu" class="custom-context-menu" :style="{top:menuPosition.y+'px',left:menuPosition.x+'px'}">
      <ul>
        <li @click="downloadItem(e)">下载</li>
        <li @click="moveFile">移动</li>
        <li @click="deleteItem">删除</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import router from '@/router/index'
import store from "@/store";
import request from "@/utility/request";
import HeaderBar from "@/views/HeaderBar.vue";

const showMenu = ref(false)
const menuPosition = ref({x: 0, y: 0})
let items = ref([])


watch(() => store.getters.breadcrumb, (newVal) => {
  console.log(newVal);
  if (newVal) {
    items.value.push({id: 3, fileName: '文件2', type: 'file'})
    store.commit('file/setUpload', false)
  }
}, {deep: true});


//点击文件夹进入下一级
const preview = (item) => {
  if (item.folderType === 1) {
    console.log('点击' + item.fileName)
    // debugger;
    store.commit('breadcrumb/addBreadcrumb', item);
  }
}

//根据类型显示不同的图标
let src = (item) => {
  if (item.folderType === 1) {
    return require('@/assets/icon/folder.png')//这里的require函数调用告诉构建工具（比如Webpack），它需要处理（即包含在最终的构建结果中）这些图片资源。
  } else if (item.folderType === 0) {
    //1：视频 2：音频 3：文档 4：图片 5：其他
    if (item.fileCategory === 1) {
      return require('@/assets/icon/video.png')
    } else if (item.fileCategory === 2) {
      return require('@/assets/icon/music.png')
    } else if (item.fileCategory === 3) {
      return require('@/assets/icon/document.png')
    } else if (item.fileCategory === 4) {
      return require('@/assets/icon/picture.png')
    } else {
      return require('@/assets/icon/file.png')
    }
  } else {
    return require('@/assets/icon/file.png')
  }
};

function showContextMenu(e) {
  e.preventDefault()
  // if(e.innerHTML==null){
  //   return;
  // }
  showMenu.value = true
  menuPosition.value = {x: e.pageX, y: e.pageY}//event.pageX和event.pageY是事件对象的属性，它们提供了事件发生时鼠标指针相对于整个文档的水平和垂直位置
}

onMounted(() => {
  request.get('/api/priv/file/getFileList').then(res => {
    items.value = res.data.data.records;
    // console.log(items.value)
  })
});

function moveFile() {
  console.log('移动')
  showMenu.value = false
}

function deleteItem() {
  console.log('删除')
  showMenu.value = false
}

function downloadItem(e) {
  console.log('下载' + e)
  showMenu.value = false
}

window.addEventListener('click', () => {
  showMenu.value = false
});

</script>

<style scoped>
.display {
  height: 100%;
  display: block;
}


.folder {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 创建多列，每列最小宽度120px，最大1fr */
  grid-gap: 20px; /* 设置网格间的间隙 */
  padding: 20px; /* 设置内边距 */
  background-color: #FFF; /* 设置背景色为白色 */
}


.folder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px; /* 设置固定高度 */
  
  transition: transform 0.3s ease; /* 平滑过渡效果 */
}

.folder-item:hover {
  background-color: #f9f9f9; /* 设置背景色 */

  transform: translateY(-5px); /* 悬停时上移 */
}

.folder-item img {
  width: 100%; /* 图标宽度 */
  max-width: 60px; /* 图标最大宽度 */
  height: auto; /* 保持图标的原始宽高比 */
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
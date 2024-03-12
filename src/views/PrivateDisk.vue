<template>
  <Breadcrumb></Breadcrumb>
  <div class="folder" @contextmenu.prevent="showContextMenu($event)">
    <div class="folder-item" v-for="item in items" :key="item.id" @click="toNext(item)">
      <img :src="src(item)" alt="File Icon">
      <span>{{ item.name }}</span>
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
import {onMounted, ref} from 'vue'
import router from '@/router/index'
import Breadcrumb from "@/views/Breadcrumb.vue";
const showMenu = ref(false)
const menuPosition=ref({x:0,y:0})
let items=ref([{ id: 1, name: '文件1' }, { id: 2, name: '文件夹1' }]) // 示例数据
let src=(item)=>{
  if(item.name.includes('文件夹')){
    return require('../../public/folder.png')
  }else{
    return require('../../public/file.png')
  }
};

const toNext = (item) => {
  console.log('点击'+item.name)
  items=[{ id: 1, name: '文件2' }, { id: 2, name: '文件夹2' }]
  router.push('/home/privateDisk/folder')
  // request.get('api/file/getAllFiles',).then(res=>{
  //   items=res.data.data;
  //   console.log(res.data)
  // })
}


function showContextMenu(e) {
  e.preventDefault()
  // if(e.innerHTML==null){
  //   c
  // }
  showMenu.value = true
  menuPosition.value = { x: e.pageX, y: e.pageY }//event.pageX和event.pageY是事件对象的属性，它们提供了事件发生时鼠标指针相对于整个文档的水平和垂直位置
}

function moveFile() {
  console.log('移动')
  showMenu.value = false
}

function deleteItem() {
  console.log('删除')
  showMenu.value = false
}

function downloadItem(e) {
  console.log('下载'+e)
  showMenu.value = false
}

window.addEventListener('click', () => {
  showMenu.value = false
});

// onMounted(()=>{
//   request.get('api/file/getAllFiles').then(res=>{
//     items=res.data.data;
//     console.log(res.data)
//   })
// });

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
<template>

  <button @click="closeMoveBox" class="closeBtn">×</button>
  <h2 class="moveBoxTitle">移动文件</h2>
  <h3>移动到：{{ targetFolderName }}</h3>
  <ul class="folderList">
    <!-- 假设folders是一个包含文件夹信息的数组 -->
    <li v-for="folder in folders" :key="folder.id">
      <div @click="onFolderClick(folder)" class="folderItem">
        {{ folder.fileName }}
      </div>
    </li>
  </ul>
  <el-button type="primary" @click="confirmMove" class="confirm">确定</el-button>
</template>

<script setup>
import store from "@/store";
import request from "@/utility/api/request";
import {ref} from 'vue';
import {ElMessage} from "element-plus";


let currentFile = ref(store.state.file.file)//当前文件
let targetFolderName = ref(null)//目标文件夹
function closeMoveBox() {
  store.commit('states/setStartMove', false);
}

function confirmMove() {
  request.post('/api/priv/file/changeFileFolder', {
    fileId: currentFile.value.id,
    folderId: targetFolderName.value
  }).then(res => {
    console.log(res);
  }).catch(err => {
    ElMessage.error('移动失败')
    store.commit('states/setStartMove', false);
    console.error(err);
  });
  console.log("Confirm move");
}

const folders = ref([]);

request.get('/api/priv/file/getFileList').then(res => {
  folders.value = res.data.data.records.filter(item => item.folderType === 1);
  // console.log(folders.value);
}).catch(err => {
  console.error(err);
});

function onFolderClick(folder) {
  targetFolderName.value = folder.fileName;
  console.log("Clicked folder:", folder);
  request.get('/api/priv/file/getFileList').then(res => {
    folders.value = res.data.data.records.filter(item => item.folderType === 1);
    // console.log(folders.value);
  }).catch(err => {
    console.error(err);
  });
}

</script>

<style scoped>

.closeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px; /* 调整大小以适应设计 */
  color: #333; /* 按钮颜色，可根据需要调整 */
}

.folderList {
  border: #666666 1px solid; /* 列表边框 */
  border-radius: 5px; /* 圆角 */
  list-style: none; /* 移除列表的默认样式 */
  padding: 3px;
  margin: 10px 0;
  width: 100%; /* 列表宽度与移动框相匹配 */
  overflow-y: auto; /* 如果列表很长，允许滚动 */
  max-height: 350px; /* 设置最大高度 */
}

.folderList li {
  padding: 8px; /* 增加内边距以为阴影留出空间 */
  margin: 8px 3px; /* 列表项间距 */
  text-align: center; /* 文本居中 */
  background-color: gainsboro; /* 列表项背景色 */
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 1, 1, 0.1); /* 添加轻微的阴影 */
  transition: box-shadow 0.3s; /* 平滑过渡效果 */
}

.folderList li:hover {
  box-shadow: 2px 4px 8px rgba(0, 1, 1, 0.2); /* 鼠标悬浮时加强阴影 */
}

.folderList li .folderItem {
  width: 100%; /* 保证项目填满整个列表项 */
  text-align: left; /* 文本左对齐 */
  background-color: transparent; /* 背景透明 */
  cursor: pointer; /* 鼠标手势 */
  padding: 8px; /* 内边距调整为与li一致 */
}

.confirm {
  margin-top: 20px;
}
</style>
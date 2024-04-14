<template>
  <HeaderBar></HeaderBar>
  <div class="folder">
    <div class="folder-item" v-for="item in items" :key="item.id" @click="preview(item)"
         @contextmenu="showContextMenu($event, item)">
      <img :src="src(item)" alt="File Icon">
      <span class="fileName" v-if="editingItemId!==item.id">{{
          item.fileName.length < 10 ? item.fileName : item.fileName.slice(0, 10) + "..."
        }}</span>
      <el-input v-else
                class="input"
                size='small'
                type="text"
                v-model="item.fileName"
                :ref="el => setInputRef(el, item)"
                @blur="editingItemId= null"
                @keyup.enter="handleRename"
      />
      <!--      <span>{{ item.id }}</span>-->
      <!--      <span>{{ item.createTime }}</span>-->
    </div>
    <div class="folder-item" v-if="isNewFolder">
      <img src="@/assets/icon/folder.png" alt="Folder icon">
      <el-input size="small"
                class="input"
                v-model="input"
                ref="inputCreateNewFolderRef"
                @keyup.enter="handleSubmit"
                @blur="isNewFolder = false"
                placeholder="name"
      />
    </div>
    <div v-if="showMenu" class="custom-context-menu" :style="{top:menuPosition.y+'px',left:menuPosition.x+'px'}">
      <ul>
        <li @click="downloadItem">
          <el-icon>
            <Download/>
          </el-icon>
          下载
        </li>
        <li @click="moveFile">
          <el-icon>
            <Switch/>
          </el-icon>
          移动
        </li>
        <li @click="rename">
          <el-icon>
            <Edit/>
          </el-icon>
          重命名
        </li>
        <li @click="deleteItem">
          <el-icon>
            <Delete/>
          </el-icon>
          删除
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref, watch, watchEffect} from 'vue'
import store from "@/store"
import request from "@/utility/api/request";
import HeaderBar from "@/components/HeaderBar.vue";
import {Delete, Download, Edit, Switch} from "@element-plus/icons-vue";
import createIconSrc from "@/utility/createIconSrc";

const showMenu = ref(false)
const menuPosition = ref({x: 0, y: 0})
let items = ref([])
let currentItem = ref(null)
const isNewFolder = ref(false)
const inputCreateNewFolderRef = ref(null)
const inputRenameRef = ref({})
let editingItemId = ref(null); // null 表示没有项正在被编辑
const input = ref('')

//按下新建的按钮时，对焦输入框
watchEffect(() => {
  if (isNewFolder.value && inputCreateNewFolderRef.value) {
    inputCreateNewFolderRef.value.focus();
  }
});
//上传文件成功后，将文件添加到私有仓库中
watch(() => store.getters.file, (newVal) => {
  // console.log('私有仓库中的newVal:', newVal);
  if (newVal) {
    items.value.push({
      id: newVal.id,
      fileName: newVal.fileName,
      fileCategory: newVal.fileCategory,
      folderType: newVal.folderType
    })
    // store.commit('file/setUpload', false)
  }
}, {deep: true});

//新建文件夹
watch(() => store.state.file.isCreatesNewFolder, (newVal) => {
  // console.log(newVal)
  if (newVal) {
    console.log('新建文件夹成功')
    isNewFolder.value = true
    store.commit('file/setIsCreateNewFolder', false)
  }
}, {deep: true})
//按下回车时，处理新建文件夹的逻辑
const handleSubmit = () => {
  // console.log(input.value)
  let filePid = 0;
  if (store.getters.currentFolder) {
    filePid = store.getters.currentFolder.id;
  } else {
  }
  request.post('/api/priv/file/newFolder', {
    filePid: filePid,
    fileName: input.value
  }).then(res => {
    // console.log(res)
    window.location.reload();
  }).catch(err => {
    console.log(err)
  })
}

//点击文件夹进入下一级
const preview = (item) => {
  // console.log('点击' + item.fileName)
  if (item.folderType === 1) {
    console.log('点击' + item.id)
    // debugger;
    store.commit('file/setFilePid', item.id)
    store.commit('breadcrumb/addBreadcrumb', item);
  }
}

//根据类型显示不同的图标
let src = (item) => {
  return createIconSrc(item)
};
let tempId = ref(null)

//右键菜单
function showContextMenu(e, item) {
  // console.log('右键菜单:' + item.fileName)
  tempId.value = item.id
  e.preventDefault();
  currentItem.value = item;
  showMenu.value = true
  menuPosition.value = {x: e.pageX, y: e.pageY}//event.pageX和event.pageY是事件对象的属性，它们提供了事件发生时鼠标指针相对于整个文档的水平和垂直位置
}

//每次刷新之后，获取文件列表
onMounted(() => {
  request.get('/api/priv/file/getFileList').then(res => {
    items.value = res.data.data.records;
    // console.log(items.value)
  })
});

//下载文件
function downloadItem() {
  console.log('下载' + currentItem.value.id)
  let downloadMeg = '';
  let chunkTotal=0;
  let buffer=new Uint8Array([]);
  request.get(`/api/priv/file/startDownload/${currentItem.value.id}`).then(res => {
    // console.log(res)
    downloadMeg = res.data.data;
    for (let i = 0; i < chunkTotal; i++) {
      request.get(`/api/priv/file/download/${downloadMeg.code}/${i}`).then(res => {
        // console.log(res)
        buffer = new Uint8Array([...buffer, ...res.data.data.buffer]);
      });
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const file = new File([blob], "filename", { type: 'application/octet-stream' });
  });

  request.get(`/api/priv/file/download/${downloadMeg.code}`).then(res => {
    // console.log(res)
  });

  showMenu.value = false
}

//移动文件
function moveFile() {
  console.log('移动' + currentItem.value.id)
  store.commit('states/setStartMove', true);
  store.commit('file/setFilePid', store.getters.currentFolder ? store.getters.currentFolder.id : null);
  // console.log('移动')
  showMenu.value = false
}

//点击右键菜单中的重命名选项
function rename() {
  editingItemId.value = tempId.value
  // console.log('rename', inputRenameRef.value)
  nextTick(() => {//确保在DOM更新之后再尝试聚焦输入框
    if (inputRenameRef.value[editingItemId.value]) {
      // console.log('设置焦点')
      inputRenameRef.value[editingItemId.value].focus();
    }
  })
  showMenu.value = false
}

//动态绑定v-for中的循环项的ref
function setInputRef(el, item) {
  if (el && item) {
    inputRenameRef.value[item.id] = el;
  }
}

//重命名完成后，清除编辑状态
function handleRename() {
  // console.log("重命名为:", item.fileName);
  editingItemId.value = null;
  window.location.reload()
}


function deleteItem() {
  console.log('删除')
  // items.value.pop()
  request.delete(`/api/priv/file/delFiles/${currentItem.value.id}`).then(res => {
    console.log(res)
    window.location.reload()
  }).catch(err => {
    console.log(err)
  });
  showMenu.value = false
}

//点击其他地方时隐藏右键菜单
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
  padding: 5px;
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

.el-icon {
  margin-right: 10px;
}

.custom-context-menu ul li:hover {
  background-color: #f0f0f0;
}

.input {
  padding: 0 8px;
  max-width: 80%; /* 确保输入框宽度不会超过父容器 */
  box-sizing: border-box; /* 包括padding和border在内的宽度计算 */
}

img {
  margin: 10px 0;
}

.fileName {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
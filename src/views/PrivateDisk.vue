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
                @keyup.enter="handleRename(item)"
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
          <span>下载</span>
        </li>
        <li @click="moveFile">
          <el-icon>
            <Switch/>
          </el-icon>
          <span>移动</span>
        </li>
        <li @click="rename">
          <el-icon>
            <Edit/>
          </el-icon>
          <span>重命名</span>
        </li>
        <li @click="deleteItem">
          <el-icon>
            <Delete/>
          </el-icon>
          <span>删除</span>
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
import {fileTypeFromBuffer} from 'file-type';
import {ElMessage} from "element-plus";


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
  }).then(() => {
    window.location.reload();
  }).catch(err => {
    ElMessage.error('新建文件夹失败')
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

//检测文件类型
const detectFileType = async (buffer) => {
  const result = await fileTypeFromBuffer(buffer);
  return result ? result.mime : 'application/octet-stream';  // 如果无法确定类型，返回默认值
};

//下载文件
async function downloadItem() {
  console.log('下载' + currentItem.value.id)
  let downloadMeg = await request.get(`/api/priv/file/startDownload/${currentItem.value.id}`);
  downloadMeg = downloadMeg.data.data
  console.log(downloadMeg);
  let chunkTotal = downloadMeg.chunkTotal;//获取文件的总块数
  let buffer = new Uint8Array([]);

  for (let i = 0; i < chunkTotal; i++) {
    let chunk = await request.get(`http://127.0.0.1:4523/m1/4012263-3648422-default/api/priv/file/download/1/1`).data.data.buffer;
    chunk = new Uint8Array(chunk);
    let newBuffer = new Uint8Array(buffer.length + chunk.length);
    newBuffer.set(buffer, 0);
    newBuffer.set(chunk, buffer.length);
    buffer = newBuffer;
  }
  const mimeType = await detectFileType(buffer);
  console.log(mimeType);
  const blob = new Blob([buffer], {type: mimeType});
  const file = new File([blob], downloadMeg.filename, {type: mimeType});
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadMeg.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  showMenu.value = false
}

//移动文件
function moveFile() {
  console.log('移动' + currentItem.value.id)
  store.commit('states/setStartMove', true);
  store.commit('file/setFile', currentItem.value);
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
function handleRename(item) {
  console.log("重命名为:", item.fileName);
  request.put(`/api/priv/file/rename`, {
    fileId: item.id,
    fileName: item.fileName
  }).then(res => {
    // if(res.data.code!==1)
    editingItemId.value = null;
    window.location.reload()
  }).catch(err => {
    ElMessage.error('重命名失败')
    console.log(err)
  });

}

function deleteItem() {
  console.log('删除')
  // items.value.pop()
  request.delete(`/api/priv/file/delFiles/?fileIds=${currentItem.value.id}`).then(res => {
    console.log(res)
    window.location.reload()
  }).catch(err => {
    ElMessage.error('删除文件失败')
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
  white-space: nowrap; /* 防止文字折行 */
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
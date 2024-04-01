<template>
  <div class="recycle" ref="container">
    <div class="container">
      <div
          class="file-item"
          v-for="file in records"
          :key="file.id"
          @contextmenu.prevent="showContextMenu($event, file.id)"
      >
        <img :src="src(file)" alt="文件封面"/>
        <h3>{{ file.fileName }}</h3>
        <p id="fileSize">大小: {{ file.fileSize }}</p>
        <p id="createTime">创建于{{ file.createTime }}</p>
      </div>
      <div
          v-if="showMenu"
          class="custom-context-menu"
          :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }"
      >
        <ul>
          <li @click="recoverItem()">
            <el-icon>
              <FolderChecked/>
            </el-icon>
            恢复
          </li>
          <li @click="deleteItem()">
            <el-icon>
              <Delete/>
            </el-icon>
            彻底删除
          </li>
        </ul>
      </div>
    </div>
  </div>
  <el-pagination
      background
      layout="prev, pager, next"
      :small=false
      v-model:total="total"
      :page-sizes="[10, 20, 30, 40]"
      v-model:page-size="elmPageSize"
      v-model:current-page="pageNo"
      :pager-count="Math.ceil(pageCount)"/>
</template>

<script setup>
//@current-change="getRecycleList"
import {onMounted, ref, watch} from "vue";
import request from "@/utility/api/request";
import {ElMessage, ElMessageBox} from "element-plus";

const showMenu = ref(false);
const menuPosition = ref({x: 0, y: 0});
let records = ref([]);
let pageNo = ref(1);
let total = ref();
let selectedFileId = ref();
let pageCount = ref(5);
let container = ref();
let elmPageSize = ref();
watch([pageNo, elmPageSize], () => {
      getRecycleList()
    }
)
//let elmPageSize = ref((container.offsetWidth/166)*(container.offsetHeight/100)); 
onMounted(() => {
      elmPageSize = Math.ceil((container.value.offsetWidth / 166) * (container.value.offsetHeight / 100));
      //console.log(Math.ceil((container.value.offsetWidth/166)*(container.value.offsetHeight/100)))
      //console.log((container.value.offsetWidth/166)*(container.value.offsetHeight/100))
      getRecycleList()
    }
)

function getRecycleList() {
  //this.pageNo = val;
  request.get("/api/recycle/getRecycleList", {
    params: {
      pageNo: pageNo.value,
      pageSize: elmPageSize.value
    }
  })
      .then((response) => {
        if (response.data.code === 1) {
          records.value = response.data.data.records;
          total.value = response.data.data.total;
          pageCount.value = total / elmPageSize;
        }
      })
      .catch((error) => {
        // this.$router.push('/error');
        ElMessage.error("errorMessage");
      });
}

function showContextMenu(e, id) {
  e.preventDefault();
  // if(e.innerHTML==null){
  //   c
  // }
  selectedFileId = id;
  showMenu.value = true;
  menuPosition.value = {x: e.pageX, y: e.pageY}; //event.pageX和event.pageY是事件对象的属性，它们提供了事件发生时鼠标指针相对于整个文档的水平和垂直位置
}

window.addEventListener("click", () => {
  showMenu.value = false;
});
let src = (file) => {
  if (file.folderType === 1) {
    return require("@/assets/icon/folder.png"); //这里的require函数调用告诉构建工具（比如Webpack），它需要处理（即包含在最终的构建结果中）这些图片资源。
  } else if (file.folderType === 0) {
    //1：视频 2：音频 3：文档 4：图片 5：其他
    if (file.fileCategory === 1) {
      return require("@/assets/icon/video.png");
    } else if (file.fileCategory === 2) {
      return require("@/assets/icon/music.png");
    } else if (file.fileCategory === 3) {
      return require("@/assets/icon/document.png");
    } else if (file.fileCategory === 4) {
      return require("@/assets/icon/picture.png");
    } else {
      return require("@/assets/icon/file.png");
    }
  } else {
    return require("@/assets/icon/file.png");
  }
};

function deleteItem() {
  ElMessageBox.confirm(
      '要彻底删除该文件吗？',
      '请确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        request
            .delete("/api/recycle/delFile", {
              fileIds: selectedFileId,
            })
            .then((response) => {
              if (response.data.code === 1) {
                ElMessage.success("删除成功");
                getRecycleList();
              } else {
                ElMessage.error("删除失败");
              }
            })
            .catch((error) => {
              // this.$router.push('/error');
              ElMessage.error("errorMessage");
            });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
      })
}

function recoverItem() {
  ElMessageBox.confirm(
      '要恢复该文件吗？',
      '请确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        request
            .post("/api/recycle/recoverFile", {
              fileIds: selectedFileId,
            })
            .then((response) => {
              if (response.data.code === 1) {
                ElMessage.success("恢复成功");
                getRecycleList();
              } else {
                ElMessage.error("恢复失败");
              }
            })
            .catch((error) => {
              // this.$router.push('/error');
              ElMessage.error("errorMessage");
            });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
      })
}

</script>
<style scoped>
/* .container {
  height: 100%;
  display: flex;
  overflow:auto;
} */

.recycle {
  width: 100%;
  height: 100%;
  overflow: auto;
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

.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px; /* 设置固定高度 */

  transition: transform 0.3s ease; /* 平滑过渡效果 */
}

.file-item:hover {
  background-color: #f9f9f9; /* 设置背景色 */

  transform: translateY(-5px); /* 悬停时上移 */
}

.file-item img {
  width: 100%; /* 图标宽度 */
  max-width: 60px; /* 图标最大宽度 */
  height: auto; /* 保持图标的原始宽高比 */
}

.container {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(120px, 1fr)
  ); /* 创建多列，每列最小宽度120px，最大1fr */
  grid-gap: 35px; /* 设置网格间的间隙 */
  padding: 20px; /* 设置内边距 */
  background-color: #fff; /* 设置背景色为白色 */
  overflow: auto;
}

#createTime {
  font-size: 12px;
  text-align: center;
}

#fileSize {
  font-size: 12px;
}

.el-icon {
  margin-right: 10px;
  vertical-align: middle;
}
</style>

<template>
  <div class="fileInfo">
    <img src="../assets/logo.png" alt="File" class="fileImage">
    <div class="fileDetails">
      <div class="fileName">文件名: {{ fileName }}</div>
      <div class="fileSize">文件大小: {{ fileSize }} MB</div>
    </div>
  </div>
  <el-progress
      :percentage="progress"
      :stroke-width="15"
      status="success"
      striped
      striped-flow
      :duration="10"
  />
  <div class="actions">
    <button class="pauseBtn" @click="suspend">暂停</button>
    <button class="cancelBtn" @click="cancel">取消</button>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import store from '@/store'

let progress = computed(() => store.state.states.progress);//自动追踪 store.state.states.progress 的变化并更新其值
let fileName = computed(() => store.state.file.fileName);
let fileSize = computed(() => store.state.file.fileSize);

const suspend = () => {
  store.commit('states/setStartUpload', false);
}
</script>

<style scoped>
.el-progress {
  width: 90%;
  margin: 0 auto;
}

.fileInfo {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 与进度条间距 */
}

.fileImage {
  width: 50px; /* 文件图片大小 */
  height: 50px; /* 文件图片大小 */
  margin-right: 10px; /* 与文件详情间距 */
  object-fit: cover; /* 保持图片比例 */
  border-radius: 4px; /* 图片圆角 */
}

.fileDetails {
  flex-grow: 1;
}

.fileName, .fileSize {
  margin: 0;
  color: #333; /* 文本颜色 */
  font-size: 14px; /* 文本大小 */
}

.actions {
  display: flex;
  justify-content: flex-end; /* 按钮靠右排列 */
  margin-top: 10px; /* 与进度条间距 */
}

.pauseBtn, .cancelBtn {
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px; /* 按钮间距 */
}

.pauseBtn {
  background-color: #f0ad4e; /* 暂停按钮颜色 */
  color: #fff;
}

.cancelBtn {
  background-color: #d9534f; /* 取消按钮颜色 */
  color: #fff;
}
</style>
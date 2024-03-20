<template>
  <el-button type="primary" round @click="trigger" class="upload">
    上传文件
    <input type="file" ref="inputFile" style="display: none;" @change="uploadFile">
  </el-button>
  <el-button round class="new" @click="newFolder">新建文件夹</el-button>
</template>

<script setup>

import {ref} from "vue";
import instantaneousTransmission from "@/utility/instantaneous";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import sliceFile from "@/utility/sliceFile";

const store = useStore();

//上传文件
const inputFile = ref(null);
const trigger = () => {
  inputFile.value.click();
}
let file = ref(null);
const uploadFile = (e) => {
  file = e.target.files[0];//上传文件数组会在用户通过文件选择对话框选择了新的文件并确认后刷新
  let fileSizeInMB = +(file.size / 1024 / 1024).toFixed(2);
  console.log('fileSizeInMB:', fileSizeInMB + 'MB');
  if (file) {
    store.commit('file/setFileName', file.name.length < 10 ? file.name : file.name.slice(0, 20) + '...');
    store.commit('file/setFileSize', fileSizeInMB);
    if (fileSizeInMB < 2) {
      ElMessage.success('正在上传');
      instantaneousTransmission(file).then(result => {
        if (result) {
          ElMessage.success('秒传成功');
          // window.location.reload();
        } else {
          store.commit('states/setStartUpload', true)
          sliceFile(file).then(res => {
            store.commit('states/setStartUpload', false)
            store.commit('states/setProgress', 0)
            ElMessage.success('上传成功');
          }).catch(err => {
            ElMessage.error('上传失败');
          });
        }
      });
    } else {
      store.commit('states/setStartUpload', true)
      sliceFile(file).then(res => {
        store.commit('states/setStartUpload', false)
        store.commit('states/setProgress', 0)
        ElMessage.success('上传成功');
      }).catch(err => {
        ElMessage.error('上传失败');
      });
    }
  }
}

//新建文件夹
const newFolder = () => {
  store.commit('file/setIsNew', true);
}

</script>

<style scoped>
.el-button {
  transform: scale(0.9);
  margin: auto 1px;
}

.upload {
  margin-left: 10px;
}

.new {
  margin-right: 10px;
}
</style>
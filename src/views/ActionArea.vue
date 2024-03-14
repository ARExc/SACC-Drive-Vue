<template>
  <el-button type="primary" round @click="trigger">
    上传文件
    <input type="file" ref="inputFile" style="display: none;" @change="uploadFile">
  </el-button>
</template>

<script setup>

import {ref} from "vue";
import instantaneousTransmission from "@/utility/instantaneous";
import store from "@/store";
import {ElMessage} from "element-plus";
import sliceFileAndCalculateMD5 from "@/utility/chunk";

const inputFile = ref(null);
const trigger = () => {
  inputFile.value.click();
}
let file = ref(null);
const uploadFile = (e) => {
  file = e.target.files[0];//上传文件数组会在用户通过文件选择对话框选择了新的文件并确认后刷新
  if (file) {
    instantaneousTransmission(file).then(result => {
      if (result) {
        console.log('result:', result);
        if (/^image\//.test(result)) {
          store.commit('file/setFileType', 'image');
          console.log('图片');
        } else if (/^video\//.test(result)) {
          store.commit('file/setFileType', 'video');
          console.log('视频');
        } else {
          store.commit('file/setFileType', 'file');
          console.log('文档');
        }
        ElMessage.success('秒传成功');
      } else {
        // 在这里执行正常的文件上传逻辑
        console.log('秒传失败,开始分片上传');
        sliceFileAndCalculateMD5(file);
        ElMessage.success('上传成功');
      }
    });
  }
//bug:上传成功后，无法再次连续上传相同文件
}
</script>

<style scoped>
.el-button {
  transform: scale(0.9);
  margin: auto 10px;
}

</style>
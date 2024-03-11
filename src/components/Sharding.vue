<template>
  <h3>上传文件</h3>

  <form enctype="multipart/form-data">
    <input type="file" name="fileInput" id="fileInput" @change="test">
    <input type="button" value="上传" @click="uploadFile">
  </form>

</template>

<script setup>
import { ref } from 'vue';
import SparkMD5 from 'spark-md5'
import { ElMessage } from 'element-plus'
import request from '../utility/request'
let file = ref(null); // 上传的文件
const uploadFile = () => {
  console.log(file);
  let type = file.type;
  if (!type) {
    ElMessage.error('请选择文件');
    return;
  }
  ElMessage.success('上传成功');
  sliceFileAndCalculateMD5(file);

  // if (!type.match('image.*')) {
  //   ElMessage.error('请上传图片');
  // } else {
  //
  // }
}
const test = (e) => {
  file = e.target.files[0];
}


function getFilePath(){
  request.get(`/api/pub/file/getFolderInfo${path}`)
      .then(res=>{
    console.log(res.data.data.fileId);
  })
}

</script>

<style scoped>


</style>

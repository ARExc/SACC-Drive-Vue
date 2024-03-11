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
function sliceFileAndCalculateMD5(file) {
  const chunkSize = 2*1024*1024; //切片大小，2MB
  const chunkCount = Math.ceil(file.size / chunkSize);//切片数量
  console.log('文件大小:', file.size , '切片数量:', chunkCount);
  const spark = new SparkMD5.ArrayBuffer();
  let currentChunk = 0;

  function loadNext() {
    const fileReader = new FileReader();
    const start = currentChunk * chunkSize;
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(file.slice(start, end));
    fileReader.onload = function (e) {//当FileReader成功完成对文件的读取操作时，触发onload事件，并传递事件对象e给事件处理函数。
      spark.append(e.target.result); // Append array buffer
      currentChunk++;

      if (currentChunk < chunkCount) {
        console.log('开始计算MD5');
        let hash= spark.end(false);//传递false时，SparkMD5对象不会在调用end()后重置，这意味着你可以继续添加数据进行计算
        console.log('文件MD5:', hash);
        loadNext();
      } else {
        const finalHash = spark.end(false);
        console.log('文件MD5:', finalHash);
        // 在这里发起hash检查请求
      }
    };
  }

  loadNext();
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

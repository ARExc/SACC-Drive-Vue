<template>
  <div class="head">
      <el-button type="primary" round @click="trigger">
        上传文件
        <input type="file" ref="inputFile" style="display: none;" @change="uploadFile">
      </el-button>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/error' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item
      ><a href="/">management</a></el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {ElMessage} from "element-plus";
import instantaneousTransmission from "@/utility/instantaneous";
import sliceFileAndCalculateMD5 from "@/utility/chunk";
const inputFile = ref(null);
const trigger=()=>{
  inputFile.value.click();
}
let file = ref(null);
const uploadFile=(e)=>{
  file = e.target.files[0];//上传文件数组会在用户通过文件选择对话框选择了新的文件并确认后刷新
  if(file){
    instantaneousTransmission(file).then(result=>{
      if (result) {
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
.head{
  min-height: 50px;
  display: flex;
  background-color: rgb(245, 245, 245);
  align-items: center;
  justify-content: flex-start;
}
.el-button{
  transform: scale(0.9);
  margin:auto 10px;
}

</style>
<template>
  <div class="head">
      <el-button type="primary" round @click="trigger">
        上传文件
        <input type="file" ref="inputFile" style="display: none;" @change="uploadFile">
      </el-button>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item >root</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" @click="navigateTo(crumb.name)">
        {{ crumb.name }}
      </el-breadcrumb-item>

<!--      <el-breadcrumb-item :to="{ path: '/home' }">root</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item :to="{ path: '/home/privateDisk' }">私有仓库</el-breadcrumb-item>-->
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from "element-plus";
import instantaneousTransmission from "@/utility/instantaneous";
import sliceFileAndCalculateMD5 from "@/utility/chunk";
import store from "@/store/store";
import router from "@/router/index";
import breadcrumb from "@/utility/breadcrumb";


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
        if(/^image\//.test(result)){
          store.commit('setFileType','image');
          console.log('图片');
        }else if(/^video\//.test(result)) {
          store.commit('setFileType','video');
          console.log('视频');
        }else{
          store.commit('setFileType','file');
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

let breadcrumbs = ref(breadcrumb);
// console.log(breadcrumbs.value);
const updateBreadcrumbs = (path) => {
  breadcrumbs.value.push({ name: path, path: path });
  breadcrumb=breadcrumbs.value;
  console.log(breadcrumb);
};
const navigateTo = (folderName) => {
  router.push({ name: 'FolderDetail', params: { folderName } });
  // breadcrumbs.value.splice(index + 1);
  // console.log(breadcrumbs.value);
};
</script>

<style scoped>
.head{
  z-index: 1;
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
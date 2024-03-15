<template>
  <el-button type="primary" round @click="trigger" class="upload">
    上传文件
    <input type="file" ref="inputFile" style="display: none;" @change="uploadFile" >
  </el-button>
  <el-button round class="new" @click="newFolder">新建文件夹</el-button>
</template>

<script setup>

import {ref} from "vue";
import instantaneousTransmission from "@/utility/instantaneous";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import sliceFileAndCalculateMD5 from "@/utility/chunk";

const store = useStore();

//上传文件
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
        // console.log('result:', result);
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


//新建文件夹
const newFolder = () => {
  console.log('新建文件夹:', store.state.file.isNew);
  store.commit('file/setIsNew', true);
  console.log('setIsNew:', store.state.file.isNew);
}



</script>

<style scoped>
.el-button {
  transform: scale(0.9);
  margin: auto 1px;
}
.upload{
  margin-left: 10px;
}
.new{
  margin-right: 10px;
}
</style>
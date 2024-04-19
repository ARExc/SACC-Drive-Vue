<template>
  <el-button type="primary" round @click="trigger" class="upload">
    上传文件
    <input type="file" ref="inputFile" style="display: none;" @change="uploadFile">
  </el-button>
  <el-button round class="new" @click="newFolder">新建文件夹</el-button>
</template>

<script setup>
import {ref} from "vue";
import calculateWholeMd5 from "@/utility/upload/calculateWholeMd5";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import sliceFileAndUpload from "@/utility/upload/sliceFileAndUpload";

const store = useStore();


let file = ref(null);
const inputFile = ref(null);

//点击被隐藏的input框
const trigger = () => {
  inputFile.value.click();
}

//上传文件
const uploadFile = async (e) => {
  file = e.target.files[0];//获取上传文件列表的第一个元素
  store.commit('file/setFilePid', store.getters.currentFolder ? store.getters.currentFolder.id : null);
  // console.log("文件夹id" + store.state.file.filePid)
  //上传文件数组会在用户通过文件选择对话框选择了新的文件并确认后刷新
  if (file) {
    //计算文件大小
    let fileSizeInMB = +(file.size / 1024 / 1024).toFixed(2) !== 0 ? +(file.size / 1024 / 1024).toFixed(2) : 0.01;

    //设置显示在上传框中的文件名和文件大小
    store.commit('file/setFileName', file.name.length < 10 ? file.name : file.name.slice(0, 20) + '...');
    store.commit('file/setFileSize', fileSizeInMB);

    //文件大小大于5GB的，拦截
    if (fileSizeInMB > 5000) {
      ElMessage.error('文件大小不能超过5GB')
    } else {
      //设置setStartUpload，用于显示上传进度条
      store.commit('states/setProgress', 0)
      store.commit('states/setStartUpload', true)

      //先计算整个文件的md5值，用于校验，然后再分片上传
      calculateWholeMd5(file).catch(err => {
        ElMessage.error('计算校验和失败');
        setTimeout(() => {
          store.commit('states/setIsCancel', false);
          store.commit('states/setProgress', 0);
          store.commit('states/setStartUpload', false);
          window.location.reload();
        }, 500);
      });

      //让md5值的计算在后台运行，不影响上传

      sliceFileAndUpload(file).then(res => {
        // console.log('此时应该是文件全部上传成功之后的阶段')
        store.commit('states/setStartUpload', false)//取消上传状态
        ElMessage.success('上传成功');
      }).catch(err => {
        console.log('文件上传过程中失败', err)
        store.commit('states/setStartUpload', false)
        ElMessage.error('上传失败,请重试');
      });
    }
  }
}

//新建文件夹
const newFolder = () => {
  store.commit('file/setIsCreateNewFolder', true);
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
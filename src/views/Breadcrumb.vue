<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>root</el-breadcrumb-item>
    <el-breadcrumb-item v-if="isPrivate">私有仓库</el-breadcrumb-item>
    <el-breadcrumb-item v-if="isPublic">公有仓库</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(crumb, index) in breadcrumbStore" :key="index" @click="toFolder(crumb)">
      {{ crumb.fileName }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import router from "@/router/index";
import {useRoute} from "vue-router";
import store from "@/store";

const route = useRoute();
let isPrivate = ref(store.getters.isPrivate);
let isPublic = ref(store.getters.isPublic);

//bug1:刷新之后面包屑导航消失
//bug2:无法导航到私有仓库和公有仓库下


//实现动态面包屑导航并与路径绑定
let breadcrumbStore = ref(store.getters.breadcrumb);
//点击面包屑导航中的某个文件夹
const toFolder = (data) => {
  const folder = {
    fileName: data.fileName,
    id: data.id,
  };
  let index = breadcrumbStore.value.findIndex((crumb) => crumb.id === folder.id);
  store.commit('breadcrumb/removeBreadcrumb', index)
  setPath()
}
//监听store中的breadcrumb变化
watch(() => store.getters.breadcrumb, (newVal) => {
  breadcrumbStore.value = newVal;
  setPath();
}, {deep: true});
//设置URL路径
const setPath = () => {
  console.log('setPath');
  let pathArray = [''];
  breadcrumbStore.value.forEach(item => {
    pathArray.push(item.fileName);
  })
  router.push({
        path: route.path,
        query: pathArray.length === 0 ? "" : {path: pathArray.join('/')}
      }
  );
};
</script>

<style scoped>
.head {
  z-index: 1;
  min-height: 50px;
  display: flex;
  background-color: rgb(245, 245, 245);
  align-items: center;
  justify-content: flex-start;
}
</style>
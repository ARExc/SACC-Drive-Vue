<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>root</el-breadcrumb-item>
    <el-breadcrumb-item v-if="isPrivate" @click="toPrivate">私有仓库</el-breadcrumb-item>
    <el-breadcrumb-item v-if="isPublic" @click="toPublic">公有仓库</el-breadcrumb-item>
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
//bug2:刷新之后面包屑导航不能正确显示


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
watch(() => store.state.breadcrumb.breadcrumbVersion, () => {
  breadcrumbStore.value = store.getters.breadcrumb;
  setPath();
}, {deep: true});
//设置URL路径
const setPath = () => {
  // console.log('Breadcrumb.vue中的setPath,from:', from);
  let pathArray = [''];
  breadcrumbStore.value.forEach(item => {
    pathArray.push(item.fileName);
  })
  // console.log('route.path:', route.path)
  router.push({
        path: route.path,
        query: {path: pathArray.length === 0 ? "" : pathArray.join('/')}
      }
  );
};

const toPrivate = () => {
  store.commit('breadcrumb/clearBreadcrumb')
  router.push('/home/privateDisk')
}
const toPublic = () => {
  store.commit('breadcrumb/clearBreadcrumb')
  router.push('/home/publicDisk')
}
// M
// onMounted(()=>{
//   let query = route.query.path;
//   if(query === undefined){
//     return;
//   }
//   let pathArray=query.split('/');
//   for(let i=1;i<pathArray.length;i++){
//     let folder = {
//       fileName: pathArray[i],
//       // id: i,
//     };
//     store.commit('breadcrumb/setBreadcrumb', folder);
//   }
//   console.log('route.path:', pathArray)
// })
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
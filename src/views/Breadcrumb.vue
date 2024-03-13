<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item >root</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" @click="openFolder(crumb)">
      {{ crumb.name }}
    </el-breadcrumb-item>

<!--      <el-breadcrumb-item :to="{ path: '/home' }">root</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item :to="{ path: '/home/privateDisk' }">私有仓库</el-breadcrumb-item>-->
  </el-breadcrumb>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import router from "@/router/index";
import breadcrumb from "@/utility/breadcrumb";
import {useRoute} from "vue-router";

const route=useRoute();
//实现动态面包屑导航并与路径绑定

const props=defineProps({
  watchPath:{
    type:Boolean,
    default:true,//默认是要监听路由变化的
  },
})

let breadcrumbs = ref([]);
let current=ref({fileId:0,fileName:''});

const openFolder=(data)=>{
  const folder={
    fileName:data.fileName,
    fileId:data.fileId
  };
  console.log('点击',folder);
  breadcrumbs.value.push(folder);
  current.value=folder;
  setPath()
}
defineExpose({
  openFolder
})
const setPath=()=>{
  if(!props.watchPath){
    //TODO:这里需要一个判断，如果不监听路由变化，就不需要设置路径
    return;
  }
  let pathArray=[];
  breadcrumbs.value.forEach(item=>{
    pathArray.push(item.fileName);
  })
  router.push({
      path:route.path,
      query:pathArray.length===0?"":{path:pathArray.join('/')}
    }
  );
}



const navigateTo = (folderName) => {
  console.log('点击', folderName);
  const index = breadcrumbs.value.findIndex((crumb) => crumb.name === folderName);
  breadcrumbs.value.splice(index + 1);
  router.push({ name: 'FolderDetail', params: { folderName } });
  // console.log(breadcrumbs.value);
};


onMounted(()=>{
  // console.log('mounted');
  // console.log(route);
  // console.log(router.currentRoute.value);
  // console.log(router.currentRoute.value.params);
  // console.log(router.currentRoute.value.params.folderName);

})
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

</style>
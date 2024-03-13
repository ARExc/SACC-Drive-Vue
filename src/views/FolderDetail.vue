<template>
  <Breadcrumb></Breadcrumb>
  <!--    <div class="folder" @contextmenu.prevent="showContextMenu($event)">-->
  <!--      <div class="folder-item" v-for="item in items" :key="item.id" @click="toNext(item)">-->
  <!--        <img :src="src(item)" alt="File Icon">-->
  <!--        <span>{{ item.fileName }}</span>-->
  <!--      </div>-->
  <!--      <div v-if="showMenu" class="custom-context-menu" :style="{top:menuPosition.y+'px',left:menuPosition.x+'px'}">-->
  <!--        <ul>-->
  <!--          <li @click="downloadItem(e)">下载</li>-->
  <!--          <li @click="moveFile">移动</li>-->
  <!--          <li @click="deleteItem">删除</li>-->
  <!--        </ul>-->
  <!--      </div>-->
  <!--  </div>-->
</template>

<script setup>
import Breadcrumb from "@/views/Breadcrumb.vue";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import request from "@/utility/request";

const route = useRoute();
const breadcrumbs = computed(() => {
  const pathArray = route.params.pathMartch ? route.params.pathMartch.split('/') : [];
  let path='/home/privateDisk';
  return pathArray.map((folder,index)=>{
    path+=`/${folder}`;
    return {
      name:folder,
      path:path
    }
  })
})
onMounted(()=>{
  console.log('mounted');
  console.log(route.params);
})
</script>

<style scoped>

</style>
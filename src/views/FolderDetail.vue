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
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import request from "@/utility/request";

// let items=[];
//
// const route = useRoute();
// onMounted(() => {
//   request.get('/api/priv/file/getFileList').then(res => {
//     items = res.data.records;
//     console.log(res.data)
//   })
//   console.log(route.params.folderName);
// });
</script>

<style scoped>

</style>
<template>
  <router-view></router-view> 
  <Home class="home"></Home>
</template>

<script setup>
import Sharding from './components/Sharding.vue'
import router from './router';
import Home from './views/Home.vue'
import {onMounted} from "vue";

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.el-breadcrumb__separator{
  margin: 0 3px!important;
}
</style>
<template>
  <div class="container">
    <Side></Side>
    <div class="main">
      <Header></Header>
      <Breadcrumb></Breadcrumb>

      <router-view></router-view>

    </div>
  </div>
</template>

<script setup>
import Side from "@/views/Side.vue";
import Header from "@/views/Header.vue";
import Disk from "@/views/PrivateDisk.vue";
import Breadcrumb from "@/views/Breadcrumb.vue";
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1
}
</style>
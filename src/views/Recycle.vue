<template>
  <div class="container">
    <div class="main">
    </div>
  </div>
</template>

<script setup>
import Side from "@/views/Side.vue";
import Header from "@/views/Header.vue";
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
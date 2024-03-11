<template>
  <div class="container">
    
    <div class="main">
      
      <Folder>

      </Folder>
    </div>
  </div>
</template>

<script setup>
import Side from "@/views/Side.vue";
import Header from "@/views/Header.vue";
import Folder from "@/views/Folder.vue";
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
<template>
  <div class="head">
    <ActionArea></ActionArea>
    <Breadcrumb ref="breadcrumbRef"></Breadcrumb>
  </div>
</template>

<script setup>

import ActionArea from "@/components/ActionArea.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
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
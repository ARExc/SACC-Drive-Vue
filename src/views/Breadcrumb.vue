<template>
  <div class="head">
    <el-button type="primary" round>上传文件</el-button>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/error' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item
      ><a href="/">management</a></el-breadcrumb-item
      >

    </el-breadcrumb>
  </div>
</template>

<script setup>

</script>

<style scoped>
.head{
  min-height: 50px;
  display: flex;
  background-color: rgb(245, 245, 245);
  align-items: center;
  justify-content: flex-start;
}
.el-button{
  transform: scale(0.9);
  margin:0 10px;
}
</style>
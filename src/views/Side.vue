<template>
  <div class="side">
    <div class="sign">
      <div class="round">
        <img src="../../public/sacc.png" alt="">
      </div>
      <div>
        <span class="title">SACC<br>在线网盘系统</span>
      </div>
    </div>
    <el-menu
        text-color="#fff"
        class="el-menu-vertical-demo"
        background-color="rgb(15,44,84)"
        :collapse="isCollapse"
        :style="{ width: isCollapse ? '' : '200px' }"
        router
    >
      <el-sub-menu index="1" >
        <template #title>
          <el-icon><location /></el-icon>
          <span>Root</span>
        </template>
        <el-menu-item index="1-1" class="menu-item">私有仓库</el-menu-item>
        <el-menu-item index="1-2" class="menu-item">公有仓库</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/Recycle">
        <el-icon><icon-menu /></el-icon>
        <template #title>回收站</template>
      </el-menu-item>

    </el-menu>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)

</script>

<style scoped>
.side{
  height:100%;
  background-color: rgb(15,44,84);

}
.title{
  color: whitesmoke;
  font-size: 13px;
}
.sign{
  padding: 10px 10px 20px;
  display: flex;
  gap: 10px;

}
.el-menu{
  border-right: none;
}
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu .el-menu-item {
  padding-left: 50px;
}
.el-menu .el-menu--vertical .el-menu-vertical-demo{
  height: 100%;
}
.menu-item{
  background-color:rgb(2,13,22);
}
img{
  width: 50px;
  transform: scale(0.9);
}
.round{
  width:50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}
</style>

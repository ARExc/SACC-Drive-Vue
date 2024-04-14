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
        text-color="black"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :style="{ width: isCollapse ? '' : '200px' }"
        router
        default-active="/home/privateDisk"
    >
      <el-sub-menu index="1">
        <template #title class="title-root">
          <el-icon><HomeFilled /></el-icon>
          <span>根目录</span>
        </template>
        <el-menu-item index="/home/privateDisk" class="menu-item" @click="toPrivate">私有仓库</el-menu-item>
        <el-menu-item index="/home/publicDisk" class="menu-item" @click="toPublic">公有仓库</el-menu-item>
      </el-sub-menu>
        <el-menu-item index="/Home/Recycle">
        <el-icon><DeleteFilled /></el-icon>
        <template #title>回收站</template>
      </el-menu-item>

    </el-menu>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {DeleteFilled, HomeFilled } from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import router from '@/router'

const store = useStore()
// const router=useRouter()

const isCollapse = ref(false)
const toPrivate = () => {
  store.commit('breadcrumb/clearBreadcrumb')
  store.commit('breadcrumb/setIsPrivate', true);
  store.commit('breadcrumb/setIsPublic', false);
  router.push('/home/privateDisk')
}
const toPublic = () => {
  store.commit('breadcrumb/clearBreadcrumb')
  store.commit('breadcrumb/setIsPublic', true);
  store.commit('breadcrumb/setIsPrivate', false);
  router.push('/home/publicDisk')
}
</script>

<style scoped>


@font-face {
  font-family: 'YouSheBiaoTiYuan';
  src: url('../../public/YouSheBiaoTiYuan-2.otf') format('opentype');  /* 指定字体文件的路径和格式 */
}


.side {
  height: 100%;
  background-color: #e6e6e6; /* 白色背景 */
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.title {
  color: #333333;
  font-size: 18px;
  font-weight: 1;
}

.sign {
  padding: 10px 10px 20px;
  display: flex;
  gap: 10px;
  font-family: 'YouSheBiaoTiYuan', serif;
}

.el-menu {
  border-right: none;
  background-color: #f8f8f8; /* 调整菜单背景颜色 */
  border-radius: 10px;
}

.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu .el-menu-item {
  padding-left: 50px;
  color: #333333;
  background-color: #f5f5f5; /* 调整子菜单项背景颜色 */
  border-radius: 10px; /* 子菜单项圆角 */
}
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu .el-menu-item:hover {
  background-color: #cccccc;
}

.el-menu .el-menu-item:hover {
  background-color: #cccccc !important;
}
.menu-item {
  background-color: #f5f5f5;
}.el-menu-item.is-active, .el-menu-item:focus, .el-menu-item:hover {
    background-color: #cccccc;
    color: #333333;           
}
.el-menu-item:hover {
    background-color: #f5f5f5 ;
    color: #333333;
}

/* --el-menu-hover-bg-color */
/* el-menu {
  --el-menu-hover-bg-color:#cccccc!important;
} */
/* :root {
    --el-menu-hover-bg-color: #cccccc !important;
} */
img {
  width: 50px;
  transform: scale(0.9);
}

.round {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}
</style>

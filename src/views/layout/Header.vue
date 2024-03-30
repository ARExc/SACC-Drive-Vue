<template>
  <header class="header">
    <div class="round" @mouseenter="showMenu" @mouseleave="hideMenu">
      <img src="../../../public/sacc.png" alt="user avatar" />
    </div>
    <div id="username" @mouseenter="showMenu" @mouseleave="hideMenu">
      {{ username }}
      <ul v-show="isMenuVisible" class="menu">
        <router-link to="/resetPwd" class="item"> <el-icon><Edit /></el-icon>修改密码</router-link>
        <!-- <li class="item" @click="logout">退出登录</li> -->
        <div class="item" @click="logout"><el-icon><SwitchButton /></el-icon>退出登录</div>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import request from "@/utility/request";
import { ElMessage,ElMessageBox } from "element-plus";
localStorage.setItem("username", "admin");
let username = localStorage.getItem("username");
let isMenuVisible = ref(false);
function showMenu() {
  isMenuVisible.value = true;
}
function hideMenu() {
  isMenuVisible.value = false;
}
// localStorage.setItem('username', this.$store.state.username);
// let username = localStorage.getItem('username');
function logout() {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '请确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      request
    .get("/api/logout")
    .then((response) => {
      if (response.data.code === 1) {
        localStorage.removeItem("username");
        this.$store.state.isLogged = false;
        // 清除cookie
        this.$store.commit('setToken', '');
        localStorage.removeItem("token");
        this.$router.push("/Login");
        // 清楚登录信息
      }
    })
  })
    .catch((error) => {
      // this.$router.push('/error');
      ElMessage.error("errorMessage");
    });
    }
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center; /* 确保内容垂直居中 */
  padding: 10px 20px; /* 添加一些内边距以增加可读性 */
  background-color: white;
  color: #333; /* 文字颜色 */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.round {
  width: 50px; /* 头像大小，可根据需要调整 */
  height: 50px; /* 头像大小，保持与宽度一致以形成圆形 */
  border-radius: 50%; /* 创建圆形边框 */
  overflow: hidden; /* 隐藏超出圆形边框的图片部分 */
  margin-right: 10px; /* 头像和用户名之间的间距 */
  background-color: #fff; /* 头像背景色 */
  cursor: pointer;
}

.round img {
  width: 100%; /* 使图片填满容器 */
  height: auto; /* 保持图片的原始宽高比 */
}
.username{
  cursor: pointer;
}
.header span {
  font-size: 16px; /* 用户名字体大小，根据需要调整 */
  font-weight: normal; /* 字体粗细 */
  margin-right: 10px; /* 用户名和右边界的间距 */
}
.menu {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  width: 150px;
  height: 150px;
  right: 30px;
  list-style: none;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.item {
  display: block;
  margin-top: 30px;
  cursor: pointer;
}
.item:hover {
  color: blue;
}
.el-icon{
  margin-right: 10px;
  vertical-align: middle;
}
</style>

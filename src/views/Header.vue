<template>
  <header class="header">
    <div class="round">
      <img src="../../public/sacc.png" alt="user avatar">
    </div>
    <span>
      {{ username }}
    </span>
  </header>

</template>


<script setup>
localStorage.setItem('username', 'admin');

let username = localStorage.getItem('username');
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
}

.round img {
  width: 100%; /* 使图片填满容器 */
  height: auto; /* 保持图片的原始宽高比 */
}

.header span {
  font-size: 16px; /* 用户名字体大小，根据需要调整 */
  font-weight: normal; /* 字体粗细 */
  margin-right: 10px; /* 用户名和右边界的间距 */
}

</style>
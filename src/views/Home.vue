<template>
  <transition name="slide-fade">
    <div v-if="isStartUpload" class="uploadBox">
      <UploadBox></UploadBox>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="isStartMove" class="moveBox">
      <MoveBox/>
    </div>
  </transition>
  <div class="container">
    <Side></Side>
    <div class="main">
      <Header></Header>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script setup>
import Side from "@/components/Side.vue"
import Header from "@/components/Header.vue";
import UploadBox from "@/components/UploadBox.vue";
import {ref, watch} from 'vue'
import store from "@/store";
import MoveBox from "@/components/MoveBox.vue";

let isStartUpload = ref(store.state.states.isStartUpload);
let isStartMove = ref(store.state.states.isStartMove);
// let folders = ref(['文件夹1', '文件夹2', '文件夹3', '文件夹4', '文件夹5']);
watch(() => store.state.states.isStartUpload, (newVal) => {
  // console.log('Home.vue中的isStartUpload:', isStartUpload.value);
  isStartUpload.value = newVal;
}, {deep: true});
watch(() => store.state.states.isStartMove, (newVal) => {
  // console.log('Home.vue中的isStartMove:', isStartMove.value);
  isStartMove.value = newVal;
}, {deep: true});


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

.uploadBox {
  position: fixed; /* 悬浮窗固定位置 */
  right: 20px; /* 距离屏幕右侧距离 */
  bottom: 20px; /* 距离屏幕底部距离 */
  width: 300px; /* 悬浮窗宽度 */
  background-color: #fff; /* 背景颜色 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  border-radius: 8px; /* 边框圆角 */
  padding: 15px; /* 内边距 */
  box-sizing: border-box;
}

.slide-fade-enter-active {
  animation: slideInUp 0.5s ease-out forwards;
  /*
  悬浮窗进入动画，使用ease-out时，动画开始时速度较快，然后逐渐减慢直至停止。
  当动画完成后，forwards会保留动画在执行完毕时的样式。这意味着动画的最终帧将作为元素的最终状态保留，即使动画已经结束。
  */
}

/* 离开动画 */
.slide-fade-leave-active {
  animation: slideOutDown 0.6s ease-out forwards;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

.moveBox {
  position: fixed; /* 固定定位，相对于视口 */
  left: 50%; /* 水平居中 */
  top: 50%; /* 垂直居中 */
  transform: translate(-27%, -50%); /* 使用 transform 进行精确居中 */
  width: 600px; /* 定义宽度，根据实际内容调整 */
  min-height: 400px; /* 定义最小高度，根据实际内容调整 */
  background-color: #fff; /* 背景颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果，增加立体感 */
  border-radius: 10px; /* 圆角边框 */
  padding: 20px; /* 内边距 */
  box-sizing: border-box; /* 边框和内边距包含在宽高内 */
  z-index: 100; /* 确保悬浮窗在其他元素上方 */
  display: flex; /* 使用Flex布局 */
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 子元素水平居中对齐 */
  justify-content: flex-start;
}
</style>
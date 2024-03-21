<template>
  <transition name="slide-fade">
    <div v-if="isStartUpload" class="uploadBox">
      <UploadBox></UploadBox>
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
import Side from "@/views/layout/Side.vue";
import Header from "@/views/layout/Header.vue";
import UploadBox from "@/views/layout/UploadBox.vue";
import {ref, watch} from 'vue'
import store from "@/store";

let isStartUpload = ref(store.state.states.isStartUpload);

watch(() => store.state.states.isStartUpload, (newVal) => {
  // console.log('Home.vue中的isStartUpload:', isStartUpload.value);
  isStartUpload.value = newVal;
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

</style>
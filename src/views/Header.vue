<template>
  <header class="header">
    <img src="../../public/sacc.png" alt="user avatar">
  <span>
    {{username}}
  </span>
  </header>

</template>


<script setup>
localStorage.setItem('username','admin');

let username = localStorage.getItem('username');
</script>

<style scoped>
img{
  width:60px;
}
.header{
  min-height: 60px;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 水平偏移，垂直偏移，模糊半径，颜色 */
}
span{
  margin:auto 10px;
}
</style>
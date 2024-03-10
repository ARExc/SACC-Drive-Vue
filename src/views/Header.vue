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
}
span{
  margin:auto 10px;
}
</style>
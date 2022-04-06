<template>
  <transition>
    <div class="animate__animated animate__fadeInDown">
      <div class="headimg">
        <span>博客分类</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Head",
};
</script>

<style scoped>
.headimg {
  width: 100%;
  height: 300px;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #fafc5c, #f15050, #238bd5, #23d579);
  background-size: 400% 400%;
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;
}
.headimg span {
  font-weight: 700;
  width: 100%;
  font-size: 2.5rem;
  text-align: center;
  color: rgb(255, 255, 255);
}
</style>
<template>
  <transition>
    <div class="headimg animate__animated animate__fadeInDown">
      <span>博客详情</span>
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
  background: linear-gradient(-45deg, #51f1b6, #f94383, #f2fb44, #4a86f5);
  background-size: 400% 400%;
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.headimg span {
  font-weight: 700;
  width: 100%;
  font-size: 2.5rem;
  text-align: center;
  color: rgb(255, 255, 255);
}
@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
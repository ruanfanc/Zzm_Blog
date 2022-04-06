<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    enter-leave-class="animate__animated animate__fadeOut"
  >
    <div class="Avatar" v-show="showAnimate">
      <img src="./image/微信图片_20211229231658.jpg" alt="" />
      <span class="spancss"> 萌萌的博客 </span>
      <el-button
        type="primary"
        size="small"
        style="font-weight: 1000"
        round
        @click="toBlog"
        >进入博客</el-button
      >
    </div>
  </transition>
</template>

<script>
export default {
  name: "Avatar",
  data() {
    return {
      showAnimate: false,
    };
  },
  methods: {
    toBlog() {
      this.$bus.$emit("toShowBlog");
    },
  },
  mounted() {
    this.showAnimate = true;
  },
};
</script>

<style  >
@media screen and (min-width: 768px) {
  .Avatar {
    width: 250px;
    border-radius: 50%;
    height: 250px;
    display: flex;
    flex-direction: column;
    border: #ccc 4px solid;
    align-items: center;
    margin-top: 5%;
    user-select: none;
  }
  .spancss {
    font-size: 24px;
    color: #fff;
    font-weight: 1000;
    margin-top: 15px;
    margin-bottom: 30%;
  }
}

.Avatar img {
  height: 100%;
  border-radius: 50%;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .Avatar {
    margin-top: 10vh;
    width: 250px;
    border-radius: 50%;
    height: 250px;
    display: flex;
    flex-direction: column;
    border: #ccc 4px solid;
    align-items: center;
    user-select: none;
  }
  .spancss {
    font-size: 24px;
    color: #fff;
    font-weight: 1000;
    margin-top: 15px;
    margin-bottom: 5vh;
  }
}
</style>
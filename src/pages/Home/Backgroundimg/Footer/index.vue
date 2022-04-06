<template>
  <transition
    enter-active-class="animate__animated animate__slideInUp"
    enter-leave-class="animate__animated animate__slideInDown"
  >
    <div class="footer" v-show="ifshow">
      <img class="footerimg" src="./image/向下.png" alt="" />
      <div class="footer-label">
        <el-popover
          placement="top"
          width="250"
          trigger="hover"
          v-for="(i, index) in iconinfo"
          :key="index"
        >
          <el-image
            style="width: 250px; height: 250px"
            :src="i.imgurl"
          ></el-image>
          <i :class="i.class" slot="reference"></i>
        </el-popover>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      ifshow: false,

      iconinfo: [
        {
          class: "iconfont icon-weixin",
          imgurl: require("./image/微信图片_20220306135949.jpg"),
        },
        {
          class: "iconfont icon-QQ-circle-fill",
          imgurl: require("./image/微信图片_20220306143746.jpg"),
        },
        {
          class: "iconfont icon-bzhan16",
          imgurl: require("./image/微信图片_20220306191135.jpg"),
        },
        {
          class: "iconfont icon-github-fill",
          imgurl: require("./image/微信图片_20220306191135.jpg"),
        },
      ],
    };
  },
  methods: {},
  mounted() {
    this.ifshow = true;
  },
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .footerimg {
    width: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
    animation: 1.5s dowm infinite linear;
  }
  i {
    display: inline-block;
    font-size: 35px;
    color: #ccc;
    animation: pulse;
    animation-duration: 2s;
    transition: font-size 0.5s;
  }
  i:hover {
    font-size: 45px;
  }
  .footer {
    height: 25%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .footer-label {
    display: flex;
    justify-content: space-between;
  }
  .innerImg {
    width: 250px;
    height: 300px;
  }
}
@media screen and (max-width: 768px) {
  .footerimg {
    width: 20px;
    margin-left: 50%;
    transform: translateX(-50%);

    animation: 1.5s dowm infinite linear;
  }
  i {
    display: inline-block;
    font-size: 3em;
    color: #ccc;
    animation: pulse;
    animation-duration: 2s;
    transition: font-size 0.5s;
  }
  i:hover {
    font-size: 4em;
  }
  .footer {
    /* border: 1px solid #ccc; */
    height: calc(4em + 140px);
    margin-top: calc(11vh - 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .footer-label {
    width: 50vw;
    height: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .innerImg {
    width: 250px;
    height: 300px;
  }
}
@keyframes dowm {
  /*关键帧*/
  0% {
    margin-top: 0px;
  }
  50% {
    margin-top: 50px;
  }
  100% {
    margin-top: 100px;
  }
}
</style>
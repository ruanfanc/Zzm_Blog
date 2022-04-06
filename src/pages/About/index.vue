<template>
  <div class="backgroundimg">
    <NavMenu />
    <div class="animate__animated animate__fadeInDown">
      <div class="headimg">
        <span>我的简介</span>
      </div>
    </div>
    <div class="body">
      <img
        src="../../assets/image/微信图片_20220405143953.jpg"
        alt=""
        class="img"
      />

      <div class="detail">
        <div class="detail-top">
          <h2>关于我</h2>
        </div>
        <div class="detail-content">
          <p>
            来自海南大学的普通大一新生，喜欢编程，热爱前端，对计算机知识有强烈的求知欲。
          </p>
          <p>在此站分享学习生活，希望与大家一起进步！</p>
          <p>
            Github主页：<a href="https://github.com/ruanfanc"
              >https://github.com/ruanfanc</a
            >
          </p>
        </div>
        <div class="detail-tech">
          <h3>技术栈</h3>
          <div class="detail-tech-body">
            <span class="labels-title">Vue</span>
            <span class="labels-title">Nodejs </span>
            <span class="labels-title">Express</span>
            <span class="labels-title">Css</span>
            <span class="labels-title">Html</span>
            <span class="labels-title">JavaScript</span>
            <span class="labels-title">Git</span>
          </div>
        </div>
      </div>
      <div class="contact">
        <span style="font-size: 1rem; font-weight: 700">联系我吧：</span>
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
          <i class="contact-i" :class="i.class" slot="reference"></i>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      iconinfo: [
        {
          class: "iconfont icon-weixin",
          imgurl: require("../Home/Backgroundimg/Footer/image/微信图片_20220306135949.jpg"),
        },
        {
          class: "iconfont icon-QQ-circle-fill",
          imgurl: require("../Home/Backgroundimg/Footer/image/微信图片_20220306143746.jpg"),
        },
        {
          class: "iconfont icon-bzhan16",
          imgurl: require("../Home/Backgroundimg/Footer/image/微信图片_20220306191135.jpg"),
        },
        {
          class: "iconfont icon-github-fill",
          imgurl: require("../Home/Backgroundimg/Footer/image/微信图片_20220306191135.jpg"),
        },
      ],
    };
  },
};
</script>

<style scoped>
@media screen and (min-width: 868px) {
  .backgroundimg {
    background-image: url("../../assets/image/blue-snow.png");
    height: auto;
    width: 100%;
    padding-bottom: 80px;
  }
  .DateIndex {
    background-image: url("../../assets/image/blue-snow.png");
    width: 100%;
    height: auto;
    padding-bottom: 100px;
    z-index: -1;
  }
  .headimg {
    width: 100%;
    height: 300px;
    background-color: skyblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(-45deg, #3862c4, #63fe8c, #454ae3, #ef4a8c);
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
  .body {
    width: 60vw;
    margin-left: 20vw;
    margin-top: 20px;
  }
  .img {
    width: 35vw;
    border-radius: 20px;
    padding: 15px;
    background-color: #fff;
  }
  .detail {
    float: right;
    width: 32%;
    height: 100%;
  }
  .detail-top {
    background-color: #fff;
    width: 100%;
    border-radius: 8px;
    height: 3rem;
    border: 1px solid #ccc;
  }
  .detail-top h2 {
    font-size: 1.4rem;
    margin-left: 1rem;
    line-height: 3rem;
  }
  .detail-content {
    width: calc(100% - 2rem);
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: 0;
    border-radius: 8px;
  }
  .detail-content p {
    font-size: 0.9rem;
    letter-spacing: 0.7px;
    line-height: 1.4rem;
    color: #4c4948bb;
    margin-bottom: 20px;
  }
  .detail-tech {
    width: calc(100% - 2rem);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .detail-tech-body {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    line-height: 2rem;
  }
  .contact {
    width: calc(100%-2rem);
    padding: 1rem;
    /* float: left; */
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 1rem;
  }
}

.contact i {
  font-size: 1.5rem;
  margin-left: 1rem;
}
@media screen and (max-width: 868px) {
  .backgroundimg {
    background-image: url("../../assets/image/blue-snow.png");
    height: auto;
    width: 100%;
    padding-bottom: 80px;
  }
  .DateIndex {
    background-image: url("../../assets/image/blue-snow.png");
    width: 100%;
    height: auto;
    padding-bottom: 100px;
    z-index: -1;
  }
  .headimg {
    width: 100%;
    height: 300px;
    background-color: skyblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(-45deg, #3862c4, #63fe8c, #454ae3, #ef4a8c);
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
  .body {
    width: 90vw;
    margin-left: 5vw;
    margin-top: 20px;
  }
  .img {
    width: calc(100% - 30px);
    border-radius: 20px;
    padding: 15px;
    background-color: #fff;
  }
  .detail {
    float: right;
    width: 100%;
    height: 100%;
  }
  .detail-top {
    background-color: #fff;
    width: 100%;
    border-radius: 8px;
    height: 3rem;
    border: 1px solid #ccc;
  }
  .detail-top h2 {
    font-size: 1.4rem;
    margin-left: 1rem;
    line-height: 3rem;
  }
  .detail-content {
    width: calc(100% - 2rem);
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: 0;
    border-radius: 8px;
  }
  .detail-content p {
    font-size: 0.9rem;
    letter-spacing: 0.7px;
    line-height: 1.4rem;
    color: #4c4948bb;
    margin-bottom: 20px;
  }
  .detail-tech {
    width: calc(100% - 2rem);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .detail-tech-body {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    line-height: 2rem;
  }
  .labels-title {
    border: 1px solid #ccc;
    padding: 4px 10px 4px 10px;
    color: rgb(55, 146, 182);
    font-weight: bold;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .labels-title::before {
    position: absolute;
    height: 0px;
    width: 0px;
    border: 7px solid transparent;
    border-right: 7px solid #ccc;
    top: 5px;
    right: 100%;
    content: "";
  }
  .labels-title::after {
    position: absolute;
    height: 0px;
    width: 0px;
    border: 6px solid transparent;
    border-right: 6px solid #fff;
    top: 6px;
    right: 100%;
    content: "";
  }
  .labels-title:hover {
    /* transition: 0.2s; */
    transition-duration: 0.2s;
    box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
  }
  .contact {
    width: calc(100%-2rem);
    padding: 1rem;
    /* float: left; */
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: calc(100% + 1rem);
  }
}
.detail-top:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
.img:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
.detail-content:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
.detail-tech:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
.contact:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
</style>
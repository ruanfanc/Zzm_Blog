<template>
  <div class="DateIndex">
    <NavMenu />

    <div class="animate__animated animate__fadeInDown">
      <div class="headimg animate__animated animate__fadeInDown">
        <span>博客归档</span>
      </div>
    </div>
    <div class="content" ref="content">
      <div class="content-header">已发表{{ blogsnum.num }}篇文章</div>
      <el-timeline class="timeline">
        <el-timeline-item
          placement="top"
          v-for="(activity, index) in activities"
          :key="index"
          color="skyblue"
          :timestamp="activity.date"
        >
          <el-card :body-style="{ width: '85%' }">
            <h4 class="item-title">{{ activity.title }}</h4>
            <p class="item-vicetitle">{{ activity.vicetitle }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div v-show="!isloading">
        <i class="el-icon-loading loadingimg"></i>
        <span>奋力加载中！</span>
      </div>
      <div v-show="isloading" class="loadingfooter">
        <span>没有更多啦~ </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
// 引入防抖组件
import { reqgetblogsnum, reqgetdateindexs } from "@/api";

export default {
  name: "DateIndex",
  data() {
    return {
      isstop: 1,
      // 控制加载图片显示
      activities: [],
      // 数据列表
      blogsnum: 0,
      // 博客总数
      index: 1,
      // 懒加载第几面
    };
  },
  computed: {
    // 一共要加载多少面
    indexs() {
      return Math.ceil(this.blogsnum.num / 6);
    },
    // 是否要暂停加载
    isloading() {
      return this.indexs == this.index;
    },
  },
  methods: {
    // 获取数据列表
    // 当不需要加载时图片显示关闭
    async getdateindexs(index) {
      const DateIndexs = await reqgetdateindexs(index);
      if (this.activities.length == 0) {
        this.activities = [...DateIndexs.sortinfo];
      } else if (this.isloading) {
        this.activities = [...this.activities, ...DateIndexs.sortinfo];
        this.isstop = 0;
      } else {
        this.activities = [...this.activities, ...DateIndexs.sortinfo];
      }
    },
    // 获取博客总数
    async getblogsnum() {
      const blogs = await reqgetblogsnum();
      this.blogsnum = blogs.blogsnum[0];
    },
    // 监听滚动事件
    handleScroll() {},
  },
  mounted() {
    this.getdateindexs(this.index);
    this.getblogsnum();
    // 给滚动事件添加节流
    this.handleScroll = _.throttle(() => {
      if (
        this.$refs.content.getBoundingClientRect().bottom <
          document.documentElement.clientHeight + 200 &&
        this.isstop
      ) {
        this.index += 1;
        this.getdateindexs(this.index);
      }
    }, 1500);
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    // 删除滚动事件
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
@media screen and (min-width: 878px) {
  .content {
    width: 65%;
    margin-left: 17.5%;
    padding-bottom: 40px;
    background-color: #fff;
    margin-top: 60px;
  }
}
@media screen and (max-width: 878px) {
  .content {
    width: 90%;
    margin-left: 5%;
    padding-bottom: 40px;
    background-color: #fff;
    margin-top: 60px;
  }
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
  background: linear-gradient(-45deg, #198dfa, #d041f4, #23d52f, #1864f2);
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

.content-header {
  width: 100%;
  line-height: 100px;
  font-size: 30px;
  color: rgb(13, 140, 190);
  text-align: center;
  font-weight: 700;
}
.timeline {
  width: 80%;
  margin-left: 10%;
  font-weight: 1000;
}
.timeline-item {
  height: 100px;
}
.item-title {
  font-size: 20px;
  width: 90%;
}
.item-vicetitle {
  font-weight: 400;
  width: 90%;
  margin-top: 30px;
  margin-bottom: 10px;
}
.loadingimg {
  margin-left: calc(50% - 1rem);
  font-size: 2rem;
  color: skyblue;
}
.loadingfooter {
  width: 100%;
  font-size: 1rem;
  color: skyblue;
  display: flex;
  justify-content: center;
}
</style>
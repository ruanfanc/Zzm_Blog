<template>
  <div>
    <div class="Sort_Body">
      <vue-particles
        class="backImg"
        color="0066ff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#66CCFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="Blogs animate__animated animate__fadeIn">
      <div class="Blogs-head">
        <p>博客</p>
        <el-select
          v-model="value"
          placeholder="请选择分类"
          class="Blogs-elselet"
          @change="changeselect(value)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div>
          <span>共</span>
          <span>{{ blogsnum }}</span>
          <span>篇</span>
        </div>
      </div>
      <!-- 博客头部 -->
      <div class="Blogs-select">
        <div
          v-show="showsorts"
          class="Blogs-Sort"
          v-for="item in sorts"
          :key="item.sort"
          @click="changetag(item, item.sort)"
        >
          <span
            :class="{
              'Blogs-Sort-name2': namecolor == item.sort,
              'Blogs-Sort-name': !(namecolor == item.sort),
            }"
            >{{ item.sort }}</span
          >
          <span
            class="Blogs-Sort-num"
            :class="{ 'Blogs-Sort-num2': namecolor == item.sort }"
            >{{ item.num }}</span
          >
        </div>
        <div
          v-show="showlabels"
          class="Blogs-Sort"
          v-for="item in labels"
          :key="item.label"
          @click="changetag(item, item.label)"
        >
          <span
            :class="{
              'Blogs-Sort-name2': namecolor == item.label,
              'Blogs-Sort-name': !(namecolor == item.label),
            }"
            >{{ item.label }}</span
          >
          <span
            class="Blogs-Sort-num"
            :class="{ 'Blogs-Sort-num2': namecolor == item.label }"
            >{{ item.num }}</span
          >
        </div>
      </div>
      <!-- 博客中部 -->
      <!-- 博客内容 -->
      <div class="Blogs-content">
        <div
          class="Blogs-introduction"
          v-for="blog in Blogs"
          :key="blog.id"
          @click="todetail(blog.id)"
        >
          <div class="Blogs-introduction-one">
            <!-- 博客标题 -->
            <h3 class="Blogs-title">{{ blog.title }}</h3>
            <!-- 博客内容介绍 -->
            <p class="Blogs-detail">{{ blog.vicetitle }}</p>
            <div class="Blogs-time">
              <div class="Blogs-time-one">
                <!-- 发布时间 -->
                <div>
                  <i class="iconfont icon-riqi"></i>
                  <p>{{ blog.date }}</p>
                </div>
                <!-- 浏览数量 -->
                <div>
                  <i class="iconfont icon-liulan one"></i>
                  <p>{{ blog.views }}</p>
                </div>
                <!-- 点赞数量 -->
                <div>
                  <i class="iconfont icon-dianzan one"></i>
                  <p>{{ blog.likes }}</p>
                </div>
              </div>
              <!-- 标签 -->
              <div class="Blogs-time-two-div">
                <div class="Blogs-time-two">{{ blog.sort }}</div>
                <div class="Blogs-time-two">{{ blog.label }}</div>
              </div>
            </div>
          </div>
          <div class="Blogs-introduction-two">
            <img
              src="https://img2.baidu.com/it/u=2240226665,3300836785&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="Pagination">
        <el-pagination
          style="margin-top: 10px"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 10, 15, 20]"
          :page-size="6"
          :layout="layout"
          :total="blogsnum"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// todo:
// 优化分页器的在标签和分类下的选择 （做完）
// 实现token进入管理员系统

import { reqgetblogsinfo, reqgetlabelinfo, reqgetsortinfo } from "@/api";
import Blogs from "../../Home/ShowBlog/Blogs/index.vue";
export default {
  name: "Sort_Body",

  data() {
    return {
      options: [
        {
          value: "标签",
          label: "标签",
        },
        {
          value: "分类",
          label: "分类",
        },
      ],
      currentPage: 1, //当前页
      value: "", //面包屑属性
      labels: [], //面包屑
      label: "", //当前页码面包屑，控制分页器传参
      sorts: [], //面包屑
      sort: "", //当前页码面包屑，控制分页器传参
      Blogs: {}, //博客内容
      blogsnum: 0, //博客数量
      namecolor: "", //面包屑背景颜色
    };
  },
  computed: {
    // 控制标签和分类面包屑的显示
    showlabels() {
      return !this.value || this.value == "标签";
    },
    showsorts() {
      return !this.value || this.value == "分类";
    },
    layout() {
      if (window.innerWidth > 458) {
        return "total, sizes, prev, pager, next, jumper";
      } else {
        return "total, prev, pager, next";
      }
    },
  },
  components: {
    Blogs,
  },
  methods: {
    // 面包屑属性改变时
    async changeselect(value) {
      // params value 为要按查找的值
      if (value == "标签") {
        await this.$store.dispatch("getlabels");
        this.selects = this.$store.state.Home.labels;
      } else {
        await this.$store.dispatch("getsorts");
        this.selects = this.$store.state.Home.sorts;
      }
      this.getblogsinfo();
      this.getblogsnum();
    },

    // 分页器页码改变
    // 1.当面包屑无属性时全部显示
    // 2.当面包屑有属性,分页器按属性工作
    async handleCurrentChange(newPage) {
      if (this.value == "") {
        const blogs = await reqgetblogsinfo(newPage);
        this.Blogs = blogs.blogs;
      } else if (this.value == "分类") {
        const sortinfo = await reqgetsortinfo(this.sort, newPage);
        this.Blogs = sortinfo.sortinfo;
      } else {
        const labelinfo = await reqgetlabelinfo(this.label, newPage);
        this.Blogs = labelinfo.labelinfo;
      }
    },

    // 获取博客数量
    async getblogsnum() {
      await this.$store.dispatch("getblogsnum");
      this.blogsnum = this.$store.state.Home.blogsnum;
    },

    // 获取博客内容
    async getblogsinfo() {
      const blogs = await reqgetblogsinfo(this.currentPage);
      this.Blogs = blogs.blogs;
    },

    // 获取所有面包屑
    async getselects() {
      await this.$store.dispatch("getlabels");
      this.labels = this.$store.state.Home.labels;
      await this.$store.dispatch("getsorts");
      this.sorts = this.$store.state.Home.sorts;
    },

    // 点击选择查看面包屑
    async changetag(a, b) {
      // 面包屑背景颜色设定
      this.namecolor = b;
      if (a.sort) {
        //博客数量转为点击面包屑的数量,分页器页面转为1
        this.blogsnum = a.num;
        this.currentPage = 1;
        // 面包屑属性转换
        this.value = "分类";
        // 设定页码面包屑
        this.sort = a.sort;
        // 发出面包屑的请求
        const sortinfo = await reqgetsortinfo(a.sort, this.currentPage);
        // 返回值赋值给博客
        this.Blogs = sortinfo.sortinfo;
      } else {
        this.blogsnum = a.num;
        this.currentPage = 1;
        this.value = "标签";
        this.label = a.label;
        const labelinfo = await reqgetlabelinfo(a.label, this.currentPage);
        this.Blogs = labelinfo.labelinfo;
      }
    },
    // 去内容详情
    todetail(id) {
      this.$router.push({
        name: `Blogdetail`,
        query: {
          id: id,
        },
      });
    },
  },
  mounted() {
    this.getselects();
    if (this.$route.params.name) {
      const params = this.$route.params;
      this.changetag(JSON.parse(params.detail), params.name);
    } else {
      this.getblogsnum();
      this.getblogsinfo();
    }
  },
};
</script>

<style scoped>
@media screen and (min-width: 848px) {
  .Blogs-head p:nth-child(1) {
    font-size: 20px;
    margin-left: 10px;
    font-weight: bold;
    color: rgb(33, 162, 167);
  }
  .Blogs-head div {
    display: flex;
    font-size: 15px;
    align-items: flex-end;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .Blogs {
    width: 65%;
    margin-left: 17.5%;
    margin-top: 60px;
    height: 200px;
    z-index: 100;
    position: absolute;
  }
  .Blogs-select {
    width: 94%;
    padding: 3%;
    padding-bottom: 0px;
    background-color: #fff;
    border: 1px solid #ccc;
    display: flex;
    flex-wrap: wrap;
  }
  .Blogs-time {
    position: relative;
    margin-top: 40px;
    color: rgb(185, 175, 175);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Blogs-time-one {
    display: flex;
  }
  .Blogs-time-one div {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  .Pagination {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (max-width: 848px) {
  .Blogs-head p:nth-child(1) {
    display: none;
  }
  .Blogs-head div {
    display: flex;
    font-size: 15px;
    align-items: flex-end;
    margin-right: 10px;
    position: relative;
    right: 0;
    margin-bottom: 10px;
  }
  .Blogs {
    width: 90vw;
    margin-left: 5vw;
    margin-top: 60px;
    height: 200px;
    z-index: 100;
    position: absolute;
  }
  .Blogs-select {
    width: 94%;
    padding: 3%;
    padding-bottom: 0px;
    background-color: #fff;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .Blogs-time {
    position: absolute;
    bottom: 1rem;
    color: rgb(185, 175, 175);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Blogs-time-one {
    display: flex;
  }
  .Blogs-time-one div {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }

  .Pagination {
    height: 50px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.backImg {
  height: 1700px;
}
.Sort_Body {
  width: 100%;
  height: 1700px;
  position: absolute;
  top: 0;
  background-image: url("../../../assets/image/blue-snow.png");
  z-index: -999;
}

.Blogs-head {
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #fff;
}

.Blogs-head div span:nth-child(2) {
  font-size: 24px;
  color: rgb(33, 214, 57);
}
.Blogs-content {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
}
.Blogs-introduction {
  width: 95%;
  /* margin-left: 2.5%; */
  min-height: 140px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding-top: 20px;
  padding-right: 2.5%;
  position: relative;
  padding-left: 2.5%;
  padding-bottom: 10px;
}
.Blogs-introduction:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
.Blogs-introduction-one {
  flex: 7;
}
.Blogs-introduction-two {
  flex: 2;
}
.Blogs-title {
  font-size: 18px;
}
.Blogs-detail {
  margin-top: 18px;
  font-size: 14px;
  margin-bottom: 2rem;
  color: rgb(100, 100, 100);
}
.Blogs-time-two-div {
  display: flex;
}
.Blogs-time-two {
  color: rgb(45, 180, 233);
  padding: 2px;
  border-radius: 10%;
  border: 1px solid #ccc;
  margin-left: 5px;
}
.Blogs-introduction-two img {
  width: 90%;
  margin-left: 10%;
  border-radius: 5%;
}
.Blogs-elselet {
  position: absolute;
  right: 100px;
  width: 125px;
  width: 125px;
  margin-top: 10px;
  margin-left: 1rem;
}

.Blogs-Sort {
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.Blogs-Sort-name {
  height: 36px;
  padding: 7px 20px 7px 20px;
  font-size: 14px;
  text-align: center;
  border: 2px solid #ccc;
  border-right: 0px;
}
.Blogs-Sort-name2 {
  height: 36px;
  padding: 7px 20px 7px 20px;
  font-size: 14px;
  text-align: center;
  border: 2px solid rgb(0, 158, 221);
  border-right: 0px;
}
.Blogs-Sort-name2:hover {
  border: 2px solid rgb(0, 158, 221);
  border-right: 0px;
  transition-duration: 0.2s;
}
.Blogs-Sort-name:hover {
  border: 2px solid rgb(161, 159, 159);
  border-right: 0px;
  transition-duration: 0.2s;
}
.Blogs-Sort-num {
  height: 36px;
  padding: 7px 10px 7px 10px;
  font-size: 14px;
  border: 2px solid #ccc;
  position: relative;
}
.Blogs-Sort-num2 {
  height: 36px;
  padding: 7px 10px 7px 10px;
  font-size: 14px;
  border: 2px solid rgb(0, 158, 221);
  position: relative;
}
.Blogs-Sort-num::before {
  position: absolute;
  height: 0px;
  width: 0px;
  border: 10px solid transparent;
  border-right: 10px solid #ccc;
  top: 7px;
  right: 101%;
  content: "";
}
.Blogs-Sort-num2::before {
  position: absolute;
  height: 0px;
  width: 0px;
  border: 10px solid transparent;
  border-right: 10px solid rgb(0, 158, 221);
  top: 7px;
  right: 101%;
  content: "";
}
.Blogs-Sort-num::after {
  position: absolute;
  height: 0px;
  width: 0px;
  border: 8px solid transparent;
  border-right: 8px solid #fff;
  top: 9px;
  right: 100%;
  content: "";
}
</style>

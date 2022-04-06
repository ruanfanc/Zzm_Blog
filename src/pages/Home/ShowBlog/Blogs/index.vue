<template>
  <div class="Blogs">
    <div class="Blogs-head">
      <p>博客</p>
      <div>
        <span>共</span>
        <span>{{ blogsnum }}</span>
        <span>篇</span>
      </div>
    </div>
    <div class="Blogs-content">
      <div
        class="Blogs-introduction"
        @click="todetail(Blog.id)"
        v-for="Blog in Blogs.Blogs"
        :key="Blog.id"
      >
        <div class="Blogs-introduction-one">
          <!-- 博客标题 -->
          <h3 class="Blogs-title">{{ Blog.title }}</h3>
          <!-- 博客内容介绍 -->
          <p class="Blogs-detail">{{ Blog.vicetitle }}</p>
          <div class="Blogs-time">
            <div class="Blogs-time-one">
              <!-- 发布时间 -->
              <div>
                <i class="iconfont icon-riqi"></i>
                <p>{{ Blog.date }}</p>
              </div>
              <!-- 浏览数量 -->
              <div>
                <i class="iconfont icon-liulan"></i>
                <p>{{ Blog.views }}</p>
              </div>
              <!-- 点赞数量 -->
              <div>
                <i class="iconfont icon-dianzan"></i>
                <p>{{ Blog.likes }}</p>
              </div>
            </div>
            <!-- 标签 -->
            <div class="Blogs-time-two-div">
              <div class="Blogs-time-two">{{ Blog.sort }}</div>
              <div class="Blogs-time-two">{{ Blog.label }}</div>
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
        style="margin-left: 10px"
        @size-change="handleSizeChange"
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
</template>

<script>
export default {
  name: "Blogs",
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    blogsnum() {
      return this.$store.state.Home.blogsnum;
    },
    layout() {
      if (window.innerWidth > 458) {
        return "total, sizes, prev, pager, next, jumper";
      } else {
        return "total, prev, pager, next";
      }
    },
  },
  props: ["Blogs"],
  methods: {
    todetail(id) {
      this.$router.push({
        name: `Blogdetail`,
        query: {
          id: id,
        },
      });
    },
    handleSizeChange() {},
    handleCurrentChange(newPage) {
      this.$store.dispatch("getblogsinfo", newPage);
    },
  },
  mounted() {
    this.$store.dispatch("getblogsnum");
  },
};
</script>
    
<style scoped>
@media screen and (min-width: 848px) {
  .Blogs {
    width: 65%;
    height: 200px;
    z-index: 100;
  }
  .Blogs-detail {
    margin-top: 18px;
    /* margin-bottom: 2rem; */
    font-size: 14px;
    color: rgb(100, 100, 100);
  }

  .Blogs-time {
    margin-top: 40px;
    position: relative;
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
  .Blogs-time-two-div {
    display: flex;
  }
  .Blogs-time-two {
    color: rgb(45, 180, 233);
    padding: 2px;
    border-radius: 10%;
    margin-left: 5px;
    border: 1px solid #ccc;
  }
}
@media screen and (max-width: 848px) {
  .Blogs {
    width: 100%;
    height: 200px;
    z-index: 100;
  }
  .Blogs-time {
    position: absolute;
    bottom: 1rem;
    color: rgb(185, 175, 175);
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: flex-end;
  }
  .Blogs-time-two-div {
    display: flex;
  }
  .Blogs-time-one {
    display: none;
  }
  .Blogs-time-two {
    color: rgb(45, 180, 233);
    padding: 2px;
    border-radius: 10%;
    margin-left: 5px;
    border: 1px solid #ccc;
  }
  .Blogs-detail {
    margin-top: 18px;
    margin-bottom: 2rem;
    font-size: 14px;
    color: rgb(100, 100, 100);
  }
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
.Blogs-head div span:nth-child(2) {
  font-size: 24px;
  color: rgb(33, 214, 57);
}
.Blogs-content {
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: 0px;
  background-color: #fff;
}
.Blogs-introduction {
  width: 95%;
  position: relative;

  /* margin-left: 2.5%; */
  min-height: 140px;
  height: auto;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding-top: 20px;
  padding-right: 2.5%;
  padding-left: 2.5%;
  padding-bottom: 10px;
}
.Blogs-introduction:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
.Blogs-introduction-one {
  flex: 7;
  display: flex;
  flex-direction: column;
}
.Blogs-introduction-two {
  flex: 3;
}
.Blogs-title {
  font-size: 18px;
}

.Blogs-introduction-two img {
  width: 90%;
  margin-left: 10%;
  border-radius: 5%;
}
.Pagination {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: 0px;
}
.Pagination:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}
</style>
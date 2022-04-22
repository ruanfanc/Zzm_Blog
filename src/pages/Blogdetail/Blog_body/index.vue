<template>
  <div>
    <div class="Sort_Body">
      <div class="Blogs animate__animated animate__fadeIn">
        <div class="Blogs-title">
          <h1>{{ blogdetail.title }}</h1>
          <div>
            <i class="el-icon-date">{{ blogdetail.date }}</i>
            <i class="el-icon-view" style>{{ blogdetail.views }}</i>
            <i class="el-icon-magic-stick">{{ blogdetail.likes }}</i>
          </div>
        </div>
        <div class="Blogs-img"></div>

        <div v-html="blogdetail.content"></div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { reqgetblogdetail } from "@/api";
import Prism from "/src/assets/Prims/prism"; // 要提醒一下，你下载的JS文件末尾加上一句 export default Prism
export default {
  data() {
    return {
      blogdetail: {},
    };
  },
  computed: {},
  methods: {
    async getblogdetail() {
      const blogdetail = await reqgetblogdetail(this.$route.query.id);
      this.blogdetail = blogdetail.blogdetail[0];
    },
  },
  watch: {
    blogdetail: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          Prism.highlightAll();
        });
      },
    },
  },
  name: "Blog_Body",
  components: {},
  mounted() {
    this.getblogdetail();
  },
};
</script>

<style scoped>
@media screen and (min-width: 868px) {
  .Blogs {
    border: 1px solid #ccc;
    padding: 80px;
    padding-top: 50px;
    width: 50vw;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 60px;
    z-index: 100;
    background-color: #fff;
  }
}
@media screen and (max-width: 868px) {
  .Blogs {
    border: 1px solid #ccc;
    padding: 10px;
    padding-top: 50px;
    width: 90vw;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 60px;
    z-index: 100;
    background-color: #fff;
  }
}
.Sort_Body {
  width: 100%;
  padding-top: 300px;
  padding-bottom: 300px;
  position: absolute;
  top: 0;
  background-image: url("../../../assets/image/blue-snow.png");
  z-index: -999;
}

.Blogs-title {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.Blogs-title div {
  margin-top: 5px;
  margin-bottom: 10px;
}
.Blogs-title i {
  margin-right: 10px;
}
.Blogs-title h1 {
  font-size: 2.5rem;
  line-height: 3rem;
}
.Blogs-Body {
  margin-top: 50px;
  line-height: 25px;
  min-height: 600px;
}
</style>
 
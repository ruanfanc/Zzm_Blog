<template>
  <div class="ShowBlog">
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
    <div class="content" ref="ShowBlog">
      <!-- 左侧博客组件 -->
      <Blogs :Blogs="Blogs" />
      <!-- 右侧标签组件 -->
      <Labels />
    </div>
    <FooterNav />
  </div>
</template> 

<script>
import Blogs from "./Blogs";
import Labels from "./Labels";
export default {
  name: "ShowBlog",
  props: ["Blogs"],
  components: {
    Blogs,
    Labels,
  },
  mounted() {
    this.$bus.$on("toShowBlog", () => {
      this.$refs.ShowBlog.scrollIntoView({ behavior: "smooth" });
    });
  },
};
</script>

<style scoped>
.ShowBlog {
  background-image: url("../../../assets/image/blue-snow.png");
  height: 1400px;
  width: 100%;
  position: relative;
}
.backImg {
  height: 1400px;
}
.content {
  display: flex;
  width: 75vw;
  justify-content: space-between;
  top: 40px;
  left: 12.5vw;
  position: absolute;
}
</style>
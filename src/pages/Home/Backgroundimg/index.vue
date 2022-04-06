<template>
  <div class="background">
    <Avatar style="margin-bottom: 10%" />
    <Footer />
  </div>
</template>

<script>
import Avatar from "./Avatar";
import Footer from "./Footer";
export default {
  name: "backgroundimg",
  data() {
    return {};
  },
  components: {
    Avatar,
    Footer,
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2F01.minipic.eastday.com%2F20170922%2F20170922100538_d41d8cd98f00b204e9800998ecf8427e_6.jpeg&refer=http%3A%2F%2F01.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648985028&t=6d14f8af32786c7a03cf8f2cba26c2fb");
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
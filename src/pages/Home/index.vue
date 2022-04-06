<template>
  <div>
    <NavMenu />
    <Backgroundimg />
    <ShowBlog :Blogs="Blogs" />
  </div>
</template>

<script>
import Backgroundimg from "./Backgroundimg";
import ShowBlog from "./ShowBlog";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    Blogs() {
      return this.$store.getters;
    },
  },
  components: {
    Backgroundimg,
    ShowBlog,
  },
  mounted() {
    this.$store.dispatch("getblogsinfo");
  },
};
</script>

<style>
</style>

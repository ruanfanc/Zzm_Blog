<template>
  <div>
    <NavMenu />
    <Head />
    <Body :blogdetail="blogdetail" />
  </div>
</template>

<script>
import Body from "./Blog_body/index.vue";
import Head from "./Head/index.vue";
export default {
  name: "Blogdetail",
  components: {
    Head,
    Body,
  },
  computed: {
    blogdetail() {
      return this.$store.getters.Blogcontent;
    },
  },
  mounted() {
    this.$store.dispatch("getblogdetail", this.$route.query);
  },
};
</script>

<style>
</style>
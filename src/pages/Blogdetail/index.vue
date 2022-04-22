<template>
  <div>
    <NavMenu />
    <Head />
    <Body/>
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

  },
  mounted() {
  },
};
</script>

<style>
</style>
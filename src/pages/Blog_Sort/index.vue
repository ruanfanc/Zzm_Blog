<template>
  <div>
     <NavMenu/>
      <Head/>
      <Body/>
  </div>
</template>

<script>
import Body from './Sort_Body/index.vue';
import Head from './Head/index.vue'
export default {
    name:'Blog_sort',
    components:{
      Head,
      Body
    }
}
</script>

<style>

</style>
<template>
  <div class="animate__animated animate__fadeIn">
    <NavMenu />
    <div class="back">
      <div class="Music_search">
        <div class="Music_search_div" v-show="!issearch" @click="showsearch">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </div>
        <div class="Music_search_input" v-show="issearch">
          <el-input
            placeholder="输入想听的歌~"
            v-model="input"
            ref="input"
            @blur="issearch = !issearch"
            @change="tosearch"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/music";
export default {
  name: "Music",
  data() {
    return {
      input: "",
      issearch: false,
    };
  },
  methods: {
    tosearch() {
      this.$router.push({
        name: "MusicSearch",
        query: {
          id: this.input,
        },
      });
    },
    showsearch() {
      this.issearch = !this.issearch;
      this.$nextTick(() => this.$refs.input.focus());
    },
    async login() {
      return await Login();
    },
  },
  mounted() {},
};
</script>

<style scoped>
.back {
  height: 90vh;
  padding-top: 5vh;
  padding-bottom: 5vh;
  background-image: url("http://152.136.254.142:3000/uploads/1f50f1b0d6179b250961ec14bb71c2b8");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

@media screen and (min-width: 868px) {
  .content {
    width: 70%;
    margin-left: 15%;
    height: 100%;
    overflow: scroll;
  }
  .Music_search {
    position: absolute;
    width: 150px;
    top: 20vh;
    z-index: 100;
  }
}
@media screen and (max-width: 868px) {
  .content {
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-top: 10px;
  }
  .Music_search {
    position: absolute;
    width: 150px;
    top: 35vh;
    z-index: 100;
  }
}
.content::-webkit-scrollbar {
  width: 0;
}

.Music_search_div {
  font-size: 1rem;
  width: 1.5rem;
  color: #ccc;
  text-align: center;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
}
.Music_search_div::before {
  position: absolute;
  left: 100%;
  top: calc(50% - 6px);
  border: 6px solid transparent;
  border-left: 6px solid #fff;
  content: "";
}
</style>
<template>
  <div class="labels">
    <div class="labels-one">
      <div class="labels-header">
        <div>
          <i class="iconfont icon-icon04" style="font-size: 15px"></i>
          <span style="font-size: 14px"> 分类</span>
        </div>
        <div>
          <a href="">更多</a>
        </div>
      </div>
      <div class="labels-content">
        <div style="border: 1px solid #ccc; border-bottom: 0px">
          <div
            @click="toSort(sort, sort.sort)"
            class="labels-content-detail"
            v-for="(sort, index) in Sorts"
            :key="index"
          >
            <span> {{ sort.sort }} </span>
            <div class="labels-content-detail-label">
              <span> {{ sort.num }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="labels-two">
      <div class="labels-header">
        <div>
          <i class="iconfont icon-24gl-tags4" style="font-size: 15px"></i>
          <span style="font-size: 14px"> 标签</span>
        </div>
        <div>
          <a href="">更多</a>
        </div>
      </div>
      <div class="labels-body">
        <span
          class="labels-title"
          v-for="(label, index) in Labels"
          :key="index"
          @click="toSort(label, label.label)"
          >{{ label.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Labels",
  computed: {
    Sorts() {
      return this.$store.state.Home.sorts;
    },
    Labels() {
      return this.$store.state.Home.labels;
    },
  },
  mounted() {
    this.$store.dispatch("getsorts");
    this.$store.dispatch("getlabels");
  },
  methods: {
    toSort(a, b) {
      this.$router.push({
        name: `Sort`,
        params: {
          detail: JSON.stringify(a),
          name: b,
        },
      });
    },
  },
};
</script>

<style>
@media screen and (min-width: 848px) {
  .labels {
    width: 25%;
  }

  .labels-header {
    height: 50px;
    width: 90%;
    padding: 0 5%;
    background-color: rgb(248, 248, 248);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: skyblue;
    border-radius: 10px 10px 0px 0px;
  }
  .labels-one {
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .labels-content {
    width: 90%;
    padding: 5% 5%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 10px 10px;
  }
  .labels-content-detail {
    display: flex;
    justify-content: space-between;
    padding: 5%;
    border-bottom: 1px solid #ccc;
  }
  .labels-content-detail span {
    font-size: 14px;
    line-height: 20px;
  }
  .labels-content-detail:hover {
    /* transition: 0.2s; */
    transition-duration: 0.2s;
    box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
  }
  .labels-content-detail-label {
    border: 1px solid skyblue;
    width: 40px;
    height: 20px;
    /* display: flex; */
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    vertical-align: center;
    position: relative;
  }
  .labels-content-detail-label::before {
    position: absolute;
    height: 0px;
    width: 0px;
    border: 7px solid transparent;
    border-right: 7px solid skyblue;
    top: 3px;
    right: 100%;
    content: "";
  }
  .labels-content-detail-label::after {
    position: absolute;
    height: 0px;
    width: 0px;
    border: 6px solid transparent;
    border-right: 6px solid #fff;
    top: 4px;
    right: 100%;
    content: "";
  }
  .labels-two {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 60px;
  }
  .labels-body {
    width: 90%;
    padding: 5% 5%;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0px 0px 10px 10px;
  }
  .labels-title {
    border: 1px solid #ccc;
    padding: 4px 10px 4px 10px;
    color: rgb(55, 146, 182);
    font-weight: bold;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .labels-title::before {
    position: absolute;
    height: 0px;
    width: 0px;
    border: 7px solid transparent;
    border-right: 7px solid #ccc;
    top: 5px;
    right: 100%;
    content: "";
  }
  .labels-title::after {
    position: absolute;
    height: 0px;
    width: 0px;
    border: 6px solid transparent;
    border-right: 6px solid #fff;
    top: 6px;
    right: 100%;
    content: "";
  }
  .labels-title:hover {
    /* transition: 0.2s; */
    transition-duration: 0.2s;
    box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
  }
}
@media screen and (max-width: 848px) {
  .labels {
    display: none;
  }
}
</style>
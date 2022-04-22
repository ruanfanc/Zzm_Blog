<template>
  <div>
    <el-carousel :interval="2000" :type="type" height="230px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
    <p class="title">推荐歌单</p>
    <div class="recommend-music">
      <div
        class="recommend-music-child"
        v-for="(item, index) in sheets"
        :key="index"
        @click="tosheet(item.id)"
      >
        <div class>热门音乐</div>
        <img :src="item.picUrl" alt />
        <p>{{ item.name }}}}</p>
        <i class="iconfont icon-bofang1 animate__animated animate__fadeIn"></i>
      </div>
    </div>
    <p class="title" style="margin-top: 50px">最新音乐</p>
    <div class="recommend-musics">
      <div
        class="single-music"
        v-for="(item, index) in songs"
        :key="index"
        @click="musicplay(item)"
      >
        <img :src="item.picUrl" alt />
        <i class="iconfont icon-bofang1 animate__animated animate__fadeIn single-icon"></i>
        <div class="single-music-div">
          <p>{{ item.name }}</p>
          <p>{{ item.song.artists[0].name }}</p>
        </div>
      </div>
    </div>
    <p class="title" style="margin-top: 50px">推荐MV</p>
    <div class="recommend-mv">
      <div class="single-mv" v-for="(item, index) in mvs" :key="index">
        <div style="position: relative">
          <img class="mv-img" :src="item.picUrl" alt />
          <i class="iconfont icon-bofang1 animate__animated animate__fadeIn mv-icon"></i>
        </div>

        <p>{{ item.name }}</p>
        <p>{{ item.artistName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqgetcarousel,
  reqgetsheets,
  reqgetsongs,
  reqgetmvs,
} from "@/api/music";
export default {
  name: "MusicHome",
  name: "Music",
  data() {
    return {
      banners: [],
      sheets: [],
      songs: [],
      mvs: [],
      type: "card",
    };
  },
  methods: {
    musicplay(i) {
      const music = {
        id: i.id,
        name: i.name,
        artist: i.song.artists[0].name,
        imgurl: i.picUrl,
        musicurl: "",
      };
      this.$store.dispatch("getmusic", music);
    },
    tosheet(a) {
      this.$router.push({
        name: "Sheet",
        query: {
          id: a,
        },
      });
    },
  },
  mounted() {
    if (window.innerWidth < 868) {
      this.type = "";
    }
    reqgetcarousel().then((value) => {
      this.banners = value.banners;
    });
    reqgetsheets().then((value) => {
      this.sheets = value.result;
    });
    reqgetsongs().then((value) => {
      this.songs = value.result;
    });
    reqgetmvs().then((value) => {
      this.mvs = value.result;
    });
  },
};
</script>

<style scoped>
@media screen and (min-width: 868px) {
  .single-music {
    width: 32%;
    height: 80px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    transition: all 0.3s linear 0s;
    position: relative;
  }
  .single-mv {
    position: relative;
    width: 24%;
  }
  .recommend-music-child {
    overflow: hidden;
    height: auto;
    width: 180px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 1.5rem;
    position: relative;
  }
}
@media screen and (max-width: 868px) {
  .single-music {
    width: 50%;
    height: 80px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    transition: all 0.3s linear 0s;
    position: relative;
  }
  .single-mv {
    position: relative;
    width: 48%;
  }
  .recommend-music-child {
    overflow: hidden;
    height: auto;
    width: 44%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 1.5rem;
    position: relative;
  }
}
.carousel-img {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  color: #fff;
  line-height: 2rem;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
}
.recommend-music {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.recommend-music-child div {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  top: -2rem;
  font-size: 0.9rem;
  position: absolute;
  transition: all 0.2s linear 0s;
}
.recommend-music-child img {
  width: 100%;
  aspect-ratio: 1/1;
}
.recommend-music-child p {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  overflow: hidden;
}
.recommend-music-child i {
  font-size: 2rem;
  position: absolute;
  right: 0.7rem;
  bottom: 2.5rem;
  color: #fff;
  background-color: red;
  border-radius: 100%;
  display: none;
}
.recommend-music-child:hover div {
  transition: all 0.2s linear 0s;
  display: inline;
  top: 0;
}
.recommend-music-child:hover i {
  display: inline;
}
.recommend-musics {
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.single-icon {
  position: absolute;
  font-size: 2rem;
  color: #fff;
  left: calc(30px - 1rem);
  background: red;
  border-radius: 50%;
  transition: all 0.3s linear 0s;
  display: none;
}
.single-music-div {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.single-music-div p:nth-child(1) {
  color: #fff;
  font-size: 1rem;
}
.single-music-div p:nth-child(2) {
  color: #ffafc0;
  font-size: 0.8rem;
}
.single-music img {
  height: 60px;
  margin-right: 10px;
}
.single-music:hover {
  background-color: #fff;
  transition: all 0.3s linear 0s;
}
.single-music:hover .single-icon {
  display: inline;
}
.recommend-mv {
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.mv-img {
  width: 100%;
}
.single-mv p {
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  line-height: 1.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  overflow: hidden;
}
.mv-icon {
  position: absolute;
  font-size: 2rem;
  color: #fff;
  left: calc(50% - 1rem);
  top: calc(50% - 1rem);
  background: red;
  border-radius: 50%;
  display: none;
}

.single-mv:hover .mv-icon {
  display: inline;
}
</style>
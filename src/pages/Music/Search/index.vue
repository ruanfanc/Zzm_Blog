<template>
  <div class="search">
    <div class="search-head">
      <i class="el-icon-arrow-left" @click="backtohome"></i>
      <h1>搜索 {{ searchName }}</h1>
    </div>
    <div class="search-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单曲" name="单曲">
          <div class="first-tags">
            <div></div>
            <div>单曲</div>
            <div>歌手</div>
            <div>专辑</div>
            <div>时长</div>
          </div>
          <div
            class="first-tags"
            v-for="(song, index) in musicList"
            :key="index"
            @click="addMusic(song)"
            :class="{ showbackcolor: index % 2 == 0 }"
          >
            <div>{{ index > 8 ? 10 : "0" + (index + 1) }}</div>
            <div>{{ song.name }}</div>
            <div>{{ song.ar[0].name }}</div>
            <div>{{ song.al.name }}</div>
            <div>{{ sec_to_time(song.dt / 1000) }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="歌单">
          <div
            class="h-20 w-full flex bg-white items-center justify-around odd:bg-gray-100 hover:bg-gray-300 duration-500"
            v-for="(i, index) in playlists"
            :key="index"
            @click="toSheet(i.id)"
          >
            <img class="w-16 h-16" :src="i.coverImgUrl" alt />
            <div class="w-2/5 text-base text-red-900 truncate">{{ i.name }}</div>
            <div class="w-2/12 text-gray-400 truncate">{{ i.trackCount }}首</div>
            <div class="w-1/12 text-gray-500 truncate text-xs">by {{ i.creator.nickname }}</div>
            <div class="w-1/12">
              <i class="el-icon-video-play text-gray-600 truncate">{{ i.playCount % 10000 }}万</i>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="歌手">角色管理</el-tab-pane>
        <el-tab-pane label="专辑" name="专辑">定时任务补偿</el-tab-pane>
      </el-tabs>
      <span>共{{ musicList.length }} 结果</span>
    </div>
  </div>
</template>

<script>
import { reqsearchmusic, reqgetsearchsheets } from "@/api/music";
export default {
  name: "musicSearch",
  data() {
    return {
      searchName: "",
      activeName: "单曲",
      musicList: [],
      playlists: [],
    };
  },
  methods: {
    async getmusicList() {
      const musicList = await reqsearchmusic(this.searchName);
      this.musicList = musicList.result.songs;
    },
    handleClick(a) {
      if (this.activeName == "歌单") {
        this.getsheets();
      }
    },
    sec_to_time(s) {
      let t = "";
      if (s > -1) {
        const hour = Math.floor(s / 3600);
        const min = Math.floor(s / 60) % 60;
        const sec = s % 60;
        if (hour < 10) {
          t = "0" + hour + "";
        } else {
          t = hour + "";
        }
        if (hour == 0) {
          t = "";
        }

        if (min < 10) {
          t += "0";
        }
        t += min + ":";
        if (sec < 10) {
          t += "0";
        }
        t += sec.toFixed(0);
      }
      return t;
    },
    addMusic(i) {
      const music = {
        id: i.id,
        name: i.name,
        artist: i.ar[0].name,
        imgurl: i.al.picUrl,
        musicurl: "",
      };
      this.$store.dispatch("getmusic", music);
    },
    backtohome() {
      this.$router.go(-1);
    },
    async getsheets() {
      const playlists = await reqgetsearchsheets(this.searchName);
      this.playlists = playlists.result.playlists;
    },
    toSheet(a) {
      this.$router.push({
        name: "Sheet",
        query: {
          id: a,
        },
      });
    },
  },
  mounted() {
    this.searchName = this.$route.query.id;
    this.getmusicList();
  },
};
</script>

<style>
.search {
  margin-top: 40px;
}

.search-head {
  display: flex;
  height: 2rem;
  margin-bottom: 20px;
}
.search-head i {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}
.search-head h1 {
  font-size: 20px;
}
.search-body {
  position: relative;
}
.search-body span {
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 1000;
  font-size: 20px;
}
.first-tags {
  /* margin-top: 10px; */
  height: 2.8rem;
  background-color: #fff;
  display: flex;
}
.first-tags div {
  font-size: 14px;
  line-height: 2.8rem;
  color: rgb(149, 147, 147);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.first-tags:hover {
  transition-duration: 0.2s;
  box-shadow: 0px 4px 7px 3px rgba(124, 124, 124, 0.3);
}

@media screen and (min-width: 868px) {
  .first-tags div:nth-child(1) {
    flex: 1;
    padding-left: 10px;
  }
  .first-tags div:nth-child(2) {
    flex: 10;
  }
}
@media screen and (max-width: 868px) {
  .first-tags div:nth-child(1) {
    display: none;
  }
  .first-tags div:nth-child(2) {
    flex: 10;
    padding-left: 10px;
  }
}

.first-tags div:nth-child(3) {
  flex: 7;
}
.first-tags div:nth-child(4) {
  flex: 8;
}
.first-tags div:nth-child(5) {
  flex: 3;
}
.showbackcolor {
  background-color: rgb(249, 249, 249);
}
</style>
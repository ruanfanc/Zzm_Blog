<template>
  <div class="w-full h-full">
    <div class="w-full flex">
      <img
        class="xl:w-52 w-36"
        src="https://p1.music.126.net/O7rzcGcI5VmE2BWxuJYrlg==/109951164605001138.jpg"
        alt
      />
      <div class="flex-grow flex flex-col ml-2 justify-between overflow-hidden">
        <div class>
          <p class="text-2xl text-red-600 font-semibold truncate">{{playlists.name}}</p>
          <div class="mt-2 text-gray-300 flex items-center">
            <img class="w-8 rounded-full mr-1" :src="playlists.creator.avatarUrl" alt />
            {{playlists.creator.nickname}} 2021-09-14创建
          </div>
        </div>
        <div class="text-sm text-purple-300">
          <p class="truncate">标签：{{playlists.tags}}</p>
          <p
            class="truncate"
          >歌曲：{{playlists.trackCount}} 播放：{{Math.floor(playlists.playCount/10000) + '万'}}</p>
          <p class="truncate">简介：{{playlists.description}}</p>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌手" name="歌手">
          <div class="flex h-8 items-center text-gray-700 bg-white">
            <div class="flex-1 leading-loose"></div>
            <span class="flex-10 center">标题</span>
            <div class="flex-6 center">歌手</div>
            <div class="flex-6 center">专辑</div>
            <div class="flex-2 center">时间</div>
          </div>
          <div
            class="flex h-10 items-center text-gray-900 bg-white hover:bg-gray-300"
            v-for="i in playlists.tracks"
            :key="i.id"
            @click="addMusic(i)"
          >
            <div class="flex-1"></div>
            <span class="flex-10 song">{{i.name}}</span>
            <div class="flex-6 song">{{i.ar[0].name}}</div>
            <div class="flex-6 song">{{i.al.name}}</div>
            <div class="flex-2 song">{{sec_to_time(i.dt/1000)}}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="评论">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reqgetsheetdetails } from "@/api/music";
export default {
  name: "Sheet",
  data() {
    return {
      activeName: "歌手",
      playlists: [],
    };
  },
  methods: {
    handleClick() {},
    async getsheetdetails() {
      const playlists = await reqgetsheetdetails(this.$route.query.id);
      this.playlists = playlists.playlist;
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
  },
  mounted() {
    // reqgetsheetdetails(this.$route.query.id).then((a) => console.log(a));
    this.getsheetdetails();
  },
};
</script>

<style>
.border {
  @apply border-2 border-black border-solid;
}

.center {
  @apply text-xs h-full hover:bg-gray-300;
  line-height: 2.5rem;
}
.song {
  @apply text-sm h-full truncate;
  line-height: 2.5rem;
}
</style>
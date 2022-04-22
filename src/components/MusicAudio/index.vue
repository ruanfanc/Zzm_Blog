<template>
  <div class="MusicAudio">
    <img class="Audio-img" :src="nowPlayMusic.imgurl" alt="" />
    <div class="Audio-select" v-show="!showAudio" @click="toshowAudio">
      <i class="el-icon-caret-right iconright"></i>
    </div>
    <div class="Audio-content" v-show="showAudio">
      <div class="Audio-detail">
        <div>
          <span>{{ nowPlayMusic.name }}</span>
          <span>{{ nowPlayMusic.artist }}</span>
        </div>

        <div class="Audio-itols">
          <i class="el-icon-message-solid" @click="isvoice = !isvoice"></i>
          <div class="voice" v-show="isvoice">
            <el-slider
              v-model="value2"
              :show-tooltip="false"
              max.number="100"
              vertical
              @input="changevoice"
              height="40px"
            >
            </el-slider>
          </div>
          <i class="el-icon-caret-left" @click="changeIndex(-1)"></i>
          <i class="el-icon-video-play" v-show="!isplay" @click="musicPlay"></i>
          <i class="el-icon-video-pause" v-show="isplay" @click="musicPlay"></i>
          <i class="el-icon-caret-right" @click="changeIndex(1)"></i>
          <i class="el-icon-s-operation"></i>
          <i class="el-icon-set-up"></i>
        </div>
      </div>
      <div class="slider">
        <el-slider
          v-model="value1"
          :max="maxtime"
          input-size="large"
          :show-tooltip="false"
          @change="changetime"
        ></el-slider>
      </div>
      <div class="Audio-time">{{ current }}/{{ duration }}</div>
    </div>
    <div class="Audio-select-left" v-show="showAudio" @click="hideAudio">
      <i class="el-icon-caret-left iconright"></i>
    </div>
    <audio
      @canplay="getDuration"
      @timeupdate="updateTime"
      ref="Music"
      :src="musicUrl"
    ></audio>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "MusicAudio",
  data() {
    return {
      value1: 0,
      value2: 100,
      showAudio: false,
      maxtime: 0,
      isplay: false,
      Music: null,
      musicUrl: "",
      isvoice: false,
      current: "00:00",
      duration: "00:00",
      musicIndex: 0,
    };
  },
  computed: {
    musicList() {
      return this.$store.state.Music.musicList;
    },
    nowPlayMusic() {
      return this.musicList[this.musicIndex]
        ? this.musicList[this.musicIndex]
        : {
            artist: "majiko",
            id: 1937626350,
            imgurl:
              "http://p1.music.126.net/Oh9XIqUvSpI3aRHb7TQEmw==/109951167284690970.jpg",
            musicurl:
              "http://m701.music.126.net/20220413171324/05d0e6b48c9b48a2311bf5504b274efb/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/13923195902/1d48/5cd2/8c36/2c970e1c7c1813ea08ca1ebe222e6c02.mp3",
            name: "劫火のエトワール",
          };
    },
  },
  watch: {
    nowPlayMusic: {
      handler(newVal, oldVal) {
        this.$refs.Music.src = newVal.musicurl;
        this.$refs.Music.play();
        this.isplay = true;
      },
    },
    Music: {
      handler(newName, oldName) {},
      deep: true,
    },
    musicList: {
      handler(newVal, oldVal) {
        this.musicIndex = newVal.length - 1;
      },
    },
  },
  methods: {
    toshowAudio() {
      this.showAudio = true;
    },
    hideAudio() {
      this.showAudio = false;
    },
    musicPlay() {
      this.isplay = !this.isplay;
      if (this.isplay == true) {
        this.$refs.Music.play();
      } else {
        this.$refs.Music.pause();
      }
    },
    getDuration() {
      const duration = this.$refs.Music.duration;
      this.maxtime = Math.floor(duration);
      this.duration = this.sec_to_time(duration);
    },
    changetime(e) {
      this.$refs.Music.currentTime = e;
    },
    updateTime(e) {},
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
    changevoice(v) {
      this.$refs.Music.volume = v / 100;
    },
    changeIndex() {},
  },
  mounted() {
    this.$nextTick(() => {
      this.updateTime = _.throttle((e) => {
        this.current = this.sec_to_time(e.target.currentTime); //获取audio当前播放时间
        this.value1 = Math.floor(e.target.currentTime);
      }, 1000);
      this.changeIndex = _.throttle((a) => {
        const Index = this.musicIndex + a;
        if (Index < 0 || Index >= this.musicList.length) {
          return;
        } else {
          this.musicIndex = Index;
        }
      }, 500);
    });
  },
};
</script>

<style scoped>
.MusicAudio {
  display: flex;
  height: 60px;
  position: fixed;
  bottom: 20px;
  z-index: 99999;
}
.Audio-img {
  width: 60px;
}
.Audio-select {
  height: 100%;
  background-color: #ccc;
}
.iconright {
  font-size: 1.5rem;
  line-height: 60px;
  text-align: center;
  margin-left: -5px;
  width: 20px;
}
.Audio-content {
  height: 100%;
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
  background-color: #fff;
  animation: linear move 0.2s;
  z-index: -1;
}
.Audio-select-left {
  position: relative;
  height: 100%;
  z-index: -1;
  animation: move 0.2s linear;
  background-color: #ccc;
}
.slider {
  margin-top: calc(60px - 4rem + 5px);
  width: 180px;
  height: 30px;
}
.Audio-detail {
  display: flex;
}
.Audio-detail div:nth-child(1) {
  display: flex;
  flex-direction: column;
  max-width: 100px;
}
.Audio-detail div:nth-child(1) span:nth-child(1) {
  width: 100%;
  font-size: 14px;
  max-width: 100px;
  padding-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Audio-detail div:nth-child(1) span:nth-child(2) {
  font-size: 12px;
  height: 20px;
  margin-top: -4px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ccc;
}
.Audio-itols {
  width: 170px;
  height: 30px;
  margin-top: 8px;
  margin-left: 20px;
  display: flex;
  position: relative;
  justify-content: space-between;
}
.voice {
  position: absolute;
  left: -0.5rem;
  bottom: 2rem;
}
.Audio-itols i {
  line-height: 30px;
  font-size: 1.4rem;
  color: rgb(103, 103, 103);
}
.Audio-itols i:hover {
  color: rgb(187, 96, 96);
}

.Audio-time {
  height: 1rem;
  position: absolute;
  bottom: 4px;
  right: 10px;
  color: #ccc;
}
@keyframes move {
  0% {
    left: -100%;
  }
  to {
    left: 0;
  }
}
@-webkit-keyframes move {
  0% {
    left: -100%;
  }
  to {
    left: 0;
  }
}
@-ms-keyframes move {
  0% {
    left: -100%;
  }
  to {
    left: 0;
  }
}
</style>
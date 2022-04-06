<template>
  <div class="NavMenu animate__animated animate__fadeIn">
    <div class="Navimg">
      <div class="NavItol" @click="toSearch">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索</span>
      </div>
      <div class="NavItol" @click="toHome">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </div>
      <div class="NavItol" @click="toMusic">
        <i class="iconfont icon-weibiaoti--"></i>
        <span>音乐盒</span>
      </div>
      <div class="NavItol" @click="toSort">
        <i class="iconfont icon-rizhi"></i>
        <span>分类</span>
      </div>
      <div class="NavItol" @click="toDateIndex">
        <i class="iconfont icon-wenzhangfenlei"></i>
        <span>归档</span>
      </div>
      <div class="NavItol" @click="toLeaveWord">
        <i class="iconfont icon-tiaozhuanliuyanqiang"></i>
        <span>留言墙</span>
      </div>
      <div class="NavItol toSort" style="margin-right: 10px">
        <i class="iconfont icon-guanliyuan_jiaoseguanli"></i>
        <span>关于我</span>
        <div class="Sorts">
          <span @click="toAbout">我的简介</span>
          <span @click="toArticle">管理员登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
export default {
  name: "Navmenu",
  methods: {
    toHome() {
      this.$router.push({
        name: "Home",
      });
    },
    // 去分类页面
    toSort() {
      this.$router.push({
        name: "Sort",
      });
    },
    toMusic() {
      this.$router.push({
        name: "Music",
      });
    },
    toDateIndex() {
      this.$router.push({
        name: "DateIndex",
      });
    },
    toSearch() {
      this.$router.push({
        name: "Search",
      });
    },
    toLeaveWord() {
      this.$router.push({
        name: "LeaveWord",
      });
    },
    async toArticle() {
      if (sessionStorage.getItem("token")) {
        this.$router.push({
          path: "/Article/ListArticle",
        });
      } else {
        this.$prompt("请输入管理员密码", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /[0-9]/,
          inputErrorMessage: "密码格式不正确",
        })
          .then(async ({ value }) => {
            const response = await login({ password: value });
            if (response.status == 200) {
              const token = response.token;
              console.log(token);
              sessionStorage.setItem("token", token);
            } else {
              this.$message({
                type: "ingo",
                message: "密码错误",
              });
              reject();
            }
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "登录成功",
            });
            this.$router.push({
              path: "/Article/ListArticle",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }
    },
    toAbout() {
      this.$router.push({
        name: "About",
      });
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 868px) {
  .NavMenu {
    display: fixed;
    position: absolute;
    width: 100%;
    z-index: 999;
  }

  .Navimg {
    display: flex;
    float: right;
    padding-top: 10px;
  }
  .NavItol {
    margin-left: 30px;
    display: flex;
    align-items: center;
    color: rgb(4, 116, 136);
    font-weight: 500;
    font-size: 14px;
    position: relative;
  }
  .NavItol i {
    font-size: 20px;
  }
  .NavItol:hover:after {
    opacity: 1;
    transform: translate(-50%) scaleX(1);
  }
  .NavItol:hover {
    cursor: pointer;
  }
  .NavItol:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 100%;
    opacity: 0;
    border-bottom: 3px solid #646464;
    transform: translate(-50%) scaleX(0);
    transition: 0.2s ease-in-out;
  }
  .toSort {
    position: relative;
  }
  .Sorts {
    width: 100px;
    right: -0px;
    height: 80px;
    position: absolute;
    top: 23px;
    background-color: #fff;
    display: none;
    flex-direction: column;
    align-items: center;
  }
  .Sorts span {
    color: rgb(158, 152, 152);
    font-size: 16px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    height: 40px;
  }
  .toSort:hover .Sorts {
    display: flex;
  }
  .Sorts span:hover {
    transition-duration: 0.4s;
    background-color: skyblue;
  }
}
@media screen and (max-width: 868px) {
  .NavMenu {
    display: fixed;
    position: absolute;
    width: 100%;
    z-index: 999;
  }
  .Navimg {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    z-index: 1000;
    padding-top: 10px;
  }
  .NavItol {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(4, 116, 136);
    font-weight: 500;
    font-size: 14px;
    z-index: 99999999;
  }
  .NavItol i {
    font-size: 20px;
  }
  .NavItol:hover:after {
    opacity: 1;
    transform: translate(-50%) scaleX(1);
  }
  .NavItol:hover {
    cursor: pointer;
  }
  .NavItol:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 100%;
    opacity: 0;
    border-bottom: 3px solid #646464;
    transform: translate(-50%) scaleX(0);
    transition: 0.2s ease-in-out;
  }
  .toSort {
    position: relative;
  }
  .Sorts {
    width: 100px;
    right: -0px;
    height: 80px;
    position: absolute;
    top: 23px;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    display: none;
  }
  .Sorts span {
    color: rgb(158, 152, 152);
    font-size: 16px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    height: 40px;
  }
  .toSort:hover .Sorts {
    display: flex;
  }
  .Sorts span:hover {
    transition-duration: 0.4s;
    background-color: skyblue;
  }
}
</style>
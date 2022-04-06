<template>
  <div class="FooterNav">
    <p>© 2022 - 2023 By Mengmeng</p>
    <p>琼ICP备2022002687号</p>
    <p>联系方式：q1151419453</p>
  </div>
</template>

<script>
export default {
  name: "footerNva",
};
</script>

<style>
.FooterNav {
  width: 94%;
  margin-left: 3%;
  height: 150px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;
  background-size: 400% 400%;
}
.FooterNav p:nth-child(1) {
  margin-top: 50px;
}
.FooterNav p {
  font-size: 14px;
  width: 100%;
  line-height: 22px;
  text-align: center;
  color: #ccc;
  font-weight: 400;
}
@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
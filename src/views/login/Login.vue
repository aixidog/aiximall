<template>
  <div id="login">
    <nav-bar class="home-nav">
      <div slot="left" class="backClick" @click="backClick"></div>
      <div slot="center">登陆账号</div>
    </nav-bar>
    <login-from></login-from>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";

import LoginFrom from "./childComps/LoginFrom";

export default {
  name: "Login",
  components: {
    NavBar,
    LoginFrom,
  },
  methods: {
    backClick() {
      this.$router.replace("/profile");
    },
  },
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 999;
  box-shadow: 0 1px 1px #ff8198;
}
.backClick {
  position: relative;
  top: calc(50% - 8px);
  left: 15px;
  height: 14px;
  width: 14px;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  transform: rotate(45deg);
}
</style>
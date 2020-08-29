<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="user-icon">
        <img :src="userInfo.avatar" alt />
      </div>
      <div class="login-info">
        <div class="user-name" @click="loginClick">{{userInfo.user}}</div>
        <div class="phone">
          <span>
            <img src="@/assets/img/profile/phone.png" alt />
          </span>
          <div class="phone-num">{{userInfo.phe}}</div>
        </div>
      </div>
      <span class="right"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: this.$store.state.userInfo,
    };
  },
  methods: {
    loginClick() {
      this.$router.push("/login");
      // this.userInfo = this.$store.state.userInfo;
      console.log(this.$store.state.userInfo);
    },
  },
};
</script>

<style scoped>
#user-info {
  position: relative;
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}
.user-icon {
  float: left;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;
}
.user-icon img {
  width: 100%;
}
.login-info {
  color: #fff;
  float: left;
}
.user-name {
  margin: 5px 10px;
}
.phone {
  width: 200px;
  margin: 5px 5px;
}
.phone > span > img {
  float: left;
  width: 20px;
}
.right {
  position: absolute;
  top: 40%;
  right: 8%;
  width: 10px;
  height: 10px;
  background-color: var(--color-tint);
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
}
</style>

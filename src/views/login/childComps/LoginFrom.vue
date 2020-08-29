<template>
  <div id="login-from">
    <input type="text" placeholder="名称/邮箱/手机号" v-model="userName" />
    <input type="password" placeholder="密码" v-model="userPassword" />
    <button class="login-button" @click="login">登陆</button>
    <div class="login-bottom">
      <span class="forget-psw">忘记密码</span>
      <span class="registered">用户注册</span>
    </div>
  </div>
</template>
<script>
import { userLogin } from "@/network/profile";
export default {
  name: "LoginFrom",
  data() {
    return {
      userName: "",
      userPassword: "",
    };
  },
  methods: {
    login() {
      // this.$store.state.userInfo = {
      //   avatar: "@/assets/img/profile/avatar.png",
      //   userName: "登asd",
      //   phone: "暂无asdas",
      // };
      userLogin(
        `type=login&user=${this.userName}&pwd=${this.userPassword}`
      ).then((res) => {
        if (res.data == "error") {
          this.$toast.show(`账号/密码有误`);
        } else {
          this.$router.replace("/home");
          this.$toast.show(`${this.userName}  登陆成功`);
          for (let k in res.data) {
            if (k != "pwd") {
              this.$store.state.userInfo[k] = res.data[k];
            }
          }
        }
      });
      // getProfileUser().then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>
<style scoped>
#login-from {
  position: relative;
  margin-top: 2px;
  padding-top: 15px;
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #f6f6f6;
  z-index: 100;
}
input {
  width: 100%;
  padding: 15px;
  border: 1px solid #f6f6f6;
}
.login-button {
  width: calc(100vw - 30px);
  height: 7vh;
  margin: 15px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  background-color: #ff8198;
}
.forget-psw {
  float: left;
  margin-left: 15px;
  color: #ff8198;
}
.registered {
  float: right;
  margin-right: 15px;
  color: #ff8198;
}
</style>
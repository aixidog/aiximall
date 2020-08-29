<template>
  <div id="toast" v-show="isShow">
    <div>{{massage}}</div>
  </div>
</template>
<script>
import { debounce } from "@/common/utils";
export default {
  name: "Toast",
  data() {
    return {
      massage: "",
      isShow: false,
      flag: true,
    };
  },
  methods: {
    show(content, duration = 1200) {
      this.massage = content;
      this.isShow = true;
      if (this.flag) {
        this.flag = false;
        setTimeout(() => {
          this.massage = "";
          this.isShow = false;
          this.flag = true;
        }, duration);
      }
    },
  },
};
</script>
<style scoped>
#toast {
  position: fixed;
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%);
  padding: 12px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 999;
}
</style>
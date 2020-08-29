<template>
  <div>
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="titles">
        <div
          v-for="(item,index) in titles"
          :key="index"
          :class="{active:index===currentIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  props: {
    current: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("detailClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.detail-nav {
  z-index: 15;
}
.titles {
  display: flex;
  font-size: 16px;
}
.titles > div {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back > img {
  margin-top: 11px;
}
</style>
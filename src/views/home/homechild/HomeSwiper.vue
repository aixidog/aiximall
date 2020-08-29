<template>
  <swiper :key="num">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <!-- <a :href="item.link"> -->
      <img :src="item.image" alt @load="imgageLoad" />
      <!-- </a> -->
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.num++;
    });
  },

  methods: {
    imgageLoad() {
      this.$emit("swiperLoad");
    },
  },
};
</script>
<style scoped>
</style>
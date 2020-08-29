<template>
  <scroll class="content" ref="scroll" :probe-type="3">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  data() {
    return {
      cartList: [],
    };
  },
  created() {
    this.cartList = this.$store.state.cartList;
  },
};
</script>

<style scoped>
.content {
  height: calc(100vh - 144px);
  overflow: hidden;
}
</style>

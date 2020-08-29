<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.reduce(
        (pre, item) => pre + item.count,
        0
      );
    },
  },
  // 可以使用辅助函数mapGetters
  // import {mapGetters} from 'vuex'
  // ...mapGetters(['name'])
};
</script>

<style scoped>
.cart-nav {
  position: relative;
  top: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 999;
  box-shadow: 0 1px 1px #ff8198;
}
</style>

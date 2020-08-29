<template>
  <div class="bottom-menu">
    <check-button class="check-bottom" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></check-button>
    <span>全选</span>
    <div class="total-price">合计： {{totalPrice}}</div>
    <div class="check-length">去计算： {{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => item.checked)
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList
        .filter((item) => item.checked)
        .reduce((pre, item) => pre + item.count, 0);
    },
    isSelectAll() {
      return !this.$store.state.cartList.some((item) => !item.checked);
    },
  },
  updated() {
    console.log(
      this.$store.state.cartList
        .filter((item) => item.checked)
        .reduce((pre, item) => pre + item.count, 0)
    );
  },
  methods: {
    checkBtnClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.map((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.map((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-menu {
  display: flex;
  position: fixed;
  width: 100%;
  height: 44px;
  bottom: 47px;
  left: 0;
  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .check-bottom {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 10vw;
  font-size: 16px;
  color: #666;
}
.check-length {
  margin-left: auto;
  padding: 0 12px;
  background-color: orangered;
  color: #fff;
}
</style>

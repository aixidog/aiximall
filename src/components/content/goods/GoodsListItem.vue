<template>
  <div class="goods-list-item" @click="itemClcik">
    <img v-lazy="showImage" @load="imageLoad" />
    <div>
      <p>{{goodsItem.title}}</p>
      <span class="goods-list-item-price">{{goodsItem.price}}</span>
      <span class="goods-list-item-cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("imageLoad");
    },
    itemClcik() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  flex: 34%;
  position: relative;
  margin-left: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
}
.goods-list-item > img {
  width: 100%;
  border-radius: 6px;
}
.goods-list-item p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.goods-list-item-price {
  color: #ff789a;
  margin-right: 15px;
}
.goods-list-item-cfav {
  font-size: 12px;
}
.goods-list-item-cfav::before {
  content: "";
  display: inline-block;
  margin-top: 1px;
  margin-right: 1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
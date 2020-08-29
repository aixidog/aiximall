<template>
  <category-view>
    <goods-list-item v-for="(item,index) in categoryDetail" :key="index" :goodsItem="item"></goods-list-item>
  </category-view>
</template>
<script>
import CategoryView from "@/components/common/categoryView/CategoryView";
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "categoryContent",
  components: {
    CategoryView,
    GoodsListItem,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  updated() {
    console.log(this.categoryDetail);
  },
};
</script>
<style scoped>
</style>
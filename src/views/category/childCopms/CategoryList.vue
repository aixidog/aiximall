<template>
  <category-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <!-- <a :href="item.link"> -->
      <img class="item-img" :src="item.image" alt />
      <div class="item-text">{{item.title}}</div>
      <!-- </a> -->
    </div>
  </category-view>
</template>
<script>
import CategoryView from "@/components/common/categoryView/CategoryView";
export default {
  name: "CategoryList",
  components: {
    CategoryView,
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.panel img {
  width: 100%;
}

.item {
  width: 33%;
  padding: 20px 8px 0;
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
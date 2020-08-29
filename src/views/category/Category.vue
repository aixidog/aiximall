<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category-content">
      <category-menu :categories="categories" @selectItem="selectItem"></category-menu>
      <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="3">
        <category-list :subcategories="showSubcategory"></category-list>
        <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
        <category-content :category-detail="showCategoryDetail"></category-content>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";

import CategoryList from ".//childCopms/CategoryList";
import CategoryMenu from "./childCopms/CategoryMenu.vue";
import CategoryContent from "./childCopms/CategoryContent";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";
import { debounce } from "@/common/utils";
export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabControl,
    CategoryMenu,
    CategoryList,
    CategoryContent,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },
  created() {
    this._getCategory();
  },
  mounted() {
    //图片加载监听
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.$bus.$on("imageLoad", () => {
      refresh();
    });
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ].data;
    },
  },
  methods: {
    scroll(position) {},
    //获取相关数据
    _getCategory() {
      getCategory().then((res) => {
        this.categories = res.data.data.category.list;
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        //请求第一个分类的数据
        this._getSubcategory(0);
      });
    },
    _getSubcategory(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    selectItem(index) {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, 0, 10);
      this._getSubcategory(index);
    },
  },
};
</script>

<style scoped>
.category-nav {
  position: fixed;
  top: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 999;
  box-shadow: 0 1px 1px #ff8198;
}
.category-content {
  display: flex;
  margin-top: 44px;
  height: calc(100vh - 100px);
}
.content {
  flex: 1;
  overflow: hidden;
}
</style>

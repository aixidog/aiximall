<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      :class="{boA:isTabFixed,boB:!isTabFixed}"
      @tabClick="tabClick"
      ref="tabControlFixed"
      class="tab-control-fixed"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="scroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperLoad.once="swiperLoad" />
      <home-recommend :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新款','精选']"
        :class="{boA:isTabFixed,boB:!isTabFixed}"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//公共模块
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

//子模块
import HomeSwiper from "./homechild/HomeSwiper";
import HomeRecommend from "./homechild/HomeRecommend";
import FeatureView from "./homechild/FeatureView";

// 信息模块
import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { debounce } from "@/common/utils";
import { backTopMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    //公共模块
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    //子模块
    HomeSwiper,
    HomeRecommend,
    FeatureView,
  },
  mixins: [backTopMixin],
  data() {
    return {
      flag: false,
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },

      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      scrollY: [],
    };
  },

  created() {
    //请求更多数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
  },
  mounted() {
    //图片加载监听
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.$bus.$on("imageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.refresh();
    this.$refs.scroll.refresh();
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    this.$refs.scroll.refresh();
    this.$refs.scroll.refresh();
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //事件监听相关
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
        default:
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlFixed.currentIndex = index;
      //页面切换保持原有位置
      if (this.scrollY[index] < -this.tabOffsetTop) {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, this.scrollY[index], 10);
      } else {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 10);
        this.scrollY[index] = -this.tabOffsetTop;
      }
    },
    //backtop组件
    scroll(position) {
      this.isShowBackTop = position.y < -1000;
      this.scrollY[this.$refs.tabControl.currentIndex] = position.y;
      this.isTabFixed = position.y < -this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    //网络请求相关
    //更多data请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    //货品data请求
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((res) => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          return new Promise((resovle) => {
            setTimeout(() => {
              resovle();
            }, 200);
          });
        })
        .then(() => {
          this.$refs.scroll.finishPullUp();
        });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.tab-control-fixed {
  position: fixed;
  top: 44px;
}
.home-nav {
  position: fixed;
  top: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 999;
  box-shadow: 0 1px 1px #ff8198;
}
.content {
  height: calc(100vh - 100px);
  overflow: hidden;
}
</style>

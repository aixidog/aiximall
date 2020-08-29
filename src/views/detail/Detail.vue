<template>
  <div id="detail">
    <detail-nav-bar @detailClick="detailClick" :current="currentIndex" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages" ref="shop"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageload"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" class="back-top"></back-top>
  </div>
</template>
<script>
import Scroll from "@/components/common/scroll/Scroll";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "@/components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import { backTopMixin } from "@/common/mixin";
export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      scrollY: [],
      currentIndex: 0,
    };
  },
  created() {
    // 获取iid
    this.iid = this.$route.params.iid;
    // 请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // topImages数据获取
      this.topImages = res.data.result.itemInfo.topImages;
      // goods数据获取
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // shop数据获取
      this.shop = new Shop(data.shopInfo);
      // detailInfo数据获取
      this.detailInfo = data.detailInfo;
      // paramInfo数据获取
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //commentInfo数据获取
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });
  },
  methods: {
    scroll(position) {
      this.isShowBackTop = position.y < -1000;
      for (let i = this.scrollY.length - 1; i >= 0; i--) {
        if (position.y <= -this.scrollY[i] && this.currentIndex !== i) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
        if (position.y <= -this.scrollY[i]) {
          break;
        }
      }
    },
    detailClick(index) {
      this.$refs.scroll.scrollTo(0, -this.scrollY[index], 1000);
    },
    imageload() {
      this.$refs.scroll.refresh();
      // this.scrollY.push(this.$refs.shop.$el.offsetTop);
      // this.scrollY.push(this.$refs.param.$el.offsetTop);
      // this.scrollY.push(this.$refs.comment.$el.offsetTop);
      // this.scrollY.push(this.$refs.recommend.$el.offsetTop);
      this.scrollY[0] = this.$refs.shop.$el.offsetTop;
      this.scrollY[1] = this.$refs.param.$el.offsetTop;
      this.scrollY[2] = this.$refs.comment.$el.offsetTop;
      this.scrollY[3] = this.$refs.recommend.$el.offsetTop;
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store
        .dispatch("addCart", product)
        .then((res) => this.$toast.show(res));
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 10;
}
.back-top {
  bottom: 54px;
}
.content {
  height: calc(100vh - 99px);
  overflow: hidden;
}
</style>
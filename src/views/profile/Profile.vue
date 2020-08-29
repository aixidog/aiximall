<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  components: {
    UserInfo,
    ListView,
    NavBar,
  },
  data() {
    return {
      orderList: [
        {
          png: "http://112.124.22.145/api/static/images/profile/message.png",
          info: "我的消息",
        },
        {
          png: "http://112.124.22.145/api/static/images/profile/pointer.png",
          info: "积分商城",
        },
        {
          png: "http://112.124.22.145/api/static/images/profile/vip.png",
          info: "会员卡",
        },
      ],
      serviceList: [
        {
          png: "http://112.124.22.145/api/static/images/profile/cart.png",
          info: "我的购物车",
        },
        {
          png: "http://112.124.22.145/api/static/images/profile/app.png",
          info: "下载购物APP",
        },
      ],
    };
  },
};
</script>

<style scoped>
.text {
  width: 100%;
  height: 100px;
}
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 999;
  box-shadow: 0 1px 1px #ff8198;
}

.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>

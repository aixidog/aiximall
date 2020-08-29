<template>
  <div class="base-info" v-if="Object.keys(goods).length!==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.info-title {
  margin: 18px 8px;
  font-size: 18px;
  text-indent: 1em;
  color: black;
}
.info-price {
  margin: 0 8px;
  position: relative;
}
.n-price {
  color: #ff8198;
  font-size: 22px;
}
.o-price {
  font-size: 14px;
  color: #afb1b3;
  text-decoration: line-through;
  padding: 0 5px;
}
.discount {
  position: absolute;
  padding: 2px 5px;
  font-size: 14px;
  color: #fff;
  border-radius: 16px;
  background-color: #ff8198;
}
.info-other {
  display: flex;
  padding: 15px 8px 8px;
  font-size: 14px;
  color: #afb1b3;
  border-bottom: 1px solid #f8f8f8;
}
.info-other > span {
  flex: 1;
}
.info-other > span:nth-child(2) {
  text-align: center;
}
.info-other > span:nth-child(3) {
  text-align: right;
}
.info-service {
  display: flex;
  padding: 20px 8px;
  font-size: 14px;
  color: #222;
  border-bottom: 5px solid #f2f4f8;
}
.info-service > span {
  flex: 1;
}
.info-service > span:nth-child(2) {
  text-align: center;
}
.info-service > span:nth-child(3) {
  text-align: right;
}
.info-service-item > img {
  width: 16px;
  vertical-align: text-top;
}
</style>
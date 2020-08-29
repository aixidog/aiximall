<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <img :src="item.png" class="png" />
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}

#list .item {
  position: relative;
  height: 44px;
  line-height: 44px;
  /* overflow: hidden; */
}
.png {
  float: left;
  width: 18px;
  height: 18px;
  margin: 11px;
}
.item:last-of-type .info {
  float: left;
  border-bottom: none;
}
</style>

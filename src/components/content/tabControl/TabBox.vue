<template>
  <div class="tab-box">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBox",
};
</script>
<style scoped>
.tab-box {
  height: 40px;
}
</style>
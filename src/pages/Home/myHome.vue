<template>
  <div class="container">
    <!-- 导航栏 -->
    <top-nav></top-nav>

    <!-- 轮播图 -->
    <my-banner></my-banner>

    <!-- 推荐栏 -->
    <recommend-bar></recommend-bar>

    <!-- 功能栏 -->
    <tab-bar></tab-bar>
    <tab-bar></tab-bar>
    <tab-bar></tab-bar>

    <!-- 触底提示 -->
    <bottom-tip></bottom-tip>
  </div>
</template>

<script>
import topNav from './topNav/topNav.vue'
import myBanner from './banner/myBanner.vue';
import recommendBar from './recommendBar/recommendBar.vue'
import tabBar from './tabBar/tabBar.vue'
export default {
  components: { topNav, myBanner, recommendBar, tabBar },

}
</script>

<style type="text/css" lang="less" scoped>
.container {
  padding: 0 .2rem;
}
</style>
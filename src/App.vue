<template>
  <router-view></router-view>
  <!-- 底部音乐栏 -->
  <bottom-bar></bottom-bar>
  <!-- 错误弹窗 -->
  <notify></notify>
</template>

<script>
import bottomBar from '@/pages/BottomBar/BottomBar.vue'
export default {
  components:{bottomBar}
}
</script>

<style lang="less" scoped>
</style>

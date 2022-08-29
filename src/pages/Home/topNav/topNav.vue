<template>
  <!-- 导航栏 -->
  <div class="tap-nav">
    <div class="userInfo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-qita"></use>
      </svg>
    </div>
    <div class="tapInfo">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="search">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const searchValue = ref('');
    return {
      searchValue,
    };
  },
}
</script>

<style lang="less" scoped>
  // 导航栏
  .tap-nav {
    height: 1rem;
    line-height: 1rem;
    font-size: .35rem;
    display: flex;
    justify-content: space-around;
    border-bottom:1px solid #dedede ;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: white;
    width: 100%;
    .icon {
      width: .5rem;
      height: .5rem;
      vertical-align: middle;
      fill: currentColor;
      overflow: hidden;
      padding: 0 .2rem;
    }

    .tapInfo {
      flex: 1;
      text-align: center;

      span {
        line-height: .5rem;
        margin: .2rem;
      }

      .active {
        font-weight: bold;
        font-size: .4rem;
      }
    }
  }

</style>
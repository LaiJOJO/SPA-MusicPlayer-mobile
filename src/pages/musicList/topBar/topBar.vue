<template>
  <div class="top-bar">
    <!-- 顶部导航 -->
    <div class="top-nav">
      <img :src="playlist?.coverImgUrl || ''" alt="">
      <span class="left"><svg class="icon svg-space" aria-hidden="true" @click="back">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        歌单
      </span>
      <span class="right">
        <svg class="icon svg-space" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qita"></use>
        </svg>
      </span>
    </div>
    <!-- 图片描述详情 -->
    <div class="mid-bar">
      <div class="left">
        <img :src="playlist?.coverImgUrl || ''" alt="">
      </div>
      <div class="right">
        <h2>{{ playlist?.name || '' }}</h2>
        <span class="name">
          <img :src="playlist?.creator?.avatarUrl || ''" alt="">
          {{ playlist?.creator?.nickname || '' }}
        </span>
        <span class="little-font">
          {{ playlist?.description || '' }}
        </span>
      </div>
    </div>
    <!-- 四个功能导航 -->
    <div class="util-bar">
      <div class="tab-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <p>{{ commentCount }}</p>
      </div>
      <div class="tab-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-partake"></use>
        </svg>
        <p>{{ shareCount }}</p>
      </div>
      <div class="tab-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai1"></use>
        </svg>
        <p>下载</p>
      </div>
      <div class="tab-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
        <p>多选</p>
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default {
  setup() {
    let store = useStore()
    let router = useRouter()
    let topNav = ref(null)

    let playlist = computed(() => store.state.musicListStore.musicListInfo?.playlist || {})
    let commentCount = computed(() => store.getters['musicListStore/commentCount'] || '0')
    let shareCount = computed(() => store.getters['musicListStore/shareCount'] || '0')

    function back() {
      router.back()
    }

    /* function scroll(){
      window.addEventListener('scroll',function(){
        console.log(topNav)
      })
    } */

    /* onMounted(()=>{
      scroll()
    }) */

    return {
      topNav,
      playlist,
      commentCount,
      shareCount,
      back
    }
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  color: white;
  padding: .2rem .15rem;

  .top-nav {
    overflow: hidden;
    padding-top: .2rem;
    margin: -.2rem -.15rem 0;
    height: .7rem;
    width: 100%;
    z-index: 999;
    position: fixed;
    font-size: .4rem;
    font-weight: bold;
    background-color: #f0f0f0;

    img {
      width: 100%;
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      filter: blur(50px);
    }

    .right {
      position: absolute;
      right: .3rem;
    }

    .icon {
      font-size: .5rem;
    }

    .svg-space {
      margin-right: .4rem;
      margin-left: .1rem;
    }
  }

  .mid-bar {
    margin-top: .8rem;
    display: flex;

    .left {
      display: block;
      margin-right: .3rem;
      width: 3rem;
      height: 3rem;

      img {
        border-radius: .15rem;
        width: 100%
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2{
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      img {
        margin-right: .2rem;
        vertical-align: middle;
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
      }

      .name {
        font-weight: lighter;
        color: #f0f0f0;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .little-font {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: .25rem;
        color: #f0f0f0;
        font-weight: bold;
      }
    }
  }

  .util-bar {
    width: 100%;
    height: 1.5rem;
    // 
    margin-top: .4rem;
    color: white;
    display: flex;
    justify-content: space-around;

    .tab-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .icon {
        font-size: .6rem;
      }
    }

  }
}
</style>
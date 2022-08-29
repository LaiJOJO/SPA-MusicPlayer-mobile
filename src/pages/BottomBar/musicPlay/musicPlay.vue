<template>
  <div class="music-play">
    <!-- 背景图 -->
    <img :src="musicDetailInfo.picUrl" alt="" class="bgc">
    <div class="bgc2"></div>
    <!-- 页面 -->
    <div class="container">
      <!-- 顶部导航 -->
      <div class="top-nav" @mousewheel.prevent @touchmove.prevent>
        <div @click="closeMusicPlay" class="left-close">
          <van-icon name="arrow-down" size="30px" color="#fff" />
        </div>
        <div class="song-info">
          <Vue3Marquee class="name">{{ songName }}</Vue3Marquee>
          <span class="singer">{{ singer.name }} ></span>
        </div>
        <div class="right-share">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-partake"></use>
          </svg>
        </div>
      </div>
      <!-- 中部碟片和歌词 -->
      <div class="major" @click="isMusicLyric = !isMusicLyric">
        <!-- 歌词 -->
        <div class="liryc" v-if="isMusicLyric" ref="liryc">
          <p class="text" v-for="eachLrc in lrc" :key="eachLrc"
            :class="eachLrc.sumTime == musicCurrentTime ? 'active' : ''">{{ eachLrc.lrc }}</p>
        </div>
        <!-- 碟片 -->
        <div class="cd" v-else>
          <div class="stick" :class="isPlay ? 'animate' : 'animate-reverse'">
            <img src="https://s3.music.126.net/mobile-new/img/needle-ab.png?4b81da043356110081e5ccaed2e6f2ad=" alt="">
          </div>
          <div class="dv" :style="isPlay ? '' : 'animation-play-state: paused;'">
            <img :src="musicDetailInfo.picUrl" alt="">
          </div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="bottom-bar" @mousewheel.prevent @touchmove.prevent>
        <div class="tab">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiai"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai2"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-changpian"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jianyi"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo-shuxiang"></use>
          </svg>
        </div>
        <div class="tip">
          <input type="range">
        </div>
        <div class="btn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_loop"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="changeSong(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg class="icon play" aria-hidden="true" @click="changeIsplay" v-if="isPlay">
            <use xlink:href="#icon-zanting1"></use>
          </svg>
          <svg class="icon play" aria-hidden="true" @click="changeIsplay" v-else>
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="changeSong(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-playlist"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { watch, ref } from 'vue'
import bus from '@/utils/eventBus/eventBus'
export default {
  emits: ['closeMusicPlay', 'changeIsplay'],
  props: ['isPlay'],
  setup(props, context) {
    let store = useStore()
    let liryc = ref(null)
    let isMusicLyric = ref(true)

    let musicDetailInfo = computed(() => {
      return store.getters['currentMusicStore/musicDetailInfo'] || {}
    })

    let songName = computed(() => {
      return store.getters['currentMusicStore/songName'] || ''
    })

    let musicDetail = computed(() => {
      return store.state.currentMusicStore?.musicDetail || {}
    })

    let singer = computed(() => {
      return store.getters['currentMusicStore/singer'] || {}
    })

    let lrc = computed(() => {
      return (store.getters['currentMusicStore/lrc']?.lrc || [])
    })

    let musicCurrentTime = computed(() => {
      return store.getters['currentMusicStore/lrc']?.lrcCurrentTime || 0
    })

    let lrcCurrentIndex = computed(() => {
      return store.getters['currentMusicStore/lrc']?.lrcCurrentIndex || 0
    })

    let musicList = computed(()=>{
      return store.getters['musicListStore/songInfo']?.lrcCurrentIndex || []
    })

    function closeMusicPlay() {
      context.emit('closeMusicPlay', false)
    }

    function changeIsplay() {
      context.emit('changeIsplay')
    }

    function changeSong(songIndex){
      bus.emit('changeSong',songIndex)
    }

    watch(musicCurrentTime, () => {
      if (liryc.value) {
        liryc.value.scrollTop = (52.75 * Number(lrcCurrentIndex.value)) - 52.75 * 2
        // console.log(document.querySelector('.active').offsetHeight)
      }
    }, { immediate: true })

    return {
      musicDetailInfo,
      musicDetail,
      singer,
      lrc,
      musicCurrentTime,
      liryc,
      songName,
      lrcCurrentIndex,
      isMusicLyric,
      musicList,
      closeMusicPlay,
      changeIsplay,
      changeSong
    }
  }
}
</script>

<style lang="less" scoped>
.music-play {
  height: 100%;
  color: white;
  position: relative;

  .bgc {
    width: 100%;
    height: 100%;
    filter: blur(.6rem);
    position: absolute;
    z-index: -1;
  }

  .bgc2 {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: gray;
    opacity: .3;
  }

  .top-nav {
    padding-top: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    border-bottom: 1px solid #f5f5f5;

    .icon {
      color: white;
      font-size: .5rem;
    }

    .left-close {
      flex: 1;
      padding-left: .2rem;
    }

    .song-info {
      flex: 7;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: .8rem;

      .name {
        width: 3rem;
        font-size: large;
      }

      .singer {
        text-align: center;
        width: 3rem;
        font-size: .25rem;
        color: white;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .right-share {
      flex: 1;
    }
  }

  .major {
    height: 8rem;
    width: 100%;
    position: relative;
    padding-top: .5rem;

    .liryc {
      width: 100%;
      height: 100%;
      text-align: center;
      overflow: scroll;
      font-size: .35rem;
      transition: all .5s;

      .text {
        color: rgb(226, 222, 222);
        margin-top: .6rem;
        padding: 0 .3rem;

        &:nth-last-child(1) {
          margin-bottom: 3rem;
        }
      }

      .active {
        font-size: larger;
        font-weight: bold;
        color: white;
      }
    }

    .cd {
      .stick {
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 3rem;
        top: 1rem;
        z-index: 2;
        transform-origin: 0 0;
        transform: rotate(-20deg);
      }

      .animate {
        transition: all 1s;
        transform-origin: 0 0;
        transform: rotate(-5deg);
      }

      .animate-reverse {
        transition: all 1s;
        transform-origin: 0 0;
        transform: rotate(-20deg);
      }

      img {
        width: 100%;
      }

      .dv {
        position: absolute;
        left: 1.5rem;
        top: 2.5rem;
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 50%;
        overflow: hidden;
        background: url('https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=200y200');
        background-repeat: no-repeat;
        background-size: contain;
        animation: dvRotate 20s linear forwards infinite;

        @keyframes dvRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        img {
          border-radius: 50%;
          width: 3rem;
          position: absolute;
          left: .75rem;
          top: .75rem;
        }
      }
    }


  }

  .bottom-bar {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #f5f5f5;

    .icon {
      margin: auto .4rem;
      font-size: .6rem;
    }

    .tab {}

    .tip {
      text-align: center;
      width: 100%;

      input {
        width: 95%;
        height: .05rem;
      }
    }

    .btn {
      display: flex;
      align-items: center;

      .play {
        font-size: 1rem;
      }

    }
  }
}
</style>
<template>
  <div class="container">
    <div class="left">
      <div class="song-box" :style="isPlay ? '' : 'animation-play-state: paused;'" @click="goMusicPlaying">
        <img :src="musicDetailInfo.picUrl" alt="">
      </div>
      <span class="song-name">
        {{ songName }}
      </span>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true" style="font-size:.6rem" @click="songPlay" v-if="isPlay">
        <use xlink:href="#icon-bofang09"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="songPlay" v-else>
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlist"></use>
      </svg>
    </div>
    <audio :src="musicAudioUrl" ref="music" :autoplay="isPlay" :lock-scroll="false"></audio>
    <!-- 弹出层 -->
    <van-popup v-model:show="isShow" position="bottom" :style="{ height: '100%', overflow: isShow ? 'hidden;' : '' }">
      <music-play :isPlay="isPlay" @closeMusicPlay="closeIcon" @changeIsplay="songPlay"></music-play>
    </van-popup>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import bus from '@/utils/eventBus/eventBus'
import musicPlay from './musicPlay/musicPlay.vue'

export default {
  components: { musicPlay },
  setup() {
    const store = useStore()
    const music = ref(null)
    const isPlay = ref(false)
    const musicId = ref(localStorage.getItem('MUSICID') || 347230)
    const isShow = ref(false)

    const goMusicPlaying = () => {
      isShow.value = true;
    };

    function songPlay() {
      isPlay.value = !isPlay.value
      music.value.paused ? music.value.play() : music.value.pause()
      sendCurrentTime()
    }

    function getCurrentSong(id) {
      try {
        store.dispatch('currentMusicStore/getSongDetail', id)
        store.dispatch('currentMusicStore/getSongAudio', id)
      } catch (error) {
        bus.emit('showNotify', 'block')
      }
    }

    function closeIcon(show) {
      isShow.value = show
    }

    function getSongLyric(id) {
      store.dispatch('currentMusicStore/getSongLyric', id)
    }

    bus.on('getCurrentSongSuccess', (isplay) => {
      isPlay.value = isplay
    })

    let musicDetail = computed(() => {
      return store.state.currentMusicStore?.musicDetail || {}
    })
    let musicAudio = computed(() => {
      return store.state.currentMusicStore?.musicAudio || {}
    })

    let musicAudioUrl = computed(() => {
      return store.getters['currentMusicStore/musicAudioUrl'] || ''
    })

    let musicDetailInfo = computed(() => {
      return store.getters['currentMusicStore/musicDetailInfo'] || {}
    })

    let songName = computed(() => {
      return store.getters['currentMusicStore/songName'] || ''
    })

    let musciLrc = computed(() => {
      return store.getters['currentMusicStore/lrc'] || {}
    })

    // 定时发送当前播放音乐时间戳到veux进行处理整理出当前时间戳
    let currentTimer = null
    let musicCurrentTime = 0
    function interval() {
      musicCurrentTime = parseInt(music.value.currentTime * 1000)
      store.commit('currentMusicStore/GETCURRENTTIME', musicCurrentTime)
    }
    function sendCurrentTime() {
      if (isPlay.value) {
        // 防止定时器重叠
        if (currentTimer) {
          clearInterval(currentTimer)
          currentTimer = null
        }
        // 先执行一次
        currentTimer = setInterval(() => {
          interval()
        }, 200);
      } else {
        clearInterval(currentTimer)
        currentTimer = null
      }
    }

    onMounted(() => {
      getCurrentSong(musicId.value)
      getSongLyric(musicId.value)
    })

    watch(isPlay, () => {
      sendCurrentTime()
    })

    return {
      music,
      isPlay,
      musicDetail,
      musicAudio,
      musicAudioUrl,
      musicDetailInfo,
      musciLrc,
      isShow,
      songName,
      songPlay,
      goMusicPlaying,
      closeIcon,
      sendCurrentTime
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: white;
  width: 100%;
  height: 1rem;
  position: fixed;
  bottom: -.05rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .1rem .2rem;
  border-top: 1px solid #f0f0f0;
  z-index: 999;

  .left {
    flex: 7;
    display: flex;
    align-items: center;

    .song-box {
      height: .8rem;
      width: .8rem;
      border-radius: 50%;
      box-sizing: border-box;
      position: relative;
      margin-right: .2rem;
      overflow: hidden;
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
        width: 100%;
        border-radius: 50%;
        border: .13rem solid black;
        box-sizing: border-box;
      }
    }

    .song-name {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      width: 3rem;
    }
  }

  .right {
    flex: 3;

    .icon {
      vertical-align: middle;
      font-size: .6rem;
      margin-left: .4rem;

      &:nth-child(2) {
        font-size: .4rem;
      }
    }
  }
}
</style>
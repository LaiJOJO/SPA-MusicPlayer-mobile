<template>
  <div class="major">
    <!-- tab部分 -->
    <div class="tab">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部<small>(共{{ trackCount }}首)</small></span>
      </div>
      <div class="right">
        <span><i>+</i>&nbsp;收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <!-- 歌单部分 -->
    <ul>
      <li class="song-list" v-for="(eachSong, index) in songInfo" :key="eachSong.id"
        :style="eachSong.id == currentMusicId ? 'background-color: #f9f9f9;' : ''">
        <div class="left" @click="getCurrentSong(eachSong.id, index)">
          <span class="index">
            <svg class="icon" aria-hidden="true" v-if="eachSong.id == currentMusicId" style="font-size:.5rem;">
              <use xlink:href="#icon-zhengzaibofang"></use>
            </svg>
            <i v-else>{{ index + 1 }}</i>
          </span>
          <span class="song-info">
            <i class="song">{{ eachSong.name }}</i>
            <i class="name">{{ eachSong.ar[0].name }}</i>
          </span>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true" :style="`visibility: ${eachSong.mv ? '' : 'hidden'};`">
            <use xlink:href="#icon-bofangshipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qita"></use>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import bus from '@/utils/eventBus/eventBus'
import { computed, onMounted, ref } from 'vue'
export default {
  setup() {
    const store = useStore()
    let musicId = useRoute().query.id
    let musicIndex = ref(0)
    let currentMusicId = ref(0)

    async function getMusicInfo() {
      try {
        await store.dispatch('musicListStore/getMusicInfo', musicId)
      } catch (error) {
        bus.emit('showNotify', 'block')
      }
    }
    function getSongLyric(id) {
      store.dispatch('currentMusicStore/getSongLyric', id)
    }
    async function getCurrentSong(currentSongId, index) {
      try {
        await store.dispatch('currentMusicStore/getSongDetail', currentSongId)
        await store.dispatch('currentMusicStore/getSongAudio', currentSongId)
        getSongLyric(currentSongId)
        musicIndex.value = index
        currentMusicId.value = currentSongId
        bus.emit('getCurrentSongSuccess', true)
      } catch (error) {
        bus.emit('showNotify', 'block')
      }
    }
    bus.on('changeSong', (songIndex) => {
      let index = musicIndex.value + songIndex
      if (index < 0) {
        index = 0
      }
      musicIndex.value = index
      console.log(musicIndex.value)
      let musicId = songInfo.value[musicIndex.value].id
      currentMusicId.value = musicId
      getCurrentSong(musicId)
    })

    let songInfo = computed(() => store.getters['musicListStore/songInfo'])
    let trackCount = computed(() => store.getters['musicListStore/trackCount'] || '0')
    let subscribedCount = computed(() => store.getters['musicListStore/subscribedCount'] || '0')

    onMounted(() => {
      getMusicInfo()
    })

    return {
      songInfo,
      trackCount,
      subscribedCount,
      currentMusicId,
      musicIndex,
      getSongLyric,
      getCurrentSong
    }
  }
}
</script>

<style lang="less" scoped>
.major {
  background-color: white;
  border-radius: 15px 15px 0 0;
  padding: 10px 10px;

  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 17.5px;
    border-bottom: .02rem solid #f0f0f0;

    .left {
      height: 50px;
      font-weight: bold;
      line-height: 50px;

      .icon {
        margin-right: 5px;
        font-size: 30px;
        vertical-align: middle;
      }
    }

    .right {
      font-size: 15px;
      font-weight: lighter;
      height: 45px;
      line-height: 45px;
      color: white;
      background-color: red;
      padding: 0 7.5px;
      box-sizing: border-box;
      border-radius: 50px;
    }
  }

  .song-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    .left {
      flex: 7;
      display: flex;
      align-items: center;
      padding-left: .2rem;
      box-sizing: border-box;

      .index {
        color: #87878794;
        margin-right: 12.5px;
        font-size: 10px
      }

      .song-info {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .song {
          margin-bottom: 5px;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .name {
          font-size: 12.5px;
          color: #87878794;
        }
      }
    }

    .right {
      flex: 3;

      .icon {
        font-size: 25px;
        margin-left: 20px;
      }
    }
  }
}
</style>
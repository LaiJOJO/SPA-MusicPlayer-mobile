<template>
  <div class="music-list">
    <!-- 背景 -->
    <img :src="coverImgUrl" alt="" class="bgc">
    <!-- 上半歌单详情 -->
    <top-bar></top-bar>
    <!-- 完整歌曲列表 -->
    <major></major>
    <!-- 触底提示 -->
    <bottom-tip></bottom-tip>
  </div>
</template>

<script>
import {  computed,onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import bus from '@/utils/eventBus/eventBus'
import topBar from './topBar/topBar.vue'
import Major from './Major/Major.vue'

export default {
  name: 'musicList',
  components:{topBar, Major},
  setup(props) {
    const store = useStore()
    const musicListId = useRoute().query.id

    async function getMusicListInfo() {
      try {
        await store.dispatch('musicListStore/getMusicListInfo', musicListId)
      } catch (error) {
        bus.emit('showNotify', 'block')
      }
    }

    let coverImgUrl = computed(() => store.state.musicListStore.musicListInfo.playlist?.coverImgUrl||'')

    onMounted(() => {
      getMusicListInfo()
    })

    return {
      coverImgUrl,
      getMusicListInfo
    }
  }
}
</script>

<style lang="less" scoped>
.music-list {
  position: relative;
  .bgc{
    position: absolute;
    width: 100%;
    height: 7rem;
    z-index: -1;
    filter: blur(20px);
  }
  
}
</style>
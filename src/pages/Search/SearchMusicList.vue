<template>
  <div>
    <h1>搜索歌单</h1>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import bus from '@/utils/eventBus/eventBus';
export default {
  setup() {
    const store = useStore()

    // 关键词歌单
    let wordsMusicList = computed(() => store.state.searchMusicStore.wordsMusicList)

    return {
      wordsMusicList
    }
  }
}
</script>

<style lang="less" scoped>
</style>
<template>
  <div class="contain">
    <div class="top-bar">
      <span>
        <svg class="icon svg-space" aria-hidden="true" @click="back">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </span>
      <input type="text" class="search-box" v-model="searchWords">
      <span class="button" @click="startSearch">搜索</span>
    </div>
    <!-- 关键词历史和推荐框 -->
    <div class="keywords-box">
      <ul class="historys" v-if="keywordsHistory.length !== 0">
        <li class="title">历史</li>
        <li class="each-history" v-for="eachHistory in keywordsHistory" :key="eachHistory"
          @click="changeKeyword(eachHistory)">{{  eachHistory  }}</li>
      </ul>
      <ul class="hots">
        <li class="title">推荐</li>
        <li class="each-hot" v-for="eachHot in hots" :key="eachHot.first" @click="changeKeyword(eachHot.first)">{{
           eachHot.first  }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted, ref, reactive, watch } from 'vue';
import { computed } from 'vue';
import bus from '@/utils/eventBus/eventBus';
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const searchWords = ref('')
    const keywordsHistory = reactive(JSON.parse(localStorage.getItem('KEYWORDSHISTORYS'))||['海阔天空', '陈奕迅'])

    function back() {
      router.back()
    }

    // 获取关键词和热搜词
    async function getDefaultMusicWords() {
      try {
        await store.dispatch('searchMusicStore/getDefultMusicWordsInfo')
        await store.dispatch('searchMusicStore/getRecommendMusicWordsInfo')
      } catch (error) {
        bus.emit('showNotify', 'block')
      }
    }
    // 点击历史和推荐关键词自动填入搜索栏
    function changeKeyword(keyword) {
      searchWords.value = keyword
    }
    // 开始搜索,将关键词放入数组存储
    async function startSearch() {
      if(searchWords.value == ''){
        return
      }
      try {
        // 获取重复关键词的索引进行删除后插入
        let isIncludeIndex = keywordsHistory.indexOf(searchWords.value)
        if(isIncludeIndex == -1){
          keywordsHistory.unshift(searchWords.value)
        }else{
          // 先删除后插入形成最新历史词
          keywordsHistory.splice(isIncludeIndex,1)
          keywordsHistory.unshift(searchWords.value)
        }
        // 历史数大于8就清除最后的历史记录
        if (keywordsHistory.length > 8) {
          keywordsHistory.pop()
        }
        localStorage.setItem('KEYWORDSHISTORYS',JSON.stringify(keywordsHistory))
        await store.dispatch('searchMusicStore/getWordsMusicListInfo', searchWords.value)
        // 最后再跳转
        router.push('/searchmusiclist')
      } catch (error) {
        bus.emit('showNotify', 'block')
      }
    }

    let showKeyword = computed(() => {
      searchWords.value = store.getters['searchMusicStore/keyword']
      return store.getters['searchMusicStore/keyword']
    })

    // 热搜词
    let hots = computed(() => {
      return store.getters['searchMusicStore/hots']
    })
    // 关键词歌单
    let wordsMusicList = computed(() => store.state.searchMusicStore.wordsMusicList)

    onMounted(() => {
      getDefaultMusicWords()
    })

    return {
      back,
      getDefaultMusicWords,
      startSearch,
      changeKeyword,
      searchWords,
      showKeyword,
      hots,
      wordsMusicList,
      keywordsHistory
    }
  }
}
</script>
<style lang="less" scoped>
.contain {
  background: rgb(243, 242, 242);

  .top-bar {
    background-color: red;
    height: 1rem;
    padding: .3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    .icon {
      font-size: .5rem;
      vertical-align: middle;
      flex: 1;
    }

    .search-box {
      font-size: .3rem;
      height: .7rem;
      flex: 7;
      border-radius: .3rem;
      background-color: rgba(213, 204, 204, 0.5);
      opacity: .8;
      border: 0px;
      margin: auto .2rem;
      padding: 0 .3rem;
    }

    .button {
      flex: 1;
      color: white;
    }
  }

  .keywords-box {
    padding: .3rem;

    .hots {
      .title {
        font-size: .2rem;
        color: black;
      }

      .each-hot {
        display: inline-block;
        color: gray;
        background: white;
        text-align: center;
        line-height: .4rem;
        height: .4rem;
        padding: .05rem .2rem;
        margin: .15rem .1rem;
        border-radius: .2rem;
      }
    }

    .historys {
      margin-bottom: .3rem;

      .title {
        font-size: .2rem;
        color: black;
      }

      .each-history {
        display: inline-block;
        color: gray;
        background: white;
        text-align: center;
        line-height: .4rem;
        height: .4rem;
        padding: .05rem .2rem;
        margin: .15rem .1rem;
        border-radius: .2rem;
      }
    }
  }
}
</style>
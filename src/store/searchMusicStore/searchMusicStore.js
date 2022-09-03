import {getDefultMusicWords,getRecommendMusicWords,getWordsMusicList} from '@/api/request'

const state = {
  defaultSearchWords:{},
  recommendMusicWords : {},
  wordsMusicList:[]
}

const actions = {
  // 默认热搜词
  async getDefultMusicWordsInfo(context){
    let {data:defaultMusicWords} = await getDefultMusicWords()
    context.commit('GETDEFULTMUSICWORDSINFO',defaultMusicWords.data)
  },
  // 推荐热搜词
  async getRecommendMusicWordsInfo(context){
    const {data} = await getRecommendMusicWords()
    context.commit('GETRECOMMENDMUSICWORDSINFO',data.result)
  },
  // 获取关键词结果
  async getWordsMusicListInfo(context,keyword){
    const {data} = await getWordsMusicList(keyword)
    context.commit('GETWORDSMUSICLISTINFO',data.result.songs)
    console.log(data)
  }
}

const mutations = {
  // 默认热搜
  GETDEFULTMUSICWORDSINFO(state,defaultMusicWords){
    state.defaultSearchWords = defaultMusicWords
  },
  // 推荐热搜
  GETRECOMMENDMUSICWORDSINFO(state,recommendMusicWords){
    state.recommendMusicWords = recommendMusicWords
  },
  // 获取关键词歌单
  GETWORDSMUSICLISTINFO(state,wordsMusicList){
    state.wordsMusicList = wordsMusicList
  }
}

const getters = {
  keyword(state){
    return state.defaultSearchWords?.showKeyword ||''
  },
  hots(state){
    return state.recommendMusicWords?.hots ||[]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
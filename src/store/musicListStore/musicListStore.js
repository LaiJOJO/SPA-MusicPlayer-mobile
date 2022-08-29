import { getMusicListInfo,getMusicInfo } from '@/api/request'
import filters from '@/utils/filters/countFilters'

const state = {
  musicListInfo: [],
  musicInfo:[]
}
const actions = {
  // 获取歌单详情
  async getMusicListInfo(context, musicListId) {
    const res = await getMusicListInfo(musicListId)
    if (res.status == 200) {
      context.commit('GETMUSICLISTINFO', res.data)
    } else {
      return Promise.reject(new Error('网络异常'))
    }
  },
  // 获取完整歌单
  async getMusicInfo(context,musicListId){
    const res = await getMusicInfo(musicListId)
    if (res.status == 200) {
      context.commit('GETMUSICINFO', res.data)
    } else {
      return Promise.reject(new Error('网络异常'))
    }
  }
}
const mutations = {
  GETMUSICLISTINFO(state, musicListInfo) {
    state.musicListInfo = musicListInfo
  },
  GETMUSICINFO(state,musicInfo){
    state.musicInfo = musicInfo
  }
}
const getters = {
  songInfo(state){
    return state.musicInfo.songs||[]
  },
  commentCount(state){
    let count = state.musicListInfo?.playlist?.commentCount||0
    return filters(count)
  },
  shareCount(state){
    let count = state.musicListInfo?.playlist?.shareCount||0
    return filters(count)
  },
  trackCount(state){
    let count = state.musicListInfo?.playlist?.trackCount||0
    return filters(count)
  },
  subscribedCount(state){
    let count = state.musicListInfo?.playlist?.subscribedCount||0
    return filters(count)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
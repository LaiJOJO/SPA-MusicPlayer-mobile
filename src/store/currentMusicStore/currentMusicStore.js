import { getMusicAudio, getMusicDetail, getMusicLyric } from '@/api/request'
import bus from '@/utils/eventBus/eventBus'

const state = {
  musicAudio: {},
  musicDetail: {},
  musicLyric: {},
  musicCurrentTime: 0
}
const actions = {
  // 获取歌曲详情
  async getSongDetail(context, musicId) {
    const res = await getMusicDetail(musicId)
    if (res.status == 200) {
      localStorage.setItem('MUSICID', musicId)
      context.commit('GETSONGDETAIL', res.data)
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  },
  // 获取音频
  async getSongAudio(context, musicId) {
    const res = await getMusicAudio(musicId)
    if (res.status == 200) {
      localStorage.setItem('MUSICID', musicId)
      context.commit('GETSONGAUDIO', res.data)
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  },
  // 获取歌词
  async getSongLyric(context, musicId) {
    const res = await getMusicLyric(musicId)
    if (res.status == 200) {
      context.commit('GETSONGLYRIC', res.data)
    } else {
      bus.emit('showNotify', 'block')
    }
  }
}
const mutations = {
  GETSONGDETAIL(state, songDetail) {
    state.musicDetail = songDetail
  },
  GETSONGAUDIO(state, songAudio) {
    state.musicAudio = songAudio
  },
  GETSONGLYRIC(state, songLyric) {
    state.musicLyric = songLyric
  },
  // 直接提交的当前音乐时间戳
  GETCURRENTTIME(state, musicCurrentTime) {
    state.musicCurrentTime = musicCurrentTime
  }
}
const getters = {
  musicAudioUrl(state) {
    return state.musicAudio?.data ? state.musicAudio?.data[0].url : ''
  },
  musicDetailInfo(state) {
    if (state.musicDetail?.songs) {
      return state.musicDetail?.songs[0].al || {}
    }
    return {}
  },
  singer(state) {
    return state.musicDetail.songs ? state.musicDetail.songs[0].ar[0] : {}
  },
  songName(state){
    return state.musicDetail.songs ? state.musicDetail.songs[0].name : '歌名'
  },
  // 歌词
  lrc(state) {
    if (state.musicLyric.lrc.lyric) {
      let lyric = state.musicLyric.lrc.lyric
      let lyricArr = lyric.split(/[\r\n]/)
      // 最后一个字符串分割符号丢弃
      if (lyric[lyric.length - 1] === '\n') {
        lyricArr.pop()
      }
      // 切割字符成需要的形式
      let lrc = lyricArr.map((item,index) => {
        let lrc = item.split(']')[1] || ''
        let min = item.split(':', 1)[0].split('[')[1]
        let sec = item.split(':')[1]?.split('.')[0]
        let mm = item.split('.')[1]?.split(']')[0]
        let sumTime = Number(min) * 60 * 1000 + Number(sec) * 1000 + Number(mm)
        return { lrc, sumTime ,index }
      })
      // 判断当前对应时间戳
      let lrcCurrentTime = 0
      let lrcCurrentIndex = 0
      if (state.musicCurrentTime >= lrc[lrc.length - 1].sumTime) {
        lrcCurrentTime = lrc[lrc.length - 1].sumTime
        lrcCurrentIndex = lrc.filter((item=>item.lrc!="")).length-1
      } else {
        lrcCurrentTime = lrc.find((item,index,arr) => {
          return (item.sumTime <= state.musicCurrentTime && arr[index+1].sumTime>state.musicCurrentTime)
        }).sumTime
        // 获取歌词索引要过滤空歌词，否则影响卷曲页面
        lrc.filter((item=>item.lrc!="")).find((item,index,arr) => {
          let bool = item.sumTime <= state.musicCurrentTime && arr[index+1].sumTime>state.musicCurrentTime
          lrcCurrentIndex = bool ? index : 0
          return bool
        })
      return {lrc,lrcCurrentTime,lrcCurrentIndex}
    }
    return {}
  }
}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
import request from './axios'
// 大轮播图
export const getBanner = ()=>{
  return request({url:'/banner?type=2',method:'GET'})
}
// 发现好歌单,推荐歌单接口
export const getRecommendSongList = ()=>{
  return request({url:'/personalized?limit=10',method:'GET'})
}
// 获取歌单详情
export const getMusicListInfo = (musicListId)=>{
  return request ({url:`/playlist/detail?id=${musicListId}`,method:'GET'})
}
// 获取歌单全部歌曲
export const getMusicInfo = (musicListId)=>{
  return request ({url:`/playlist/track/all?id=${musicListId}&offset=0`,method:'GET'})
}
// 获取播放歌曲的音频信息
export const getMusicAudio = (musicId)=>{
  return request ({url:`/song/url?id=${musicId}`,method:'GET'})
}
// 获取当前歌曲详情
export const getMusicDetail = (musicId)=>{
  return request({url:`/song/detail?ids=${musicId}`,method:'GET'})
}
// 获取当前歌曲歌词
export const getMusicLyric = (musicId)=>{
  return request({url:`/lyric?id=${musicId}`,method:'GET'})
}
// 获取默认搜索关键词
export const getDefultMusicWords = ()=>{
  return request({url:'/search/default',method:'GET'})
}
// 获取简略热搜关键词
export const getRecommendMusicWords = ()=>{
  return request({url:'/search/hot',method:'GET'})
}
// 根据关键词搜索歌曲,limit控制一次获取数量
export const getWordsMusicList = (keyword)=>{
  return request({url:`/cloudsearch?keywords=${keyword}`,method:'GET'})
}

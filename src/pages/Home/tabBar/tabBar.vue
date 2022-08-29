<template>
  <div class="tab-bar">
    <div class="nav-title">
      <h2>发现好歌单</h2>
      <van-button class="btn" type="default" round size="mini">发现更多</van-button>
    </div>
    <van-swipe :loop="false" :width="130" class="songList" :show-indicators="false">
      <van-swipe-item class="eachSong" v-for="eachSong in obj.recommendSongList" :key="eachSong.id">
        <router-link :to="{path:'/musiclist',query:{id:eachSong.id}}">
          <img :src="eachSong.picUrl" alt="歌单推荐">
          <div class="play-count"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofangsanjiaoxing"></use>
            </svg>{{ eachSong.playCount }}</div>
          <div class="text"><span>{{ eachSong.name }}</span></div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { getRecommendSongList } from '@/api/request'
import { onMounted } from '@vue/runtime-core'
import bus from '@/utils/eventBus/eventBus'
import { useRoute } from 'vue-router'
export default {
  setup() {
    let obj = reactive({
      recommendSongList: []
    })

    // 获取推荐歌单函数
    const getSongList = async function () {
      const res = await getRecommendSongList()
      if (res.status == 200) {
        obj.recommendSongList = res.data.result.filter(element => {
          if (element.playCount >= 10000) {
            return element.playCount = (element.playCount / 10000).toFixed(1) + '万'
          } else if (element.playCount >= 100000000) {
            return element.playCount = (element.playCount / 100000000).toFixed(1) + '亿'
          }
          return
        });
      } else {
        return (bus.emit('showNotify', 'block'))
      }
    }

    onMounted(() => {
      getSongList()
    })

    return {
      obj,
      getSongList,
    }
  }
}
</script>

<style lang="less" scoped>
// 各功能栏
.tab-bar {
  margin-top: .1rem;
  border-bottom: 1px solid #dedede;

  .nav-title {
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      font-size: .3rem;
      padding: 0.3rem;
    }
  }

  .songList {
    margin-right: -.2rem;
    .eachSong {
      position: relative;

      .play-count {
        font-size: small;
        font-weight: lighter;
        color: white;
        position: absolute;
        top: .1rem;
        right: .3rem;
      }

      img {
        border-radius: .15rem;
        width: 95%;
      }

      .text{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}
</style>
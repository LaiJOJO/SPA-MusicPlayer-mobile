<template>
  <div>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="banner in obj.bannerList" :key="banner.bannerId">
          <img :src="banner.pic" alt="" class="pic">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { getBanner } from "../../../api/request"
import bus from '../../../utils/eventBus/eventBus'
export default {
  name: 'myBanner',
  setup() {
    let notify = ref(null)
    const obj = reactive({
      bannerList: []
    })

    onMounted(async () => {
      const res = await getBanner()
      if (res.status == 200) {
        obj.bannerList = res.data.banners
      } else {
        return (bus.emit('showNotify', 'block'))
      }

    })

    return {
      obj,
      notify
    }
  }
}
</script>

<style lang="less" scoped>
// 轮播图
.swiper {
  border-radius: .2rem .2rem .3rem .3rem;
  margin-top: 1.2rem;
  overflow: hidden;

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: .4rem;
    text-align: center;

    .pic {
      width: 100%;
    }
  }
}
</style>
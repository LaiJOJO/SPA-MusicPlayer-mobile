<template>
  <div class="message" ref="msg">
    <span>网络异常，请更换网络后尝试</span>
  </div>
</template>

<script>
import bus from '../../utils/eventBus/eventBus'
import { ref } from 'vue';
export default {
  setup(){
    let msg = ref(null)
    bus.on('showNotify',(isShow)=>{
     msg.value.style.display = isShow
     setTimeout(()=>{
          msg.value.style.display = "none"
        },2000)
    })
    return{
      msg
    }
  }
};
</script>

<style lang="less" scoped>
  .message{
    z-index: 9999;
    transition: all .3s;
    display: none;
    background-color: #f0f0f0;
    width: 80%;
    height: .8rem;
    text-align: center;
    position: absolute;
    top: .2rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: .2rem;
    line-height: .8rem;
  }
</style>
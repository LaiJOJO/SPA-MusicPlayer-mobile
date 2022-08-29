<template>
  <!-- 推荐栏 -->
    <div class="recomend-bar">
      <ul>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-meirituijian"></use>
          </svg>
          每日推荐
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle1"></use>
          </svg>
          私人FM
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
          歌单
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-paihang"></use>
          </svg>
          排行榜
        </li>
      </ul>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
  
  // 推荐栏
  .recomend-bar {
    margin-top: 0.1rem;
    border-bottom: 1px solid #dedede;
    padding: .15rem .15rem;

    ul {
      display: flex;
      justify-content: space-between;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .icon {
        color: red;
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
</style>
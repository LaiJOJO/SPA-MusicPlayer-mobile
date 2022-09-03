ps :
  pages 放私有组件，components放通用组件
一 . 
1. 适配rem ， 取根字号为视口7.5分之一，换算ip6尺寸325px为 根字号 = 50px , body字体号0.3rem = 15px ， 好换算
  利用动态引入设置路由
2. Home组件: 
  a) 顶部导航栏开发，
  b) 轮播图开发 : 利用axios实例化发起请求，
  c) 添加组件Notify,用来处理网络状态异常的弹窗，利用eventbus包mitt
  d) 发现歌单开发，携带query参数链接跳转歌曲详情页面 musicList 组件
3. musicList组件开发
  a) useRoute() 和 useRouter() 替换了vue2的$route和$router , 只能用在setup中先定义变量useRouter()
  b) 顶部导航fixed定位，加盒子长宽方便内部布局 ;; 灰色底，叠加图片虚化能带到随背景变色效果 (顶部动态添加背景未实现)
  c) 背景虚化使用 filter: blur(20px);属性进行css虚化
  d) 歌曲详情用mv用visition:hidden三元判断占位
  f) 获取当前歌曲时，将id存到本地会话方便下次读取
  细节处理 : 
    a. 将歌单详情数据临时保存进本地会话
    b. 优化选中歌曲灰色显示加小图标显示

4. 底部固定歌曲全局组件bottomBar开发:
  a) 提示 .... undefined"0" , 因为对象的数组下不能直接?.判断数组索引arr[index], 需要先判断if(obj.arr)不带索引
  b) vue3动他获取组件要在mounted周期后才能获取value
  c) 利用audio组件的属性，手动控制开关paused = false
  d) 根据歌单点击的歌曲修改当前播放音乐
  e) 点击左侧图片栏弹出层musicPlay，不是路由

5. musicPlay弹出层开发:
  a) 弹出层顶部和底部阻止鼠标滚动和页面滑动 @mousewheel.prevent @touchmove.prevent
  b) 利用vue3-marquee包实现文字横向走马灯
  c) 从官网上截取请求返回的图片，创建动画，动态添加动画启动属性 ;; 白色的棒子直接过渡设置不同类和过渡时间，动画麻烦
  d) 歌词开发 ：
    1. 处理字符串，分割时间和歌词
    2. 包含音频的组件启动定时传递audio当前时间戳,将时间戳放到vuex中进行处理，并由vuex返回当前判断后的歌词对应的时间戳
    3. 根据时间戳等于当前歌词时间戳，动态绑定加粗字体样式
    4. store传递index用来动态滚动歌词，先过滤空字符，避免影响卷去页面高度
    bug: 点击弹出层的暂停应该触发一次底部的模拟点击暂停，而不是直接修改isPlay的值，否则毫无作用 ;;
          利用歌词时间戳>=当前播放时间并返回下一句歌词时间戳作为当前播放时间会有bug，即下一句歌词时间戳作为当前播放时间，导致判断时间戳==当前播放时间时使得下一句歌词提前加粗；；解决方法 : item.lrc && item.sumTime <= state.musicCurrentTime && arr[index+1].sumTime>=state.musicCurrentTime , 用当前歌词时间戳<=当前播放时间且下一句歌词时间错>=当前播放时间，进而返回当前歌词时间戳为当前播放时间
  e) 歌曲切换 : musicPlay组件将id+1传递给musicList/Major进行切换歌曲

  6. searchMusic搜索歌曲页面开发:
    a) 获取默认关键词，获取推荐热关键词进行渲染
    b) 渲染历史关键词，超过8个则进行删除操作 ; 查重后进行新的插入形成新的历史词 ;不用filter是因为不能直接复制非响应式数据
    c) 用队列来对历史数据进行保存

  7. searchMusicList 搜索歌曲歌单结果
    
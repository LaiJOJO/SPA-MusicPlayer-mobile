
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/Home/myHome.vue'),
  },
  {
    path: '/musiclist',
    name: 'musicList',
    component: () => import('@/pages/musicList/musicList.vue'),
  },
  {
    path:'/searchmusic',
    name:'searchmusic',
    component:()=>import('@/pages/Search/SearchMusic.vue')
  },
  {
    path:'/searchmusiclist',
    name:'searchmusiclist',
    component:()=>import('@/pages/Search/SearchMusicList.vue')
  }
]

export default routes
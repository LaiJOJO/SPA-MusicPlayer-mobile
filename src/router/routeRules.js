
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
  }
]

export default routes
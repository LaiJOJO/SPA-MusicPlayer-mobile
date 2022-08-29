import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 组件：vant ，vue3-marquee, 
import '../src/plugins/vant'
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
// 全局组件
import notify from './components/Notify/Notify.vue'
import bottomTip from './components/BottomTip/BottomTip.vue'

const app = createApp(App)
app.component('bottomTip',bottomTip)
app.component('notify',notify)

app.use(store).use(router).use(Vue3Marquee).mount('#app')

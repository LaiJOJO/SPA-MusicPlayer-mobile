import { createApp } from 'vue';
import { Swipe, SwipeItem ,Button,Notify ,Popup,Icon } from 'vant';

const app = createApp();
app.use(Swipe);
app.use(SwipeItem);
app.use(Button);
app.use(Notify)
app.use(Popup )
app.use(Icon)
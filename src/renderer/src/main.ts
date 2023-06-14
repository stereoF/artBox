import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { router } from './modules/router';
// import { Message } from '@arco-design/web-vue';
// import { Modal } from '@arco-design/web-vue';
import { Notification } from '@arco-design/web-vue';


const pinia = createPinia()
const app = createApp(App)
// Message._context = app._context;
// Modal._context = app._context;
Notification._context = app._context;
app.use(pinia).use(ArcoVue).use(ArcoVueIcon).use(router).mount('#app')

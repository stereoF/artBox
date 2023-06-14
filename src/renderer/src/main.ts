import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { router } from './modules/router';

const pinia = createPinia()
createApp(App).use(pinia).use(ArcoVue).use(ArcoVueIcon).use(router).mount('#app')

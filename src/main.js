import './assets/styles/index.scss' // 引入全局样式
import 'amfe-flexible';
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import 'vant/es/toast/style' // 解决vant 提示样式问题
import 'vant/es/notify/style' 
import 'default-passive-events';
import Vconsole from 'vconsole'
// i18n
import i18n from "./locales";

import { createApp } from 'vue'
import { pinia } from "./store";
import { ConfigProvider } from 'vant';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ConfigProvider);
app.use(pinia);
app.use(router)
app.use(i18n);
app.mount('#app')

if (import.meta.env.VITE_ENABLE_VCONSOLE=='true') {
  new Vconsole()
}


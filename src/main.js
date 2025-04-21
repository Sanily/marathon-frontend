import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from './router/index'
import './style.css'
import App from './App.vue'

createApp(App).use(router).use(Antd).mount('#app')

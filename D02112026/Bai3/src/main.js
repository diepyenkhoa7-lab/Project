import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './store'
import App from './App.vue'
import './style.css'

createApp(App).use(createPinia()).use(store).mount('#app')

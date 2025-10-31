import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useImagePath } from '@/composables/useImagePath'
import './assets/styles/app.scss';

const app = createApp(App)
const { getImagePath } = useImagePath()

app.config.globalProperties.$getImagePath = getImagePath

app.use(createPinia())
app.use(router)
app.mount('#page-layout')
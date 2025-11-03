import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAssets } from '@/composables/useAssets'
import './assets/styles/app.scss';

const app = createApp(App)
const { getImagePath, getFilePath, downloadFile } = useAssets()

app.config.globalProperties.$getImagePath = getImagePath
app.config.globalProperties.$getFilePath = getFilePath
app.config.globalProperties.$downloadFile = downloadFile

app.use(createPinia())
app.use(router)
app.mount('#page-layout')
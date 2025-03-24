import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { Toast, options } from './plugins/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')
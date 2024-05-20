import './assets/css/index.scss'
import 'normalize.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import icons from './global/register-icons'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')

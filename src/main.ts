import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'cesium/Source/Widgets/widgets.css'

createApp(App).use(store).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from './plugins/antd'
import axios from './plugins/axios'
import moment from 'moment'
moment.locale('zh-cn')

const app = createApp(App)
app.config.globalProperties.$moment = moment

app
  .use(axios)
  .use(antd)
  .use(router)
  .use(store)
  .mount('#app')

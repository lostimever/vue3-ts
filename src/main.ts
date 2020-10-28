import router from './router'
import store from './store'
import app from './plugins/antd'
import axios from './plugins/axios'
import moment from 'moment'
moment.locale('zh-cn')

app.config.globalProperties.$moment = moment

app
  .use(axios)
  .use(router)
  .use(store)
  .mount('#app')

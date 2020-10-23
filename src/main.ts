import router from './router'
import store from './store'
import app from './plugins/antd'
import axios from './plugins/axios'

app
  .use(axios)
  .use(router)
  .use(store)
  .mount('#app')

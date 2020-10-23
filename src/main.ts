import router from './router'
import store from './store'
import app from './plugins/antd'

app
  .use(router)
  .use(store)
  .mount('#app')

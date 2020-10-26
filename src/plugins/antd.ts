import { createApp } from 'vue'
import App from '../App.vue'
import { Button, message, Layout, Menu } from 'ant-design-vue'

const app = createApp(App)
app.use(Button)
app.use(Layout)
app.use(Menu)

app.config.globalProperties.$message = message

export default app

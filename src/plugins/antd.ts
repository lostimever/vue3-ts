import { createApp } from 'vue'
import App from '../App.vue'
import { Button, message } from 'ant-design-vue'

const app = createApp(App)
app.use(Button)

app.config.globalProperties.$message = message

export default app

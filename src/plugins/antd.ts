import { createApp } from 'vue'
import App from '../App.vue'
import {
  message,
  Button,
  Col,
  Input,
  Layout,
  Modal,
  Menu,
  Row,
  Select,
  Table,
  Pagination,
  Form,
} from 'ant-design-vue'

const app = createApp(App)
app.use(Button)
app.use(Col)
app.use(Input)
app.use(Layout)
app.use(Modal)
app.use(Menu)
app.use(Row)
app.use(Select)
app.use(Table)
app.use(Pagination)
app.use(Form)

app.config.globalProperties.$Message = message

export default app

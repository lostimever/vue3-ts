declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface zhCN {
  [key: string]: any
}
declare module 'ant-design-vue/es/date-picker/locale/zh_CN' {
  import zh from 'ant-design-vue/es/date-picker/locale/zh_CN'
  const zh_CN: zhCN

  export default zh_CN
}
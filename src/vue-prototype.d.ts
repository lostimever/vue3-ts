import { App } from 'vue'
import { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: AxiosStatic
    [key: string]: any
  }

  export interface App {
    $axios: AxiosStatic
    [key: string]: any
  }
}

declare global {
  interface Window {
    $axios: AxiosStatic
  }
}

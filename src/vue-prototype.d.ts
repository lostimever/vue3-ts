import { App } from 'vue'
import { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: AxiosStatic
  }

  export interface App {
    $axios: AxiosStatic
  }
}

declare global {
  interface Window {
    $axios: AxiosStatic
  }
}

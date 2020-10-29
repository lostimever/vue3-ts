<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import zhCN from 'ant-design-vue/es/date-picker/locale/zh_CN'

@Options({
  provide() {
    return {
      locale: zhCN,
    }
  },
})
export default class App extends Vue {
  public locale = zhCN
}
</script>

<style lang="less">
html,
body {
  margin: 0px;
  height: 100%;
}

#app {
  height: 100%;
}
</style>

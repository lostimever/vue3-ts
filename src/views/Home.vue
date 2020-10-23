<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <a-button type="primary">
      Primary
    </a-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // 字符串索引签名。用任意字符串去索引List，可以得到任意的结果，这样List接口可以支持多个未知属性
  // [x: string]: any

  // public setup() {
  //   console.log('测试一下', this.$axios)
  //   // this.$axios.get()
  // }

  public mounted() {
    this.$axios.get('/dmsmarket/publics/dictionaryAll').then((res: {}) => {
      console.log('Home -> mounted -> res', res)
    })
  }
}
</script>

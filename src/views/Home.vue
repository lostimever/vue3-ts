<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div>Count: {{ counter.count }}</div>
    <a-button type="primary" @click="counter.increment()">
      加
    </a-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { ref, reactive, onMounted } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

const useCounter = () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  onMounted(() => {
    console.log('onMounted')
  })

  return {
    count,
    increment,
  }
}

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // 字符串索引签名。用任意字符串去索引List，可以得到任意的结果，这样List接口可以支持多个未知属性
  // [x: string]: any

  public counter = setup(() => useCounter())
}
</script>

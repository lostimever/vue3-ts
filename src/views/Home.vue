<template>
  <a-layout class="home">
    <side-bar :collapsed="collapsed"></side-bar>

    <a-layout>
      <a-layout-header class="home-header">
        <a-button type="primary" @click="toggleCollapsed" class="trigger">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { ref, reactive, onMounted } from 'vue'
import { mapActions } from 'vuex'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import SideBar from '@/components/SideBar.vue'

@Options({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SideBar,
  },
  // data() {
  //   return {
  //     selectedKeys: ['1'],
  //     collapsed: false,
  //   }
  // },
  methods: { ...mapActions('dictionary', ['GET_DICTIONARY']) },
  mounted() {
    this.GET_DICTIONARY()
  },
})
export default class Home extends Vue {
  // 字符串索引签名。用任意字符串去索引List，可以得到任意的结果，这样List接口可以支持多个未知属性
  // [x: string]: any
  public collapsed = false
  private toggleCollapsed() {
    this.collapsed = !this.collapsed
    // this.openKeys = this.collapsed ? [] : this.preOpenKeys;
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  &-header {
    background: #fff;
    padding: 0 24px;
  }
  // .trigger {
  //   font-size: 18px;
  //   // line-height: 64px;
  //   padding: 0 24px;
  //   cursor: pointer;
  //   transition: color 0.3s;
  // }

  // .trigger:hover {
  //   color: #1890ff;
  // }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>

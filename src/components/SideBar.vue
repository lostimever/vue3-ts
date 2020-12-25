<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <a-menu
      theme="dark"
      mode="inline"
      v-model:selectedKeys="onRoutes"
      v-model:openKeys="openMenu"
      @click="checkMenu"
    >
      <a-menu-item key="work">
        <user-outlined />
        <span>工作台</span>
      </a-menu-item>
      <a-sub-menu key="document">
        <template v-slot:title>
          <span>
            <MailOutlined />
            <span>档案管理</span>
          </span>
        </template>
        <a-menu-item key="elemeter">电表信息</a-menu-item>
        <a-menu-item key="eleuser">电力用户</a-menu-item>
        <a-menu-item key="comuser">居民用户</a-menu-item>
      </a-sub-menu>
      <!-- <a-menu-item key="2">
        <video-camera-outlined />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span>nav 3</span>
      </a-menu-item> -->
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { ref, reactive, onMounted } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'
@Options({
  props: ['collapsed'],
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MailOutlined,
  },
  computed: {
    onRoutes() {
      // let path = this.$route.path.replace('/', '')
      // path = /[^/]*$/.exec(path)[0]

      return [this.$route.name.includes('work') ? 'work' : this.$route.name]
    },
    openMenu() {
      return ['document']
    },
  },
  data() {
    return {
      rootSubmenuKeys: ['document'],
      // collapsed: false,
      // selectedKeys: ['work'],
    }
  },
})
export default class SideBar extends Vue {
  // private collapsed: boolean

  private checkMenu({ key }: any): void {
    // this.activeName = key
    this.$router.push({ name: key })
  }
}
</script>
<style lang="less" scoped></style>

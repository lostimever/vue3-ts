# 后台管理

打算用`vue3+typescript+vuex+antd-design-vue`做一个后台管理页面
对于目前来说，跨度有点大，有点难度
- [x] 1、初始化项目
- [x] 2、配置好`eslint`、`tslint`规则
- [x] 3、利用`babel-plugin-import`按需引入`antd-design-vue`
- [x] 4、配置`axios`插件
- [x] 5、利用`vuex`管理字典

## 遇到的坑
### `eslint`、`tslint`规则配置

  每个人的使用习惯不一样，搜索到的配置也不一样，需要和`vscode`的`setting.json`一起配置。

### `axios`插件
- vue2.x

  `Vue2.x`使用`Plugin.install`和`Object.defineProperties()`将`$axio`s挂载到`vue`实例上，最后`Vue.use(Plugin)`

- vue3.0

  `vue3.0`是利用`install`方法来暴露`axios`，[官方文档](https://www.vue3js.cn/docs/zh/guide/plugins.html#%E7%BC%96%E5%86%99%E6%8F%92%E4%BB%B6)中提供了例子。
  但是，我们用到了`typescript`，即使按照上述方法成功将`$axios`挂载到了`vue`实例上，还需要创建一个`*.d.ts`文件来声明`$axios`属性，否则`eslint`会校验不通过。
  
  ```typescript
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
  ```

  需要注意，和`vue2.x`不同的地方`'vue/type/vue'`换成了`'@vue/runtime-core'`

### `vue-class-component`
  截止至该项目启动时，`vue-class-component`还没有完全支持`vue3.0`，文档也不完整，只能摸索着写。
  参考地址：[vue-class-component V8](https://github.com/vuejs/vue-class-component/issues?q=is%3Aissue+is%3Aopen+label%3Av8)

### `vuex4.0`
  参考文档：
  1、[vuex-typescript-m4j](https://dev.to/3vilarthas/vuex-typescript-m4j)
  2、[whats-new-in-vuex-4](https://blog.logrocket.com/whats-new-in-vuex-4/)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const webpackBarName = '后台管理系统'
const webpackBanner =
  ' build: 后台管理系统 \n 后台管理系统 author: wlf 173571145@qq.com \n  \n time: '
const moment = require('moment')
const time = moment(new Date()).format('YYYY-M-D HH:mm:ss')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      title: '管理系统',
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          // '*': resolve(''),
        },
      },
      plugins: [
        new WebpackBar({
          name: webpackBarName,
        }),
        // new CompressionWebpackPlugin({
        //   filename: '[path][base].gz',
        // }),
      ],
    }
  },
  chainWebpack(config) {
    config.when(process.env.NODE_ENV === 'development', config => {
      config.devtool('source-map')
    })
    config.when(process.env.NODE_ENV === 'production', config => {
      config.optimization.minimizer('terser').tap(args => {
        // 注释console.*
        args[0].terserOptions.compress.drop_console = true
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true
        // 移除 console.log
        args[0].terserOptions.compress.pure_funcs = ['console.log']
        // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
        args[0].terserOptions.output = {
          comments: false,
        }
        return args
      })
      config.performance.set('hints', false)
      config.devtool('none')
      // config.optimization.splitChunks({
      //   chunks: 'all',
      // })
      config
        .plugin('banner')
        .use(Webpack.BannerPlugin, [`${webpackBanner}${time}`])
        .end()
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true,
        })
        .end()
    })
  },
}

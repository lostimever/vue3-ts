module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/dmsmarket': {
        // target: 'http://192.168.150.156:8080',
        // target: 'http://192.168.100.154:8080',
        // target: 'http://192.168.150.253:8080',
        target: 'http://106.14.20.143:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/dmsmarket': '/dmsmarket',
        },
      },
    },
  },
}

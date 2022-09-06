const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const com = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')

module.exports = defineConfig({
  transpileDependencies: true,
  // 配置开发服务器，路径别名
  configureWebpack: {
    // 所写的所有的东西和webpack的配置一样
    devServer: {
      open: true, // 打开服务器的时候自动打开浏览器
      port: 9995, // 指定域名到本机
      host: 'localhost'
    },
    resolve: {
      alias: {
        com,
        views
      }
    }
  }
})

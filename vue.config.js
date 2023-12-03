/*
 * @Description: 
 * @Author: Rayce
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // 端口
  },
})

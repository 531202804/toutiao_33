const pxtorem = require('postcss-pxtorem')
module.exports = {
  // 插件配置
  plugins: [
    pxtorem({
      //   根节点字体大小
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] //所有属性转成rem
    })
  ]
}

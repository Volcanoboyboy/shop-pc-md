// 用来保存生产环境下的插件
const prodPlugins = [];
// 用来保存开发环境下的插件
const devPlugins = [];

// 生产环境
if (process.env.NODE_ENV === 'production') {
  // 删除 console.* 代码
  prodPlugins.push('transform-remove-console');
}
// 开发环境
else {
  // ElementUI，生产环境是直接通过CDN引入，所以无需再用该按需引入的插件
  devPlugins.push([
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk',
    },
  ]);
}

module.exports = {
  // 预设集，可以理解成一个插件集合的模板
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [...devPlugins, ...prodPlugins],
};

module.exports = {
  devServer: {
    port: 8080,
    open: true,
  },
  // 对象形式的，Vue CLI 会将其与默认的配置合并（缺点：不能写逻辑控制代码）
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     axios: 'axios',
  //     quill: 'Quill',
  //     dayjs: 'dayjs',
  //     'vue-quill-editor': 'VueQuillEditor',
  //     'element-ui': 'ELEMENT',
  //   }
  // },
  // 函数形式的，Vue CLI 会将当前默认配置对象以参数形式给你（优点：更灵活，可以写逻辑控制）
  configureWebpack: (config) => {
    // 生产环境
    if (process.env.NODE_ENV === 'production') {
      console.log('======生产环境======');
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        quill: 'Quill',
        dayjs: 'dayjs',
        'vue-quill-editor': 'VueQuillEditor',
        'element-ui': 'ELEMENT',
      };
    }
    // 开发环境
    else {
      console.log('=====开发环境=====');
    }
  },
  // 链式操作 （不推荐，因为会附带一些额外的API方法，需要记忆，而且不通用，记了也没用）
  // chainWebpack: (config) => {},
};

import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';

// 如果直接导入样式，那么该包还是会存在到打包目录中
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';

// 只有在开发环境在需要导入样式，因为生产环境使用的CDN引入，所以不需要
if (process.env.NODE_ENV === 'development') {
  // 这种方式引入的可以写在任何地方，比如：if 条件判断中， 最终不会加入到打包目录中
  // import('xxx') 类似于 node.js 的 require('xxx')
  import('quill/dist/quill.core.css');
  import('quill/dist/quill.snow.css');
  import('quill/dist/quill.bubble.css');
}

Vue.use(VueQuillEditor);

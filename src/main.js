import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 导入全局样式，为什么可以导入样式文件呢？因为Vue脚手架创建的项目内置的webpack打包工具，对于webpack而言，所有的文件都是模块
import './assets/styles/index.css';

// ElementUI插件
import './plugins/element-ui.js';

// 导入默认的 axios 对象
import './plugins/axios.js';

import MdInputButton from './components/MdInputButton.vue';

import './filters/time.js';

import './plugins/quill-editor.js';

Vue.config.productionTip = false;

// 这个动作其实可以放在 axios.js 插件模块中直接处理
// Vue.prototype.$request = axios;

Vue.component(MdInputButton.name, MdInputButton);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 这里导入的Vue构造函数只有一个，所有模块中导入的都一样
import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'element-ui';

// // 这是配到默认的axios对象上去了
// axios.defaults.baseURL = ''

// 但是后台接口在真实的项目中，很有可能是基于微服务架构，所以，不同的模块可能会有不同的接口地址
// 例如：用户数据相关的接口在 http://user.api.itcast.cn/api
// 例如：订单数据相关的接口在 http://order.api.itcast.cn/api

// axios.create 可以创建一个新的 axios 对象

// // 可以创建用户相关的 axios 实例对象
// const userAxios = axios.create({
//   baseURL: 'http://localhost:3001/api',
// });

// // 可以创建订单相关的 axios 实例对象
// const orderAxios = axios.create({
//   baseURL: 'http://localhost:3002/api',
// });

const defaultAxios = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
});

// 添加请求拦截器，在请求发出去之前，会经过这个拦截器处理
// 这个config就是当前的请求配置对象
defaultAxios.interceptors.request.use((config) => {
  // 统一在这里添加token请求头即可，就不用每次发请求时都写一遍了
  // 其实登录接口，是不需要请求头的，只有不是登录接口时，才需要加Authorization请求头
  if (config.url !== 'login') {
    config.headers.Authorization = sessionStorage.getItem('token');
  }
  console.log('开始准备发请求啦。。。。。，转起来.....');
  defaultAxios.__$_$_loadingInstance = Loading.service({
    fullscreen: true, // 是否全屏展示
    lock: true, // 当页面内容高度比较高时，会出现滚动条，这个配置可以让你指定是否锁住滚动条，在加载中时不让滚动页面
  });
  return config;
});

// 响应拦截器，当请求完成，获取到响应数据时，会触发该拦截器回调
defaultAxios.interceptors.response.use((res) => {
  Vue.nextTick(() => {
    console.log('请求完成啦。。。。，停止转圈圈。。。。');
    defaultAxios.__$_$_loadingInstance.close();
  });
  // 要把响应数据，原封不动的return出去，不然，在页面获取不到响应数据
  return res;
});

// 万一Vue.prototype上面已经内置了 request 这个属性，那不就覆盖了吗？
// 所以起特别一点的名字只有一个目的，就是避免冲突
Vue.prototype.$request = defaultAxios;
// Vue.prototype.$userRequest = userAxios;
// Vue.prototype.$orderRequst = orderAxios;

// export default defaultAxios;

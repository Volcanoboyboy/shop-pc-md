import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from '../views/Login.vue';
// import Home from '../views/Home.vue';
// import Users from '../views/Users.vue';
// import Welcome from '../views/Welcome.vue';
// import Roles from '../views/Roles.vue';
// import Rights from '../views/Rights.vue';
// import GoodsCategories from '../views/GoodsCategories.vue';
// import GoodsParams from '../views/GoodsParams.vue';
// import Goods from '../views/Goods.vue';
// import GoodsAdd from '../views/GoodsAdd.vue';

// 路由懒加载的作用（注意：不需要安装插件：@babel/plugin-syntax-dynamic-import，VueCLI创建的项目默认就支持）：
//  1. 会将每个组件打包成单独的文件中，否则，默认是将所有的组件打包到一个文件中
//  2. 在页面加载时，仅加载当前页面需要的组件文件
//  3. webpackChunkName: "自定义打包后的文件名"，同名的，在打包时，会打包到同一个文件中
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue');
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue');
const Users = () => import(/* webpackChunkName: "Users" */ '../views/Users.vue');
const Welcome = () => import(/* webpackChunkName: "Welcome" */ '../views/Welcome.vue');
const Roles = () => import(/* webpackChunkName: "Roles" */ '../views/Roles.vue');
const Rights = () => import(/* webpackChunkName: "Rights" */ '../views/Rights.vue');
const GoodsCategories = () => import(/* webpackChunkName: "GoodsCategories" */ '../views/GoodsCategories.vue');
const GoodsParams = () => import(/* webpackChunkName: "GoodsParams" */ '../views/GoodsParams.vue');
const Goods = () => import(/* webpackChunkName: "Goods" */ '../views/Goods.vue');
const GoodsAdd = () => import(/* webpackChunkName: "GoodsAdd" */ '../views/GoodsAdd.vue');

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/categories', component: GoodsCategories },
      { path: '/params', component: GoodsParams },
      { path: '/goods', component: Goods },
      { path: '/goods-add', component: GoodsAdd },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 前置（看到页面之前）守卫
// to:   到哪里去
// from: 从哪里来
// next: 放行函数，放行：next()，重定向：next('/some/route/path')
router.beforeEach((to, from, next) => {
  // 如果访问的不是登录页面
  //   那么就看你这个人有没有登录？
  //     如果没登录，那么就请先去登录
  //     如果登录了，那么就放行
  // 如果访问的就是登录页面
  //   直接放行

  if (to.path !== '/login') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

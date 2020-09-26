<template>
  <div class="home">
    <el-container class="box1">
      <el-header class="header">
        <div class="logo">
          <img src="../assets/heima.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="danger" @click="logout">退出</el-button>
      </el-header>
      <el-container class="box2">
        <!-- width不能写死，根据折叠展开状态来动态设置，当折叠时，为64px，展开时，为200px -->
        <el-aside class="aside" :width="isCollapse ? '64px' : '200px'">
          <!-- 左侧菜单 -->
          <!-- ElementUI 所有的组件默认有一个类型就是组件的标签名 -->
          <!-- 如果配置项是boolean类型的，只要加上属性名就是true -->
          <!-- 加上router属性，菜单就支持vue-router模式 -->

          <!-- 只需要在页面一加载时，获取location.hash地址，设置给default-active属性即可，就不要存到sessionStorage里面去了 -->
          <el-menu
            :default-active="activeMenuIndex"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <!-- index属性值就是菜单的唯一标识 -->
            <!-- submenu组件不会跳路由 -->
            <el-submenu
              v-for="menu in menus"
              :key="menu.id"
              :index="menu.id + ''"
            >
              <!-- title 插槽适合传入HTML片段 -->
              <!-- title 属性适合纯文本 -->
              <template slot="title">
                <i :class="iconMap[menu.id]"></i>
                <span>{{ menu.authName }}</span>
              </template>
              <!-- 只有menu-item组件才会跳路由 -->
              <el-menu-item
                v-for="submenu in menu.children"
                :key="submenu.id"
                :index="submenu.path"
              >
                <i :class="iconMap[submenu.id]"></i>
                {{ submenu.authName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- /左侧菜单 -->

          <!-- 控制展开折叠的按钮 -->
          <div class="toggle" @click="isCollapse = !isCollapse">
            <!-- el-icon-arrow-left  el-icon-arrow-right -->
            <i
              :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
            ></i>
          </div>
        </el-aside>
        <el-container class="box3">
          <el-main class="main">
            <router-view></router-view>
          </el-main>
          <el-footer class="footer"
            >© 2020 localhost:3000 湘ICP备20014907号</el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      iconMap: {
        125: "el-icon-user", // 用户管理
        110: "el-icon-s-custom", // 用户列表
        103: "el-icon-unlock", // 权限管理
        111: "el-icon-s-check", // 角色列表
        112: "el-icon-s-grid", // 权限列表
        101: "el-icon-s-shop", // 商品管理
        104: "el-icon-s-goods", // 商品列表
        115: "el-icon-s-operation", // 分类参数
        121: "el-icon-film", // 商品分类
        102: "el-icon-tickets", // 订单管理
        107: "el-icon-files", // 订单列表
        145: "el-icon-data-line", // 数据统计
        146: "el-icon-pie-chart", // 数据报表
      },
      menus: [],
      // 控制左侧菜单是否折叠
      isCollapse: false,
      activeMenuIndex: "",
    };
  },
  methods: {
    logout() {
      // 只需要清除sessionStorage中的token，并跳转到登录页即可
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    updateActiveMenuIndex() {
      // 处理左侧菜单获取焦点
      this.activeMenuIndex = location.hash.slice(2);
      // /处理左侧菜单获取焦点
    },
  },
  watch: {
    //  注意这个监听$route变化然后将地址栏赋值给激活MenuIndex
    $route() {
      this.updateActiveMenuIndex();
    },
  },
  mounted() {
    this.updateActiveMenuIndex();

    // 在页面一加载时，就需要获取左侧菜单数据
    this.$request.get("menus").then((res) => {
      console.log(res);
      // 失败
      if (res.data.meta.status !== 200) {
        this.$message.error(res.data.meta.msg);
      }
      // 成功
      else {
        this.menus = res.data.data;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .box1 {
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #373d41;

      .logo {
        display: flex;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
        }
        span {
          padding-left: 10px;
          color: #fff;
          font-size: 22px;
        }
      }
    }

    .box2 {
      .aside {
        position: relative;
        background-color: #333744;

        .el-menu {
          border-right: none;
        }

        .toggle {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
          line-height: 50px;
          color: #fff;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
      }

      .box3 {
        .main {
          background-color: #e9eef3;
        }
        .footer {
          background-color: #b3c0d1;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
}
</style>

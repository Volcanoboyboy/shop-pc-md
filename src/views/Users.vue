<template>
  <div class="users" v-loading.fullscreen.lock="isLoadingOfFullscreen">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" v-loading="isLoading">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" class="input-with-select" v-model.trim="queryKeywords" @change="search">
            <template v-slot:append>
              <el-button icon="el-icon-search" @click="search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="addUserDialog.visible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-table border style="width: 100%" :data="users">
            <el-table-column label="#" type="index" width="50"> </el-table-column>
            <el-table-column prop="username" label="姓名"> </el-table-column>
            <el-table-column prop="email" label="邮箱"> </el-table-column>
            <el-table-column prop="mobile" label="电话"> </el-table-column>
            <el-table-column prop="role_name" label="角色"> </el-table-column>
            <el-table-column prop="mg_state" label="状态">
              <!-- ES6的对象结构语法 -->
              <template #default="{ row: user }">
                <!-- v-model如何绑定这一行数据上的mg_state状态字段 -->
                <el-switch v-model="user.mg_state" @change="changeStatus(user)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template #default="{ row }">
                <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEditUserDialog(row)"></el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="delUser(row)"></el-button>
                <el-tooltip class="item" effect="dark" content="分配权限" placement="top" :enterable="false">
                  <el-button icon="el-icon-setting" size="mini" type="warning"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <!-- :current-page="currentPage4" -->
          <!-- 注意：page-size表示每页显示多少条数据，值需要在page-sizes这个数组中 -->
          <el-pagination
            @size-change="onPageSizeChange"
            @current-change="onPageNumberChange"
            :page-sizes="[1, 2, 5, 10, 15]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog :title="addUserDialog.title" :visible.sync="addUserDialog.visible">
      <template #default>
        <el-form
          ref="addUserDialogForm"
          :model="addUserDialog.form.data"
          :rules="addUserDialog.form.rules"
          label-width="80px"
        >
          <!-- el-form-item要添加prop属性验证才生效 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserDialog.form.data.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserDialog.form.data.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserDialog.form.data.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUserDialog.form.data.mobile" maxlength="11"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="addUserDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="addUserDialog.onOk" :loading="addUserDialog.isLoading">确 定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog :title="editUserDialog.title" :visible.sync="editUserDialog.visible">
      <template #default>
        <el-form
          ref="editUserDialogForm"
          :model="editUserDialog.form.data"
          :rules="editUserDialog.form.rules"
          label-width="80px"
        >
          <!-- el-form-item要添加prop属性验证才生效 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUserDialog.form.data.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserDialog.form.data.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editUserDialog.form.data.mobile" maxlength="11"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="editUserDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="editUserDialog.onOk" :loading="editUserDialog.isLoading">确 定</el-button>
      </template>
    </el-dialog>

    <hr />
    演示支持.sync修饰符的组件:
    <div>
      ptitle: <span>{{ ptitle }}</span>
    </div>
    <!-- <text-document :title="ptitle" @change-title="ptitle = $event"></text-document> -->
    <!-- 子组件如果想要支持.sync修饰符同步父组件传递进去的属性数据，必须触发自定义事件名称为 "update:属性名" 的形式 -->
    <text-document :title.sync="ptitle"></text-document>
  </div>
</template>

<script>
// 演示.sync修饰符的组件
import TextDocument from '../components/TextDocument.vue';

let timerIdOfLoadUsers = null;
export default {
  name: 'Users',
  // 注册局部组件
  components: {
    TextDocument,
  },
  data() {
    return {
      // 定义演示.sync修饰符的父组件数据
      ptitle: '父组件的ptitle',

      // 控制全屏加载中效果
      isLoadingOfFullscreen: false,
      // 添加用户对话框相关的数据
      addUserDialog: {
        title: '添加用户', // 标题
        visible: false, // 控制显示隐藏
        isLoading: false, // 控制确定按钮加载中
        // 表单相关配置
        form: {
          // 表单数据
          data: {
            username: '',
            password: '',
            email: '',
            mobile: '',
          },
          // 表单规则
          rules: {
            username: [
              { required: true, message: '请输入用户名' },
              { min: 5, max: 16, message: '长度在5~16个字符' },
            ],
            password: [
              { required: true, message: '请输入密码' },
              { min: 5, max: 16, message: '长度在5~16个字符' },
            ],
            email: [
              { required: true, message: '请输入邮箱' },
              {
                pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                message: '请输入正确的邮箱',
              },
            ],
            mobile: [
              { required: true, message: '请输入手机' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机' },
            ],
          },
        },
        // 确定回调函数
        onOk: () => {
          // 显示按钮的加载中效果
          this.addUserDialog.isLoading = true;
          // 调用表单验证方法
          this.$refs.addUserDialogForm
            .validate()
            .then(() => {
              // 表单验证通过时，返回一个发送请求，添加用户，返回Promise，交给下一个then处理响应数据
              return this.$request.post('users', this.addUserDialog.form.data);
            })
            // 获取到请求成功时的响应数据
            .then((res) => {
              if (res.data.meta.status === 201) {
                // 添加成功
                this.$message.success('添加成功');
                // 重新加载列表数据
                this.loadUsers();
                // 关闭对话框
                this.addUserDialog.visible = false;
                // 重置表单
                this.$refs.addUserDialogForm.resetFields();
              } else {
                // 添加失败
                this.$message.error(res.data.meta.msg);
              }
              // 不管添加成功还是失败，都把按钮的加载中效果取消
              this.addUserDialog.isLoading = false;
            })
            .catch(() => {
              // 表单验证失败时
              this.addUserDialog.isLoading = false;
            });
        },
        // 取消回调函数
        onCancel: () => {
          this.addUserDialog.visible = false;
        },
      },
      // 编辑用户对话框相关的数据
      editUserDialog: {
        title: '编辑用户', // 标题
        visible: false, // 控制显示隐藏
        isLoading: false, // 控制确定按钮是否加载中
        // 表单配置
        form: {
          // 表单数据
          data: {
            id: '',
            username: '',
            email: '',
            mobile: '',
          },
          // 表单规则
          rules: {
            email: [
              { required: true, message: '请输入邮箱' },
              {
                pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                message: '请输入正确的邮箱',
              },
            ],
            mobile: [
              { required: true, message: '请输入手机' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机' },
            ],
          },
        },
        // 确定回调函数
        onOk: () => {
          this.editUserDialog.isLoading = true;
          this.$refs.editUserDialogForm
            .validate()
            .then(() => {
              return this.$request.put(`users/${this.editUserDialog.form.data.id}`, {
                email: this.editUserDialog.form.data.email,
                mobile: this.editUserDialog.form.data.mobile,
              });
            })
            .then((res) => {
              if (res.data.meta.status === 200) {
                // 成功
                this.$message.success('修改成功');
                // 重新加载列表数据
                this.loadUsers();
                // 关闭对话框
                this.editUserDialog.visible = false;
              } else {
                // 失败
                this.$message.error(res.data.meta.msg);
              }
              this.editUserDialog.isLoading = false;
            })
            .catch(() => {
              this.editUserDialog.isLoading = false;
            });
        },
        // 取消回调函数
        onCancel: () => {
          this.editUserDialog.visible = false;
        },
      },
      users: [],
      isLoading: false, // 用户列表是否加载中
      // 将一类数据放到一起，可以增加代码可读性和后期维护性
      page: {
        number: 1, // 当前页
        size: 5, // 每页条数
        total: 0, // 总条数
      },
      // 条件筛选关键字
      queryKeywords: '',
    };
  },
  methods: {
    // 删除用户
    delUser(user) {
      this.$confirm(`你确定要删除 "${user.username}" 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return this.$request.delete(`users/${user.id}`);
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message.success('删除成功!');
            this.loadUsers();
          } else {
            this.$message.error(res.data.meta.msg);
          }
        });
    },
    // 打开编辑用户对话框
    openEditUserDialog(user) {
      this.editUserDialog.visible = true;
      // 将点击的用户数据赋值到编辑用户对话框的表单中
      this.editUserDialog.form.data.id = user.id;
      this.editUserDialog.form.data.username = user.username;
      this.editUserDialog.form.data.email = user.email;
      this.editUserDialog.form.data.mobile = user.mobile;
      // /将点击的用户数据赋值到编辑用户对话框的表单中
    },
    // 当前页码改变时触发
    onPageNumberChange(pageNumber) {
      this.page.number = pageNumber;
      this.loadUsers();
    },
    // 搜索
    search() {
      // 先要把当前页面设置到第1页
      // 再发送请求获取列表数据
      this.page.number = 1;
      this.loadUsers();
    },
    // 加载用户列表
    loadUsers() {
      // 当发送请求前，开启加载中提示。。。
      this.isLoading = true;
      // 防抖处理
      if (timerIdOfLoadUsers !== null) {
        clearTimeout(timerIdOfLoadUsers);
      }
      timerIdOfLoadUsers = setTimeout(() => {
        this.$request
          .get('users', {
            params: {
              query: this.queryKeywords,
              pagenum: this.page.number,
              pagesize: this.page.size,
            },
          })
          .then((res) => {
            // 获取成功
            if (res.data.meta.status === 200) {
              // 将用户列表数据保存到data中
              this.users = res.data.data.users;
              this.page.total = res.data.data.total;
            }
            // 获取失败
            else {
              this.$message.error(res.data.meta.msg);
            }
            // 当请求完成时，隐藏加载中提示。。。
            this.isLoading = false;
          });
      }, 500);
    },
    // 每页显示条数改变时触发
    onPageSizeChange(pageSize) {
      // 需要更新每页条数 this.page.size = pageSize;
      this.page.size = pageSize;
      // 触发该事件时，需要重新请求接口，刷新数据
      this.loadUsers();
    },
    changeStatus(user) {
      this.isLoadingOfFullscreen = true;
      // 发球请求，更改用户状态即可
      this.$request.put(`users/${user.id}/state/${user.mg_state}`).then((res) => {
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg);
        } else {
          this.$message.error(res.data.meta.msg);
        }
        this.isLoadingOfFullscreen = false;
      });
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
</style>

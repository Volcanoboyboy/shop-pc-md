<template>
  <div class="roles">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 头部按钮 -->
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="addRoleDialog.visible = true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-table border :data="roles">
            <el-table-column type="expand">
              <template #default="{ row }">
                <template v-if="!row.children || row.children.length === 0">
                  暂无权限
                </template>

                <!-- 遍历一级权限 -->
                <el-row v-for="v1 in row.children" :key="v1.id" class="level1-row">
                  <el-col :span="4">
                    <el-tag closable @close="delRight(v1, row)">{{ v1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <!-- 嵌套遍历二级权限 -->
                    <el-row v-for="v2 in v1.children" :key="v2.id" class="level2-row">
                      <el-col :span="6">
                        <el-tag closable type="success" @close="delRight(v2, row)">{{ v2.authName }}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <!-- 嵌套遍历三级权限 -->
                        <el-tag
                          closable
                          v-for="v3 in v2.children"
                          :key="v3.id"
                          type="warning"
                          style="margin: 5px 10px 5px 0;"
                          @close="delRight(v3, row)"
                          >{{ v3.authName }}</el-tag
                        >
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button icon="el-icon-edit" size="mini" type="primary" @click="editRoleDialog.open(row)"></el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="delRole(row)"></el-button>
                <el-button icon="el-icon-setting" size="mini" type="warning" @click="assignRights(row)"
                  >分配权限</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog :title="assignRightsDialog.title" :visible.sync="assignRightsDialog.visible">
      <template #default>
        <!-- node-key 每个树节点用来作为唯一标识的属性（数据中的字段键名） -->
        <!-- default-checked-keys 这个默认选中的节点只会渲染一次 -->
        <!-- :default-checked-keys="assignRightsDialog.rightIdsOfLeaf"，说明：这个配置只会生效一次，第二次会有问题 -->
        <el-tree
          ref="assignRightsDialogTreeRef"
          default-expand-all
          show-checkbox
          :data="rights"
          node-key="id"
          :props="{
            /* 指定子节点字段，默认值就是children */
            children: 'children',
            /* 指定节点名称字段，默认值是label */
            label: 'authName',
          }"
        ></el-tree>
      </template>

      <template #footer>
        <el-button @click="assignRightsDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="assignRightsDialog.onOk">确 定</el-button>
      </template>
    </el-dialog>

    <el-dialog :title="addRoleDialog.title" :visible.sync="addRoleDialog.visible">
      <template #default>
        <el-form
          ref="addRoleFormRef"
          label-width="80px"
          :model="addRoleDialog.form.data"
          :rules="addRoleDialog.form.rules"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model.trim="addRoleDialog.form.data.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model.trim="addRoleDialog.form.data.roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="addRoleDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="addRoleDialog.onOk">确 定</el-button>
      </template>
    </el-dialog>

    <el-dialog :title="editRoleDialog.title" :visible.sync="editRoleDialog.visible">
      <template #default>
        <el-form
          ref="editRoleFormRef"
          label-width="80px"
          :model="editRoleDialog.form.data"
          :rules="editRoleDialog.form.rules"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model.trim="editRoleDialog.form.data.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model.trim="editRoleDialog.form.data.roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="editRoleDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="editRoleDialog.onOk">确 定</el-button>
      </template>
    </el-dialog>

    <p id="ppp" v-if="isShowP">asdfkjalsdkfjalsdfkjalsdkfjl</p>
    <button @click="showP">showP</button>
  </div>
</template>

<script>
// 标记变量：是否加载过权限数据
let isLoadedOfRigths = false;

export default {
  name: 'Roles',
  data() {
    return {
      // 测试代码
      isShowP: false,

      // 添加角色对话框配置对象
      addRoleDialog: {
        visible: false,
        title: '添加角色',
        form: {
          data: {
            roleName: '',
            roleDesc: '',
          },
          rules: {
            roleName: [{ required: true, message: '请输入角色名称' }],
            roleDesc: [{ required: true, message: '请输入角色描述' }],
          },
        },
        onOk: async () => {
          // 1. 验证表单数据是否合法
          try {
            await this.$refs.addRoleFormRef.validate();
            // 2. 如果合法，则发请求
            const res = await this.$request.post('roles', this.addRoleDialog.form.data);
            if (res.data.meta.status === 201) {
              // 2.1. 请求成功，才关闭对话框
              this.addRoleDialog.visible = false;
              // 2.2. 刷新列表数据
              this.loadRoles();
              // 2.3. 重置表单
              this.$refs.addRoleFormRef.resetFields();
            } else {
              //  2.2. 请求失败，给个this.$message.error提示
              this.$message.error(res.data.meta.msg);
            }
          } catch (err) {}
          // 3. 否则不用处理
        },
        onCancel: () => {
          this.addRoleDialog.visible = false;
        },
      },

      // 编辑角色对话框配置数据
      editRoleDialog: {
        visible: false,
        title: '编辑角色',
        role: null, // 用来保存当前编辑的角色对象数据
        form: {
          data: {
            roleName: '',
            roleDesc: '',
          },
          rules: {
            roleName: [{ required: true, message: '请输入角色名称' }],
            roleDesc: [{ required: true, message: '请输入角色描述' }],
          },
        },
        onOk: async () => {
          // 1. 验证表单数据是否合法
          try {
            await this.$refs.editRoleFormRef.validate();
            // 2. 如果合法，则发请求
            const res = await this.$request.put(`roles/${this.editRoleDialog.role.id}`, this.editRoleDialog.form.data);
            if (res.data.meta.status === 200) {
              // 2.1. 请求成功，才关闭对话框
              this.editRoleDialog.visible = false;
              // 2.2. 更新列表中该角色的名称和描述即可，无需重新加载所有的角色数据
              this.editRoleDialog.role.roleName = this.editRoleDialog.form.data.roleName;
              this.editRoleDialog.role.roleDesc = this.editRoleDialog.form.data.roleDesc;
            } else {
              //  2.2. 请求失败，给个this.$message.error提示
              this.$message.error(res.data.meta.msg);
            }
          } catch (err) {}
          // 3. 否则不用处理
        },
        onCancel: () => {
          this.editRoleDialog.visible = false;
        },
        open: (role) => {
          this.editRoleDialog.role = role;
          this.editRoleDialog.form.data.roleName = role.roleName;
          this.editRoleDialog.form.data.roleDesc = role.roleDesc;
          this.editRoleDialog.visible = true;
        },
      },

      rights: [], // 用来保存所有可选的权限树形数据
      roles: [],
      // 分配权限对话框的配置
      assignRightsDialog: {
        title: '分配权限', // 标题
        visible: false, // 控制显示隐藏
        role: null, // 用来保存当前操作的角色对象
        rightIdsOfLeaf: [], // 保存当前角色拥有的叶子权限id集合
        // 这里不写箭头函数的话，函数内部的this指向不是vm实例，而是undefined
        // onOK() {},
        onOk: async () => {
          // 1. 先要获取到用户在树形组件中选择的权限
          // 1.1. 要获取所有选中的节点的key（包括叶子节点和非叶子节点）
          const checkedKeys = this.$refs.assignRightsDialogTreeRef.getCheckedKeys(false /* 是否仅包含叶子节点 */);
          // 1.2. 要获取所有半选中的节点的key
          const halfCheckedKeys = this.$refs.assignRightsDialogTreeRef.getHalfCheckedKeys();
          // 1.3. 要把 所有选中的节点的key 和 所有半选中的节点的key 合并到一起，在转换成以逗号","隔开的字符串，传递给后台接口
          const rids = checkedKeys.concat(halfCheckedKeys).join(',');
          // 2. 请求后台接口，设置该角色的权限
          const res = await this.$request.post(`roles/${this.assignRightsDialog.role.id}/rights`, { rids });
          if (res.data.meta.status === 200) {
            this.$message.success('授权成功');
            // 3. 设置完后，再来关闭对话框
            this.assignRightsDialog.visible = false;
            // 4. 设置完后，刷新角色数据
            // this.loadRoles();

            const role = await this.getRoleById(this.assignRightsDialog.role.id);
            // console.log(role, '最新的包含权限数据的role信息');
            // 用最新的数据替换列表中旧的角色数据
            this.assignRightsDialog.role.children = role.children;
          } else {
            this.$message.error(res.data.meta.msg);
          }
        },
        onCancel: () => {
          this.assignRightsDialog.visible = false;
        },
      },
    };
  },
  methods: {
    showP() {
      // 数据的赋值是同步操作，但是DOM的渲染是异步操作
      this.isShowP = true; // 显示p标签
      // 如果能过拿到p标签，说明在执行这行代码时，P标签已经显示在页面中了
      // 如果拿不到，说明在执行这行代码时，P标签还木有显示在页面中，说明vue是异步渲染DOM的
      console.log(document.getElementById('ppp'), '马上获取的#ppp');
      // this.$nextTick方法会等待真正的DOM渲染完后，再调用其回调
      this.$nextTick(() => {
        console.log(document.getElementById('ppp'), '在$nextTick中获取#ppp');
      });
    },

    async delRole(role) {
      // 1. 弹出一个确认框，防止用户误点
      try {
        await this.$confirm(`你确定要删除 "${role.roleName}" 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        // 2. 如果用户点击确认，则调用接口，删除该角色
        const res = await this.$request.delete(`roles/${role.id}`);
        if (res.data.meta.status === 200) {
          // 2.1. 如果请求成功，则从所有的角色数组中剔除该角色即可，也无需请求所有的角色数据
          // 从数组中删除元素：
          // 方法1. 先把该角色的在数组中的索引找到（findIndex），然后通过数组的 (splice) 方法剔除该元素
          // const index = this.roles.findIndex(v => v.id === role.id)
          // this.roles.splice(index, 1);
          // 方法2. 直接调用 (fitler) 方法，把被删除的角色过滤掉，将返回的新数组赋值给this.roles
          this.roles = this.roles.filter((v) => v.id !== role.id);
        } else {
          // 2.2. 如果请求失败，则弹出消息框给用户提示即可
          this.$message.error(res.data.meta.msg);
        }
      } catch (err) {}
      // 3. 如果用户点击取消，关闭确认对话框即可
    },

    async delRight(right, role) {
      const res = await this.$request.delete(`roles/${role.id}/rights/${right.id}`);
      console.log(res, 'res...');
      if (res.data.meta.status === 200) {
        role.children = res.data.data;
        this.$notify.success({ title: '成功', message: '删除成功' });
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },

    // 递归函数：用来处理角色拥有的权限id集合
    recursionFn(rgiths) {
      rgiths.forEach((v) => {
        // 非叶子节点，继续递归
        if (v.children && v.children.length > 0) {
          this.recursionFn(v.children);
        }
        // 叶子节点，直接push到权限id集合中
        else {
          this.assignRightsDialog.rightIdsOfLeaf.push(v.id);
        }
      });
    },
    // 点击分配权限按钮时触发
    async assignRights(role) {
      // 清空当前角色拥有的叶子权限id集合
      this.assignRightsDialog.rightIdsOfLeaf = [];

      // 是否有加载过权限树形数据，如果没有加载过，就去请求后台接口获取所有权限树形数据
      if (!isLoadedOfRigths) {
        const res = await this.$request.get('rights/tree');
        console.log(res, '树形权限数据');
        if (res.data.meta.status === 200) {
          // 保存数据
          this.rights = res.data.data;
          isLoadedOfRigths = true;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      }

      this.recursionFn(role.children);

      this.assignRightsDialog.role = role;
      this.assignRightsDialog.visible = true;

      // $nextTick，会等待下一次DOM渲染完成后，调用其回调函数
      // 因为我们的数据变了，并不会第一时间去更新DOM，Vue会等待所有的同步代码执行完后，再去根据最新的虚拟DOM，渲染出真正的DOM，是一个异步操作
      this.$nextTick(() => {
        // 通过调用el-tree组件实例的方法，来动态设置选中的节点，需要等待对话框显示出来后，再调用
        this.$refs.assignRightsDialogTreeRef.setCheckedKeys(this.assignRightsDialog.rightIdsOfLeaf, true);
      });
    },
    // 加载所有角色数据
    async loadRoles() {
      const res = await this.$request.get('roles');
      if (res.data.meta.status === 200) {
        this.roles = res.data.data;
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    // 根据角色id获取该角色的数据
    async getRoleById(id) {
      // 由于后台根据ID获取角色信息的接口，返回的数据中并没有包含该角色的权限，所以，我们需要自己根据所有角色数据封装一下
      const res = await this.$request.get('roles');
      if (res.data.meta.status === 200) {
        // 从获取的所有角色列表中，找出该id的角色，返回出去
        return res.data.data.find((v) => v.id === id);
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
  },
  mounted() {
    this.loadRoles();
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;

  .level1-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;

    &:first-child {
      border-top: 1px solid #ddd;
    }

    .level2-row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>

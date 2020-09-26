<template>
  <div class="goods-params">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px;">
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"> </el-alert>

      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <span>选择商品分类：</span>
          <el-cascader
            v-model="cat_ids"
            :options="categories"
            :props="{
              // 指定展示文本的字段名
              label: 'cat_name',
              // 指定值的字段名
              value: 'cat_id',
            }"
            clearable
            @change="onChangeOfCategories"
          ></el-cascader>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="onTabClick">
            <el-tab-pane name="many">
              <template #label>
                <i class="el-icon-files"></i>
                动态参数
              </template>
              <template #default>
                <el-row>
                  <el-col :span="24">
                    <el-button
                      type="primary"
                      size="mini"
                      :disabled="cat_ids.length !== 3"
                      @click="addManyDialog.visible = true"
                      >添加参数</el-button
                    >
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                  <el-col :span="24">
                    <el-table border :data="manyList">
                      <el-table-column type="expand">
                        <template #default="{ row }">
                          <!-- <span v-if="row._md_attr_vals_arr.length === 0">暂无数据</span> -->
                          <!-- template 标签最终不会渲染到页面中，仅仅作为一个包裹元素 -->
                          <!-- <template v-else> -->
                            <el-tag
                              v-for="v in row._md_attr_vals_arr"
                              :key="v"
                              closable
                              style="margin: 0 10px 10px 0;"
                              @close="removeParamAttrVal(v, row)"
                              >{{ v }}</el-tag
                            >
                            <!-- native: 会在组件内部的根元素上监听该原生事件，子元素可以通过冒泡的形式触发 -->
                            <!-- @keyup.enter.native="handleInputConfirm" -->
                            <!-- @change="onChangeOfMdInputButton" -->
                            <md-input-button
                              v-model.trim="row._md_attr_val_input_value"
                              @blur-or-enter="onBlurOrEnterOfMdInputButton(row)"
                            ></md-input-button>
                          <!-- </template> -->
                        </template>
                      </el-table-column>
                      <el-table-column type="index" label="#"></el-table-column>
                      <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                      <el-table-column label="操作">
                        <template #default="{ row }">
                          <el-button
                            icon="el-icon-edit"
                            size="mini"
                            type="primary"
                            @click="editManyDialog.open(row)"
                          ></el-button>
                          <el-button icon="el-icon-delete" size="mini" type="danger" @click="delMany(row)"></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </template>
            </el-tab-pane>
            <el-tab-pane name="only">
              <template #label>
                <i class="el-icon-box"></i>
                静态属性
              </template>
              <template #default>
                <el-row>
                  <el-col :span="24">
                    <el-button type="primary" size="mini" :disabled="cat_ids.length !== 3">添加属性</el-button>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                  <el-col :span="24">
                    <el-table border :data="onlyList">
                      <el-table-column type="expand">
                        <template #default="{ row }">
                          <!-- <span v-if="row._md_attr_vals_arr.length === 0">暂无数据</span> -->
                          <!-- template 标签最终不会渲染到页面中，仅仅作为一个包裹元素 -->
                          <!-- <template v-else> -->
                            <el-tag
                              v-for="v in row._md_attr_vals_arr"
                              :key="v"
                              closable
                              style="margin: 0 10px 10px 0;"
                              @close="removeParamAttrVal(v, row)"
                              >{{ v }}</el-tag
                            >
                            <!-- v-model: 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件 -->
                            <!-- 类似：
                              :value="row._md_attr_val_input_value"
                              @input="row._md_attr_val_input_value = $event" 
                            -->
                            <!-- @change="onChangeOfMdInputButton" -->
                            <md-input-button
                              v-model.trim="row._md_attr_val_input_value"
                              @blur-or-enter="onBlurOrEnterOfMdInputButton(row)"
                            ></md-input-button>
                          <!-- </template> -->
                        </template>
                      </el-table-column>
                      <el-table-column type="index" label="#"></el-table-column>
                      <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                      <el-table-column label="操作">
                        <template #default>
                          <el-button icon="el-icon-edit" size="mini" type="primary"></el-button>
                          <el-button icon="el-icon-delete" size="mini" type="danger"></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加动态参数对话框 -->
    <el-dialog :title="addManyDialog.title" :visible.sync="addManyDialog.visible">
      <template #default>
        <el-form
          ref="addManyDialogFormRef"
          :model="addManyDialog.form.data"
          :rules="addManyDialog.form.rules"
          label-width="80px"
        >
          <!-- el-form-item要添加prop属性验证才生效 -->
          <el-form-item label="参数名称" prop="attr_name">
            <el-input v-model="addManyDialog.form.data.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="addManyDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="addManyDialog.onOk" :loading="addManyDialog.isLoading">确 定</el-button>
      </template>
    </el-dialog>

    <!-- 一般公司中最好不要共用重复的对话框，最不好的一点就是，后续产品需求如果有变更，可能会导致代码极其难以维护 -->

    <!-- 编辑动态参数对话框 -->
    <el-dialog :title="editManyDialog.title" :visible.sync="editManyDialog.visible">
      <template #default>
        <el-form
          ref="editManyDialogFormRef"
          :model="editManyDialog.form.data"
          :rules="editManyDialog.form.rules"
          label-width="80px"
        >
          <!-- el-form-item要添加prop属性验证才生效 -->
          <el-form-item label="参数名称" prop="attr_name">
            <el-input v-model="editManyDialog.form.data.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="editManyDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="editManyDialog.onOk" :loading="editManyDialog.isLoading">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsParams',
  data() {
    return {
      addManyDialog: {
        title: '添加动态参数',
        visible: false,
        isLoading: false,
        form: {
          data: {
            attr_name: '',
          },
          rules: {
            attr_name: [{ required: true, message: '请输入动态参数名称' }],
          },
        },
        onOk: async () => {
          this.addManyDialog.isLoading = true;
          try {
            await this.$refs.addManyDialogFormRef.validate();
            const res = await this.$request.post(`categories/${this.cat_id}/attributes`, {
              attr_name: this.addManyDialog.form.data.attr_name,
              attr_sel: 'many',
            });
            if (res.data.meta.status === 201) {
              res.data.data._md_attr_vals_arr = [];
              res.data.data._md_attr_val_input_value = '';
              this.manyList.push(res.data.data);
              this.addManyDialog.visible = false;
              this.$message.success('动态参数添加成功');
            } else {
              this.$message.error(res.data.meta.msg);
            }
          } catch (err) {}
          this.addManyDialog.isLoading = false;
        },
        onCancel: () => {
          this.addManyDialog.visible = false;
        },
      },
      editManyDialog: {
        title: '修改动态参数',
        visible: false,
        isLoading: false,
        attr: null, // 保存当前编辑的属性数据对象
        form: {
          data: {
            attr_name: '',
          },
          rules: {
            attr_name: [{ required: true, message: '请输入动态参数名称' }],
          },
        },
        onOk: async () => {
          this.editManyDialog.isLoading = true;
          try {
            await this.$refs.editManyDialogFormRef.validate();
            const res = await this.$request.put(
              `categories/${this.cat_id}/attributes/${this.editManyDialog.attr.attr_id}`,
              {
                attr_name: this.editManyDialog.form.data.attr_name,
                attr_sel: 'many',
              }
            );
            if (res.data.meta.status === 200) {
              this.editManyDialog.attr.attr_name = this.editManyDialog.form.data.attr_name;
              this.editManyDialog.visible = false;
              this.$message.success('动态参数修改成功');
            } else {
              this.$message.error(res.data.meta.msg);
            }
          } catch (err) {
            console.log(err);
          }
          this.editManyDialog.isLoading = false;
        },
        onCancel: () => {
          this.editManyDialog.visible = false;
        },
        open: (attr) => {
          this.editManyDialog.attr = attr;
          this.editManyDialog.form.data.attr_name = attr.attr_name;
          this.editManyDialog.visible = true;
        },
      },
      activeName: 'many',
      cat_ids: [],
      categories: [],
      manyList: [], // 动态参数列表
      onlyList: [], // 静态属性列表
    };
  },
  computed: {
    cat_id() {
      if (this.cat_ids.length === 3) {
        return this.cat_ids[this.cat_ids.length - 1];
      }
      return null;
    },
  },
  methods: {
    async delMany(attr) {
      try {
        await this.$confirm(`你确定要删除 "${attr.attr_name}" 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        // 如果能够走到这里，就说明用户点击了确定按钮
        const res = await this.$request.delete(`categories/${this.cat_id}/attributes/${attr.attr_id}`)
        if (res.data.meta.status === 200) {
          this.manyList = this.manyList.filter(v => v.attr_id !==  attr.attr_id);
          this.$message.success('删除成功');
        } else {
          this.$message.error(res.data.meta.msg);
        }
      } catch(err) {}
    },

    // 更新参数属性值集合
    // row：这个参数对象
    // attr_vals：这个参数对象中的属性值（通过空格分隔开的字符串）
    async updateParamAttrVals(row, attr_vals) {
      const res = await this.$request.put(`categories/${row.cat_id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals,
      });
      if (res.data.meta.status === 200) {
        // 更新这行的数据
        row.attr_vals = attr_vals;
        // 要更新这个，页面才会渲染出最新的数据，因为我们循环是就是通过这个属性循环的
        row._md_attr_vals_arr = attr_vals.split(' ');
        // 重置input框中的数据
        row._md_attr_val_input_value = '';
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    // 删除参数属性值
    removeParamAttrVal(attr_val, row) {
      const attr_vals = row._md_attr_vals_arr.filter((v) => v !== attr_val).join(' ');
      this.updateParamAttrVals(row, attr_vals);
    },
    // 监听组件 MdInputButton 的失去焦点和回车事件
    async onBlurOrEnterOfMdInputButton(row) {
      if (row._md_attr_val_input_value === '') {
        return;
      }
      // 如果当前输入的值已存在，不应该添加成功，给用户一个提示
      if (row._md_attr_vals_arr.includes(row._md_attr_val_input_value)) {
        this.$message.warning(`属性值 "${row._md_attr_val_input_value}" 已存在！`);
        return;
      }
      // 将输入框中的值，和目前这个参数已有的属性值，拼接成新的属性值字符串
      const attr_vals = (row.attr_vals + ' ' + row._md_attr_val_input_value).trim();
      this.updateParamAttrVals(row, attr_vals);
    },
    // 当tab栏点击时
    onTabClick() {
      if (
        // 如果当前激活面板是动态参数，并且动态参数列表已经有数据了
        (this.activeName === 'many' && this.manyList.length > 0) ||
        // 如果当前激活面板是静态属性，并且静态属性列表已经有数据了
        (this.activeName === 'only' && this.onlyList.length > 0)
      ) {
        return;
      }
      // 只有当选择了分类，才获取对应面板的数据
      this.loadListOfActivePanel();
    },
    // 当分类改变时
    async onChangeOfCategories() {
      this.manyList = [];
      this.onlyList = [];
      this.loadListOfActivePanel();
    },
    // 加载当前激活面板的列表数据
    async loadListOfActivePanel() {
      if (this.cat_ids.length === 3) {
        const res = await this.$request.get(`categories/${this.cat_ids[this.cat_ids.length - 1]}/attributes`, {
          params: {
            sel: this.activeName,
          },
        });
        if (res.data.meta.status === 200) {
          // 添加自定义字段 _md_attr_vals_arr
          // 注意：这个添加属性的操作，一定要放在赋值给vue实例的数据之前
          // 否则需要借助 Vue.set 或 this.$set
          res.data.data.forEach((v) => {
            // 因为：''.split(' ')  ==>   [ '' ]
            v._md_attr_vals_arr = v.attr_vals === '' ? [] : v.attr_vals.split(' ');
            v._md_attr_val_input_visible = false; // 添加一个控制该行数据展开列中输入框的显示隐藏
            v._md_attr_val_input_value = ''; // 输入框的值
          });

          if (this.activeName === 'many') {
            this.manyList = res.data.data;
          } else {
            // only
            this.onlyList = res.data.data;
          }
        } else {
          this.$message.error(res.data.meta.msg);
        }
      } else {
        this.cat_ids = [];
        this.manyList = [];
        this.onlyList = [];
      }
    },
    // 加载分类数据
    async loadCategories() {
      const res = await this.$request.get('categories');
      if (res.data.meta.status === 200) {
        this.categories = res.data.data;
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
  },
  created() {
    this.loadCategories();
  },
};
</script>

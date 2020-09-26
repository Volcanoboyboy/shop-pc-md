<template>
  <div class="goods-categories">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="addCategoryDialog.open">添加分类</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- row-key 用来标识树形表格数据中的 每行数据的 唯一标识字段 -->
          <el-table
            border
            style="margin-top: 20px;"
            :data="list"
            :tree-props="{ children: 'children' }"
            row-key="cat_id"
          >
            <el-table-column type="index" label="#">
              <template #default="{ row }">
                <!-- 只有是1级分类时，才会有 _$_$_index 这个数据 -->
                {{ row._$_$_index }}
              </template>
            </el-table-column>
            <el-table-column label="分类名称" prop="cat_name"></el-table-column>
            <el-table-column label="是否有效" prop="cat_deleted">
              <template #default="{ row }">
                <i v-if="!row.cat_deleted" class="el-icon-circle-check"></i>
                <i v-else class="el-icon-circle-close"></i>
              </template>
            </el-table-column>
            <el-table-column label="排序" prop="cat_level">
              <template #default="{ row }">
                <el-tag size="mini" v-if="row.cat_level === 0">一级</el-tag>
                <el-tag size="mini" v-else-if="row.cat_level === 1" type="success">二级</el-tag>
                <el-tag size="mini" v-else type="warning">三级</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button
                  icon="el-icon-edit"
                  size="mini"
                  type="primary"
                  @click="editCategoryDialog.open(row)"
                ></el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="delCategory(row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <!-- :current-page="currentPage4" -->
          <el-pagination
            @size-change="onPageSizeChange"
            @current-change="onPageNumberChange"
            :page-sizes="[2, 5, 10, 15, 20]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog :title="addCategoryDialog.title" :visible.sync="addCategoryDialog.visible">
      <template #default>
        <el-form
          ref="addCategoryDialogFormRef"
          :model="addCategoryDialog.form.data"
          :rules="addCategoryDialog.form.rules"
          label-width="80px"
        >
          <!-- el-form-item要添加prop属性验证才生效 -->
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model.trim="addCategoryDialog.form.data.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类" prop="cat_pid">
            <el-cascader
              style="width: 100%;"
              v-model="addCategoryDialog.form.data.cat_pid"
              :options="addCategoryDialog.categories"
              :props="{
                // 指定展示文本的字段名
                label: 'cat_name',
                // 指定值的字段名
                value: 'cat_id',
                // 是否支持选中任意一级
                checkStrictly: true,
              }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="addCategoryDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="addCategoryDialog.onOk" :loading="addCategoryDialog.isLoading"
          >确 定</el-button
        >
      </template>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog :title="editCategoryDialog.title" :visible.sync="editCategoryDialog.visible">
      <template #default>
        <el-form
          ref="editCategoryDialogFormRef"
          :model="editCategoryDialog.form.data"
          :rules="editCategoryDialog.form.rules"
          label-width="80px"
        >
          <!-- el-form-item要添加prop属性验证才生效 -->
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model.trim="editCategoryDialog.form.data.cat_name"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="editCategoryDialog.onCancel">取 消</el-button>
        <el-button type="primary" @click="editCategoryDialog.onOk" :loading="editCategoryDialog.isLoading"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script>
let timerIdOfLoadList = null;

export default {
  name: 'GoodsCategories',
  data() {
    return {
      addCategoryDialog: {
        title: '添加分类',
        visible: false,
        isLoading: false,
        categories: [],
        form: {
          data: {
            cat_name: '',
            cat_pid: [],
            cat_level: '',
          },
          rules: {
            cat_name: [{ required: true, message: '请输入分类名称' }],
          },
        },
        // 打开添加分类对话框
        open: async () => {
          const res = await this.$request.get('categories', {
            params: {
              type: 2,
            },
          });
          if (res.data.meta.status === 200) {
            this.addCategoryDialog.categories = res.data.data;
            this.addCategoryDialog.visible = true;
          } else {
            this.$message.error(res.data.meta.msg);
          }
        },
        onOk: async () => {
          this.addCategoryDialog.isLoading = true;
          try {
            // 验证表单数据
            await this.$refs.addCategoryDialogFormRef.validate();
            // 只要能够走到这里来，就说明验证通过了

            // 1. 获取表单数据
            // 2. 组装请求参数
            // 3. 发送请求
            const pids = this.addCategoryDialog.form.data.cat_pid;
            const cat_name = this.addCategoryDialog.form.data.cat_name;
            const cat_level = pids.length; // 碰巧，这个值和pids的length一样
            const res = await this.$request.post('categories', {
              cat_pid: pids.length > 0 ? pids[pids.length - 1] : 0, // 不能为空，如果要添加1级分类，则父分类Id应该设置为 `0`
              cat_name, // 不能为空
              cat_level, // 不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类
            });
            if (res.data.meta.status === 201) {
              this.$message.success('添加成功');
              this.addCategoryDialog.isLoading = false; // 停止确定按钮的加载中动画
              this.addCategoryDialog.visible = false; // 关闭对话框
              this.$refs.addCategoryDialogFormRef.resetFields(); // 重置表单
              this.loadList(); // 刷新列表数据
            } else {
              this.$message.error(res.data.meta.msg);
            }
          } catch (err) {}
        },
        onCancel: () => {
          this.addCategoryDialog.isLoading = false;
          this.addCategoryDialog.visible = false;
        },
      },

      // 编辑分类对话框配置数据
      editCategoryDialog: {
        title: '编辑分类',
        visible: false,
        isLoading: false,
        category: null, // 保存当前编辑的分类对象
        form: {
          data: {
            cat_name: '',
          },
          rules: {
            cat_name: [{ required: true, message: '请输入分类名称' }],
          },
        },
        open: (category) => {
          this.editCategoryDialog.category = category;
          this.editCategoryDialog.form.data.cat_name = category.cat_name;
          this.editCategoryDialog.visible = true;
        },
        onOk: async () => {
          this.editCategoryDialog.isLoading = true;
          try {
            // 验证表单数据
            await this.$refs.editCategoryDialogFormRef.validate();
            // 只要能够走到这里来，就说明验证通过了

            // 1. 获取表单数据
            // 2. 组装请求参数
            // 3. 发送请求
            const cat_id = this.editCategoryDialog.category.cat_id;
            const cat_name = this.editCategoryDialog.form.data.cat_name;
            const res = await this.$request.put(`categories/${cat_id}`, {
              cat_name, // 不能为空
            });
            if (res.data.meta.status === 200) {
              this.$message.success('编辑成功');
              this.editCategoryDialog.isLoading = false; // 停止确定按钮的加载中动画
              this.editCategoryDialog.visible = false; // 关闭对话框
              this.$refs.editCategoryDialogFormRef.resetFields(); // 重置表单
              // this.loadList(); // 刷新列表数据
              // 由于只是更改了数据，无需刷新整个页面
              this.editCategoryDialog.category.cat_name = cat_name;
            } else {
              this.$message.error(res.data.meta.msg);
            }
          } catch (err) {}
        },
        onCancel: () => {
          this.editCategoryDialog.isLoading = false;
          this.editCategoryDialog.visible = false;
        },
      },

      list: [],
      // 分页配置数据
      page: {
        number: 1,
        size: 5,
        total: 0,
      },
    };
  },
  methods: {
    // 删除分类
    async delCategory(category) {
      try {
        await this.$confirm(`你确定要删除 "${category.cat_name}" 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        // 如果能过走到这里，说明用户点击了确定
        // 发送请求，删除该分类
        const res = await this.$request.delete(`categories/${category.cat_id}`);
        if (res.data.meta.status === 200) {
          this.$message.success('删除成功');
          // 重新加载列表数据
          this.loadList();
        } else {
          this.$message.error(res.data.meta.msg);
        }
      } catch (err) {}
    },
    // 当每页显示条数改变时
    onPageSizeChange(size) {
      console.log('onPageSizeChange', size);
      this.page.size = size;
      this.loadList();
    },
    // 当当前页码改变时
    onPageNumberChange(number) {
      console.log('onPageNumberChange', number);
      this.page.number = number;
      this.loadList();
    },
    // 加载列表数据
    loadList() {
      // 如果定时器id存在，则清除上一次的定时器
      if (timerIdOfLoadList) {
        clearTimeout(timerIdOfLoadList);
      }
      // 开启新的定时器，将定时器id保存起来
      timerIdOfLoadList = setTimeout(async () => {
        const res = await this.$request.get('categories', {
          params: {
            pagenum: this.page.number,
            pagesize: this.page.size,
          },
        });
        if (res.data.meta.status === 200) {
          // 当前页的索引起始值 = (当前页码 - 1) * 每页显示条数 + 1;
          let index = (this.page.number - 1) * this.page.size + 1;
          // 保存数据，map 方法用来映射数组中的数据，只有一级分类才会添加
          // 因为res.data.data.result里面都是一级分类
          this.list = res.data.data.result.map((v) => {
            // 动态添加索引属性
            v._$_$_index = index;
            index++;
            return v;
          });
          this.page.total = res.data.data.total;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      }, 100);
    },
  },
  created() {
    // 如果不用操作DOM，就可以写在这里
    this.loadList();
  },
};
</script>

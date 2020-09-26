<template>
  <div class="goods-add">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/goods">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <el-alert title="添加商品信息" type="info" show-icon :closable="false"> </el-alert>

      <el-row style="margin: 20px 0;">
        <el-col>
          <!-- finish-status: 设置结束步骤的状态 -->
          <!-- process-status: 设置当前步骤的状态 -->
          <el-steps :active="currentIndex" align-center finish-status="success" :process-status="processStatus">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
      </el-row>

      <!-- 基本信息 -->
      <el-row v-show="currentIndex === 0">
        <el-col>
          <el-form ref="jbxxFormRef" :model="jbxx.form.data" :rules="jbxx.form.rules" label-position="top">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="jbxx.form.data.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" min="0" v-model.number="jbxx.form.data.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" min="0" v-model.number="jbxx.form.data.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" min="0" v-model.number="jbxx.form.data.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="jbxx.form.data.goods_cat"
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
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 商品参数 -->
      <el-row v-show="currentIndex === 1">
        <el-col>
          商品参数:
          <div>
            {{ spcs.list }}
          </div>

          <el-form label-position="top">
            <el-form-item v-for="v in spcs.list" :key="v.attr_id" :label="v.attr_name">
              <el-checkbox-group v-model="v._md_value">
                <el-checkbox v-for="v1 in v.attr_val_arr" :key="v1" :label="v1" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 商品属性 -->
      <el-row v-show="currentIndex === 2">
        <el-col>
          商品属性
          <div>
            {{ spsx.list }}
          </div>

          <el-form label-position="top">
            <el-form-item v-for="v in spsx.list" :key="v.attr_id" :label="v.attr_name">
              <el-input v-model="v._md_value"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 商品图片 -->
      <el-row v-show="currentIndex === 3">
        <el-col>
          <!-- 这个 el-upload 组件，并不会经过 axios 请求，所以，axios 配置的拦截器无法拦截该上传文件请求 -->
          <!-- action: 上传地址（完整地址），通过计算属性uploadURL，根据axios的baseURL动态得到的 -->
          <!-- on-preview: 预览图片回调 -->
          <!-- on-remove: 删除图片回调 -->
          <!-- on-success: 上传成功回调 -->
          <!-- file-list: 选择的文件列表数据，例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] -->
          <!-- file-list: 的组件数据格式和请求数据格式不匹配，我们不要添加，让组件自己处理 -->
          <!-- list-type: 文件展示样式（picture: 缩略图） -->
          <el-upload
            class="upload-demo"
            :action="uploadURL"
            :headers="uploadHeaders"
            :on-preview="onImgPreview"
            :on-remove="onImgRemove"
            :on-success="onImgSuccess"
            list-type="picture"
          >
            <template #default>
              <el-button size="small" type="primary">点击上传</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </template>
          </el-upload>
        </el-col>
      </el-row>
      <!-- 商品内容 -->
      <el-row v-show="currentIndex === 4">
        <el-col>
          <quill-editor v-model="spnr.form.data.goods_introduce"></quill-editor>
        </el-col>
      </el-row>
      <!-- 完成 -->
      <el-row v-show="currentIndex === 5">
        <el-col>
          完成
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;">
        <el-col :span="12">
          <!-- 当前步骤在第一步时，显示返回按钮 -->
          <el-button @click="back" v-show="currentIndex === 0">返回</el-button>
          <!-- 当前步骤在第一步和最后一步时，不显示上一步按钮 -->
          <el-button @click="prevStep" v-show="![0, 5].includes(currentIndex)">上一步</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button @click="nextStep" v-show="currentIndex !== 5">
            {{ currentIndex === 4 ? '提交' : '下一步' }}
          </el-button>
          <el-button @click="back" v-show="currentIndex === 5">完成</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 预览图片对话框 -->
    <el-dialog :title="previewImgDialog.title" :visible.sync="previewImgDialog.visible">
      <template #default>
        <img :src="previewImgDialog.imgURL" alt="" width="100%" />
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsAdd',
  data() {
    return {
      // 预览图片对话框的配置数据
      previewImgDialog: {
        title: '预览图片',
        visible: false,
        // 预览图片的url
        imgURL: '',
      },
      processStatus: 'process', // wait / process / finish / error / success
      currentIndex: 0,
      categories: [], // 商品分类数据
      /** 基本信息 */
      jbxx: {
        form: {
          data: {
            goods_name: '',
            goods_price: '',
            goods_weight: '',
            goods_number: '',
            goods_cat: [],
          },
          rules: {
            goods_name: [{ required: true, message: '请输入商品名称' }],
            goods_price: [{ required: true, message: '请输入商品价格' }],
            goods_weight: [{ required: true, message: '请输入商品重量' }],
            goods_number: [{ required: true, message: '请输入商品数量' }],
            goods_cat: [
              { required: true, message: '请输入商品分类' },
              {
                // 自定义校验规则
                validator(rule, val, cb) {
                  if (!val || val.length !== 3) {
                    return cb(new Error('只能选择第三级分类'));
                  }
                  cb();
                },
              },
            ],
          },
        },
      },
      /** 商品参数 */
      spcs: {
        list: [], // 参数列表
        form: {
          data: {},
          rules: {},
        },
      },
      /** 商品属性 */
      spsx: {
        list: [], // 属性列表
        form: {
          data: {},
          rules: {},
        },
      },
      /** 商品图片 */
      sptp: {
        form: {
          data: {
            imgs: [],
          },
          rules: {},
        },
      },
      /** 商品内容 */
      spnr: {
        form: {
          data: {
            goods_introduce: '',
          },
          rules: {},
        },
      },
    };
  },
  computed: {
    // 商品分类id
    catId() {
      if (this.jbxx.form.data.goods_cat.length === 3) {
        return this.jbxx.form.data.goods_cat[this.jbxx.form.data.goods_cat.length - 1];
      }
      return null;
    },
    uploadURL() {
      return `${this.$request.defaults.baseURL}upload`;
    },
    uploadHeaders() {
      return {
        Authorization: sessionStorage.getItem('token'),
      };
    },
  },
  methods: {
    onImgSuccess(res, file, fileList) {
      console.log(res, file, fileList, '上传成功');
      if (res.meta.status === 200) {
        this.sptp.form.data.imgs.push({ pic: '/' + res.data.tmp_path });
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    onImgRemove(file, fileList) {
      this.sptp.form.data.imgs = this.sptp.form.data.imgs.filter((v) => v.pic !== file.response.data.tmp_path);
    },
    onImgPreview(file) {
      console.log(file, '预览图片');
      this.previewImgDialog.imgURL = file.url;
      this.previewImgDialog.visible = true;
    },
    async loadManyOrOnlyList(sel) {
      // 查询选择的商品分类下的静态属性列表
      const res = await this.$request.get(`categories/${this.catId}/attributes`, {
        params: {
          sel,
        },
      });
      if (res.data.meta.status === 200) {
        // 动态参数
        if (sel === 'many') {
          res.data.data.forEach((v) => {
            v._md_value = [];
            v.attr_val_arr = v.attr_vals === '' ? [] : v.attr_vals.split(' ');
          });
          this.spcs.list = res.data.data;
        }
        // 静态属性
        else if (sel === 'only') {
          res.data.data.forEach((v) => {
            v._md_value = v.attr_vals;
          });
          this.spsx.list = res.data.data;
        }
      } else {
        this.$message.error(res.data.meta.msg);
        // 抛出错误，让catch抓住，阻止代码向下执行
        throw new Error(res.data.mate.msg);
      }
    },
    back() {
      this.$router.back();
    },
    // 当分类改变时
    async onChangeOfCategories() {},
    // 加载分类数据
    async loadCategories() {
      const res = await this.$request.get('categories');
      if (res.data.meta.status === 200) {
        this.categories = res.data.data;
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    prevStep() {
      this.currentIndex--;
    },
    async nextStep() {
      // 第一步：基本信息
      if (this.currentIndex === 0) {
        try {
          await this.$refs.jbxxFormRef.validate();
          this.loadManyOrOnlyList('many');
        } catch (err) {
          // 验证失败
          console.log(err);
          return;
        }
      }
      // 第二步：商品参数
      else if (this.currentIndex === 1) {
        this.loadManyOrOnlyList('only');
      }
      // 第三步：商品属性
      else if (this.currentIndex === 2) {
      }
      // 第四步：商品图片
      else if (this.currentIndex === 3) {
      }
      // 第五步：商品内容
      else if (this.currentIndex === 4) {
        // 整理表单请求数据，发送添加商品请求

        const spcsArr = this.spcs.list.map((v) => {
          return {
            attr_id: v.attr_id,
            attr_value: v._md_value.join(' '),
          };
        });
        // 过滤值为空字符串的数据
        // .filter(v => v.attr_value !== '');
        console.log(spcsArr, '映射出的商品参数数组');

        const spsxArr = this.spsx.list.map((v) => {
          return {
            attr_id: v.attr_id,
            attr_value: v._md_value,
          };
        });
        // 过滤值为空字符串的数据
        // .filter(v => v.attr_value !== '');
        console.log(spsxArr, '映射出的商品属性数组');

        console.log([...spcsArr, ...spsxArr], '最终的请求参数attrs');

        try {
          const res = await this.$request.post('goods', {
            goods_name: this.jbxx.form.data.goods_name, // 商品名称
            goods_cat: this.jbxx.form.data.goods_cat.join(','), // 商品分类, 以为','分割的分类列表
            goods_price: this.jbxx.form.data.goods_price, // 商品价格
            goods_number: this.jbxx.form.data.goods_number, // 商品数量
            goods_weight: this.jbxx.form.data.goods_weight, // 商品重量
            goods_introduce: this.spnr.form.data.goods_introduce, // 商品介绍
            pics: this.sptp.form.data.imgs, // 商品图片
            attrs: [...spcsArr, ...spsxArr], // 商品的参数（数组），包含 `动态参数` 和 `静态属性`
          });
          if (res.data.meta.status !== 201) {
            // 添加失败
            this.$message.error(res.data.meta.msg);
            return;
          }
  
          // 将当前状态设置为success
          this.processStatus = 'success';
        } catch (err) {
          this.$message.error('添加失败，请稍后重试！')
          console.log(err);
        }

      }
      // 第六步：完成
      else if (this.currentIndex === 5) {
      }
      this.currentIndex++;
    },
  },
  created() {
    console.log(this.$request, 'this.$request');

    this.loadCategories();
  },
};
</script>

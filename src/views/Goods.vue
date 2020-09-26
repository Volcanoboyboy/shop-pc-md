<template>
  <div class="goods">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" class="input-with-select" v-model.trim="queryKeywords" @change="search">
            <template v-slot:append>
              <el-button icon="el-icon-search" @click="search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="goAddGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-table border :data="goods">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格（元）" prop="goods_price" width="120"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight" width="80"></el-table-column>
            <el-table-column label="创建时间" width="150">
              <template #default="{ row }">
                {{ row.add_time | time }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button icon="el-icon-edit" size="mini" type="primary"></el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="delGoods(row)"></el-button>
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
            :page-sizes="[5, 10, 20, 50, 100]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
let timerIdOfLoadList = null;
export default {
  name: 'Goods',
  data() {
    return {
      queryKeywords: '',
      page: {
        number: 1,
        size: 5,
        total: 0,
      },
      goods: [],
    };
  },
  methods: {
    async delGoods(goods) {
      const res = await this.$request.delete(`goods/${goods.goods_id}`);
      if (res.data.meta.status === 200) {
        this.loadList();
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    onPageNumberChange(number) {
      this.page.number = number;
      this.loadList();
    },
    onPageSizeChange(size) {
      this.page.size = size;
      this.loadList();
    },
    search() {
      this.page.number = 1;
      this.loadList();
    },
    goAddGoods() {
      this.$router.push('/goods-add');
    },
    loadList() {
      // 要做防抖处理
      if (timerIdOfLoadList) {
        clearTimeout(timerIdOfLoadList);
      }
      timerIdOfLoadList = setTimeout(async () => {
        const res = await this.$request.get('goods', {
          params: {
            query: this.queryKeywords,
            pagenum: this.page.number,
            pagesize: this.page.size,
          },
        });
        if (res.data.meta.status === 200) {
          this.goods = res.data.data.goods;
          this.page.total = res.data.data.total;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      }, 100);
    },
  },
  created() {
    this.loadList();
  },
};
</script>

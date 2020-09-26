<template>
  <div class="rights">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table border :data="rights">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template #default="{ row }">
            <el-tag v-if="row.level === '0'">一级</el-tag>
            <el-tag v-else-if="row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rights: [],
    };
  },
  async mounted() {
    const res = await this.$request.get('rights/list');
    if (res.data.meta.status === 200) {
      // 获取成功，需要把响应数据存储在VM实例的data上
      this.rights = res.data.data;
    } else {
      this.$message.error(res.data.meta.msg);
    }
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
</style>

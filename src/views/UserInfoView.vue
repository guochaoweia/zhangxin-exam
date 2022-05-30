<template>
  <div>
    <div class="header">
      <div class="title">User Management</div>
      <div class="quantity">150 Records Found</div>
    </div>
    <div class="table">
      <el-table size="mini" :data="tableData">
        <el-table-column align="center" prop="id" label="id" width="80px"></el-table-column>
        <el-table-column align="center" prop="avatarName" label="avatarName" width="100px"></el-table-column>
        <el-table-column align="center" prop="name" label="name" width="100px"></el-table-column>
        <el-table-column align="center" prop="email" label="email"></el-table-column>
        <el-table-column align="center" prop="phone" label="phone" width="100px"></el-table-column>
        <el-table-column align="center" prop="sex" label="sex" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.sex==1?'男':'女' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createdAt" label="createdAt" width="200px">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.createdAt).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label>
          <template>
            <el-button size="mini" type="danger" @click="details" round>详情</el-button>
            <el-button size="mini" type="success" round>权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>

<script>
import { getUserlist } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      pagination: true,
      pageSize: 10,
      pageNum: 1,
      count: 0,
    };
  },
  created() {
    this.pageChange();
  },
  methods: {
    pageChange() {
      let params = {
        pagination: this.pagination,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getUserlist(params).then((res) => {
        if (res.data.data.status == 1) {
          this.tableData = res.data.data.data.rows;
          console.log(res);
          this.count = res.data.data.data.count;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.pageChange();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.pageChange();
    },
    details() {
      this.$router.push({
        name: "userdetails",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin: 0 35px;
  .title {
    color: #07007d;
    font-weight: bolder;
    font-size: 20px;
  }
  .quantity {
    color: #d2d2d2;
    font-size: 10px;
  }
}
.table {
  margin: 15px;
  font-size: 10px;
}
</style>
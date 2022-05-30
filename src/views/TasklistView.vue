<template>
  <div class="tasklist">
    <div class="search">
      <div class="title pl-10">任务列表</div>
      <div class="taskform mt-15">
        <el-form size="small" ref="form" :model="tableData">
          <div class="align-center">
            <el-form-item label="任务名称" label-width="80px">
              <el-input v-model="tableData.taskName" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" label-width="80px">
              <el-col :span="11">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="任务执行人" label-width="100px">
              <el-select v-model="value" placeholder="请选择任务执行人">
                <el-option
                  v-for="(item,index) in tableData"
                  :key="index"
                  :label="item.userName"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button class="ml-15" type="primary" @click="search">搜索</el-button>
              <el-button>清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main mt-10">
      <el-table
        size="mini"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="45"></el-table-column>
        <!-- <el-table-column align="center" prop="id" label="ID" width="100px"></el-table-column> -->
        <el-table-column align="center" prop="userId" label="用户ID" width="80px"></el-table-column>
        <el-table-column align="center" prop="userName" label="用户名" width="100px"></el-table-column>
        <el-table-column align="center" prop="taskName" label="任务名称" width="100px"></el-table-column>
        <el-table-column align="center" prop="level" label="紧急程度" width="100px">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.level==1" type="danger">紧急</el-button>
            <el-button size="mini" v-else type="primary">普通</el-button>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="desc"
          label="任务描述"
          width="100px"
        ></el-table-column>
        <el-table-column align="center" prop="duration" label="任务时长" width="80px"></el-table-column>
        <el-table-column align="center" prop="createdAt" label="创建时间" width="200px">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createdAt).toLocaleString()}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isReceived" label>
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isReceived==1">已领取</el-tag>
            <el-tag type="danger" v-else>未领取</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label>
          <template slot-scope="scope">
            <el-link type="primary" class="pr-5" @click="details(scope.row)">查看详情</el-link>
            <el-link type="primary" class="pr-5" @click="publishtask(scope.row)">发布任务</el-link>
            <el-link type="primary" v-if="scope.row.isReceived==0" @click="receive(scope.row)">领取任务</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label></el-table-column>
      </el-table>
    </div>
    <!-- 发布任务 -->
    <el-dialog title="提示" :visible.sync="dialogpublish" width="30%" :before-close="handleClose">
      <el-select multiple v-model="value" placeholder="请选择">
        <el-option v-for="(item,index) in publish" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogpublish = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 领取任务 -->
    <el-dialog title="提示" :visible.sync="dialogreceive" width="30%" :before-close="handleClose">
      <span>确定是否领取该任务</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogreceive = false">取 消</el-button>
        <el-button type="primary" @click="receivetask">确 定</el-button>
      </span>
    </el-dialog>
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
import {
  getTasklist,
  getUserlist,
  getPublishtask,
  getTaskdetailApi,
} from "@/api/api";
export default {
  data() {
    return {
      form: {},
      task: {},
      tableData: [],
      pagination: false,
      pageSize: 10,
      pageNum: 1,
      count: 0,
      dialogpublish: false,
      dialogreceive: false,
      value: "",
      value1: "",
      options: [],
      multipleSelection: [],
      receivedData: [],
      publish: [],
      taskId: "",
      // taskName: "",
    };
  },
  async created() {
    this.taskList();
    let res = await getUserlist({
      pagination: this.pagination,
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    });
    if (res.data.status == 1) {
      this.options = res.data.data.data.rows;
      console.log(this.options);
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.taskList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.taskList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //任务列表
    async taskList() {
      let res = await getTasklist();
      if (res.data.status == 1) {
        this.tableData = res.data.data.rows;
        this.count = res.data.data.count;
        console.log(res);
      }
    },
    //发布任务
    async publishtask(item) {
      this.taskId = item.id;
      let res = await getTaskdetailApi({
        taskId: this.taskId,
      });
      if (res.data.status == 1) {
        this.receivedData = res.data.data.receivedData;
        console.log(this.receivedData);
        this.value = [];
        this.publish = [];
        this.options.forEach((el) => {
          if (!this.receivedData.find((item) => item.userId == el.id)) {
            this.publish.push(el);
          }
        });
      }
      this.dialogpublish = true;
    },
    async confirm() {
      let res = await getPublishtask({
        userId: this.value,
        taskId: this.taskId,
      });
      if (res.data.status == 1) {
        this.dialogpublish = false;
        this.taskList();
        this.$message({
          type: "success",
          message: "发布成功",
        });
      }
    },
    //查看详情
    details(item) {
      this.$router.push({
        name: "taskdetails",
        query: {
          taskId: item.id,
        },
      });
    },
    //领取任务
    receive(row) {
      this.dialogreceive = true;
      this.task = row;
      console.log(this.task);
    },
    async receivetask() {
      let res = await getPublishtask({
        userId: [857],
        taskId: this.task.id,
      });
      if (res.data.status == 1) {
        this.dialogreceive = false;
        this.taskList();
        this.$message({
          type: "success",
          message: "领取成功",
        });
      }
    },
    async search() {
      let res = await getTasklist({
        taskName: this.tableData.taskName,
      });
      if (res.data.status == 1) {
        this.taskList();
        console.log(res);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tasklist {
  background: #fcf4f4;
  display: grid;
  grid-template-rows: 100px auto;
  padding: 15px;
  .search {
    padding: 10px;
    background: #fff;
    .title {
      font-size: 20px;
      font-weight: bolder;
    }
  }
}
::v-deep .el-input__inner {
  width: 150px;
}
::v-deep .el-range-editor--small.el-input__inner {
  width: 250px;
}
</style>
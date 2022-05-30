<template>
  <div class="createtask">
    <div class="form">
      <div class="title">新增项目任务</div>
      <div class="main">
        <el-form
          :label-position="labelPosition"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item class="mt-30" label="任务名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写任务名称"></el-input>
          </el-form-item>
          <el-form-item label="预计完成时间" prop="duration">
            <div class="completion-time">
              <el-input v-model="ruleForm.duration" maxlength="1"></el-input>
              <div>小时</div>
            </div>
          </el-form-item>
          <el-form-item label="任务说明" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="执行人" prop="region">
            <el-select v-model="value1" multiple filterable placeholder="请选择执行人">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="紧急重要" prop="level">
            <el-switch v-model="ruleForm.level"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <!-- <span slot="footer" class="dialog-footer"> -->
          <el-button @click="query">查询任务列表</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">确 定</el-button>
          <!-- </span> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTaskCreate,
  getPublishtask,
  getTasklist,
  getUserlist,
} from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      labelPosition: "right",
      ruleForm: {
        name: "",
        region: "",
        duration: "",
        desc: "",
        level: false,
        taskId: "",
        userId: "",
      },

      value1: [],
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        // region: [{ required: true, message: "请选择执行人", trigger: "blur" }],
        duration: [
          { required: true, message: "请输入完成时间", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写任务说明", trigger: "blur" }],
      },
      options: [],
      pagination: "",
      pageSize: "",
      pageNum: "",
    };
  },
  created() {
    let params = {
      pagination: this.pagination,
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    };
    getTasklist(params).then((res) => {
      console.log(res);
      console.log(this.ruleForm.userId);
    });
    getUserlist(params).then((res) => {
      this.options = res.data.data.data.rows;
      console.log(res);
    });
  },
  methods: {
    submitForm(formName) {
      console.log(this.value1);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { name, desc, duration, level } = this.ruleForm;
          getTaskCreate({ name, desc, duration, level }).then((res) => {
            this.ruleForm.taskId = res.data.data[0].id;
            console.log(res.data);
            if (res.data.status == 1) {
              this.dialogVisible = true;
              this.$message({
                type: "success",
                message: "创建任务成功",
              });
              getPublishtask({
                userId: this.value1,
                taskId: this.ruleForm.taskId,
              }).then((res) => {
                if (res.data.status == 1) {
                  console.log(res);
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    query() {
      this.$router.push({
        name: "tasklist",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.createtask {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .form {
    margin: 30px;
    .title {
      padding-bottom: 15px;
      border-bottom: 1px solid #fafafa;
    }
    .completion-time {
      display: grid;
      grid-template-columns: 40px auto;
    }
  }
}
</style>
<template>
  <div class="group">
    <div class="align-center">
      <el-input class="mr-15" v-model="groupName" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="creategroup">创建分组</el-button>
    </div>
  </div>
</template>

<script>
import { getRoleGroupCreateApi } from "@/api/api";
export default {
  data() {
    return {
      groupName: "",
    };
  },
  methods: {
    async creategroup() {
      let res = await getRoleGroupCreateApi({
        groupName: this.groupName,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.groupName = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  margin: 15px;
}
::v-deep .el-input {
  width: 200px;
}
</style>
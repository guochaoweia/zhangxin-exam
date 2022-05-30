<template>
  <div class="newrole">
    <div class="header align-center">
      <div class="mr-15">新增角色权限</div>
      <div class="msg align-center">
        <img class="icon" src="@/assets/home.png" alt />
        <div class="text">· 系统管理</div>
        <div class="text">· 角色与权限</div>
        <div>· 新增角色权限</div>
      </div>
    </div>
    <div class="main">
      <div class>
        <div class="addInfo">
          <div class="align-center mr-15">
            <label style="width:100px">角色名称</label>
            <el-input v-model="roleName" placeholder="请输入新增角色"></el-input>
          </div>
          <div class="align-center">
            <label style="width:80px">所属部门</label>
            <el-select v-model="groupId">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <juris-table></juris-table>
      <div class="pt-5">
        <el-button type="primary" @click="createrole">确认新增</el-button>
      </div>
    </div>
    <!-- <div class="main">
      <div class="addInfo">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="align-center">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入新增角色名称"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择所属部门">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="choose">
        <el-checkbox>选择所有权限</el-checkbox>
      </div>
      <div class="table">
        <div class="table-head">
          <el-checkbox>签名管理</el-checkbox>
        </div>
        <div class="table-main align-center">
          <el-checkbox>KEY种子写入</el-checkbox>
          <el-checkbox>校验KEY密码</el-checkbox>
          <el-checkbox>修改KEY密码</el-checkbox>
        </div>
        <div class="table-main align-center">
          <el-checkbox>签名币种列表</el-checkbox>
          <el-checkbox>新增签名币种</el-checkbox>
          <el-checkbox>编辑签名币种</el-checkbox>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import jurisTable from "@/components/JurisTable.vue";
import {
  getRoleListApi,
  getRoleCreateApi,
  getRoleGroupListApi,
} from "@/api/api";
export default {
  components: { jurisTable },
  data() {
    return {
      roleName: "",
      groupId: "",
      options: [],
      pagination: false,
      pageSize: "",
      pageNum: "",
    };
  },
  async created() {
    let res = await getRoleGroupListApi();
    console.log(res);
    this.options = res.data.data.rows;
    let role = await getRoleListApi({
      pagination: this.pagination,
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    });
    if (role.data.status == 1) {
      console.log(role);
      // this.options = res.data.data.rows;
    }
  },
  methods: {
    async createrole() {
      let res = await getRoleCreateApi({
        roleName: this.roleName,
        groupId: this.groupId,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
        (this.roleName = ""), (this.groupId = "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.newrole {
  background: #f2f5fa;
  padding: 0 15px;
  .header {
    padding: 15px 0;
    .msg {
      font-size: 12px;
      color: #adb0b7;
      .icon {
        width: 20px;
        height: 20px;
      }
      .text {
        color: #3f70e7;
      }
    }
  }
  .main {
    background: #fff;
    border-radius: 8px;
    padding: 0 20px 20px 20px;
    .addInfo {
      padding-top: 5px;
      display: flex;
      border-bottom: 1px solid #f3f2f7;
      padding-bottom: 10px;
    }
    // .choose {
    //   padding: 15px 30px;
    // }
    // .table {
    //   border: 1px solid #e7ecf0;
    //   margin: 0 20px;
    //   .table-head {
    //     background: #f6fafd;
    //     padding: 15px;
    //   }
    //   .table-main {
    //     padding: 15px 45px;
    //   }
    //   .table-head,
    //   .table-main {
    //     border-bottom: 1px solid #e7ecf0;
    //   }
    // }
  }
}
</style>
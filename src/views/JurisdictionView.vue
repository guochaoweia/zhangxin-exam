<template>
  <div class="jurisdiction">
    <div class="title align-center">
      <img class="icon mr-5" src="@/assets/userIcon.png" alt />
      <div>角色管理</div>
    </div>
    <div class="main">
      <div class="asside">
        <div class="align-center mt-15">
          <div class="align-center mr-30">
            <img class="icon mr-5" src="@/assets/adduser.png" alt />
            <div class="header-text" @click="newrole">新增角色</div>
          </div>
          <div class="align-center">
            <img class="icon mr-5" src="@/assets/adduser.png" alt />
            <div class="header-text" @click="creategroup">新建分组</div>
          </div>
        </div>
        <el-tree accordion :data="roleGroup" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="container">
        <div class="align-center">
          <div class="mr-5">所有者</div>
          <div class="right-text">系统默认角色，默认具有企业所有功能权限和全部数据可见范围</div>
        </div>
        <div class="tags">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">
              <el-descriptions class="margin-top" title :column="3" border>
                <el-descriptions-item v-for="item in rolelist" :key="item.id">
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                  </template>
                  {{item.roleName}}
                </el-descriptions-item>
              </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
              <juris-table></juris-table>
            </el-tab-pane>
            <el-tab-pane label="数据范围" name="third"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jurisTable from "@/components/JurisTable.vue";
import { getRoleListApi, getRoleGroupListApi } from "@/api/api";
// import Group from "@/assets/menulist/group";
export default {
  components: { jurisTable },
  data() {
    return {
      roleGroup: [],
      rolelist: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      activeName: "second",
      isIndeterminate: true,
      pagination: false,
      pageSize: "",
      pageNum: "",
    };
  },
  async created() {
    let res = await getRoleListApi({
      pagination: false,
    });
    if (res.data.status == 1) {
      console.log(res);
      this.rolelist = res.data.data.rows;
    }
    this.getMenuList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    newrole() {
      this.$router.push({
        name: "newrole",
      });
    },
    creategroup() {
      this.$router.push({
        name: "rolegroup",
      });
    },
    async getMenuList() {
      let [roleGroup, rolelist] = await Promise.all([
        getRoleGroupListApi({
          pagination: false,
        }),
        getRoleListApi({
          pagination: false,
        }),
      ]);
      this.roleGroup = roleGroup.data.data.rows;
      this.rolelist = rolelist.data.data.rows;
      this.roleGroup.forEach((item) => {
        item.children = this.rolelist.filter((el) => el.groupId == item.id);
        this.rolelist.forEach((item) => {
          item.name = item.roleName;
        });
        item.name = item.groupName;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.jurisdiction {
  font-family: "Helvetica Neue";
  margin: 0 20px;
  display: grid;
  grid-template-rows: 40px auto;
  .title {
    border-bottom: 1px solid #ebeff1;
    color: #727f90;
  }
  .main {
    display: grid;
    grid-template-columns: 250px auto;
    .asside {
      margin-left: 20px;
      border-right: 1px solid #ebeff1;
      .header-text {
        color: #4c8edd;
        font-size: 14px;
      }
    }
    .container {
      margin-left: 30px;
      display: grid;
      grid-template-rows: 40px auto;
      .right-text {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
}

::v-deep .el-tree-node__content {
  padding-top: 15px;
}
::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding: 0 20px;
}
</style>
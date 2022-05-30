<template>
  <div class="home">
    <el-container>
      <el-header class="header flex-between">
        <div class="logo align-center">
          <img src="../assets/menu.png" class="icon mr-5" />
          <span class="text">Achi5</span>
        </div>
        <div class="info align-center">
          <div>武汉市 2022-04-20 15:00 星期三 21-22℃ 晴 风力 1|2级 风向 无持续风向微风</div>
          <div class="align-center">
            <img src="../assets/1.jpg" class="iconImg mr-5" />
            <span>{{phone}}</span>
          </div>
          <span class="iconfont icon-guanji" @click="logout">退出</span>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('topicbank')">题库管理</el-menu-item>
                <el-menu-item index="1-2" @click="navigator('htmlbank')">HTML题库</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('jsbank')">JS题库</el-menu-item>
                <el-menu-item index="1-4" @click="navigator('cssbank')">CSS题库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="navigator('login')">
              <i class="el-icon-menu"></i>
              <span slot="title">匹配比赛</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navigator('register')">
              <i class="el-icon-document"></i>
              <span slot="title">报名系统</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navigator('about')">
              <i class="el-icon-setting"></i>
              <span slot="title">刷题系统</span>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="navigator('personaldata')">个人资料</el-menu-item>
                <el-menu-item index="5-2" @click="navigator('jurisdiction')">权限管理</el-menu-item>
                <el-menu-item index="5-3" @click="navigator('jsbank')">修改密码</el-menu-item>
                <el-menu-item index="5-4" @click="navigator('cssbank')">账号绑定</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>任务系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1" @click="navigator('calendar')">任务系统</el-menu-item>
                <el-menu-item index="6-2" @click="navigator('tasklist')">任务列表</el-menu-item>
                <el-menu-item index="6-3" @click="navigator('jsbank')">修改密码</el-menu-item>
                <el-menu-item index="6-4" @click="navigator('cssbank')">账号绑定</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="7" @click="navigator('userinfo')">
              <i class="el-icon-setting"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <!-- <el-menu-item index="7" @click="navigator('createtask')">
              <i class="el-icon-document"></i>
              <span slot="title">创建任务</span>
            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
//获取个人信息
//调取/user/info,获取sessionStorage中的值，把值渲染到页面上
//退出
// 点击退出时,调取服务端接口/user/logout,如果退出成功,则删除sessionStorage中的token值,并返回到登录页面
import { logoutAPi, getUserInfo } from "../api/api";
export default {
  name: "HomeView",
  data() {
    return {
      phone: "",
    };
  },
  created() {
    getUserInfo()
      .then((res) => {
        if (res.data.status == 401) {
          this.$router.push({
            name: "login",
          });
        } else {
          this.phone = res.data.data[0].phone;
        }
      })

      .catch((err) => {
        console.log(err);
      });
  },
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      //解决重复点击路由报错，加个判断返回就好了
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },
    async logout() {
      let res = await logoutAPi();
      if (res.data.status == 1) {
        sessionStorage.removeItem("token");
        this.$router.push({
          name: "login",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .header {
    background-color: #409eff;
    color: #fff;
    font-size: 20px;
    min-width: 800px;
    // .logo {
    //   // margin-left: 40px;
    // }
    .info {
      font-size: 10px;
      display: flex;
      gap: 0 20px;
      // margin-right: 40px;
    }
    .iconImg {
      border-radius: 50%;
      width: 24px;
      height: 24px;
    }
  }
  .container {
    height: calc(100vh - 60px);
    .aside {
      background-color: #545c64;
      overflow: auto;
    }
  }
}
.el-main {
  // overflow: hidden;
  overflow-y: scroll;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
::v-deep .el-submenu .el-menu-item {
  min-width: 198px;
}
</style>

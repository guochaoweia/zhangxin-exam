<template>
  <div class="login flex-center">
    <div class="popup flex-center">
      <div class="logo flex-colum">
        <div class="icon-logo shadow">H5</div>
        <div class="desc mt-20">mobideo</div>
        <div class="submit">DIGITIZING INDUSTRIAL SERVICES</div>
      </div>
      <div class="form">
        <div>
          <div class="lable">USERNAME</div>
          <el-input v-model="username" placeholder="请输入内容"></el-input>
        </div>
        <div class="mt-10">
          <div class="lable">PASSWORD</div>
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div class="mt-10 flex-center">
          <el-input v-model="captcha" placeholder="请输入验证码" maxlength="4"></el-input>
          <img @click="getCaptcha" :src="captchaSrc" alt />
        </div>
        <div class="flex-between mt-15">
          <div class="text">忘记密码？</div>
          <div class="text" @click="routeRegister">注册</div>
        </div>
        <el-button class="mt-30" type="primary" @click="submit">LOGIN</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { loginApi, getCaptchaApi } from "../api/api";
import { encrypt } from "../assets/utils";

// 验证码
// 打开登录页面，调用/captcha接口，页面展示验证码；
// 用户点击验证码，可以进行更新验证码；

//登录：
// 用户点击登录按钮，校验用户名，密码，验证码是否正确，
// 校验input框里的值是否符合要求；
// 如果校验通过，调用登录接口
// 服务端如果校验成功，
// 就给你返回一个token；
//反之，则提示哪里错误，进行修改
export default {
  data() {
    return {
      username: "xiaoming",
      password: "999999",
      captcha: "",
      captchaSrc: "/api/captcha",
    };
  },
  created() {
    this.getCaptcha();
    this.keyupSubmit();
  },
  methods: {
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode; //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.submit();
        }
      };
    },
    routeRegister() {
      this.$router.push({
        name: "register",
      });
    },
    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    getValidateResult() {
      var res = { result: true };
      if (this.username == "") {
        this.$message();
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      } else if (this.captcha == "") {
        res.result = false;
        res.message = { type: "warning", message: "验证码不能为空" };
      } else if (5 > this.username.length || this.username.length > 16) {
        res.result = false;
        res.message = { type: "warning", message: "用户名长度应该在6-15之间" };
      } else if (5 > this.password.length || this.password.length > 16) {
        res.result = false;
        res.message = { type: "warning", message: "密码长度应该在6-15之间" };
      } else if (this.captcha.length != 4) {
        res.result = false;
        res.message = { type: "warning", message: "验证码输入不正确" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },
    // 用户点击登录按钮

    async submit() {
      // 校验input框里的值是否符合要求；
      var isValidate = this.getValidateResult();
      if (!isValidate) return;
      const { username, password, captcha } = this;
      let res = await loginApi({
        username: username,
        password: encrypt(password),
        captcha: captcha,
      });
      if (res.data.status == 1) {
        sessionStorage.setItem("token", res.data.data);
        this.$message({
          type: "success",
          message: "登录成功",
        });
        this.$router.push({
          name: "calendar",
        });
      } else {
        this.getCaptcha();
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
      console.log(res);
    },
  },
};
</script>
<style scoped lang='scss'>
.login {
  height: 100vh;
  background-color: #f5f8fd;
  & .popup {
    width: 800px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    border: 13px solid #1e80e1;
    padding: 40px;
    color: #0c80e7;
    font-size: 12px;
    gap: 0 30px;
    & .logo {
      height: 500px;
      background-color: #1e80e1;
      transform: skew(-10deg) translateX(40px);
      z-index: 100;
      color: #fff;
      & .icon-logo {
        padding: 20px;
        font-size: 60px;
        box-sizing: border-box;
        transform: skewX(10deg);
      }
      .desc {
        font-size: 40px;
      }
      .submit {
        font-size: 10px;
      }
    }
    .form {
      padding: 20px;
      min-height: 50%;
      padding-left: 50px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      & .lable {
        padding: 10px 0;
      }
      & .text {
        text-decoration: underline;
        cursor: pointer;
      }
      & .text:hover {
        color: #db121271;
      }
    }
  }
}
</style>

<template>
  <div class="register flex-center">
    <div class="step shadow">
      <el-container class="container">
        <el-header class="align-center">
          <div>注册</div>
        </el-header>
        <el-main class="main shadow flex-column">
          <el-steps class="steps" :active="active" finish-status="success" align-center>
            <el-step title="注册账号"></el-step>
            <el-step title="注册成功"></el-step>
          </el-steps>
          <div v-if="isOk">
            <el-form :model="check" :rules="rules" ref="check">
              <el-form-item prop="name">
                <div class="align-center mt-15">
                  <label class="asterisk pr-5">*</label>
                  <el-input prefix-icon="el-icon-user" v-model="check.name" placeholder="请输入真实姓名"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="username">
                <div class="align-center">
                  <label class="asterisk pr-5">*</label>
                  <el-input
                    prefix-icon="el-icon-user"
                    v-model="check.username"
                    placeholder="请输入用户名"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <div class="align-center">
                  <label class="asterisk pr-5">*</label>
                  <el-input
                    prefix-icon="el-icon-lock"
                    v-model="check.password"
                    placeholder="请输入密码"
                    show-password
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="againPassword">
                <div class="align-center">
                  <label class="asterisk pr-5">*</label>
                  <el-input
                    class
                    mt-15
                    prefix-icon="el-icon-lock"
                    v-model="check.againPassword"
                    placeholder="请再次输入密码"
                    show-password
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="email">
                <div class="align-center">
                  <label class="asterisk pr-5">*</label>
                  <el-input
                    class
                    mt-15
                    prefix-icon="el-icon-message"
                    v-model="check.email"
                    placeholder="请输入邮箱"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="phone">
                <div class="align-center">
                  <label class="asterisk pr-5">*</label>
                  <el-input
                    class
                    mt-15
                    prefix-icon="el-icon-mobile-phone"
                    v-model="check.phone"
                    placeholder="请输入手机号"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="captcha">
                <div class="align-center">
                  <label class="asterisk pr-5">*</label>
                  <div class="align-center">
                    <el-input
                      class="pr-5"
                      v-model="check.captcha"
                      prefix-icon="el-icon-key"
                      placeholder="请输入验证码"
                    ></el-input>
                    <!-- <el-button class mt-15 type="danger" @click="getCaptcha">获取验证码</el-button> -->
                    <img :src="captchaSrc" @click="getCaptcha" alt />
                  </div>
                </div>
              </el-form-item>
              <el-button
                class="btn"
                type="primary"
                style="margin-top: 12px;"
                @click="next('check')"
              >注册</el-button>
            </el-form>
          </div>
          <div class="flex-colum mt-15" v-else>
            <i class="icon el-icon-circle-check"></i>
            <div class="mt-15">注册成功,{{count}}秒后跳转</div>
            <el-button @click="confirm" class="mt-15">确定</el-button>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>


<script>
// 用户点击注册按钮,
// 校验账号，密码、二次输入密码、判断两次密码是否一样,邮箱、手机号、验证码是否正确,
// 如果不符合要求,则提示相应的错误或必填项有哪项没填则高亮提示相应的input;
// 如果校验成功,调取注册接口/user/register,进行注册
// 注册成功后,调用登录接口,token存到sessionStorage中，
// 注册成功后提示用户 恭喜您注册成功！3秒后跳转到首页
// 用户点击 确定 按钮 ，直接登录后跳转到Home页面；
import { loginApi, registerApi, getCaptchaApi } from "../api/api";
import { encrypt } from "../assets/utils";

export default {
  name: "RegisterView",
  data() {
    var verifyPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.check.againPassword !== "") {
          this.$refs.check.validateField("againPassword");
        }
        callback();
      }
    };
    var verifyAgainPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.check.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      check: {
        username: "",
        password: "",
        againPassword: "",
        captcha: "",
        email: "",
        phone: "",
        name: "郭晁玮",
      },
      captchaSrc: "/api/captcha",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: verifyPass, trigger: "blur" }],
        againPassword: [{ validator: verifyAgainPass, trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      count: 3,
      isOk: true,
      token: "",
    };
  },
  created() {
    this.getCaptcha();
    this.keyupSubmit(); //键盘监听回车事件
  },
  methods: {
    keyupSubmit() {
      //键盘监听回车事件
      document.onkeydown = () => {
        let _key = window.event.keyCode; //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.confirm();
        }
      };
    },
    //验证码
    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    //调取登录接口
    async getToken() {
      let res = await loginApi({
        username: this.check.username,
        password: encrypt(this.check.password),
        captcha: this.check.captcha,
      });
      console.log(res);
      sessionStorage.setItem("token", res.data.data);
      this.token = res.data.data;
    },
    async confirm() {
      if (this.token) {
        this.$router.push({
          name: "home",
        });
      } else {
        await this.getToken();
        this.confirm();
      }
    },
    async next(formName) {
      if (/(\W)/.test(this.check.username)) {
        this.$message({
          type: "warning",
          message: "用户名只包含字母数字下划线",
        });
      }
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
      });
      const { username, password, email, phone, captcha, name } = this.check;
      let res = await registerApi({
        username: username,
        password: password,
        email: email,
        phone: phone,
        captcha: captcha,
        name: name,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "注册成功",
        });
        this.active = 2;
        this.isOk = false;
        var _this = this;
        this.timeout = setInterval(function () {
          _this.count--;
          if (_this.count == 0) {
            _this.$router.push({
              name: "home",
            });
          }
        }, 1000);
      } else {
        this.getCaptcha();
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
      this.getToken();
    },
  },
  destroyed() {
    clearInterval(this.timeout);
  },
};
</script>
<style lang="scss" scoped>
.register {
  height: 100%;
  background-color: #fefefe;
  padding: 0 60px;

  .step {
    background-color: #f9f9fd;
    border-radius: 4px;
    min-width: 800px;
    padding: 0 60px;
    .container {
      height: 100%;
      padding-bottom: 60px;
      .main {
        width: 800px;
        padding: 60px 30%;
        .steps {
          width: 100%;
        }
        .asterisk {
          color: #ff4400;
        }
        .btn {
          width: 100%;
        }
        .icon {
          font-size: 30px;
        }
      }
    }
  }
}
</style>

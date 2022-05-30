<template>
  <div class="personaldata">
    <div class="container">
      <div class="header">
        <div class="text">基本信息</div>
      </div>
      <div class="form mt-30">
        <div class="form-text">
          <label class="item">账号昵称</label>
          <el-input
            placeholder="请输入内容"
            v-model="form.avatarName"
            minlength="4"
            maxlength="8"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="form mt-30">
        <div class="form-text">
          <label class="item">真实姓名</label>
          <el-input placeholder="请输入内容" v-model="form.name"></el-input>
        </div>
      </div>
      <div class="form mt-30">
        <div class="form-text">
          <label class="item">性别</label>
          <div class="align-center">
            <el-radio v-model="form.sex" :label="1">男</el-radio>
            <el-radio v-model="form.sex" :label="0">女</el-radio>
          </div>
        </div>
      </div>
      <div class="form mt-30">
        <div class="form-text">
          <label class="item">所在地</label>
          <div class="align-center">
            <div class="mr-30">
              <el-select v-model="form.provinceNo" placeholder="请选择">
                <el-option
                  v-for="item in provinces"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </div>
            <div class="mr-30">
              <el-select v-model="form.cityNo" placeholder="请选择">
                <el-option
                  v-for="item in city"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="form.areaNo" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="form mt-30">
        <div class="form-text">
          <label class="item">简介</label>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.desc"
            maxlength="80"
            :rows="5"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="bt mt-30">
        <el-button type="primary" round class="mr-30" @click="updata">保存</el-button>
        <el-button round>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "@/citydata.json";
import { getUserInfo, getUpdata } from "../api/api";
export default {
  data() {
    return {
      input: "",
      radio: "1",
      textarea: "",
      form: {
        sex: 1, //性别 1 ： 男   0： 女
        avatarName: "", //昵称
        name: "", //真实姓名
        provinceNo: "", //省编号
        cityNo: "", //市编号
        areaNo: "", //区编号
        desc: "", //个人介绍`
      },
      provinces: cityData,
      city: [],
      area: [],
    };
  },
  created() {
    this.getInfo();
  },
  watch: {
    "form.provinceNo": function (newValue) {
      let res = this.provinces.find((item) => item.code == newValue);
      this.city = res && res.children ? res.children : [];
      if (this.form.cityNo) {
        let city = this.city.find((item) => item.code == this.form.cityNo);
        this.form.cityNo = city && city.code ? city.code : "";
      }
    },
    "form.cityNo": function (newValue) {
      let res = this.city.find((item) => item.code == newValue);
      this.area = res && res.children ? res.children : [];
      if (this.form.areaNo) {
        let area = this.area.find((item) => item.code == this.form.areaNo);
        this.form.areaNo = area && area.code ? area.code : "";
      }
    },
  },
  methods: {
    async getInfo() {
      let res = await getUserInfo();
      if (res.data.status == 1) {
        this.form = res.data.data[0];
        delete this.form.id;
        delete this.form.createdAt;
        delete this.form.updatedAt;
      }
    },
    async updata() {
      let res = await getUpdata(this.form);
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.personaldata {
  background-color: #f7f7f7;
  padding: 50px 30px;
  & .container {
    background-color: #fff;
    & .header {
      border-bottom: 1px solid #f7f7f7;
      padding: 20px 40px;
      & .text {
        font-weight: bolder;
      }
    }
    & .form {
      padding: 0 40px;
      & .form-text {
        display: grid;
        grid-template-columns: 70px auto;
        align-items: center;
        gap: 0 30px;
        & .item {
          text-align: right;
        }
      }
    }
    & .bt {
      padding: 0 140px;
      padding-bottom: 60px;
    }
  }
}
</style>
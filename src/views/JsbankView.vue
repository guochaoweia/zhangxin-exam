<template>
  <div class="jsbank">
    <el-container>
      <el-main>
        <!-- header -->
        <div class="container">
          <div class="align-center">
            <label class="title">所属题型：</label>
            <div class="border-text active mr-15">全部(344)</div>
            <div class="border-text mr-15">单选题(144)</div>
            <div class="border-text mr-15">多选题(144)</div>
            <div class="border-text mr-15">判断题(75)</div>
            <div class="border-text mr-15">排序题(14)</div>
            <div class="border-text mr-15">填空题(36)</div>
            <div class="border-text mr-15">简答题(45)</div>
          </div>
          <div class="align-center mt-30">
            <label class="title">难易程度：</label>
            <div class="border-text mr-15">全部</div>
            <div class="border-text active mr-15">简单</div>
            <div class="border-text mr-15">中等</div>
            <div class="border-text mr-15">困难</div>
          </div>
          <div class="flex-between mt-30">
            <div>
              <el-button type="primary" @click="createQuestion">添加习题</el-button>
              <el-button type="primary">批量导入</el-button>
              <el-button type="primary">加入公共习题库</el-button>
            </div>
            <div class="align-center">
              <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
              <el-button type="primary" @click="getQuestionList">查询</el-button>
            </div>
          </div>
        </div>
        <!-- 列表渲染 -->
        <template v-if="isOk">
          <div class="info mt-30" v-for="(item,index) in data" :key="index">
            <div class="info-head flex-between">
              <div class="align-center">
                <div class="mr-30">创建时间：{{fromTime(item.createdAt)}}</div>
                <div class="radios mr-5">{{getType(item.type)}}</div>
                <div class="level mr-30">{{getLevel(item.level)}}</div>
                <div>使用次数：18次</div>
              </div>
              <div class="icon-text align-center">
                <span class="el-icon-edit-outline mr-15" @click="modify(item)"></span>
                <span class="el-icon-delete" @click="openDeletePopup(item)"></span>
              </div>
            </div>
            <div class="align-center mt-15">
              <el-checkbox class="pr-5" v-model="checked"></el-checkbox>
              <div class>{{item.title}}</div>
            </div>
            <div class="mt-20 pl-50">
              <el-radio disabled v-model="item.answer" label="A">{{item.questionA}}</el-radio>
              <el-radio disabled v-model="item.answer" label="B">{{item.questionB}}</el-radio>
              <el-radio
                disabled
                v-if="item.questionC"
                v-model="item.answer"
                label="C"
              >{{item.questionC}}</el-radio>
              <el-radio
                disabled
                v-if="item.questionD"
                v-model="item.answer"
                label="D"
              >{{item.questionD}}</el-radio>
            </div>
            <div class="mt-20 pl-20 bt">答案：{{item.answer}}</div>
            <div class="info-foot">
              <div class="align-center mt-15 pl-20">
                <label>所属知识点：</label>
                <div class="mlr-15">知识点一</div>
                <div class="mlr-15">知识点二</div>
                <div class="mlr-15">知识点三</div>
              </div>
              <div class="align-center mt-10 pl-20">
                <label for>解析：</label>
                <div class="mlr-15">这是解析字段</div>
              </div>
            </div>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[5,10,15,20,30,50]"
              :page-size="pageSize"
              layout="total, prev, pager, next,sizes"
              :total="count"
            ></el-pagination>
          </div>
        </template>
        <!-- 弹层 -->
        <div v-else class="flex-colum mt-30">
          <div class="item mt-30">
            <label>
              <span class="item-str">*</span>
              <span>题目标题：</span>
            </label>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </div>
          <div class="item mt-30" v-for="(option,index) in questionOptions" :key="option.id">
            <label>
              <span v-if="index<=1" class="item-str">*</span>
              <span>{{option.label}}:</span>
            </label>
            <el-input v-model="option.value" :placeholder="option.placeholder"></el-input>
            <div>
              <span
                v-if="index==questionOptions.length-1&& index<3"
                @click="addQuestion"
                class="el-icon-circle-plus-outline pr-5"
              ></span>
              <span
                v-if="index>1 && index==questionOptions.length-1"
                @click="removeQuestion(index,option.key)"
                class="el-icon-remove-outline"
              ></span>
            </div>
          </div>
          <div class="item mt-30">
            <label for>
              <span class="item-str">*</span>
              <span>答案:</span>
            </label>
            <el-select v-model="form.answer" placeholder="请选择">
              <el-option
                v-for="item in questionOptions"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </div>
          <div class="item mt-30">
            <label for>
              <span class="item-str">*</span>
              <span>难度系数:</span>
            </label>
            <el-select v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="flex-center mt-30">
            <el-button type="primary" v-if="bt" @click="create">确认</el-button>
            <el-button type="primary" v-else @click="modifybt">修改</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script >
import {
  topicbankApi,
  createQuestionsApi,
  modifyQuestionsApi,
  deleteQuestionsApi,
} from "@/api/api";
import fromTime from "@/mixins/fromDate";
export default {
  mixins: [fromTime],
  data() {
    return {
      bt: true,
      input: "",
      checked: "",
      pagination: true,
      pageSize: 10,
      pageNum: 1,
      count: 0,
      title: "",
      pageCount: "",
      data: "",
      isOk: true,
      labelPosition: "left",
      id: "",
      form: {
        id: 0,
        type: 1,
        title: "",
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: "",
        answer: "",
        level: "",
      },
      questionOptions: [],
      questionOptionsTemp: [
        {
          id: 1,
          label: "选项A",
          value: "",
          key: "A",
          placeholder: "请输入选项A的值",
        },
        {
          id: 2,
          label: "选项B",
          value: "",
          key: "B",
          placeholder: "请输入选项B的值",
        },
        {
          id: 3,
          label: "选项C",
          value: "",
          key: "C",
          placeholder: "请输入选项C的值 非必填",
        },
        {
          id: 4,
          label: "选项D",
          value: "",
          key: "D",
          placeholder: "请输入选项D的值 非必填",
        },
      ],
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "普通",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
    };
  },
  watch: {
    questionOptions(newValue) {
      this.answer = !newValue.includes(this.answer) ? "" : newValue;
    },
  },
  created() {
    this.getQuestionList();
    this.initFormParams();
  },
  methods: {
    //删除选项
    removeQuestion(index) {
      this.questionOptions[index].value = "";
      this.questionOptions.pop();
      // this.form.answer = this.answer;
    },
    //添加选项
    addQuestion() {
      // this.form.answer = this.answer;
      let option = JSON.parse(JSON.stringify(this.questionOptionsTemp));
      this.questionOptions.push(option[this.questionOptions.length]);
    },
    //初始化
    initFormParams() {
      this.form = {
        type: 1,
        title: "",
        answer: "",
        level: "",
      };
      this.questionOptions = this.questionOptionsTemp.slice(0, 2);
      this.answer = "";
      this.questionOptionsTemp.forEach((el) => {
        el.value = "";
      });
    },
    //给表单传选项值
    getFormparms() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.form.answer;
      res.level = this.form.level;

      return res;
    },
    //校验
    validataFormParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度",
      };

      for (let key in params) {
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空！",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    //查询题库列表
    async getQuestionList() {
      const { pagination, pageSize, pageNum } = this;
      let res = await topicbankApi({
        type: 1,
        pagination: pagination,
        pageSize: pageSize,
        pageNum: pageNum,
        title: this.input,
      });
      if (res.data.status == 1) {
        this.count = res.data.data.count;
        this.pageCount = res.data.data.pageCount;
        console.log(this.count);
        this.data = res.data.data.rows;
      }
    },
    getType(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "填";
        case 4:
          return "答";
      }
    },
    getLevel(type) {
      switch (type) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getQuestionList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getQuestionList();
      this.pageNum = val;
    },

    // 创建题按钮
    createQuestion() {
      this.isOk = false;
      this.bt = true;
    },
    cancel() {
      this.initFormParams();
      this.isOk = true;
    },
    //调用创建题接口
    async create() {
      const params = this.getFormparms();
      let validata = this.validataFormParams(params);
      if (!validata) return;

      let res = await createQuestionsApi(params);
      if (res.data.status == 1) {
        this.isOk = true;
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.getQuestionList();
        this.initFormParams();
      }
    },
    //修改题
    async modifybt() {
      const params = this.getFormparms();
      params.id = this.id;
      let validata = this.validataFormParams(params);
      if (!params.questionC) {
        params.questionC = "";
      } else if (!params.questionD) {
        params.questionD = "";
      }
      if (!validata) return;
      let res = await modifyQuestionsApi(params);
      if (res.data.status == 1) {
        this.isOk = true;
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getQuestionList();
        this.initFormParams();
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    modify(data) {
      this.isOk = false;
      this.bt = false;
      this.id = data.id;
      this.form.id = data.id;
      this.form.type = data.type;
      this.form.title = data.title;
      this.form.level = data.level;
      this.form.answer = data.answer;
      let questionOptions = JSON.parse(
        JSON.stringify(this.questionOptionsTemp)
      );
      questionOptions[0].value = data.questionA;
      questionOptions[1].value = data.questionB;
      questionOptions[2].value = data.questionC;
      questionOptions[3].value = data.questionD;
      this.questionOptions = questionOptions.filter((item) => item.value);
      console.log(data);
    },
    async deleteQuestions({ type, id }) {
      let res = await deleteQuestionsApi({
        id,
        type,
      });
      if (res.data.status == 1) {
        this.getQuestionList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getQuestionList();
      }
    },
    openDeletePopup(data) {
      this.$confirm("您是否确认删除该题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteQuestions(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.jsbank {
  & .container {
    min-width: 1000px;
    padding: 30px 30px;
    border-radius: 4px;
    background-color: #f9f9f9;
    .title {
      font-weight: bold;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    & .border-text {
      color: #cccccc;
      border: 1px solid #b7b7b7;
      border-radius: 30px;
      padding: 3px 10px;
    }
    .active {
      color: #f25342;
      border: 1px solid #f25342;
    }
  }
  & .info {
    min-width: 600px;
    border: 1px solid #b7b7b7;
    padding: 20px 30px;
    border-radius: 4px;
    .bt {
      border-bottom: 1px dashed;
      padding-bottom: 15px;
    }
    .info-foot {
      font-size: 12px;
      color: #a5a5a5;
    }
  }
  .item {
    display: grid;
    grid-template-columns: 100px 240px 40px;
    align-items: center;
    gap: 0 20px;
    & .item-str {
      color: red;
    }
  }
}
</style>
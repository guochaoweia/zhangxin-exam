<template>
  <div class="topic">
    <el-container>
      <el-main>
        <div class="container">
          <div class="align-center">
            <label>适用考试：</label>
            <div class="border-text mr-15">全部(34)</div>
            <div class="border-text mr-15">期中考试(144)</div>
            <div class="border-text mr-15">期末考试(144)</div>
            <div class="border-text mr-15">其他考试(75)</div>
          </div>
          <div class="align-center mt-30">
            <label>试卷形式：</label>
            <div class="border-text mr-15">全部</div>
            <div class="border-text mr-15">考生同卷</div>
            <div class="border-text mr-15">随机顺序</div>
            <div class="border-text mr-15">考生异卷</div>
          </div>
          <div class="flex-between mt-30">
            <div>
              <el-button type="primary">策略组卷</el-button>
              <el-button type="primary">手动组卷</el-button>
              <el-button type="primary">导入试卷</el-button>
            </div>
            <div>
              <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
            </div>
          </div>
        </div>
        <div class="info mt-30 border">
          <div class="info-head flex-between">
            <div class="align-center">
              <div class="mr-30">创建时间：2022-05-09 12:00:00</div>
              <div class="border radios mr-5">期中考试</div>
              <div class="border easy mr-30">考生同卷</div>
              <div class="mr-30">满分：100</div>
              <div>使用次数：18次</div>
            </div>
            <div class="icon-text">
              <i class="el-icon-files"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="align-center mt-15">
            <div class>1.Java程序设计期中考试试题</div>
          </div>
        </div>
        <div class="info mt-30 border">
          <div class="info-head flex-between">
            <div class="align-center">
              <div class="mr-30">创建时间：2022-05-09 12:00:00</div>
              <div class="border radios mr-5">期末考试</div>
              <div class="border easy mr-30">随机顺序</div>
              <div class="mr-30">满分：100</div>
              <div>使用次数：18次</div>
            </div>
            <div class="icon-text">
              <i class="el-icon-files"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="align-center mt-15">
            <div class>2.Java程序设计期中考试试题</div>
          </div>
        </div>
        <div class="info mt-30 border">
          <div class="info-head flex-between">
            <div class="align-center">
              <div class="mr-30">创建时间：2022-05-09 12:00:00</div>
              <div class="border radios mr-5">其他考试</div>
              <div class="border easy mr-30">考生异卷</div>
              <div class="mr-30">满分：100</div>
              <div>使用次数：18次</div>
            </div>
            <div class="icon-text">
              <i class="el-icon-files"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="align-center mt-15">
            <div class>3.Java程序设计期中考试试题</div>
          </div>
        </div>
        <div class="info mt-30 border">
          <div class="info-head flex-between">
            <div class="align-center">
              <div class="mr-30">创建时间：2022-05-09 12:00:00</div>
              <div class="border radios mr-5">其他考试</div>
              <div class="border easy mr-30">考生异卷</div>
              <div class="mr-30">满分：100</div>
              <div>使用次数：18次</div>
            </div>
            <div class="icon-text">
              <i class="el-icon-files"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="align-center mt-15">
            <div class>4.Java程序设计期中考试试题</div>
          </div>
        </div>
        <div class="info mt-30 border">
          <div class="info-head flex-between">
            <div class="align-center">
              <div class="mr-30">创建时间：2022-05-09 12:00:00</div>
              <div class="border radios mr-5">期中考试</div>
              <div class="border easy mr-30">考生同卷</div>
              <div class="mr-30">满分：100</div>
              <div>使用次数：18次</div>
            </div>
            <div class="icon-text">
              <i class="el-icon-files"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="align-center mt-15">
            <div class>5.Java程序设计期中考试试题</div>
          </div>
        </div>
        <div class="info mt-30 border">
          <div class="info-head flex-between">
            <div class="align-center">
              <div class="mr-30">创建时间：2022-05-09 12:00:00</div>
              <div class="border radios mr-5">期末考试</div>
              <div class="border easy mr-30">随机顺序</div>
              <div class="mr-30">满分：100</div>
              <div>使用次数：18次</div>
            </div>
            <div class="icon-text">
              <i class="el-icon-files"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="align-center mt-15">
            <div class>6.Java程序设计期中考试试题</div>
          </div>
        </div>
      </el-main>
      <el-footer>
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
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { topicbankApi } from "@/api/api";
export default {
  data() {
    return {
      input: "",
      type: 1,
      pagination: true,
      pageSize: 10,
      pageNum: 1,
      count: 0,
      pageCount: "",
    };
  },
  created() {
    const { type, pagination, pageSize, pageNum } = this;
    topicbankApi({
      type: type,
      pagination: pagination,
      pageSize: pageSize,
      pageNum: pageNum,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.count = res.data.data.count;
          this.pageCount = res.data.data.pageCount;
          console.log(this.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
    },
    handleCurrentChange(pageNum) {
      console.log(`当前页: ${pageNum}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.topic {
  min-width: 800px;
  .container {
    border: 1px solid #a5a5a5;
    border: none;
    padding: 30px 30px;
    border-radius: 4px;
    background-color: #dbd5d5;
    & .border-text {
      color: #a5a5a5;
      border: 1px solid #a5a5a5;
      border-radius: 30px;
      padding: 0 10px;
    }
  }
  .info {
    border: 1px solid #a5a5a5;
    padding: 20px 30px;
    border-radius: 4px;
    .bt {
      border-bottom: 1px dashed;
      padding-bottom: 5px;
    }
    .info-foot {
      font-size: 12px;
      color: #a5a5a5;
    }
  }
}
</style>
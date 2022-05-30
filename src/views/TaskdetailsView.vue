<template>
  <div class="taskdetails">
    <div class="leftmain">
      <div class="header flex-between">
        <div class="align-center">
          <img class="icon" src="@/assets/tasknav.png" alt />
          <div class="ft-10">#1</div>
        </div>
        <div class="align-center">
          <img class="pr-5" src="@/assets/eyes.png" alt />
          <div class="ft-10">1人关注</div>
          <img class="icon" src="@/assets/倒三角.png" alt />
          <div class="pr-5">|</div>
          <img class="pr-5" src="@/assets/fullscreen.png" alt />
          <img class="pr-5" src="@/assets/share.png" alt />
          <img class="pr-5" src="@/assets/ellipsis.png" alt />
        </div>
      </div>
      <div class="main mt-15">
        <div class="title">
          <h3>任务详情</h3>
          <el-button icon="el-icon-edit">编辑描述</el-button>
          <el-button icon="el-icon-upload2">上传附件</el-button>
          <el-button icon="el-icon-paperclip">关联代码仓库</el-button>
          <el-button icon="el-icon-connection">阻塞关系</el-button>
          <el-button icon="el-icon-key">引用资源</el-button>
        </div>
        <div class="mt-30">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="tableData.desc"></el-input>
        </div>
        <div class="mt-30">
          <div>
            <h4>任务日志</h4>
          </div>
          <div class="align-center">
            <div class="pr-15">全部</div>
            <div class="pr-15">只看日志</div>
            <div class="pr-15">只看评论</div>
          </div>
          <div class="mt-30">
            <el-timeline>
              <el-timeline-item>
                {{tableData.userName}} 创建了 {{tableData.taskName}}
                <div class="time">{{ new Date(tableData.createdAt).toLocaleString()}}</div>
              </el-timeline-item>
              <el-timeline-item>
                {{tableData.userName}} 重新指派了任务给
                <span
                  class="pr-5"
                  v-for="item in tableData.receivedData"
                  :key="item.userId"
                >{{item.userName}}</span>
                <div class="time">{{ new Date(tableData.createdAt).toLocaleString()}}</div>
              </el-timeline-item>
              <el-timeline-item>
                <span v-for="item in tableData.receivedData" :key="item.userId">
                  {{item.userName}} 更新了处理状态
                  <template v-if="item.completedAt==null">未开始</template>
                  <template v-else>已完成</template>
                </span>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="aside-up">
        <div>项目</div>
        <div class="align-center mt-5">
          <img class="mr-5" src="@/assets/灯泡提示.png" alt />
          <div>{{tableData.taskName}}</div>
        </div>
        <div class="mt-15">状态</div>
        <el-tag class="mt-5" type="primary">{{tableData.levelName}}</el-tag>
        <div class="mt-15">处理人</div>
        <div class="align-center mt-5">
          <div class="circle mr-5">18</div>
          <div class>{{tableData.userName}}</div>
        </div>
        <div class="mt-15">所需需求</div>
        <div class="text mt-5">未关联需求</div>
        <div class="mt-15">迭代</div>
        <div class="text mt-5">未规划进迭代</div>
      </div>
      <div class="aside-down mt-15">
        <div class="align-center">
          <div class="mr-5">优先级</div>
          <span style="color:red">*</span>
        </div>
        <div class="mt-5">中</div>
        <div class="mt-15">截止日期</div>
        <div class="text mt-5">未指定</div>
        <div class="mt-15">标签</div>
        <div class="el-icon-circle-plus-outline mt-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaskdetailApi } from "@/api/api";
import fromTime from "@/mixins/fromDate";
export default {
  mixins: [fromTime],
  data() {
    return {
      taskId: "",
      tableData: {
        receivedData: [],
      },
      textarea: "",
    };
  },
  async created() {
    this.taskId = this.$route.query.taskId;
    let res = await getTaskdetailApi({
      taskId: this.taskId,
    });
    if (res.data.status == 1) {
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.receivedData = res.data.data.receivedData;
    }
  },
};
</script>

<style lang="scss" scoped>
.taskdetails {
  display: grid;
  grid-template-columns: auto 300px;
  .leftmain {
    margin: 15px 30px;
    background: #fff;
    .main {
      .title {
        border-bottom: 1px solid #f7f7f7;
        padding-bottom: 10px;
      }
      .time {
        font-size: 12px;
        color: #8e98a5;
      }
    }
  }
  .aside {
    padding: 15px 30px;
    background: #fcfcfd;
    font-size: 14px;
    .aside-up {
      border-bottom: 1px solid #f9f9fa;
      padding-bottom: 15px;
      .circle {
        width: 30px;
        height: 30px;
        border-radius: 25px;
        text-align: center;
        line-height: 30px;
        background: #5f6c81;
      }
    }
    .text {
      color: #bcc5ce;
    }
  }
}
</style>
<template>
  <div class="main">
    <div class="aside">
      <div class="calendar">
        <el-calendar v-model="value"></el-calendar>
      </div>
      <div class="task">
        <div class="task-header flex-between">
          <div class="text">Today Task (3)</div>
          <div class="el-icon-plus" @click="addTask"></div>
        </div>
        <div class="task-main mt-15">
          <div class="working">
            <el-checkbox></el-checkbox>
            <div class>Working on Asia Project</div>
            <div class="time">08:00-10:00AM</div>
          </div>
          <div class="working mt-15">
            <el-checkbox></el-checkbox>
            <div class>Team Meeting</div>
            <div class="time">11:00-12:00AM</div>
          </div>
          <div class="working mt-15">
            <el-checkbox></el-checkbox>
            <div class>Doing Research</div>
            <div class="time">13:00-16:00AM</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="flex-between mt-10">
        <div class="text">Notification</div>
        <div class="chat-text">View all</div>
      </div>
      <div class="chat-nav">
        <div>
          <img src="@/assets/nav-chat.png" class="icon nav-img" alt />
        </div>
        <div class="nav-text">
          <div>Emily just sent you task to assign</div>
          <div class="time mt-15">18 Aug 2020-10:00 AM</div>
          <div class="nav-btn mt-15">
            <el-button type="warning" round>Assign New</el-button>
          </div>
        </div>
        <div>
          <img src="@/assets/circular.png" class="circular" alt />
        </div>
      </div>
      <div class="chat-main">
        <div class="flex-between">
          <div class="align-center">
            <div class="text mr-15">Team Chat</div>
            <div class="align-center">
              <img class="main-icon" src="@/assets/boy.png" alt />
              <img class="main-icon" src="@/assets/man.png" alt />
              <img class="main-icon" src="@/assets/women.png" alt />
              <div class="main-people">+17</div>
            </div>
          </div>
          <div class="main-btn align-center">
            <img class="btn-icon pr-5" src="@/assets/headportrait.png" alt />
            <div>Invite People</div>
          </div>
        </div>
        <div class="chatbox">
          <div class="dialogbox" ref="scorll">
            <div v-for="(item, index) in textArr" :key="index">
              <div v-if="item.avatarName !== obj.name " class="others-chat">
                <div class="chat-name mr-15 flex-center" v-if="item.msg">{{ item.avatarName|name }}</div>
                <div class="aaa">
                  <div class="chat-msg" v-if="item.msg">{{ item.msg }}</div>
                  <div
                    class="chat-time align-center"
                    v-if="(new Date() - new Date(item.date)) / 1000 <= 60"
                  >刚刚</div>
                  <div
                    class="chat-time flex-center"
                    v-else-if="1<=Math.ceil((new Date() - new Date(item.date))/ 1000 /60)<=10 "
                  >{{Math.ceil((new Date() - new Date(item.date))/ 1000/60)}}分钟之前</div>
                  <div
                    class="chat-time flex-center"
                    v-else-if="10<=Math.ceil((new Date() - new Date(item.date))/ 1000 /60)<60"
                  >{{Math.ceil((new Date() - new Date(item.date))/ 1000 /60)}}分钟之前</div>
                  <div
                    class="chat-time flex-center"
                    v-else-if="10<=Math.ceil((new Date() - new Date(item.date))/ 1000 /60/60)<24"
                  >{{Math.ceil((new Date() - new Date(item.date))/ 1000 /60/60)}}小时之前</div>
                </div>
              </div>
              <div v-else class="my-chat">
                <div class="aaa">
                  <div class="chat-msg mr-15" v-if="item.msg">{{ item.msg }}</div>
                  <div
                    class="chat-time align-center"
                    v-if="(new Date() - new Date(item.date)) / 1000 <= 60"
                  >刚刚</div>
                  <div
                    class="chat-time flex-center"
                    v-else-if="1<=Math.ceil((new Date() - new Date(item.date))/ 1000 /60)<=10 "
                  >{{Math.ceil((new Date() - new Date(item.date))/ 1000/60)}}分钟之前</div>
                  <div
                    class="chat-time flex-center"
                    v-else-if="10<=Math.ceil((new Date() - new Date(item.date))/ 1000 /60)<60"
                  >{{Math.ceil((new Date() - new Date(item.date))/ 1000 /60)}}分钟之前</div>
                  <div
                    class="chat-time flex-center"
                    v-else-if="10<=Math.ceil((new Date() - new Date(item.date))/ 1000 /60/60)<24"
                  >{{Math.ceil((new Date() - new Date(item.date))/ 1000 /60/60)}}小时之前</div>
                </div>
                <div class="chat-name mr-15 flex-center" v-if="item.msg">{{ item.avatarName|name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="inputbox">
          <el-input placeholder="请输入内容" v-model="obj.msg">
            <template slot="append">
              <span @click="sendSocketMsg">
                <i class="el-icon-s-promotion">发送</i>
              </span>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/api";

export default {
  data() {
    return {
      value: new Date(),
      // checked: "",
      textArr: [],
      obj: {
        name: "1111111111111111",
        msg: "",
        id: "",
      },
      textarea: "",
      input: "",
      drawer: false,
      direction: "rtl",
    };
  },

  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
      this.$socket.emit("addUser", {
        userId: this.obj.id,
        avatarName: this.obj.name,
      });
    },
    // message 是服务端返回的信息
    userCount(message) {
      console.log(message);
    },
    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
    },
    // 断开时调用的函数
    disconnect: function () {
      console.log("disconnect!");
      this.$socket.emit("removeUser", {
        userId: this.obj.id,
        avatarName: this.obj.name,
      });
    },
  },
  created() {
    this.keyupSubmit();
    this.userInfo();
  },
  updated() {
    let msg = this.$refs.scorll;
    msg.scrollTop = msg.scrollHeight;
  },
  filters: {
    name(val) {
      return val.slice(0, 1);
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode; //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.sendSocketMsg();
        }
      };
    },
    async userInfo() {
      let res = await getUserInfo();
      if (res.data.status == 1) {
        this.obj.id = res.data.data.id;
      }
    },
    sendSocketMsg() {
      //向服务端发送消息
      if (!this.obj.msg) {
        this.$message({
          type: "warning",
          message: "聊天内容不能为空！",
        });
      } else {
        this.$socket.emit("sendMsg", {
          userId: this.obj.id,
          type: 1,
          avatarName: this.obj.name,
          msg: this.obj.msg,
        });
        this.obj.msg = null;
      }
    },
    addTask() {
      this.$router.push({
        name: "createtask",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  & .aside {
    display: grid;
    grid-template-rows: 2fr auto;
    .task {
      padding: 0 30px;
      .task-main {
        min-width: 400px;
        padding: 20px 15px;
        border-radius: 15px;
        background: #fafafc;
        .working {
          display: grid;
          grid-template-columns: 25px auto 120px;
          .time {
            color: #9ba1df;
          }
        }
      }
    }
  }
  .chat {
    display: grid;
    grid-template-rows: 20px 200px auto;
    margin: 0 15px;
    .chat-text {
      color: #ffdcb4;
    }
    .chat-nav {
      color: #fff;
      display: grid;
      grid-template-columns: 40px 280px 5px;
      gap: 0 30px;
      border-radius: 15px;
      background: #58419c;
      padding: 0 20px;
      margin: 15px 0;
      .nav-img {
        margin: 30px 0;
        border-radius: 4px;
        background: #7c68b0;
        padding: 8px;
      }
      .nav-text {
        margin: 30px 0;
        .time {
          color: #c0b0ee;
          font-size: 14px;
        }
      }
      .circular {
        width: 120px;
        // height: 100px;
        margin: 70px 0 0 50px;
      }
    }
    .chat-main {
      display: grid;
      grid-template-rows: 40px auto 40px;
      .main-icon {
        width: 30px;
        height: 30px;
      }
      .main-people {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50px;
        background: #fafafa;
        font-size: 10px;
      }
      .main-btn {
        cursor: pointer;
        padding: 7px 10px;
        color: #fff;
        border-radius: 8px;
        font-size: 10px;
        background: #59409e;
        .btn-icon {
          width: 10px;
          height: 10px;
        }
      }
      .chatbox {
        border-radius: 8px;
        background: #fafafc;
        display: grid;
        grid-template-rows: auto 40px;
        position: relative;
        overflow: hidden;
        .dialogbox {
          .chat-time {
            color: #b4b3b3;
          }
          position: absolute;
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          word-break: break-all;
          .others-chat {
            margin: 10px 0;
            display: flex;
          }
          .my-chat {
            display: flex;
            justify-content: flex-end;
          }
        }
        .inputbox {
          padding: 15px;
        }
      }
    }
  }
}
.text {
  font-weight: bolder;
}
.aaa {
  padding-top: 5px;
}
.chat-name {
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #58419c;
}
.chat-msg {
  max-width: 200px;
  color: #fff;
  border-radius: 8px;
  background: #7c68b0;
  padding: 10px 15px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
::v-deep .el-calendar-table tr td {
  border: none;
}
::v-deep .el-calendar-day {
  height: 40px;
  text-align: center;
}
</style>
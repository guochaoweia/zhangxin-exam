<template>
  <div class="tags-second">
    <div class="flex-between">
      <div class="right-text">设置角色对应的功能操作、应用管理、后台管理权限</div>
      <el-checkbox>全选</el-checkbox>
    </div>
    <div class="table mt-10">
      <div class="table-colums align-center">
        <div class="table-msg">
          <el-checkbox>消息</el-checkbox>
        </div>
        <div class="table-main">
          <div class>
            <el-checkbox class="pb-10">消息应用设置</el-checkbox>
            <el-checkbox class="pb-10">管理公开群组</el-checkbox>
            <el-checkbox>群组中删除消息</el-checkbox>
          </div>
          <div>
            <el-checkbox class="pb-10">创建公开群组</el-checkbox>
            <el-checkbox>群组企业公告中发送消息</el-checkbox>
          </div>
          <div>
            <el-checkbox>创建私有群组</el-checkbox>
          </div>
        </div>
      </div>
      <div class="table-colums align-center">
        <div class="table-msg">
          <el-checkbox>项目</el-checkbox>
        </div>
        <div class="table-main">
          <div>
            <el-checkbox class="pb-10">新建公开项目</el-checkbox>
            <el-checkbox>管理公开项目</el-checkbox>
          </div>
          <div>
            <el-checkbox class="pb-10">新建私有项目</el-checkbox>
            <el-checkbox>新建项目集</el-checkbox>
          </div>
          <div>
            <el-checkbox class="pb-10">创建非项目任务</el-checkbox>
            <el-checkbox>配置中心</el-checkbox>
          </div>
        </div>
      </div>
      <div class="table-colums align-center">
        <div class="table-msg">
          <el-checkbox>日历</el-checkbox>
        </div>
        <div class="table-main">
          <div>
            <el-checkbox class="pb-10">日历应用设置</el-checkbox>
            <el-checkbox>管理公开日历</el-checkbox>
          </div>
          <div>
            <el-checkbox>新建公开日历</el-checkbox>
          </div>
          <div>
            <el-checkbox>新建私有日历</el-checkbox>
          </div>
        </div>
      </div>
      <div class="table-colums align-center">
        <div class="table-msg">
          <el-checkbox>网盘</el-checkbox>
        </div>
        <div class="table-main">
          <div>
            <el-checkbox>网盘应用设置</el-checkbox>
            <el-checkbox>管理公开文件夹</el-checkbox>
          </div>
          <div>
            <el-checkbox>网盘根目录添加文件和文件夹</el-checkbox>
            <el-checkbox>网盘标签管理</el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tags-second {
  .right-text {
    color: #aaa;
    font-size: 14px;
  }
  .table {
    background: #fafbfc;
    border: 1px solid #fafbfc;
    .table-colums {
      display: grid;
      grid-template-columns: 100px auto;
      border-bottom: 1px solid #eef3fc;
      .table-msg {
        border-right: 1px solid #eef3fc;
        padding: 30px 0 30px 20px;
      }
      .table-main {
        display: grid;
        grid-template-columns: 200px 200px 200px;
        padding: 20px 0 20px 20px;
      }
    }
  }
}
</style>
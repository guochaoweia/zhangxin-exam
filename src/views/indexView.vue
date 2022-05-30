<template>
  <div class="main">
    <div class="aside">
      <div class="calendar">
        <el-calendar v-model="value"></el-calendar>
      </div>
      <div class="task">
        <div class="task-header">
          <div class="title">Today Task (3)</div>
          <div class="el-icon-plus"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="release"></div>
      <div class="chat"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .aside {
    display: grid;
    grid-template-rows: auto 300px;
  }
}
</style>
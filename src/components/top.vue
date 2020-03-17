<!--
--- author: lihaoyan
--- creation time: 2019-07-28
--- module: all administrator pages
--- description: 页面头部，包括系统名称、用户名和账号设置、登出功能
-->

<template>
  <div class="header">
    <h2 class="top-title">科技成果评价系统</h2>
    <div class="right-box">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid el-icon--left"></i>
          {{ userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set">账号设置</el-dropdown-item>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminMenu',
  data () {
    return {
      userName: localStorage.getItem('hsst-user')
    }
  },
  methods: {

    handleCommand (command) {
      switch (command) {
        // 账号设置点击跳转页面
        case 'set':
          window.open('/userSet')
          break

        // 退出系统
        case 'quit':
          localStorage.removeItem('hsst-token')
          localStorage.removeItem('hsst-user')
          this.$router.push({ path: '/login' })
          break
        default: break
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>

  /*头部*/
  .header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    height: 66px;
    padding: 0 20px;
    line-height: 66px;
    text-align: left;
    background: #fff;
    border-bottom: 1px solid rgba(212, 219, 224, .2);
  }
  @media screen and (max-height: 700px) {
    .header {
      height: 60px;
      line-height: 60px;
    }
  }

  /*标题*/
  .top-title {
    display: inline-block;
    font-size: 24px;
    font-weight: 400;
    color: #278efc;
  }
  @media screen and (max-height: 700px) {
    .top-title {
      font-size: 20px;
    }
  }

  /*右侧用户名*/
  .right-box {
    display: inline-block;
  }
  .right-box .el-icon-user-solid {
    position: relative;
    top: 3px;
    font-size: 20px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }

</style>

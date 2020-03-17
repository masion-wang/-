<!--
--- author: lihaoyan
--- creation time: 2019-07-27
--- module: all administrator pages
--- description: menu
-->

<template>
  <el-container class="container">

    <!--左侧栏-->
    <div class="menu-box">
      <!--标志-->
      <div class="logo"></div>
      <!--菜单-->
      <el-menu
        :default-active="defaultMenu"
        class="menu-content"
        router
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item v-for="item in menuData" :index="item.resUrl" :key="item.resUrl">
          <i class="el-icon-setting"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <el-main class="main">
      <!--头部显示区域-->
      <common-header></common-header>
      <!--主要内容显示区域-->
      <!--<el-scrollbar class="main-content" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize="false">-->
        <router-view class="main-content"></router-view>
      <!--</el-scrollbar>-->
    </el-main>
  </el-container>
</template>

<script>
import commonTop from './top'

export default {
  name: 'adminMenu',
  components: {
    'common-header': commonTop
  },
  data () {
    return {
      defaultMenu: this.$route.path,
      menuData: []
    }
  },
  methods: {
    // 获取菜单
    getProCode () {
      this.$axios.post('/api-auth/menu/getMenuByProCode', {
        proCode: 'MENU_KJCGPG'
      }).then(res => {
        if (res.data.code === 200) {
          let json = res.data.resultData

          // 按照菜单顺序排序
          json = json.sort((a, b) => {
            if (a.resOrder < b.resOrder) {
              return -1
            } else if (a.resOrder === b.resOrder) {
              return -1
            } else {
              return 1
            }
          })
          this.menuData = json
        }
      })
    }
  },
  created () {
    this.getProCode()
  },
  mounted () {
  }
}
</script>
<style scoped>
  .container {
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .menu-box {
    width: 260px;
    height: 100%;
    background: linear-gradient(to bottom, #0b2744 0%, #0a1f49 100%);
    background: -ms-linear-gradient(top, #0b2744 0%, #0a1f49 100%);
    background: -o-linear-gradient(top, #0b2744 0%, #0a1f49 100%);
    background: -webkit-linear-gradient(top, #0b2744 0%, #0a1f49 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0b2744), color-stop(100%,#0a1f49));
    background: -moz-linear-gradient(top, #0b2744 0%, #0a1f49 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0b2744', endColorstr='#0a1f49', GradientType=0 );
  }
  @media screen and (max-width: 1366px) {
    .menu-box {
      width: 186px;
    }
  }

  /*页面内容展示区域*/
  .main {
    position: relative;
    width: calc(100% - 260px);
    height: 100%;
    overflow: hidden;
    background: #f5f5f5;
  }
  .main-content {
    position: absolute;
    top: 66px;
    left: 0;
    width: calc(100% + 15px);
    height: calc(100% - 66px);
    overflow-x: hidden;
  }
  /*滚动区域*/
  .el-scrollbar__wrap {
    padding: 20px;
  }
  @media screen and (max-width: 1366px) {
    .main {
      width: calc(100% - 186px);
    }
    .el-scrollbar__wrap {
      padding: 10px;
    }
  }
  @media screen and (max-height: 700px) {
    .main-content {
      top: 60px;
      height: calc(100% - 60px);
    }
  }

  /*标志*/
  .logo {
    width: 178px;
    height: 142px;
    margin: 30px auto;
    background-image: url("../assets/img/logo.png");
    background-size: 100% auto;
  }
  @media screen and (max-width: 1366px) {
    .logo {
      width: 126px;
      height: 88px;
    }
  }

  /*菜单展示区域*/
  .menu-content {
    height: 100%;
    background: transparent;
    border-right: 0;
  }

  /*菜单选中背景色*/
  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    background: linear-gradient(to bottom, #03a2f9 0%, #2ab2fe 100%) !important;
    background: -ms-linear-gradient(top, #03a2f9 0%, #2ab2fe 100%) !important;
    background: -o-linear-gradient(top, #03a2f9 0%, #2ab2fe 100%) !important;
    background: -webkit-linear-gradient(top, #03a2f9 0%, #2ab2fe 100%) !important;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #03a2f9), color-stop(100%, #2ab2fe)); !important
    background: -moz-linear-gradient(top, #03a2f9 0%, #2ab2fe 100%) !important;
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#03a2f9', endColorstr='#2ab2fe', GradientType=0 );
  }
  .el-menu-item:focus:after,
  .el-menu-item:hover:after,
  .el-menu-item.is-active:after {
    content: '';
    display: block;
    position: absolute;
    top: 23px;
    right: 20px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
  }

  /*菜单项*/
  .el-menu-item {
    font-size: 15px;
    text-align: left;
  }

  /*菜单字体颜色*/
  .el-menu-item i {
    position: relative;
    top: -1px;
    margin-right: 10px;
    color: #fff;
  }
</style>

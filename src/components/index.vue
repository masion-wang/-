<template>
  <div id="background">
    <img id="d1" src="../assets/img/pictrue/commentIndex/logo.png" alt="">
    <img id="d2" src="../assets/img/pictrue/commentIndex/systermName.png" alt="">
    <h2 id="h2"> 面向公路行业开展的第三方科技服务</h2>
    <img @click="jump" id="d3" src="../assets/img/pictrue/commentIndex/userComment.png" alt="">
    <h3 class="white" id="d4">联系我们</h3>
    <h4 class="white" id="d5">联系电话:010-64958372</h4>
    <h4 class="white" id="d6">微信公众号</h4>
    <img  id="d7" src="../assets/img/twodimensionalcode.png" alt="">
  </div>
</template>
<script>
  export default {
    name: 'comment',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      jump () {
        this.$router.push('/fill')
      }
    }
  }
</script>
<style scoped>
  *{
    margin:0;
    padding:0;
  }
  #background{
    width:100%;
    height:100%;
    background:center url(../assets/img/pictrue/commentIndex/background.png) no-repeat;
    position:relative;
  }
  #d1{
    margin-top:20px;
    margin-left:-35%;
  }
  #d2{
    display:block;
    margin-top:40px;
    margin-left:20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  /*我要评价*/
  #d3{
    margin-top:15px;
    margin-left:-47%;
    cursor: pointer;
  }
  #h2{
    color:white;
    font-weight:300;
    margin-left:-34%;
    margin-top:10px;
  }
  .white{
    color:white;
    margin-top:15px;
    margin-left:-50%;
  }
  #d4{
    margin-left:-54%;
  }
  #d5{
    margin-left:-48%;
    opacity: 0.8;
  }
  #d6{
    margin-left:-54%;
    opacity: 0.8;
  }
  #d7{
    width:50px;
    height:50px;
    margin-top:5px;
    margin-left:-55%;
  }
</style>

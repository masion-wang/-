<!--
--- author: 王松
--- creation time: 2019-07-18
--- module: 小组件
--- description: 专家页面的一个小组件 添加项目的组件
-->
<template>
  <span>
     {{content}}
    <el-button class="del-btn" type="danger" icon="el-icon-delete" @click="deletefromlist" plain></el-button>
  </span>
</template>
<script>
export default {
  name: 'todoitem',
  props:{
     content:{
        type:String,  //["来自爸爸的爱","爸爸给你准备的秋梨膏","儿子你可别坑爹啊"]
        required:true
        },
     index:{
        type:String,  //["来自爸爸的爱","爸爸给你准备的秋梨膏","儿子你可别坑爹啊"]
        required:true
     },
  },
  data () {
    return {
        code:1
    }
  },
  created () {},
  mounted () {},
  updated () {},
  destroyed () {},
  methods : {
    deletefromlist () {
     this.$emit("sonwanttogive",this.index);
    }
  },
  watch : {
    code (){
      console.log("我在实时观测code变量")
    }
  }
}
</script>
<style scoped>
  span{
    position: relative;
    display:inline-block;
    padding: 0 26px 0 10px;
    margin: 0 15px 15px 0;
    line-height: 30px;
    color: #0099ef;
    background-color: #f4faff;
    border: 1px solid #cce4f9;
    border-radius: 4px;
  }
  .del-btn {
    position: absolute;
    top: -1px;
    right: -1px;
    padding: 9px 5px;
    font-size: 12px;
    border-radius: 0 4px 4px 0;
  }
</style>

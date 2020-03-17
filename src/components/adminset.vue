<template>
  <div>
    我是账号审设置
  </div>
</template>
<script>
export default {
  name: 'tempalte',
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
    example () {
      console.log("我是方法")
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
</style>

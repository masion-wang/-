<template>
  <div>
    测试页面

    <div>{{msg}}</div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.$axios.post('/api-auth/user/auth/login', {
      username: 'administrator',
      accountSource: 'auth',
      password: ''
    }).then(res => {
      let token = res.data.resultData.accessTokenEntity.access_token

      localStorage.setItem('hsst-token', token)
      console.log(token)
       console.log(token)
    })
  }
}
</script>
<style scoped>
</style>

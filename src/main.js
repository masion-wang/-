// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'babel-polyfill' // 兼容IE显示项目
import ElementUI from 'element-ui' // 引入element ui框架
import 'element-ui/lib/theme-chalk/index.css' // 引入element ui框架样式
import md5 from 'js-md5' // 引入md5
import qs from 'Qs'
import echarts from 'echarts'
import utils from './assets/js/utils' // 引入公用方法

/* 请求时判断token值是否还在 */
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('hsst-token')
    if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
      config.headers.common['X-Token'] = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// http response 拦截器 ,拦截401状态（token过期），重新登录
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      let curPath = router.currentRoute.fullPath // 当前路由

      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('hsst-token')

          router.replace({
            path: '/login',
            query: {redirect: curPath}
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })
Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = process.env.TARGET
Vue.prototype.$echarts = echarts
Vue.prototype.$md5 = md5
Vue.prototype.$qs = qs
Vue.prototype.$utils = utils
Vue.use(ElementUI)

axios.defaults.baseURL = process.env.TARGET

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

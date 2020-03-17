import Vue from 'vue'
import Router from 'vue-router'
import receipt from '@/components/receipt' // 发票管理
import expert from '@/components/expert' // 专家管理
import index from '@/components/index'
import fill from '@/components/fill' // 申报页面
import login from '@/components/login' // 登录页面
import forgotpassword from '@/components/forgotpassword' // 忘记密码
import resetpassword from '@/components/resetpassword' // 重置密码
import user from '@/components/user' // 用户管理
import HomePage from '@/components/HomePage' // 管理员-首页
import ProjectReview from '@/components/ProjectReview' // 项目评审
import projectStatistics from '@/components/projectStatistics' // 项目统计
import userSet from '@/components/AccountSettings' // 账号设置
import adminMenu from '@/components/adminMenu' // 菜单
import ProjectManagement from '@/components/ProjectManagement' // 项目管理

Vue.use(Router)

export default new Router({
  mode: process.env.MODE,
  routes: [
    // 申报首页
    {
      path: '/index',
      name: 'index',
      component: index
    },
    // 管理员-登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 管理员-登录-忘记密码
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: forgotpassword
    },
     // 管理员-登录-忘记密码-重置密码页面
     {
      path: '/resetpassword/:userPhoneCheck',
      name: 'resetpassword',
      component: resetpassword
    },
    // 申报
    {
      path: '/fill',
      name: 'fill',
      component: fill
    },
    // 账号设置
    {
      path: '/userSet',
      name: 'userSet',
      component: userSet
    },
    // 管理员模块
    {
      path: '/admin',
      name: 'adminMenu',
      component: adminMenu,
      children: [
        // 首页
        {
          path: 'home',
          name: 'home',
          component: HomePage,
          meta: { requireAuth: true } // 需要token
        },
        // 项目评审
        {
          path: 'review',
          name: 'review',
          component: ProjectReview,
          meta: { requireAuth: true } // 需要token
        },
        // 项目管理
        {
          path: 'manage',
          name: 'manage',
          component: ProjectManagement,
          meta: { requireAuth: true } // 需要token
        },
        // 项目统计
        {
          path: 'statistics',
          name: 'statistics',
          component: projectStatistics,
          meta: { requireAuth: true } // 需要token
        },
        // 用户管理
        {
          path: 'user',
          name: 'user',
          component: user,
          meta: { requireAuth: true } // 需要token
        },
        // 发票管理
        {
          path: 'receipt',
          name: 'receipt',
          component: receipt,
          meta: { requireAuth: true } // 需要token
        },
        // 专家管理
        {
          path: 'expert',
          name: 'expert',
          component: expert,
          meta: { requireAuth: true } // 需要token
        }
      ]
    }
  ]
})

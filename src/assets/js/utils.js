/**
 * author: lihaoyan
 * create time: 2019-07-15
 * description: project common methods
 * remarks: 1、Do note!!! (Include: author, time, description, parameter…)
 **/
/**
 * =========================================================================
 */

import ElementUI from 'element-ui'

/**
 * author: lihaoyan
 * create time: 2019-08-09
 * description: get permission buttons
 * remarks: 页面的按钮由统一认证配置，由此方法获取权限按钮，并归类进行返回
 **/
export function GetBtnList () {
  let btnList = localStorage.getItem('btnList')
  let menuActive = localStorage.getItem('menuActive')
  btnList = JSON.parse(btnList)

  for (let i in btnList) {
    if (menuActive == btnList[i].resCode) {
      let btnArr = btnList[i].buttonList

      if (Array.isArray(btnArr) && btnArr.length > 0) {
        let newObj = {}

        for (let j in btnArr) {
          if (btnArr[j].checked == 1) {
            if (newObj[btnArr[j].operLevel]) newObj[btnArr[j].operLevel].push(btnArr[j])
            else newObj[btnArr[j].operLevel] = [btnArr[j]]
          }
        }

        return newObj
      } else {
        return {}
      }
    }
  }
}

/**
 * author: lihaoyan
 * create time: 2019-08-09
 * description: get permission buttons
 * remarks: 页面的按钮由统一认证配置，由此方法获取权限按钮，并归类进行返回
 * parameter
 **/
export default {
  /**
   * author: lihaoyan
   * create time: 2019-08-09
   * description: 获取字符串的字节长度
   * str: 需要获取长度的字符串
   **/
  getStrByteLen: function (str) {
    return str.replace(/[\u0391-\uFFE5]/g, 'aa').length
  },

  /**
   * author: lihaoyan
   * create time: 2019-08-12
   * description: 处理axios的post请求返回的数据
   * res: 返回的数据
   * callback: 请求成功后的回调函数
   **/
  axiosPostResponse: function (res, callback) {
    let json = res.data
    let params = null

    if (json && json.code === 200) {
      params = { isSuccess: true }
    } else if (json && json.code !== 200) {
      params = { isSuccess: false, msg: json.msg }
    } else {
      params = { isSuccess: false, msg: '数据加载失败' }
    }

    callback(params)
  },

  /**
   * author: lihaoyan
   * create time: 2019-08-13
   * description: 设置内容显示区域高度，使其适配屏幕
   * hasQuery: 是否有查询条件
   * callback: 请求成功后的回调函数
   **/
  setContentHeight: function (hasQuery) {

    // 设置内容显示区域高度，使页面适配各种分辨率屏幕
    // 说明：
    // 内容显示区域高度 = 页面可视区域高度 - 头部高度 - projectStatistics与外层的间距
    let fullHeight = document.body.clientHeight // 屏幕显示区域高度
    let header = document.getElementsByClassName('header')[0] // 头部DOM
    let headerH = window.getComputedStyle(header, null).height.split('px')[0] // 头部高度
    let contentBox = document.querySelector('.content-box') // 内容显示区域
    let contentBoxMarginT = window.getComputedStyle(contentBox, null).marginTop.split('px')[0] // 计算模块间距
    let queryBoxH = 0

    // 如有查询条件，则计算查询框部分的高度
    if (hasQuery) {
      let queryBox = document.querySelector('.query-box') // 查询框
      queryBoxH = window.getComputedStyle(queryBox, null).height.split('px')[0] // 查询框高度
    }

    let contentBoxH = fullHeight - headerH - queryBoxH - contentBoxMarginT * 2

    contentBox.style.height = contentBoxH + 'px'

    return contentBoxH
  }
}

<!--
--- author: 王松
--- creation time: 2019-07-18
--- module: 项目统计
--- description: 展示各个纬度的统计
--- modifier: lihaoyan
--- modify time: 2019-08-05
--- modify content: 整体进行修改
-->
<template>
  <div id="projectStatistics">
    <main>
      <div id="content">
        <!--上面四个-->
        <div id="show">
          <!--已到款统计-->
          <div class="chart-item chart-col-4">
            <div class="chart-title">
              <span>已到款</span>
            </div>
            <img src="../assets/img/pictrue/gotMoney.png" alt="" class="fourimg">
            <div class="fourtitle2">
              <span class="subtitle">已到款</span>
              <span class="big orange"> {{ gotmomey }}</span>
              <span class="orange">项</span>
            </div>
          </div>
          <!--有新闻稿统计-->
          <div class="chart-item chart-col-4">
            <div class="chart-title" id="new">
              <span>有新闻稿</span>
            </div>
            <img src="../assets/img/pictrue/rewardedNews.png" alt="" class="fourimg">
            <div class="fourtitle2">
              <span class="subtitle">新闻稿</span>
              <span  class="big green">{{ news }}</span>
              <span class="green">项</span>
            </div>
          </div>
          <!--已评奖统计-->
          <div class="chart-item chart-col-4">
            <div class="chart-title">
              <span>已评奖</span>
            </div>
            <img src="../assets/img/pictrue/hasreward.png" alt="" class="fourimg">
            <div class="fourtitle2">
              <span class="subtitle">已评奖</span>
              <span class="big lightblue">{{rewarded}}</span>
              <span class="lightblue">项</span>
            </div>
          </div>
          <!--已获奖统计-->
          <div class="chart-item chart-col-4">
            <div class="chart-title">
              <span>已获奖</span>
            </div>
            <img src="../assets/img/pictrue/decidedReward.png" alt="" class="fourimg">
            <div class="fourtitle2">
              <span class="subtitle">已获奖</span>
              <span class="big lightyellow">{{ gotrewarded }}</span>
              <span class="lightyellow">项</span>
            </div>
          </div>
          <div style="clear:both;"></div>
        </div>

        <!--下面三个-->
        <div id="echarts" ref="bottomChart">
          <!-- 评价水平-->
          <div class="chart-item chart-col-3">
            <div class="chart-title">
              <span>评价水平</span>
            </div>
            <!--饼状图-->
            <div id="echart1" class="bottom-chart" ref="chart1"></div>

            <!--图例显示-->
            <div class="chart-legend">
              <div class="legend-item" v-for="item in level" :key="item.name">
                <span class="legend-percent-num">{{ item.percent }}</span>
                <span class="legend-percent-unit"> %</span>
                <div class="legend-name"><span class="legend-color" :style="{backgroundColor:item.color}"></span>{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- 评级证书制作水平-->
          <div class="chart-item chart-col-3">
            <div class="chart-title">
              <span>评价证书制作进度</span>
            </div>
            <!--饼状图-->
            <div id="echart2" class="bottom-chart" ref="chart2"></div>

            <!--图例显示-->
            <div class="chart-legend">
              <div class="legend-item" v-for="item in certificate" :key="item.name">
                <span class="legend-percent-num">{{ item.percent }}</span>
                <span class="legend-percent-unit"> %</span>
                <div class="legend-name"><span class="legend-color" :style="{backgroundColor:item.color}"></span>{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- 发票进度-->
          <div class="chart-item chart-col-3">
            <div class="chart-title">
              <span>发票进度</span>
            </div>

            <!--进度条-->
            <div class="bottom-chart bill">
              <div class="process" v-for="item in receipt" :key="item.name">
                <div class="process-txt">{{ item.name }} <span class="process-num" >{{ item.value }}</span></div>
                <!--进度条背景-->
                <div class="process-bg">
                  <!--蓝色进度条-->
                  <div class="process-bar" :style="{width: item.percent + '%'}"></div>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'projectStatistics',
  data () {
    return {
      url: '/api-eva/scientific/managerPageStatistic',
      // 最上面四个
      gotmomey: 0, // 已到款项目数
      news: 0, // 有新闻稿项目数
      rewarded: 0, // 已评奖项目数
      gotrewarded: 0, // 已获奖项目数
      // 评价水平
      level: [],
      // 评级证书制作水平
      certificate: [],
      // 发票情况
      receipt: []
    }
  },
  mounted () {
    // 设置下方统计图区域的高度，使页面适配各种分辨率屏幕
    // 说明：
    // 下方统计图的高度 = 页面可视区域高度 - 其距离projectStatistics的高度 - 头部高度 - projectStatistics与外层的间距
    let fullHeight = document.body.clientHeight // 屏幕显示区域高度
    let header = document.getElementsByClassName('header')[0] // 头部DOM
    let headerH = window.getComputedStyle(header, null).height.split('px')[0] // 头部高度
    let showDiv = document.getElementById('show') // 上方的统计图框
    let showDivMarginB = window.getComputedStyle(showDiv, null).marginBottom.split('px')[0] // 计算模块间距
    let chartBoxDiv = document.getElementById('echarts') // 下方的统计图框
    let chartDiv = document.getElementsByClassName('bottom-chart') // 下方的统计图

    for (let i = 0; i < chartDiv.length; i++) {
      let cur = chartDiv[i]

      cur.style.height = fullHeight - chartBoxDiv.offsetTop - cur.offsetTop - headerH - showDivMarginB * 2 + 'px'
    }
    this.strat()
  },
  methods: {
    strat () {
      this.ratingLevel()
      this.ratingLicense()
      this.billProgress()

      // 已到款项目数
      this.$axios.post(this.url, { 'statisticType': 'paymentStatus' }).then(res => {
        if (res.data.code === 200) {
          this.gotmomey = res.data.resultData[0].value
        } else {
          this.$message.error(res.data.msg)
        }
      })

      // 有新闻稿项目数
      this.$axios.post(this.url, { 'statisticType': 'newsStatus' }).then(res => {
        if (res.data.code === 200) {
          this.news = res.data.resultData[0].value
        } else {
          this.$message.error(res.data.msg)
        }
      })

      // 已评奖项目数
      this.$axios.post(this.url, { 'statisticType': 'awardStatus' }).then(res => {
        if (res.data.code === 200) {
          this.rewarded = res.data.resultData[0].value
        } else {
          this.$message.error(res.data.msg)
        }
      })

      // 已获奖项目数
      this.$axios.post(this.url, { 'statisticType': 'winStatus' }).then(res => {
        if (res.data.code === 200) {
          this.gotrewarded = res.data.resultData[0].value
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 评价水平显示
    ratingLevel () {
      this.$axios.post(this.url, { 'statisticType': 'evaLevel' }).then(res => {

        if (res.data.code === 200) {
          let colorArr = ['#b970fc', '#7be226', '#fdb314', '#ff782a', '#41abfc']

          // 获取数据
          let json = res.data.resultData
          this.level = json

          // 初始化分母
          let sum = 0
          // 获取总项目数
          for (let i in json) {
            sum += json[i].value

            // 初始化占比
            json[i].percent = 0
            json[i].color = colorArr[i]
          }

          // 计算占比
          if (sum > 0) {
            for (let i in json) {
              json[i].percent = ((json[i].value / sum) * 100).toFixed(2)
            }
          }

          // 图表设置
          let option = {
            series: [
              {
                name: '评价水平',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['50%', '35%'], // 位置
                clockWise: false, // 顺时针
                avoidLabelOverlap: false,
                color: colorArr,
                // 标签
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  // 轮廓
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '14'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                // 存放数据
                data: json
              }
            ]
          }

          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('echart1'))
          // 绘制
          myChart.setOption(option)
        }
      })
    },
    // 评价证书制作进度
    ratingLicense () {
      this.$axios.post(this.url, { 'statisticType': 'certificateStatus' }).then(res => {

        if (res.data.code === 200) {
          let colorArr = ['#fdb314', '#3adb63', '#3fb9fd']

          // 获取数据
          let json = res.data.resultData
          this.certificate = json

          // 初始化分母
          let sum = 0
          // 获取总项目数
          for (let i in json) {
            sum += json[i].value

            // 初始化占比
            json[i].percent = 0
            json[i].color = colorArr[i]
          }

          // 计算占比
          if (sum > 0) {
            for (let i in json) {
              json[i].percent = ((json[i].value / sum) * 100).toFixed(2)
            }
          }

          // 图表设置
          let option = {
            series: [
              {
                name: '评价证书制作进度',
                type: 'pie',
                radius: ['40%', '80%'],
                center: ['50%', '40%'], // 位置
                roseType: 'radius', // 变成玫瑰图
                clockWise: false, // 顺时针
                avoidLabelOverlap: false,
                color: colorArr,
                // 标签
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  // 轮廓
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '14'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                // 存放数据
                data: json
              }
            ]
          }

          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('echart2'))
          // 绘制
          myChart.setOption(option)
        }
      })
    },
    // 发票进度
    billProgress () {
      this.$axios.post(this.url, { 'statisticType': 'invoiceStatus' }).then(res => {
        if (res.data.code === 200) {
          // 获取发票的值数据
          this.receipt = res.data.resultData
        }
      })
    }
  }
}
</script>
<style scoped>
.big{
  font-family:Microsoft YaHei;
  font-size:32px;
  font-weight:500;
  white-space: nowrap;
}
.orange{
   margin-top:1%;
  color:rgba(255,109,29,1)
}
.green{
   margin-top:1%;
  color:rgba(63,206,25,1)
}
.lightblue{
  margin-top:1%;
  color:rgba(59,168,251,1)
}
.lightyellow{
   margin-top:1%;
  color:rgba(254,179,11,1)
}
#projectStatistics {
  width: 100%;
  height: 100%;
  padding: 20px;
}
@media screen and (max-width: 1366px) {
  #projectStatistics {
    padding: 15px;
  }
}

#content {
  width: 100%;
}
#show{
  width:100%;
  margin-bottom: 20px;
}
#echarts{
  width:100%;
}

/*统计图模块*/
.chart-item {
  position: relative;
  float: left;
  padding: 20px;
  margin-right: 20px;
  background: #fff;
  box-sizing: border-box;
}
.chart-item.chart-col-3 {
  width: calc(33.33% - 13.33px);
}
.chart-item.chart-col-4 {
  width: calc(25% - 15px);
}
.chart-item.chart-col-4:nth-child(4),
.chart-item.chart-col-3:nth-child(3) {
  margin-right: 0;
}
.chart-title{
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  text-align: left;
}
.chart-title > span {
  padding-left: 10px;
  border-left: 8px solid #3fb9fd;
}
@media screen and (max-width: 1366px) {
  .chart-item{
    margin-right: 15px;
    padding: 15px;
  }
  .chart-item.chart-col-3 {
    width: calc(33.33% - 10px);
  }
  .chart-item.chart-col-4 {
    width: calc(25% - 11.25px);
  }
  .chart-title > span {
    padding-left: 6px;
  }
}
@media screen and (max-height: 700px) {
  #show{
    margin-bottom: 15px;
  }
}

/*上方统计样式*/
.subtitle {
  margin-right: 15px;
}
.fourimg{
  width: 8vw;
  min-height: 8vw;
  margin: 30px 0;
}
.fourtitle2{
  font-size: 16px;
  line-height: 16px;
  text-align: center;
}
@media screen and (max-height: 700px) {
  .fourimg{
    width: 6vw;
    min-height: 6vw;
    margin: 15px 0;
  }
}

.bottom-chart {
  width: 100%;
  box-sizing: border-box;
}

/*图例*/
.chart-legend {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.legend-item {
  display: inline-block;
  margin-left: 100px;
  margin-bottom: 30px;
}
.legend-item:first-child,
.legend-item:nth-child(4) {
  margin-left: 0;
}
.legend-percent-num {
  font-size: 24px;
}
.legend-color {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: red;
}
@media screen and (max-width: 2560px) {
  .legend-item {
    margin-left: 200px;
    margin-bottom: 46px;
    font-size: 20px;
  }
}
@media screen and (max-width: 1920px) {
  .legend-item {
    margin-left: 34px;
    margin-bottom: 20px;
    font-size: 14px;
  }
}
@media screen and (max-width: 1500px) {
  .legend-item {
    margin-left: 50px;
    margin-bottom: 10px;
    font-size: 12px;
  }
}
@media screen and (max-width: 1366px) {
  .legend-percent-num {
    font-size: 20px;
  }
  .legend-color {
    margin-right: 6px;
  }
}

/*发票进度相关样式*/
.bill {
  padding-top: 50px;
}
.process{
  width: 90%;
  margin-top: 50px;
  margin-left: 5%;
}
.process:first-child {
  margin-top: 0;
}
.process-txt{
  width: 100%;
  text-align: left;
  font-size: 14px;
}
.process-bg{
  width: 100%;
  height: 38px;
  margin-top: 12px;
  background: #f0f7fa;
  border-radius: 5px;
}
.process-bar{
  width:0%;
  height:100%;
  background:#20d1de;
  border-radius:5px;
}
.process-num{
  display:block;
  float: right;
  font-size:20px;
}
@media screen and (max-height: 1450px) {
  .bill {
    padding-top: 150px;
  }
  .process{
    margin-top: 150px;
  }
}

@media screen and (max-height: 1100px) {
  .bill {
    padding-top: 100px;
  }
  .process{
    margin-top: 100px;
  }
}
@media screen and (max-height: 900px) {
  .bill {
    padding-top: 50px;
  }
  .process{
    margin-top: 50px;
  }
}
@media screen and (max-height: 800px) {
  .process-bg{
    margin-top: 6px;
  }
  .bill {
    padding-top: 30px;
  }
  .process{
    margin-top: 30px;
  }
}
@media screen and (max-height: 620px) {
  .process-bg{
    height: 26px;
  }
}
</style>

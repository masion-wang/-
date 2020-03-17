<!--
--- author: zhangpengyi
--- creation time: 2019-07-16
--- module: all administrator pages
--- description: 管理员首页 包括数据展示 查询 分配 编辑项目等
-->
<template>
  <div class="shouye">
    <div class="list margin-tuao">
      <ul class="list-data w-100">
        <li class="fl-lt bg-w">
          <div class="margin-auto w-80">
            <p class="list-data-title">
            <span class="d-ilblock bg-blue list-data-dian v-middle"></span>
            <span class="d-ilblock list-data-title v-middle">待分配项目</span>
            </p>
            <div id="chart" class="fl-lt" style="width:70%" ref="chart">

            </div>
            <div class="list-data-num fl-rt" >
              <ul>
                <li>
                  <p>{{evaPageList[0]}}</p>
                  <p class="list-data-num-fenpei"><span class="list-data-num-dian dian-o"></span>未分配</p>
                </li>
                <li>
                  <p>{{evaPageList[1] + evaPageList[2]}}</p>
                  <p class="list-data-num-fenpei"><span class="list-data-num-dian dian-t"></span>已分配</p>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="bg-w" style="display: inline-block">
                <div class="margin-auto w-80">
                  <p class="list-data-title">
                  <span class="d-ilblock bg-blue list-data-dian v-middle"></span>
                  <span class="d-ilblock list-data-title v-middle">评审中项目</span>
                  </p>
                  <div id="chart1" class="fl-lt" style="width:70%" ref="chart1">

                  </div>
                  <div class="list-data-num fl-rt" >
                    <ul>
                      <li>
                        <p>{{evaPageList[1]}}</p>
                        <p class="list-data-num-fenpei"><span class="list-data-num-dian dian-r"></span>评审中</p>
                      </li>
                      <li>
                        <p>{{evaPageList[0] + evaPageList[2]}}</p>
                        <p class="list-data-num-fenpei"><span class="list-data-num-dian dian-t"></span>其他</p>
                      </li>
                    </ul>
                  </div>
                </div>
        </li>
        <li class="fl-rt bg-w">
            <div class="margin-auto w-80">
                <p class="list-data-title">
                <span class="d-ilblock bg-blue list-data-dian v-middle"></span>
                <span class="d-ilblock list-data-title v-middle">评审结束项目</span>
                </p>
                <div id="chart2" class="fl-lt" style="width:70%" ref="chart2">

                </div>
                <div class="list-data-num fl-rt" >
                  <ul>
                    <li>
                      <p>{{evaPageList[2]}}</p>
                      <p class="list-data-num-fenpei"><span class="list-data-num-dian dian-g"></span>评审结束</p>
                    </li>
                    <li>
                      <p>{{evaPageList[0] + evaPageList[1]}}</p>
                      <p class="list-data-num-fenpei"><span class="list-data-num-dian dian-t"></span>其他</p>
                    </li>
                  </ul>
                </div>
              </div>
        </li>
      </ul>
      <div class="list-list w-100">
        <div class="list-left fl-lt bg-w" ref="listLeft">
          <div>
            <p class="list-left-title"><a href="javascript:;" @click="Unallocated" ref="Unallocated">待分配<span v-if="isDeal === 0">({{total}})</span></a><a href="javascript:;" @click="All" ref="All">全部<span v-if="isDeal === ''">({{total}})</span></a></p>
            <div class="list-left-xuanze">
              <div>
                <div @click="hidden(0)"><a  href="javascript:;" v-if="query.time == ''">{{date[0]}}</a><a href="javascript:;" v-else>{{query.time}}</a>

                </div
                ><div @click="hidden(1)"><a href="javascript:;" v-if="query.name == ''">项目名称</a><a href="javascript:;" v-else>{{query.name}}</a>

                </div
                ><div @click="hidden(2)"><a href="javascript:;" v-if="query.danwei == ''">委托单位</a><a href="javascript:;" v-else>{{query.danwei}}</a>

                </div
                ><div @click="hidden(3)"><a href="javascript:;" v-if="query.lianxiren == ''">联系人</a><a href="javascript:;" v-else>{{query.lianxiren}}</a>

                </div
                ><div @click="hidden(4)"><a href="javascript:;" v-if="query.zhuangtai.val == ''">项目状态</a><a href="javascript:;" v-else>{{query.zhuangtai.data}}</a>

                </div
                ><div @click="hidden(5)"><a href="javascript:;" v-if="query.fuzeren.val == ''">项目负责人</a><a href="javascript:;" v-else class="w-100">{{query.fuzeren.data}}</a>

                </div
                ><div></div
                ><div></div
                ><div><button @click="queryList" class="queryList">查询</button></div
                ><div><button @click="cancelquery" class="queryList">重置</button></div>
              </div>
              <div>
                <div v-show="hide[0]">
                  <ul >
                    <li @click="onClick( $event,'time')" class="w-100 border-box" v-for="(item,index) of date" :key="index"><a href="javascript:;" class="w-100">{{item}}</a></li>
                  </ul>
                </div>
                <div style="left:10%" v-show="hide[1]">
                    <ul class="queryIpt">
                        <li class="w-100 border-box">
                          <input type="text" class="border-box" ref="queryname">
                          <button @click="onClick( $event,'name')">确认</button>
                        </li>
                      </ul>
                </div>
                <div style="left:20%"  v-show="hide[2]">
                    <ul class="queryIpt">
                        <li class="w-100 border-box">
                          <input type="text" class="border-box" ref="querydanwei">
                          <button @click="onClick( $event,'danwei')">确认</button>
                        </li>
                      </ul>
                </div>
                <div style="left:30%" v-show="hide[3]">
                    <ul class="queryIpt">
                        <li class="w-100 border-box">
                          <input type="text" class="border-box" ref="querylianxiren">
                          <button @click="onClick( $event,'lianxiren')">确认</button>
                        </li>
                      </ul>
                </div>
                <div style="left:40%" v-show="hide[4]">
                  <ul>
                    <li @click="onClick( $event,'zhuangtai')" class="w-100 border-box" v-for="(item,index) of istConst" :key="index"><a href="javascript:;" class="w-100"  :id="item.val">{{item.data}}</a></li>
                  </ul>
                </div>
                <div style="left:50%" v-show="hide[5]">
                  <ul class="queryIpt">
                    <li @click="onClick( $event,'fuzeren')" class="w-100 border-box" v-for="(item,index) of fuzeren" :key="index"><a href="javascript:;" class="w-100" :id="item.val">{{item.data}}</a><a v-if="item.inn == 1" href="javascript:;">(已冻结)</a><a v-else-if="item.inn == 0" href="javascript:;">(未冻结)</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            :header-cell-style="tableHeaderColor"
            :row-style="tableRowStyle"
            style="width: 100%"
            @row-click="openDetails">
            <el-table-column
              min-width="5%" label="序号">
              <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (currentPage1 - 1) * 6}} </span>
              </template>

            </el-table-column>
            <el-table-column
              property="data"
              label="项目名称"
              min-width="15%" >
              <template slot-scope="scope">
                <span :title="scope.row.data">{{scope.row.data}}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="years"
              label="时间"
              min-width="7%">
              <template slot-scope="scope">
                <span :title="scope.row.years">{{scope.row.years}}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="danwei"
              label="委托单位"
              min-width="12%">
              <template slot-scope="scope">
                <span :title="scope.row.danwei">{{scope.row.danwei}}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="time"
              label="拟评价时间"
              min-width="10%">
              <template slot-scope="scope">
                <span :title="scope.row.time">{{scope.row.time}}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="name"
              label="联系人"
              min-width="10%">
              <template slot-scope="scope">
                <span :title="scope.row.name">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="zhuangtai"
              label="项目状态"
              min-width="10%">
              <template slot-scope="scope" id="scope.row.fdObjectid">
                <a href="javasctipt:;" v-if="scope.row.zhuangtai == '待处理'" class="d-ilblock ztlist bg-list1">{{scope.row.zhuangtai}}</a>
                <a href="javasctipt:;" v-if="scope.row.zhuangtai == '评审中'" class="d-ilblock ztlist bg-list2">{{scope.row.zhuangtai}}</a>
                <a href="javasctipt:;" v-if="scope.row.zhuangtai == '评审结束'" class="d-ilblock ztlist bg-list3">{{scope.row.zhuangtai}}</a>
              </template>
            </el-table-column>
            <el-table-column
              property="fuzeren"
              label="项目负责人"
              min-width="13%">
               <template slot-scope="scope">
                <span :title="scope.row.fuzeren">{{scope.row.fuzeren}}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="addr"
              label="操作"
              min-width="18%"
              >
              <template slot-scope="scope">
              <p class="bianjiout">
                <a href="javascript:;" v-on:click="fenpei($event,scope.$index,scope.row)" v-if="scope.row.addr == 1">修改分配&nbsp;|</a>
                <a href="javascript:;" v-on:click="fenpei($event,scope.$index,scope.row)" v-else-if="scope.row.addr == 0">分&nbsp;&nbsp;&nbsp;&nbsp;配&nbsp;|</a>
                <a href="javascript:;" v-on:click="openDel($event,scope.$index,scope.row)" id="scope.row.fdObjectid">删除&nbsp;|</a><a href="javascript:;" @click="listbj($event,scope.$index,scope.row)">编辑</a></p>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <p class="page-count"><span class="paging">共{{pageCount}}页,{{total}}条数据</span>
            <el-pagination
              background
              layout="prev, pager, next"
              :page-count="pageCount"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              class="d-ilblock"
              >
            </el-pagination>
            <span class="jump paging">跳转至 <input type="text" v-on:keyup="jump" ref="jump"> 页</span>
          </p>
        </div>
        <div class="list-right fl-rt" ref="listRight">
          <p>
            <span class="d-ilblock bg-blue list-data-dian v-middle"></span>
            <span class="d-ilblock list-data-title v-middle">项目详细信息</span>
          </p>
          <div>
            <ul>
                <li>
                    <div class="d-ilblock">
                      <img src="../assets/img/index/icon1.png">
                    </div>
                    <div class="d-ilblock list-right-data">
                      <p>项目名称:</p>
                      <p>{{information.name}}</p>
                    </div>
                  </li>
                  <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/icon2.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>委托单位:</p>
                          <p>{{information.company}}</p>
                        </div>
                  </li>
                  <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/icon3.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>联系人:</p>
                          <p>{{information.contacts}}</p>
                        </div>
                  </li>
                  <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/icon4.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>手机号:</p>
                          <p>{{information.phone}}</p>
                        </div>
                  </li>
                  <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/icon5.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>微信:</p>
                          <p>{{information.weixin}}</p>
                        </div>
                  </li>
                  <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/icon6.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>QQ:</p>
                          <p>{{information.qq}}</p>
                        </div>
                  </li>
                  <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/icon7.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>邮箱:</p>
                          <p>{{information.mail}}</p>
                        </div>
                  </li>
                   <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/evaTime.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>拟评价时间:</p>
                          <p>{{information.evaTime}}</p>
                        </div>
                  </li>
                   <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/evaTarget.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>评价目的:</p>
                          <p>{{information.evaTarget}}</p>
                        </div>
                  </li>
                   <li>
                      <div class="d-ilblock">
                          <img src="../assets/img/index/declareDate.png">
                        </div>
                        <div class="d-ilblock list-right-data">
                          <p>申请时间:</p>
                          <p>{{information.declareDate}}</p>
                        </div>
                  </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="fenpei-out" ref="fenpeiOut">
      <div class="fenpei el-dialog" ref="fenpei">
        <div class="col-blue fenpei-title el-dialog__header">
          <div class="el-dialog__title">项目分配</div>
          <button type="button" class="el-dialog__headerbtn" @click="fenpeiNone">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="w-80 margin-auto">
          <p id="apport-query">
            <input type="text" class="w-100" ref="userAccount" @keyup="fuzerenXY" v-model="userAccounttitle">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </p>
          <ul class="fenpei-list">
            <li v-for="(item,index) of fuzerenX" :class="item.inn?'bg-blueX':''" @click="userAccount($event)" :key="index"><a href="javascript:;" :class="item.inn?'bg-blueX':''" :id="item.val">{{ item.data }}</a>
            </li>
          </ul>
          <p class="el-dialog__footer">
            <el-button type="primary" @click="fenpeiSure">确定</el-button>
            <el-button type="primary" @click="fenpeiNone">取消</el-button>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="info" ref="infoBody">
        <div ref="info" class="infoinner">
            <p>项目信息 <a href="javascript:;" v-on:click="close"></a></p>
            <table>
                <tr>
                    <td><p><span class="c-red">*</span>名称:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.projectName" @blur="xiugainame"></td>
                    <td><p><span class="c-red">*</span>成果类型:</p></td>
                    <td colspan="2">
                        <select ref="resultType">
                            <option v-for="(item,index) of xiugai.resultType" :value ="item.val" :key="index">{{item.data}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><p><span class="c-red">*</span>单位:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.applyDept"  @blur="xiugaiapplyDept"></td>
                    <td><p><span class="c-red">*</span>任务来源:</p></td>
                    <td colspan="2"><select ref="taskSource">
                        <option v-for="(item,index) of xiugai.taskSource" :value ="item.val" :key="index">{{item.data}}</option>
                      </select></td>
                </tr>
                <tr>
                    <td><p>拟评价时间:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.evaTime" @blur="xiugaievaTime"></td>
                    <td><p><span class="c-red">*</span>联系人:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.linkMan" @blur="xiugailinkMan"></td>
                </tr>
                <tr>
                    <td><p>研究开始时间:</p></td>
                    <td colspan="2"><input type="date" v-model="xiugai.researchBeginTime"></td>
                    <td><p><span class="c-red">*</span>手机号:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.phoneNumber" @blur="xiugaiphoneNumber"></td>
                </tr>
                <tr>
                    <td><p>研究结束时间:</p></td>
                    <td colspan="2"><input type="date" v-model="xiugai.researchEndTime"></td>
                    <td><p><span class="c-red">*</span>微信:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.wechat" @blur="xiugaiwechat"></td>
                </tr>
                <tr>
                    <td><p><span class="c-red">*</span>评价目的:</p></td>
                    <td colspan="2"><select ref="evaTarget">
                        <option v-for="(item,index) of xiugai.evaTarget" :value ="item.val" :key="index">{{item.data}}</option>
                      </select></td>
                    <td><p>QQ账号:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.qqAccount" @blur="xiugaiqqAccount"></td>
                </tr>
                <tr>
                    <td><p><span class="c-red">*</span>专业技术领域:</p></td>
                    <td colspan="2"><select ref="technicalField">
                        <option v-for="(item,index) of xiugai.technicalField" :value ="item.val" :key="index">{{item.data}}</option>
                      </select></td>
                    <td><p>邮箱:</p></td>
                    <td colspan="2"><input type="text" v-model="xiugai.email" @blur="xiugaiemail"></td>
                </tr>

                <tr>
                    <td colspan="4"></td>
                    <td><button class="button" @click="onSubmit">保存</button></td>
                    <td><button class="button" v-on:click="close">取消</button></td>
                </tr>
            </table>
        </div>
    </div> -->
    <div class="info" ref="infoBody">
        <div ref="info" class="infoinner el-dialog">
          <div class="el-dialog__header" @mousedown="move($event)">
            <div class="el-dialog__title">项目信息</div>
            <button type="button" class="el-dialog__headerbtn" @click="close($event)">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </div>
            <div class="info-list">
              <el-form :inline="true" :model="xiugai" xlass="w-100" label-width="35%" :rules="rules">
                  <el-form-item label="名称"  prop="projectName">
                    <el-input v-model="xiugai.projectName"></el-input>
                  </el-form-item>
                  <el-form-item label="成果类型" prop="resultType">
                    <el-select  ref="resultType" v-model="xiugai2.resultType">
                      <el-option v-for="(item,index) of xiugai.resultType" :label="item.data" :key="index" :value="item.val"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 第二行 -->
                  <el-form-item label="申报单位" prop="applyDept">
                     <el-input v-model="xiugai.applyDept"></el-input>
                  </el-form-item>
                  <el-form-item label="任务来源">
                    <el-select  ref="taskSource" v-model="xiugai2.taskSource">
                      <el-option v-for="(item,index) of xiugai.taskSource" :label="item.data" :key="index" :value="item.val"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 第三行 -->
                  <el-form-item label="拟评价时间" prop="evaTime">
                    <el-input v-model="xiugai.evaTime"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人" prop="linkMan">
                    <el-input v-model="xiugai.linkMan"></el-input>
                  </el-form-item>
                  <!-- 第四行 -->
                  <el-form-item label="研究开始时间" >
                    <el-date-picker v-model="xiugai.researchBeginTime" type="date"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="xiugai.phoneNumber"></el-input>
                  </el-form-item>
                  <!-- 第五行 -->
                  <el-form-item label="研究结束时间">
                    <el-date-picker v-model="xiugai.researchEndTime" type="date"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="微信" prop="wechat">
                    <el-input v-model="xiugai.wechat"></el-input>
                  </el-form-item>
                  <!-- 第六行 -->
                  <el-form-item label="评价目的">
                    <el-select  ref="evaTarget" v-model="xiugai2.evaTarget">
                      <el-option v-for="(item,index) of xiugai.evaTarget" :label="item.data" :key="index" :value="item.val"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="QQ" prop="qqAccount">
                    <el-input v-model="xiugai.qqAccount"></el-input>
                  </el-form-item>
                   <!-- 第七行 -->
                  <el-form-item label="专业技术领域" prop="technicalField">
                    <el-select  ref="technicalField" v-model="xiugai2.technicalField">
                      <el-option v-for="(item,index) of xiugai.technicalField" :label="item.data" :key="index" :value ="item.val"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="xiugai.email"></el-input>
                  </el-form-item>
                  <el-form-item label="评价目的" v-if="xiugai2.evaTarget == 5">
                    <el-input v-model="evaTargetqita" style="width:274%"></el-input>
                  </el-form-item>
                  <el-form-item v-if="xiugai2.evaTarget == 5">
                  </el-form-item>
                </el-form>
            </div>
          <div class="el-dialog__footer">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button type="primary" @click="close">取消</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    //验证名称
    let projectName = (rule,value,callback)=>{
      if (!value && typeof(value)!="undefined" && value!=0){
        value = "";
        this.yanz.name = false
      }
      if(value == ""){
        this.yanz.name = false
        callback(new Error("名称不能为空"))
      }else{
        if(value.length > 25){
          this.yanz.name = false
          callback(new Error("名称不能超过25个字符"))
        }else{
          this.yanz.name = true
          callback()
        }
      }
    }
    //验证委托单位
    let applyDept = (rule,value,callback)=>{
      if (!value && typeof(value)!="undefined" && value!=0){
        value = "";
        this.yanz.applyDept = false
      }
       if(value == ""){
        this.yanz.applyDept = false
        callback(new Error("委托单位不能为空"))
      }else{
        if(value.length > 25){
          this.yanz.applyDept = false
          callback(new Error("委托单位不能超过25个字符"))
        }else{
          this.yanz.applyDept = true
          callback()
        }
      }
    }
    //验证拟评价时间
    let evaTime = (rule,value,callback)=>{
      if (!value && typeof(value)!="undefined" && value!=0){
        value = "";
        this.yanz.evaTime = false
      }
      if(value == ""){
        this.yanz.evaTime = false
        callback(new Error("拟评价时间不能为空"))
      }else{
        if(value.length > 25){
            this.yanz.evaTime = false
            callback(new Error("拟评价时间不能超过25个字符"))
        }else{
            this.yanz.evaTime = true
            callback()
          }
        }
      }
    //验证联系人
    let linkMan = (rule,value,callback)=>{
      if (!value && typeof(value)!="undefined" && value!=0){
        value = "";
        this.yanz.linkMan = false
      }
      if(value == ""){
        this.yanz.linkMan = false
        callback(new Error("联系人不能为空"))
      }else{
        if(value.length > 25){
          this.yanz.linkMan = false
          callback(new Error("联系人不能超过25个字符"))
        }else{
          this.yanz.linkMan = true
          callback()
        }
      }
    }
     //验证手机号
    let phoneNumber = (rule,value,callback)=>{
      let reg = /^1[3456789]\d{9}$/
      if(value == ""){
        this.yanz.phoneNumber = false
        callback(new Error("手机号不能为空"))
      }else{
        if(!reg.test(value)){
          this.yanz.phoneNumber = false
          callback(new Error("手机号格式有误"))
        }else{
          this.yanz.phoneNumber = true
          callback()
        }
      }
    }
    //验证微信
    let wechat = (rule,value,callback)=>{
      let reg = /^[0-9A-Za-z\_]{6,25}$/
      if(value == ""){
         this.yanz.wechat = true
        callback()
      }else{
        if(!reg.test(value)){
          this.yanz.wechat = false
          callback(new Error("微信号格式有误"))
        }else{
          this.yanz.wechat = true
          callback()
        }
      }
    }
       //验证QQ
    let qqAccount = (rule,value,callback)=>{
      let reg = /^\d{5,12}$/
      if(value == ""){
        this.yanz.qqAccount = true
        callback()
      }else{
        if(!reg.test(value)){
          this.yanz.qqAccount = false
          callback(new Error("QQ号格式有误"))
        }else{
          this.yanz.qqAccount = true
          callback()
        }
      }
    }
        //验证邮箱
    let email = (rule,value,callback)=>{
      let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      if(value == ""){
        this.yanz.email = false
        callback(new Error("邮箱不能为空"))
      }else{
        if(!reg.test(value)){
          this.yanz.email = false
          callback(new Error("邮箱格式有误"))
        }else{
          this.yanz.email = true
          callback()
        }
      }
    }
    return {
      a:"",
      formInline:{
        user : "",
        region : "",
      },
      yanz:{
        name : true, //名称
        applyDept : true,  //单位
        evaTime : true,  //拟评价时间
        linkMan : true,  //联系人
        phoneNumber : true,  //电话
        wechat : true,  //微信
        qqAccount :true,  //QQ
        email : true  //邮箱
      },
      pageCount: 0,
      total: 0,
      height: "",
      value: '',
      currentPage1 : 1,
      fName: [],
      evaPageList:[0,0,0],
      fuzeren:[
      {
          val : "",
          data : "全部"
        }
      ],
      xiugai2:{
        evaTarget : "",
        technicalField : "",
        taskSource : "",
        resultType : "",
      },
      fuzerenX:[],
      fuzerenY : [],
      xiugai : {
        projectName : "",
        resultType : [],
        applyDept : "",
        taskSource : [],
        evaTime : "",
        linkMan : "",
        researchBeginTime : "",
        researchEndTime : "",
        phoneNumber : "",
        wechat : "",
        evaTarget : [],
        qqAccount : "",
        technicalField : [],
        email : ""
      },
      userAccounttitle : "",
      xgCount : {},
      information: {
        name : "",
        company : "",
        contacts : "",
        phone : "",
        weixin : "",
        qq : "",
        mail : "",
        evaTime : "",
        evaTarget : "",
        declareDate : ""
      },
      date:[],
      evaTargetqita : "",
      hide:[false,false,false,false,false,false],
      query : {
        time : "",
        name : "",
        danwei : "",
        lianxiren : "",
        zhuangtai : {
          val : "",
          data : "全部"
        },
        fuzeren : {
          val : "",
          data : "全部"
        },
      },
      isDeal : 0,
      istConst:[{
        val : "",
        data : "全部"
      },],
      tableData: [],
      rules: {
        resultType : [
          {required:true},
        ],
          projectName: [
            {required:true,validator:projectName,trigger:'change'},
          ],
           applyDept: [
             {required:true,validator:applyDept,trigger:'change'},
           ],
           evaTime: [
             {required:true,validator:evaTime,trigger:'change'},
           ],
           linkMan: [
             {required:true,validator:linkMan,trigger:'change'},
           ],
           phoneNumber: [
             {required:true,validator:phoneNumber,trigger:'change'},
           ],
           wechat: [
             {validator:wechat,trigger:'change'},
           ],
           qqAccount: [
             {validator:qqAccount,trigger:'change'},
           ],
           email: [
             {required:true,validator:email,trigger:'change'},
           ],
           technicalField : [
             {required:true},
           ]
        },
        positionX: 0,
			  positionY: 0

    }
  },
  mounted() {
    this.Initialization()
    this.text('chart','#34b4fd','#bd77fc',this.evaPageList)
    this.text('chart1','#34b4fd','#fdb314',this.evaPageList)
    this.text('chart2','#34b4fd','#7ce226',this.evaPageList)
  },
  created(){
    this.textReq()
    this.newdate()
    this.istConstant()
    this.homePageList()
  },
  computed: {
    newevaTarget() {
      return this.xiugai2.evaTarget;
    }
  },
  watch: {
    value(){
      console.log(this.value)
    },
    newevaTarget(val){
      this.evaTargetqita = "";
    }
  },
  methods: {
    //鼠标拖动事件
    move(e){

				//计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
				let x = e.clientX - this.$refs.info.getBoundingClientRect().left;
        let y = e.clientY - this.$refs.info.getBoundingClientRect().top;
        document.onmousemove = (e) => {
					// 获取拖拽元素的位置
					let left = e.clientX - x;
					let top = e.clientY - y;
					//this.positionX = left;
					//this.positionY = top;
					//console.log(document.documentElement.clientHeight,odiv.offsetHeight)
					// 把拖拽元素 放到 当前的位置
					if (left <= 0) {
						left = 0;
					} else if (left >= document.documentElement.clientWidth - this.$refs.info.offsetWidth){
						//document.documentElement.clientWidth 屏幕的可视宽度
						left = document.documentElement.clientWidth - this.$refs.info.offsetWidth;
					}

					if (top <= 0) {
						top = 0;
					} else if (top >= document.documentElement.clientHeight - this.$refs.info.offsetHeight){
						// document.documentElement.clientHeight 屏幕的可视高度
						top = document.documentElement.clientHeight - this.$refs.info.offsetHeight

					}
					this.$refs.info.style.left = left + "px";
					this.$refs.info.style.top = top + "px"

        }
        //  每次执行后清除，鼠标抬起后就固定了
        document.onmouseup = (e) => {
					document.onmousemove = null;
            		document.onmouseup = null
				}

    },
    //查询负责人
    fuzerenXY(){
      let newss = []
      let val = this.userAccounttitle
      let reg = new RegExp(val)
      for(let i=0;i<this.fuzerenY.length;i++){
        if(reg.test(this.fuzerenY[i].data)){
            let obj = {}
            obj.val = this.fuzerenY[i].val
            obj.data = this.fuzerenY[i].data
            obj.inn = this.fuzerenY[i].inn
            newss.push(obj)
          }
      }
      this.fuzerenX = newss
    },
    //查询重置
    cancelquery(){
      this.query.time = ""
      this.query.name = ""
      this.query.danwei = ""
      this.query.lianxiren = ""
      this.query.zhuangtai.val = ""
      this.query.fuzeren.val = ""
      for(let i=0;i<this.hide.length;i++){
        this.$set(this.hide,i,false)
      }
      this.queryList()
    },
    //修改上传
    onSubmit(){
      console.log(this.yanz.name)
      if(!this.yanz.name || this.xiugai.applyDept == ""){
        this.open("名称信息有误","提示")
        return
      }
      //成果类型判断是否为NULL
       if(!this.xiugai2.resultType && typeof(this.xiugai2.resultType)!="undefined" && this.xiugai2.resultType!=0){
        this.open("成果类型不能为空","提示")
        return
      }
      if(this.xiugai.applyDept == ""){
        this.open("委托单位不能为空","提示")
        return
      }
       if(!this.yanz.applyDept){
        this.open("委托单位信息有误","提示")
        return
      }
      if(this.xiugai.evaTime == ""){
        this.open("拟评价时间不能为空","提示")
        return
      }
       if(!this.yanz.evaTime){
        this.open("拟评价时间信息有误","提示")
        return
      }
      if(this.xiugai.phoneNumber == ""){
        this.open("手机号不能为空","提示")
        return
      }
       if(!this.yanz.phoneNumber){
        this.open("手机号信息有误","提示")
        return
      }
       if(!this.yanz.wechat){
        this.open("微信号格式","提示")
        return
      }
       if(!this.yanz.qqAccount){
        this.open("QQ号格式","提示")
        return
      }
      if(this.xiugai.email == ""){
        this.open("邮箱不能为空","提示")
        return
      }
       if(!this.yanz.email){
        this.open("邮箱信息有误","提示")
        return
      }
      if(this.xiugai.wechat == "" && this.xiugai.qqAccount == ""){
        this.open("微信或者QQ必须填写一项","提示")
        return
      }
      if(this.xiugai2.evaTarget == 5){
        if(this.evaTargetqita.length > 50){
          this.open("评价目的不能超过50个字符","提示")
          return
        }else if(this.evaTargettest == ""){
          this.open("评价目的不能为空","提示")
          return
        }
      }
      console.log(this.xiugai.applyDeptapplyDept)
      console.log(1122334)
      let obj = {
        "fdObjectid": this.$refs.infoBody.id,
        "projectName": this.xiugai.projectName,
        "resultType": this.xiugai2.resultType,
        "applyDept": this.xiugai.applyDept,
        "taskSource": this.xiugai2.taskSource,
        "evaTime": this.xiugai.evaTime,
        "linkMan": this.xiugai.linkMan,
        "researchBeginTime": this.xiugai.researchBeginTime,
        "phoneNumber": this.xiugai.phoneNumber,
        "researchEndTime": this.xiugai.researchEndTime,
        "wechat": this.xiugai.wechat,
        "evaTarget": this.xiugai2.evaTarget,
        "qqAccount": this.xiugai.qqAccount,
        "technicalField": this.xiugai2.technicalField,
        "email": this.xiugai.email
      }
      if(this.xiugai2.evaTarget == 5){
        obj["otherEvaTarget"] = this.evaTargetqita
      }
      if(this.xiugai.projectName !== '' && this.xiugai.applyDept !== "" && this.xiugai.linkMan !== '' && this.xiugai.phoneNumber !== '' && this.xiugai2.technicalField !== "" && this.xiugai2.resultType !== "" && this.xiugai2.taskSource !== "" && this.xiugai2.evaTarget !== ""){
      this.$axios.post('/api-eva/scientific/updateHome',obj).then(req =>{
        if(req.data.code == 200){
          this.$refs.infoBody.style.display = "none"
          this.open("修改成功","提示")
          this.$refs.infoBody.id = ""
          this.evaTargetqita = ""
          this.homePageList()
        }
      })
    }else{
      this.open("带 * 选项不能为空","提示")
    }
    },
    //关闭修改
    close(e){
      e.cancelBubble=true
      this.$refs.infoBody.style.display = "none"
      this.$refs.infoBody.id = ""
      this.evaTargetqita = ""
    },
    //选择分配负责人
    userAccount(e){
      this.$refs.userAccount.id = e.currentTarget.firstElementChild.id
      this.userAccounttitle = e.currentTarget.firstElementChild.innerHTML
      for(let i = 0;i<this.fuzerenX.length;i++){
        if(this.$refs.userAccount.id == this.fuzerenX[i].val){
          this.fuzerenX[i].inn = 1
        }else{
          this.fuzerenX[i].inn = 0
        }
      }
    },
    //获取时间
    newdate(){
      let date = new Date()
      date = date.getFullYear()
      for(let i=0;i<=10;i++){
        this.date.push(date - i)
      }
    },
    //获取负责人列表
    fzrlist(){
      this.fuzeren = []
      this.fuzerenX = []
      this.fuzerenY = []
      this.$axios.post("/api-eva/evaUser/getUserlist",{
        "userName":"",
        "extendIsStop":""
        }).then(req =>{
          console.log(req)
          console.log(9527)
        let data = req.data.resultData
        console.log(data)
        for(let i=0;i<data.length;i++){
          let obj = {}
          obj.val = data[i].userAccount
          obj.data = data[i].userName
          obj.inn = data[i].extendIsStop
          this.fuzeren.push(obj)
          this.fuzerenX.push(obj)
          this.fuzerenY.push(obj)
        }
      })
    },
    //编辑信息
    listbj(e,index,row){
      e.cancelBubble=true
      this.$axios.post("/api-eva/scientific/getByPrimaryKey",{
        "scientificId":row.fdObjectid
      }).then(req => {
        this.$refs.infoBody.style.display = "block"
        let di = document.body.clientWidth;
        if(di >= this.$refs.info.clientWidth){
          this.$refs.info.style.left = ((di / 2) - (this.$refs.info.clientWidth /2)) + "px"
        }else{
          this.$refs.info.style.left = "0"
        }
        let ht = document.body.offsetHeight
        if(ht >= this.$refs.info.offsetHeight){
          this.$refs.info.style.top = ((ht / 2) - (this.$refs.info.offsetHeight /2)) + "px"
        }else{
          this.$refs.info.style.top = 0
        }
        this.$refs.infoBody.id = row.fdObjectid
        this.xiugai.applyDept = req.data.resultData.applyDept
        this.xiugai.email = req.data.resultData.email
        this.xiugai.qqAccount = req.data.resultData.qqAccount
        this.xiugai.wechat = req.data.resultData.wechat
        this.xiugai.projectName = req.data.resultData.projectName
        this.xiugai.linkMan = req.data.resultData.linkMan
        this.xiugai.phoneNumber = req.data.resultData.phoneNumber
        this.xiugai.evaTime = req.data.resultData.evaTime
        this.xiugai.researchBeginTime = req.data.resultData.researchBeginTime
        this.xiugai.researchEndTime = req.data.resultData.researchEndTime
        this.xiugai2.resultType = req.data.resultData.resultType
        this.xiugai2.taskSource = req.data.resultData.taskSource
        this.xiugai2.evaTarget = req.data.resultData.evaTarget
        this.xiugai2.technicalField = req.data.resultData.technicalField
        this.evaTargetqita = req.data.resultData.otherEvaTarget
        console.log(req.data)
        console.log(this.xiugai2.evaTarget)
      })
    },
    //提示弹框
    open(test,title) {
            this.$alert(test, title, {
            confirmButtonText: '确定',
            });
        },
    //删除提示
    openDel(e,index,row) {
      e.cancelBubble=true
      console.log(index)
      console.log(row)
        this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listDel(e,index,row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
      },
    //分配负责人
    fenpeiSure(){
      if(this.$refs.userAccount.id == ""){
        this.open("分配负责人不能为空","提示")
        return
      }
      if(this.userAccounttitle !== ""){
        this.$axios.post("/api-eva/scientific/saveAssignment",{
          "scientificId":this.$refs.fenpeiOut.id,
          "userAccount":this.$refs.userAccount.id
        }).then(req => {
          if(req.data.code == 200){
            this.open("分配成功","提示")
            this.$refs.fenpeiOut.style.display = "none"
            this.homePageList()
          }else{
             this.open(req.data.msg,"提示")
          }
        })
      }
    },
    hidden(e){
       if(this.hide[e]){
         for(let i=0;i<this.hide.length;i++){
          this.$set(this.hide,i,false)
         }
         this.$set(this.hide,e,false)
       }else{
        for(let i=0;i<this.hide.length;i++){
          this.$set(this.hide,i,false)
         }
        this.$set(this.hide,e,true)
       }
    },
    //常量查询接口
    istConstant(){
      this.$axios.post("/api-eva/constant/listConstant",["projectStatus","resultType","taskSource","evaTarget","technicalField"]).then(req =>{
        //状态常亮
        let data = req.data.resultData.projectStatus
        console.log(data)
        //评价目的
        let evaTarget = req.data.resultData.evaTarget
        //成果类型
        let resultType = req.data.resultData.resultType
        //任务来源
        let taskSource = req.data.resultData.taskSource
        //专业技术领域
        let technicalField = req.data.resultData.technicalField
        if(req.data.code == 200){
          this.xiugai.evaTarget = []
          console.log("nimabi")
           for(let l=0;l<evaTarget.length;l++){
              let target = {}
              target.val = evaTarget[l].constantCode
              target.data = evaTarget[l].constantValue
             this.xiugai.evaTarget.push(target)
           }
           this.xiugai.resultType = []
           for(let m=0;m<resultType.length;m++){
            let type = {}
            type.val = resultType[m].constantCode
            type.data = resultType[m].constantValue
             this.xiugai.resultType.push(type)
           }
           this.xiugai.taskSource = []
           for(let n=0;n<taskSource.length;n++){
             let task = {}
             task.val = taskSource[n].constantCode
             task.data = taskSource[n].constantValue
            this.xiugai.taskSource.push(task)
           }
           this.xiugai.technicalField = []
           for(let s=0;s<technicalField.length;s++){
            let field = {}
            field.val = technicalField[s].constantCode
            field.data = technicalField[s].constantValue
            this.xiugai.technicalField.push(field)
           }
           console.log(this.xiugai.technicalField)
           this.istConst = []
          for(let i=0;i<data.length;i++){
            let obj = {}
            obj.val = data[i].constantCode
            obj.data = data[i].constantValue
            this.istConst.push(obj)
          }
        }
      })
    },
    //点击 查询
    queryList(){
      this.currentPage1 = 1
      for(let i=0;i<this.hide.length;i++){
        this.$set(this.hide,i,false)
      }
      this.homePageList()
    },
    //搜索请求
    homePageList(){
      let time;
      let zhuangtai;
      if(this.query.zhuangtai.val == ""){
        zhuangtai = ""
      }else{
        zhuangtai = this.query.zhuangtai.val
      }
      if(this.query.time == ""){
        time = new Date()
        time = time.getFullYear()
      }else{
        time = this.query.time
      }
      console.log(this.query.fuzeren.val)
      this.$axios.post("/api-eva/scientific/homePageList",{
        "years":time,
        "projectName":this.query.name,
        "applyDept":this.query.danwei,
        "linkMan":this.query.lianxiren,
        "projectStatus": zhuangtai, //默认空字符串  空字符串代表全部状态
        "userAccount":this.query.fuzeren.val,//负责人
        "isDeal": this.isDeal, //0 代表未处理页面
        "pageNumber": this.currentPage1,
	      "limit": 6
      }).then(req => {
        this.tableData = []
        let rows
        console.log(req.data)
        if(req.data.code == 200){
          rows = req.data.resultData.rows
          this.pageCount = req.data.resultData.pages
          this.total = req.data.resultData.total
          for(let i=0;i<rows.length;i++){
            let data = {}
            if(rows[i].projectStatus == "待处理"){
              data.addr = 0
            }else{
              data.addr = 1
            }
            data.fuzeren = rows[i].userAccount
            data.data = rows[i].projectName
            data.danwei = rows[i].applyDept
            data.zhuangtai = rows[i].projectStatus
            data.time = rows[i].evaTime
            data.name = rows[i].linkMan
            data.fdObjectid = rows[i].fdObjectid
            data.years = rows[i].years
            this.tableData.push(data)
          }
        }
      })
      this.fzrlist()
    },
    //图形表请求
    textReq(){
      this.$axios.post("/api-eva/scientific/homePageStatistic").then(req => {
        if(req.data.code == 200 && req.data.resultData.length !== 0){
          this.evaPageList = []
          for(let i=0;i<req.data.resultData.length;i++){
            this.$set(this.evaPageList,i,req.data.resultData[i].value)
          }
        }
        console.log(this.evaPageList)
        if(!this.evaPageList[0] && typeof(this.evaPageList[0])!="undefined" && this.evaPageList[0]!=0){
          this.evaPageList[0] = 0
        }
      if(!this.evaPageList[1] && typeof(this.evaPageList[1])!="undefined" && this.evaPageList[1]!=0){
        this.evaPageList[1] = 0
      }
      if(!this.evaPageList[2] && typeof(this.evaPageList[2])!="undefined" && this.evaPageList[2]!=0){
        this.evaPageList[2] = 0
      }
       if(typeof(this.evaPageList[2])=="undefined"){
        this.evaPageList[2] = 0
      }
      if(typeof(this.evaPageList[0])=="undefined"){
        this.evaPageList[0] = 0
      }
      if(typeof(this.evaPageList[1])=="undefined"){
        this.evaPageList[1] = 0
      }
        this.text('chart','#34b4fd','#bd77fc',this.evaPageList)
        this.text('chart1','#34b4fd','#fdb314',this.evaPageList)
        this.text('chart2','#34b4fd','#7ce226',this.evaPageList)
      })
    },
    onClick(e,name){
      if(name == 'time'){
        this.query.time = e.currentTarget.firstElementChild.innerHTML
      }
      if(name == "name"){
        this.query.name = this.$refs.queryname.value
      }
      if(name == "danwei"){
        this.query.danwei = this.$refs.querydanwei.value
      }
      if(name == "lianxiren"){
        this.query.lianxiren = this.$refs.querylianxiren.value
      }
      if(name == "fuzeren"){
        this.query.fuzeren.val = e.currentTarget.firstElementChild.id
        this.query.fuzeren.data = e.currentTarget.firstElementChild.innerHTML
      }
      if(name == "zhuangtai"){

         this.query.zhuangtai.val = e.currentTarget.firstElementChild.id
         this.query.zhuangtai.data = e.currentTarget.firstElementChild.innerHTML
         console.log(e.currentTarget.firstElementChild.id)
         console.log(this.query.zhuangtai.data)
        // this.$set(this.query.zhuangtai,val,e.target.id)
        // this.$set(this.query.zhuangtai,data,e.currentTarget.firstElementChild.innerHTML)
      }
      for(let i=0;i<this.hide.length;i++){
          this.$set(this.hide,i,false)
         }

    },
    Unallocated(){
      let unallocated = this.$refs.Unallocated
      let all = this.$refs.All
      unallocated.style.borderTop = "0.2rem solid #34b4fd"
      all.style.borderTop = "0.2rem solid rgba(0,0,0,0)"
      this.isDeal = 0
      this.currentPage1 = 1
      this.query.val = ""
      this.query.data = "全部"
      this.cancelquery()
    },
    All(){

      let all = this.$refs.All
      let unallocated = this.$refs.Unallocated
      all.style.borderTop = "0.2rem solid #34b4fd"
      unallocated.style.borderTop = "0.2rem solid rgba(0,0,0,0)"
      this.isDeal = ""
      this.currentPage1 = 1
      this.query.val = ""
      this.query.data = "全部"
      this.cancelquery()
    },
    openDetails(row){
      let leftHeight = this.$refs.listLeft.offsetHeight
      console.log(leftHeight)
      this.$refs.listRight.style.height = leftHeight + "px"
      if(row.fdObjectid == this.$refs.infoBody.id){
        this.$refs.infoBody.id = ""//row.fdObjectid
        this.$refs.listRight.style.display = "none"
        this.$refs.listLeft.style.width = "100%"
      }else{
        this.$refs.infoBody.id = row.fdObjectid
        this.$axios.post("/api-eva/scientific/getByPrimaryKey",{
          "scientificId" : row.fdObjectid
        }).then(req => {
          console.log(req)
          let data = req.data.resultData
          if(req.data.code == 200){
            console.log(req.data)
            this.$refs.listLeft.style.width = "66.332%"
            this.$refs.listRight.style.display = "block"
            this.information.name = data.projectName
            this.information.company = data.applyDept
            this.information.contacts = data.linkMan
            this.information.phone = data.phoneNumber
            this.information.weixin = data.wechat
            this.information.qq = data.qqAccount
            this.information.mail = data.email
            this.information.declareDate = data.years //申请时间
            this.information.evaTarget = data.evaTarget  //评价目的
            this.information.evaTime = data.evaTime //拟评价时间
          }
        })
      }

    },
    Initialization(){

      let bodyWidth = document.body.clientWidth;
      let bodyHeight = document.documentElement.clientHeight;
      if(parseInt(bodyWidth) < 1200){
        bodyWidth = 1200;
      }
      this.$refs.fenpei.style.top = parseInt(bodyHeight) / 2 - 175 + "px"
      this.$refs.fenpei.style.left = parseInt(bodyWidth) / 2 - 150 + "px"
      console.log(this.$refs.fenpei.style)
      console.log(bodyHeight)
    },
    fenpeiNone(){
      this.$refs.fenpeiOut.style.display = "none"
    },
    listDel(e,index,row){
      e.cancelBubble=true
      this.$axios.post("/api-eva/scientific/delete",{
        "scientificId":row.fdObjectid
      }).then(req => {
        if(req.data.code == 200){
          this.homePageList()
        }
      })
    },
    fenpei(e,index,row){
      e.cancelBubble=true
      this.$refs.userAccount.id = ""
      this.$axios.post("/api-eva/scientific/getPersonInCharge",{
          "fdObjectid" : row.fdObjectid
        }).then(req => {
          this.userAccounttitle = req.data.resultData.userName
          this.$refs.userAccount.id = req.data.resultData.userAccount  //还没有返回
          for(let i = 0;i<this.fuzerenX.length;i++){
            if(this.$refs.userAccount.id == this.fuzerenX[i].val){
              this.fuzerenX[i].inn = 1
            }else{
              this.fuzerenX[i].inn = 0
            }
          }
        })
        this.$refs.fenpeiOut.id = row.fdObjectid
        this.$refs.fenpeiOut.style.display = "block"
    },
    //分页
    jump(){

      let numReg = /^[0-9]+$/
      let page = parseInt(this.$refs.jump.value)
      if(numReg.test(page) && page > 0){
        this.$refs.listRight.style.display = "none"
        this.$refs.listLeft.style.width = "100%"
        this.currentPage1 = page
        if(this.currentPage1 <= parseInt(this.pageCount)){
          this.homePageList()
        }else{
          this.currentPage1 = this.pageCount
          this.$refs.listRight.style.display = "none"
          this.$refs.listLeft.style.width = "100%"
        }
      }

    },
    handleCurrentChange(){
      this.$refs.listRight.style.display = "none"
      this.$refs.listLeft.style.width = "100%"
      this.homePageList()
    },
    tableHeaderColor({row,column,rowIndex,columnIndex}){
      if(rowIndex ===0){return "background-color:#fbfbfb;color:#000;font-size:1rem;"}
    },
    tableRowStyle({row,rowIndex}){
      return "font-size:1rem"
    },
    text(id,color1,color2,data){
      var data1;
      var data2;
      var data3;
      console.log(data)
      console.log("9995555")
      if(data.length > 0){
      if(id == "chart"){
        data1 = data[1] + data[2]
        data2 = data[0]
      }
      if(id == "chart1"){
        data1 = data[0] + data[2]
        data2 = data[1]
      }
      if(id == "chart2"){
        data1 = data[0] + data[1]
        data2 = data[2]

      }
      }else{
        data1 = 0;
        data2 = 0;
      }
      data3 = data1 + data2
      //设置饼图高度
      var res = this.$refs.chart.offsetWidth
       this.height = res / 1.4 + "px"
       this.$refs.chart.style.height = this.height
       this.$refs.chart1.style.height = this.height
       this.$refs.chart2.style.height = this.height
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id))
      let text1 = data3 == 0? 0 : data1 / data3 * 100
      let text2 = data3 == 0? 0 : data2 / data3 * 100
      // 绘制图表
      let option = {
        calculable : true,

        series : [
          {
            type:'pie',
            //[内圆距中间的距离，外圆距中间的距离]
            radius : ["50%", "70%"],
            //居中
            center : ['50%', '50%'],
            //第一个值得颜色跟第二个值得颜色
            color: [color1,color2],
            clockWise : false,//顺时针旋转
            silent: true,//饼图不响应鼠标事件
            labelLine : {
              normal:{
                  length:0
                }
            },
            label : {
              normal:{
                position: 'outside',
                formatter: `{c} %`,
                textStyle : {
                  fontSize : res / 12.5
                }
              },
              show : true,

            },
            data:[
              //{value:具体数值，name:页面显示的百分比}
                {value:Math.round(text1),},//name:Math.round(text1) + '%'
                {value:Math.round(text2), },//name:Math.round(text2) + '%'
            ],

        }
        ]
    };
      console.log(123)
      myChart.setOption(option);
    }
  },
}
</script>
<style >
  .shouye .el-table .cell,
  .shouye .el-table__row td .cell {
    white-space: nowrap !important;
  }
  .shouye .el-table{
    min-height:336px;
  }
*{
  margin:0;
  padding:0;
}
.shouye{
  background: #f5f5f5;
  width:100%;
  font-family: Microsoft YaHei;
}
.shouye .v-middle{
  vertical-align: middle;
}
.shouye .w-100{
  width:100%
}
.shouye a{
  text-decoration: none;
}
.shouye .w-80{
  width:80%
}
.shouye .fl-rt{
  float:right;
}
.shouye .fl-lt{
  float:left;
}
.shouye .list-left-xuanze>div:last-child .d-none{
  display:none;
}
.shouye .list-left-xuanze>div a{
  color:#000
}
.shouye .bg-blue{
  background: #34b4fd
}
.shouye .fenpei-list .bg-blueX{
  background: #34b4fd;
  color:#fff;
}
.shouye .bg-w{
  background: #fff;
}
.shouye .margin-auto{
  margin:0 auto;
}
.shouye .top{
  padding:0 2%;
  box-sizing:border-box;
}
.shouye .queryList{
  padding:0.2rem 1rem;
  background:#34b4fd;
  color:#fff;
  outline:none;
  border:none;
  border-radius:0.2rem;
}
.shouye .border-box{
  box-sizing:border-box
}
.shouye .top>p:first-child{
  color:#2993ff;
  line-height:2.5rem;
}
.shouye .top img{
  border-radius: 50%;
  width:2.5rem;
  height:2.5rem;
}
.shouye .top::after{
  content:"";
  display: block;
  clear:both;
}
.shouye .list-data{
  list-style:none;
  text-align: center;
  font-size:1rem
}
.shouye .list-data>li{
  width:32.666%;
  padding-top:20px;
  text-align: left
}
.shouye .list-left{
  width:100%;
  min-height:440px;
  overflow: auto;
}
.shouye .list-data-num{
  width:30%;
}
.shouye .list-data-num>ul{
  list-style:none;
  text-align: center;
  font-size:1.5rem;
  margin-top:30%;
}
.shouye .list-data-num>ul>li{

  margin-top:20%;
}
.shouye .list-right{
  display : none;
  width:32.666%;
  background: #fff;
  min-height:440px;
  overflow: auto;
}
.shouye .col-blue{
  color:#34b4fd;
}
.shouye .d-ilblock{
  display: inline-block
}
.shouye .list-data-num-dian{
  display: inline-block;
  border-radius: 50%;
  width:0.5rem;
  height:0.5rem;
  margin-right:0.3rem;
}
.shouye .xiala{
  width:14px;
  height:14px;
  background-image:url("../assets/img/index/xiala.png");
  background-position: 50% 50%;
  background-size: 100% 100%;
}
.shouye .dian-o{
  background:#bd77fc;
}
.shouye .dian-r{
  background:#fdb314;
}
.shouye .dian-g{
  background:#7ce226;
}
.shouye .dian-t{
  background:#34b4fd;
}
.shouye .list-data-num-fenpei{
  font-size:1rem;
}
.shouye .list-data-dian{
  width:0.2rem;
  height:0.8rem;
}
.shouye .list-left-title{
  font-weight: bold;
  text-align: left;
}
.shouye .list-left-title>a{
  display: inline-block;
  text-decoration: none;
  color:#34b4fd;
  height:3rem;
  line-height:3rem;
  margin-left:1rem;
  padding: 0 0.5rem;
}
.shouye .list-left-title>a:first-child{
  border-top:0.2rem solid #34b4fd;
}
.shouye .list-left-xuanze{
  font-size:1.1rem;
  white-space: nowrap;
  width:100%;
  table-layout:fixed;
  position:relative;
}
.shouye .list-left-xuanze>div>div{
  width:10%;
  text-align:left;
}
.shouye .list-left-xuanze>div:first-child div{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display:inline-block;
}
.shouye .list-left-xuanze>div:last-child{
  width:100%;
  position: absolute;
  top:1.8rem;
  left:0;
  z-index:100;
}
.shouye .list-left-xuanze>div:last-child div{
  width:10%;
  position:absolute;
  top:0;
}

.shouye .list-left-xuanze ul{
  top:1rem;
  /* display:none; */
  list-style: none;
  z-index:10;
  width:100%;
  background:#fff;
  box-sizing:border-box;
  border:1px solid #aaa;
  box-shadow: 0 0.1rem 0.2rem #aaa;
  max-height:15rem;
  overflow: auto;
}
.shouye .list-left-xuanze ul>li{
  padding:0.5rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.shouye .list-left-xuanze .queryIpt{
  width:200%;
  padding-bottom:0.5rem;
}
.shouye .list-left-xuanze .queryIpt input{
  width:70%;
  height:1.5rem;
}
.shouye .list-left-xuanze .queryIpt button{
  width:25%;
  margin-left:3%;
  box-sizing:border-box;
  height:1.5rem;
  outline:none;
  background:#fafafa;
  border:1px solid #aaa;
}
.shouye a.ztlist{
  color:#fff;
  padding:0.2rem 0.5rem;
  border-radius:0.3rem;
}
.shouye .bg-list1{
  background:#b56afb
}
.shouye .bg-list2{
  background:#2cb1fc
}
.shouye .bg-list3{
  background:#05d040
}
.shouye .list-list{
  width:98%;
  margin: 0 auto;
  margin-top:1rem;
}
.shouye .list-list::after{
  content:"";
  display: block;
  clear:both;
}
.shouye .list-left>div{
  width:94%;
  margin:0 auto;
  text-align: center;
}
.shouye .list-right>p{
  padding-left:10%;
  font-size:1rem;
  margin-top:0.5rem;
  text-align:left;
}
.shouye .list-right ul{
  list-style: none;
  width:80%;
  margin:0 auto;
  margin-top:0.5rem;
}
.shouye .list-right li{
  margin-top:0.5rem;
  text-align:left;
}
.shouye .list-right li>div:first-child{
  width:3rem;
}

.shouye .list-right img{
  width:100%;
  height:100%;
}
.shouye .list-right-data{
  width:80%;
  line-height:1.5rem;
}
.shouye .list-right-data>p{
  font-size:1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.shouye .list-right-data>p:first-child{
  font-weight: bold;
}
.shouye .list-right-data>p:last-child{
  color:#767676;
}
.shouye .page-count{
  padding-left:3%;
}
.shouye .paging{
  font-size:1rem;
  position: relative;
  top:0.3rem;
}
.shouye .jump>input{
  display: inline-block;
  width:10%;
  height:22px;
  background:#f4f4f5;
  border-radius: 3px;
  border:1px solid #efefef;
  position:relative;
  top:-0.1rem;
  outline:none;
  text-align:center;
}

.shouye .fenpei{
  position: absolute;
  width:300px;
  height:350px;
  background: #fff;
  overflow: hidden;
}
.shouye .fenpei-list{
  width:100%;
  background:#fafafa;
  list-style:none;
  height:13rem;
  margin-bottom:15px;
  overflow: auto;
}
.shouye .fenpei a{
  color:#000;
}
.shouye .fenpei-list>li{
  font-size:1rem;
  width:100%;
  text-align:center;
  height:2.5rem;
  line-height:2.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  position: relative;
}

.shouye .fenpei>div>p:first-child{
  box-sizing: border-box;
  height: 34px;
  margin-top:2rem;
  line-height:2rem;
}
#apport-query {
  position: relative;
}
#apport-query .el-icon-search {
  position: absolute;
  top: 0;
  right: 5px;
  line-height: 34px;
  color: #d3d1d1;
}

.shouye .fenpei>div>p:first-child>input{
  width:100%;
  height: 34px;
  padding-left:1rem;
  line-height: 32px;
  box-sizing: border-box;
  outline: none;
  border:1px solid #e6e6e6;
}
.shouye .fenpei .fenpei-button{
  height:30px;
  width:30%;
  line-height:30px;
  text-align:center;
  background:#02a2f8;
  color:#fff;
  border-radius:5px;
}
.shouye .text-right{
  text-align: right;
}
.shouye .fenpei-out{
  width:100%;
  height:100%;
  background:rgba(150,150,150,0.3);
  position:fixed;
  z-index:1;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:none;
}
  .shouye .info{
    display:none;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1;
    background:rgba(0,0,0,.5);
  }
  .shouye .info>div{
    width:50rem;
    background:#fff;
    position: absolute;
    top:10px;
    left:100px;
    font-size:1rem;
    max-height:40rem;
    overflow: auto;
  }
        .shouye .info .danxuan{
            max-width:25%;
            height:0.8rem;
        }
        .shouye .info b{
            padding-left:0.6rem;

        }
        .shouye .c-red{
    color:#f00;
  }
  .shouye .bianjiout{
    color:#000
  }
  .shouye .bianjiout>a{
    color:#03a0fd;
  }
  .shouye .el-form-item>div>div{
    width:100%;
  }
.shouye .el-form-item>div{
  width:60%;
}
.shouye .el-form-item>div>div{
  width:100%;
}
/* .shouye .el-form-item>div input{
  box-sizing:border-box;
  width:100%;
  height:34px;
} */
.shouye .el-form--inline .el-form-item{
  height:34px;
  }
  .shouye .el-form-item{
    width:45%;
    box-sizing:border-box;
  }
/* }
.shouye .el-form-item__content{
  height:34px;
  line-height:34px;
} */
element.style{
  margin-bottom:0;
  margin-right:0;
}
.info-list{
  margin-top:1rem;
  margin-bottom:1rem;
  overflow: auto;
}
</style>


<!--
--- author: zhangpengyi
--- creation time: 2019-07-16
--- module: all administrator pages
--- description: 项目评审 包括导出专家。到处专家签到。遴选专家，添加专家等
-->
<template>
    <div class="pingshen">
        <div class="search">
            <div>
                <div>
                    <span>申请时间</span><input type="text" v-model="check.date">
                </div
                ><div>
                    <span>项目名称</span><input type="text" v-model="check.name">
                </div
                ><div>
                    <span>委托单位</span><input type="text" v-model="check.company">
                </div
                ><div>
                    <span>联系人</span><input type="text" v-model="check.contacts">
                </div
                ><div></div
                ><div>
                    <span>手机号</span><input type="text" v-model="check.phone">
                </div
                ><div>
                    <span>邮箱</span><input type="text"  v-model="check.mail">
                </div
                ><div>
                    <span>微信</span><input type="text" v-model="check.weixin">
                </div
                ><div>
                    <span>QQ</span><input type="text" v-model="check.qq">
                </div
                ><div>
                    <button @click="clickList">查询</button>
                    <button v-on:click="empty">重置</button>
                </div>
            </div>
        </div>
        <div class="list bg-w">
            <p>
                <a href="javascript:;" class="daochu d-ilblock" @click="exportData"><img src="../assets/img/index/export1.png" alt="" > <span>导出</span></a>
                <a href="javascript:;" class="daochu d-ilblock" @click="elportExperts"><img src="../assets/img/index/export2.png" alt="" > <span>导出专家签到表</span></a>
            </p>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="tableHeaderColor"
                    :row-style="tableRowStyle"
                    >
                    <el-table-column
                    type="selection"
                    min-width="3%">
                    </el-table-column>
                    <el-table-column
                    label="序号"
                    min-width="5%">
                    <template slot-scope="scope">
                        <span>{{scope.$index + 1 + (currentPage1 - 1) * 10}} </span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="years"
                    label="申请时间"
                    min-width="8%"
                    >
                    <template slot-scope="scope">
                      <span :title="scope.row.years">{{scope.row.years}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="projectName"
                    label="项目名称"
                    min-width="8%"
                    >
                    <template slot-scope="scope">
                      <span :title="scope.row.projectName">{{scope.row.projectName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="applyDept"
                    label="委托单位"
                    min-width="8%"
                    >
                    <template slot-scope="scope">
                      <span :title="scope.row.applyDept">{{scope.row.applyDept}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="linkMan"
                    label="联系人"
                    min-width="7%">
                      <template slot-scope="scope">
                        <span :title="scope.row.linkMan">{{scope.row.linkMan}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="phoneNumber"
                    label="手机号"
                    min-width="7%"
                    >
                      <template slot-scope="scope">
                        <span :title="scope.row.phoneNumber">{{scope.row.phoneNumber}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="微信"
                    min-width="7%"
                    >
                      <template slot-scope="scope">
                        <span :title="scope.row.wechat">{{scope.row.wechat}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="qqAccount"
                    label="QQ"
                    min-width="6%"
                    >
                      <template slot-scope="scope">
                        <span :title="scope.row.qqAccount">{{scope.row.qqAccount}}</span>
                      </template>
                    </el-table-column>
                     <el-table-column
                    prop="email"
                    label="邮箱"
                    min-width="6%"
                    >
                      <template slot-scope="scope">
                        <span :title="scope.row.email">{{scope.row.email}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="evaTarget"
                    label="评价目的"
                    min-width="8%"
                    >
                    <template slot-scope="scope">
                        <span :title="scope.row.evaTarget">{{scope.row.evaTarget}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="nameX"
                    label="是否选择了专家"
                    min-width="10%"
                    >
                    <template slot-scope="scope">
                        <p v-if='scope.row.choiceStatus == 0'>否</p>
                        <p v-else-if="scope.row.choiceStatus == 1">是</p>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="17%"
                    >
                    <template slot-scope="scope">
                        <p>
                            <a href="javascript:;" @click="handleEdit(scope.$index,scope.row)">遴选专家&nbsp;|</a>
                            <a href="javascript:;" @click="openOut(scope.$index,scope.row)">审评结束&nbsp;|</a>
                            <a href="javascript:;" @click="openDel(scope.$index,scope.row)">删除</a>
                        </p>
                    </template>
                    </el-table-column>
            </el-table>
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
        <div class="linxuan" ref="linxuan">
           <div ref="linxuaninner">
               <p @mousedown="move($event)">遴选专家
                    <a href="javascript:;" @click="linxuanclose"></a></p>
            <div class="shuttle">
                <div class="shuttle_item fl-lt shuttle_item-lt">
                  <a href="javascript:;" v-on:click="allExpert">{{all}}</a>
                  <button class="fl-rt " @click="conss">添加</button>
                  <ul class="school school-left">
                    <li><input type="text" @keyup="searchExpert" ref="searchExpert"></li>
                    <li v-for="(item,index) in allSchool" :key="index">
                      <input type="checkbox" :id="item.userId" :value="item.userId"
                             v-model="schoolsNames"
                             :disabled="teamName.length>0?true:false"
                      >
                      <label :for="item.userId">{{item.username}}</label>
                    </li>
                  </ul>
                </div>
                <div class="shuttle_arrow">
                  <el-button type="primary" plain @click="toRightTeam"
                             :disabled="schoolsNames.length==0?true:false">&gt;
                  </el-button>
                  <el-button type="primary" plain class="mis-button"
                             :disabled="teamName.length==0?true:false" @click="toLeftSchools">&lt;
                  </el-button>
                </div>
                <div class="shuttle_item fl-rt shuttle_item-rt">
                  <p>已选专家</p>
                  <ul class="school">
                    <li v-for="(item ,index ) in allTeam" :key="index">
                      <input type="checkbox" :id="item.userId" :value="item.userId"
                             v-model="teamName"
                             :disabled="schoolsNames.length>0?true:false"
                      >
                      <label for="item.userId">{{item.username}}</label>
                    </li>
                  </ul>
                </div>
            </div>
            <p><a href="javascript:;" @click="linxuanUp">确定</a><a href="javascript:;" @click="linxuanclose">取消</a></p>
           </div> 
        </div>
        <div class="insertzhuanjia" ref="insertzhuanjia">
          <div ref="insertzhuanjialsit">
              <p @mousedown="moveX($event)">添加专家<a href="javascript:;" @click="zhuanjiaclose"></a></p>
              <!-- 第一行 -->
              <div class="insertzhuanjiadata">
                <el-form :inline="true" :model="form" xlass="w-100" label-width="35%" :rules="rules">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" @blur="zhuanjiapanding"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位"  prop="workUnit">
                    <el-input v-model="form.workUnit"></el-input>
                  </el-form-item>
                  <!-- 第二行 -->
                  <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="职称" prop="professionalTitle">
                    <el-input v-model="form.professionalTitle"></el-input>
                  </el-form-item>
                  <!-- 第三行 -->
                  <el-form-item label="职务" prop="duty">
                    <el-input v-model="form.duty"></el-input>
                  </el-form-item>
                  <el-form-item label="从事专业" prop="professional">
                    <el-input v-model="form.professional"></el-input>
                  </el-form-item>
                  <!-- 第四行 -->
                  <el-form-item label="联系电话" prop="linkPhone">
                    <el-input v-model="form.linkPhone"></el-input>
                  </el-form-item>
                  <el-form-item label="研究方向" prop="researchDirection">
                    <el-input v-model="form.researchDirection"></el-input>
                  </el-form-item>
                   <!-- 第五行 -->
                  <el-form-item label="社会兼职" prop="partJob">
                    <el-input v-model="form.partJob"></el-input>
                  </el-form-item>
                  <el-form-item label="级别" prop="level">
                    <el-input v-model="form.level"></el-input>
                  </el-form-item>
                   <!-- 第六行 -->
                  <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="form.phoneNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                   <!-- 第七行 -->
                  <el-form-item label="微信" prop="wechat">
                    <el-input v-model="form.wechat"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ" prop="qqAccount">
                    <el-input v-model="form.qqAccount"></el-input>
                  </el-form-item>
                  <!-- 备注 -->
                  <el-form-item label="备注" class="beizhu" label-width="17.5%" prop="note">
                    <el-input type="textarea" v-model="form.note" resize="none"></el-input>
                  </el-form-item>
                  <!-- 专家参与项目 -->
                  <el-form-item label="参与项目" prop="projects" class="insertzhuanjia-tj">
                    <el-input v-model="form.projects"></el-input>
                    <img src="../assets/img/pictrue/add.png" alt="" class="insertzhuanjia-tjx" @click="projectsinstall">
                  </el-form-item>
                  <el-form-item>
                  </el-form-item>                  
                </el-form>
                <p class="projectsclose-out">
                  <span v-for='(item,index) of projects' :key="index">{{item}}<button @click="projectsclose(index)" class="projectsclose">X</button></span>
                </p>
                <p class="insertzhuanjiaup">
                  <el-button type="primary" @click="zhuanjiaup">保存</el-button>
                  <el-button type="primary" @click="zhuanjiaclose">取消</el-button>
                </p>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "pingshen",
    data() {      
    let tianjianame = (rule,value,callback)=>{
      console.log(rule)
      if(value == ""){
        this.formX.name = false
        callback(new Error("姓名不能为空"))
      }else{
        if(value.length > 10){
          this.formX.name = false
          callback(new Error("姓名不能超过10个字符"))
          return
        }else{
          this.formX.name = true
          callback()
          return
        }
      }
    }
    let tianjiaX = (rule,value,callback)=>{
      if(value == ""){
        if(rule.field == "workUnit"){//验证工作单位
          this.formX.workUnit = true
          callback()
          return
        }
        if(rule.field == "professionalTitle"){//验证职称
          this.formX.professionalTitle = true
          callback()
          return
        }
        if(rule.field == "duty"){//验证职务
          this.formX.duty = true
          callback()
          return
        }
        if(rule.field == "professional"){//验证从事专业
          this.formX.professional = false
          callback(new Error("从事专业不能为空"))
          return
        }
        if(rule.field == "researchDirection"){//验证研究方向
          this.formX.researchDirection = false
          callback(new Error("研究方向不能为空"))
          return
        }
        if(rule.field == "partJob"){//验证社会兼职
          this.formX.partJob = true
          callback()
          return
        }
        if(rule.field == "level"){//验证级别
          this.formX.level = false
          callback(new Error("级别不能为空"))
          return
        }
        if(rule.field == "note"){//验证备注
          this.formX.note = true
          callback()
          return
        }
        if(rule.field == "projects"){//验证参与项目
          this.formX.projects = true
          callback()
          return
        }
      }else{
        if(value.length > 25){
          if(rule.field == "workUnit"){//验证工作单位
            this.formX.workUnit = false
            callback(new Error("工作单位不能超过25个字符"))
            return
          }  
          if(rule.field == "professionalTitle"){//验证职称
            this.formX.professionalTitle = false
            callback(new Error("职称不能超过25个字符"))
            return
          } 
          if(rule.field == "duty"){//验证职务
            this.formX.duty = false
            callback(new Error("职务不能超过25个字符"))
            return
          }   
          if(rule.field == "professional"){//验证从事专业
            this.formX.professional = false
            callback(new Error("从事专业不能超过25个字符"))
            return
          }
          if(rule.field == "researchDirection"){//验证研究方向
            this.formX.researchDirection = false
            callback(new Error("研究方向不能超过25个字符"))
            return
          }
          if(rule.field == "partJob"){//验证社会兼职
            this.formX.partJob = false
            callback(new Error("社会兼职不能超过25个字符"))
            return
          }
          if(rule.field == "level"){//验证级别
            this.formX.level = false
            callback(new Error("级别不能超过25个字符"))
            return
          }    
          if(rule.field == "note"){//验证备注
            this.formX.note = false
            callback(new Error("备注不能超过25个字符"))
            return
          }  
          if(rule.field == "projects"){//验证专家参与项目
            this.formX.projects = false
            callback(new Error("参与项目不能超过25个字符"))
            return
          } 
        }else{
          if(rule.field == "workUnit"){//验证工作单位
            this.formX.workUnit = true
            callback()
            return
          }      
          if(rule.field == "professionalTitle"){//验证职称
            this.formX.professionalTitle = true
            callback()
            return
          } 
          if(rule.field == "duty"){//验证职务
            this.formX.duty = true
            callback()
            return
          }   
          if(rule.field == "professional"){//验证从事专业
            this.formX.professional = true
            callback()
            return
          }  
          if(rule.field == "researchDirection"){//验证社会兼职
            this.formX.researchDirection = true
            callback()
            return
          }  
          if(rule.field == "partJob"){//验证社会兼职
            this.formX.partJob = true
            callback()
            return
          }  
          if(rule.field == "level"){//验证级别
            this.formX.level = true
            callback()
            return
          }  
           if(rule.field == "note"){//验证备注
            this.formX.note = true
            callback()
            return
          } 
          if(rule.field == "projects"){//验证专家参与项目
            this.formX.projects = true
            callback()
            return
          } 
        }
      }
    }
    let tianjiaphoneNumber = (rule,value,callback)=>{//验证手机号
      let reg = /^1[3456789]\d{9}$/
      if(value == ""){
        this.formX.phoneNumber = false
        callback(new Error("手机号不能为空"))
        return
      }
      if(reg.test(value)){
        this.formX.phoneNumber = true
        callback()
        return
      }else{
        this.formX.phoneNumber = false
        callback(new Error("手机号格式有误"))
        return
      }
    }
    let tianjiaemail = (rule,value,callback)=>{//验证邮箱
      let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      if(value == ""){
        this.formX.email = false
        callback(new Error("邮箱不能为空"))
        return
      }
      if(value.length > 25){
        this.formX.email = false
        callback(new Error("邮箱不能为超过25个"))
        return
      }
      if(reg.test(value)){
        this.formX.email = true
        callback()
        return
      }else{
        this.formX.email = false
        callback(new Error("邮箱格式有误"))
        return
      }
    }
    let tianjiaqqAccount = (rule,value,callback)=>{//验证QQ
      let reg = /^\d{6,20}$/
      if(value == ""){
        this.formX.qqAccount = true
        callback()
        return
      }
      if(reg.test(value)){
        this.formX.qqAccount = true
        callback()
        return
      }else{
        this.formX.qqAccount = false
        callback(new Error("QQ号格式有误"))
        return
      }
    }
    let tianjiawechat = (rule,value,callback)=>{//验证微信
      let reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
      if(value == ""){
        this.formX.wechat = true
        callback()
        return
      }
      if(reg.test(value)){
        this.formX.wechat = true
        callback()
        return
      }else{
        this.formX.wechat = false
        callback(new Error("微信号格式有误"))
        return
      }
    }
    let tianjialinkPhone = (rule,value,callback)=>{//验证座机
      let reg = /^[0-9-]{7,19}$/
      if(value == ""){
        this.formX.linkPhone = true
        callback()
        return
      }
      if(reg.test(value)){
        this.formX.linkPhone = true
        callback()
        return
      }else{
        this.formX.linkPhone = false
        callback(new Error("联系电话格式有误"))
        return
      }
    }
        return {
          //添加专家数据
            form : {
              name : "",
              workUnit : "",
              sex : "男",
              professionalTitle : "",
              duty : "",
              professional : "",
              linkPhone : "",
              researchDirection : "",
              partJob : "",
              level : "",
              phoneNumber : "",
              email : "",
              wechat : "",
              projects : "",
              qqAccount : "",
              note : "",
            },
            projects : [],
              formX : {
              name : false,
              workUnit : true,
              professionalTitle : true,
              duty : true,
              professional : false,
              linkPhone : true,
              researchDirection : false,
              partJob : true,
              level : false,
              phoneNumber : false,
              email : false,
              wechat : true,
              projects : true,
              qqAccount : true,
              note :true,
            },
            pageCount: 14,
            total: 54,
            currentPage1 : 1,
            check : {
                    name : "",
                    phone : "",
                    contacts : "",
                    date : "",
                    mail : "",
                    company : "",
                    weixin : "",
                    qq : ""
                },
            tableData: [],
            multipleSelection: "",
            //全部专家显示用
            allSchool: [],
        tableChange : [],
        yuanshi: [],//全部专家备份
        all: "全部专家",
        allTeam: [],  //已选专家
        schoolsNames: [],   //全部专家 选中的
        teamName: [],   //已选专家  选中的
        rules: {
          name: [
            {required:true,validator:tianjianame,trigger:'change'},
          ],
           workUnit: [
             {validator:tianjiaX,trigger:'change'},
           ],
           professionalTitle: [
             {validator:tianjiaX,trigger:'change'},
           ],
           duty: [
             {validator:tianjiaX,trigger:'change'},
           ],
           professional: [
             {required:true,validator:tianjiaX,trigger:'change'},
           ],
           linkPhone: [
             {validator:tianjialinkPhone,trigger:'change'},
           ],
           researchDirection: [
             {required:true,validator:tianjiaX,trigger:'change'},
           ],
           partJob: [
             {validator:tianjiaX,trigger:'change'},
           ],
           level: [
             {required:true,validator:tianjiaX,trigger:'change'},
           ],
           phoneNumber: [
             {required:true,validator:tianjiaphoneNumber,trigger:'change'},
           ],
          note :[
             {validator:tianjiaX,trigger:'change'},
           ],
           email :[
             {required:true,validator:tianjiaemail,trigger:'change'},
           ],
           qqAccount :[
             {validator:tianjiaqqAccount,trigger:'change'},
           ],
           wechat : [
             {validator:tianjiawechat,trigger:'change'},
           ],
           projects : [
             {validator:tianjiaX,trigger:'change'},
           ],
        }
      }
    },
    created() {
        this.text()
        this.mylogin()
        this.professorList()
    },
    methods: {
          //添加专家鼠标拖动事件
      moveX(e){
				
				//计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
				let x = e.clientX - this.$refs.insertzhuanjialsit.getBoundingClientRect().left;
        let y = e.clientY - this.$refs.insertzhuanjialsit.getBoundingClientRect().top;
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
					} else if (left >= document.documentElement.clientWidth - this.$refs.insertzhuanjialsit.offsetWidth){
						//document.documentElement.clientWidth 屏幕的可视宽度
						left = document.documentElement.clientWidth - this.$refs.insertzhuanjialsit.offsetWidth;
					}
					
					if (top <= 0) {
						top = 0;
					} else if (top >= document.documentElement.clientHeight - this.$refs.insertzhuanjialsit.offsetHeight){
						// document.documentElement.clientHeight 屏幕的可视高度
						top = document.documentElement.clientHeight - this.$refs.insertzhuanjialsit.offsetHeight
						
					}
					this.$refs.insertzhuanjialsit.style.left = left + "px";
					this.$refs.insertzhuanjialsit.style.top = top + "px"
					
        }
        // 每次执行后清除，鼠标抬起后就固定了
        document.onmouseup = (e) => {
					document.onmousemove = null;
            		document.onmouseup = null
				}

    },
       //遴选专家鼠标拖动事件
    move(e){
				
				//计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
				let x = e.clientX - this.$refs.linxuaninner.getBoundingClientRect().left;
        let y = e.clientY - this.$refs.linxuaninner.getBoundingClientRect().top;
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
					} else if (left >= document.documentElement.clientWidth - this.$refs.linxuaninner.offsetWidth){
						//document.documentElement.clientWidth 屏幕的可视宽度
						left = document.documentElement.clientWidth - this.$refs.linxuaninner.offsetWidth;
					}
					
					if (top <= 0) {
						top = 0;
					} else if (top >= document.documentElement.clientHeight - this.$refs.linxuaninner.offsetHeight){
						// document.documentElement.clientHeight 屏幕的可视高度
						top = document.documentElement.clientHeight - this.$refs.linxuaninner.offsetHeight
						
					}
					this.$refs.linxuaninner.style.left = left + "px";
					this.$refs.linxuaninner.style.top = top + "px"
					
        }
        // 每次执行后清除，鼠标抬起后就固定了
        document.onmouseup = (e) => {
					document.onmousemove = null;
            		document.onmouseup = null
				}

    },
      //判断专家是否存在
      zhuanjiapanding(){
        if(this.form.name !== ""){
          this.$axios.post("/api-eva/professor/checkProfessor",{
            "name": this.form.name
          }).then(req => {
            console.log(req)
            if(req.data.code == 20001){
              this.openzhuanjia()
            }
          })
        }
      },
      //判断专家是否重复提示
       openzhuanjia(index,row) {      
      console.log(index)
      console.log(row)
        this.$confirm('专家姓名重复, 是否继续添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {          
        }).catch(() => {  
          this.form.name = ""
        });
      },
      //插入参与项目
      projectsinstall(){
        if(!this.formX.projects){
          this.open('添加项超出字数限制,无法插入',"提示")
          return
        }
        if(this.projects.length >= 5){
          this.open('最多只能插入5条参与项目',"提示")
          return
        }
        this.projects.push(this.form.projects)        
        this.form.projects = ""
      },
      //删除参与项目
      projectsclose(index){
        console.log(index)
        this.projects.splice(index,1)
      },
      //添加专家保存
      zhuanjiaup(){        
        if(!this.formX.name){
          this.open('姓名信息有误',"提示")
          return
        }
        if(!this.formX.workUnit){
          this.open('工作单位字数超出限制',"提示")
          return
        }
        if(!this.formX.professionalTitle){
          this.open('职称字数超出限制',"提示")
          return
        }
        if(!this.formX.duty){
          this.open('职务字数超出限制',"提示")
          return
        }
        if(!this.formX.professional){
          this.open('从事专业信息有误',"提示")
          return
        }
        if(!this.formX.linkPhone){
          this.open('联系电话格式有误',"提示")
          return
        }
        if(!this.formX.researchDirection){
          this.open('研究方向信息有误',"提示")
          return
        }
        if(!this.formX.partJob){
          this.open('社会兼职字数超出限制',"提示")
          return
        }
        if(!this.formX.level){
          this.open('级别信息有误',"提示")
          return
        }
        if(!this.formX.phoneNumber){
          this.open('手机号信息有误',"提示")
          return
        }
        if(!this.formX.email){
          this.open('邮箱号信息有误',"提示")
          return
        }
        if(!this.formX.qqAccount){
          this.open('QQ号格式有误',"提示")
          return
        }
        if(!this.formX.wechat){
          this.open('微信号格式有误',"提示")
          return
        }
        if(!this.formX.note){
          this.open('备注字数超出限制',"提示")
          return
        }
        let projects = "";
        for(let i=0;i<this.projects.length;i++){
          if(i == this.projects.length - 1){
            projects += this.projects[i]
          }else{
            projects += this.projects[i] + ","
          }
        }
        this.$axios.post("/api-eva/professor/insert",{
          "name": this.name,
          "workUnit": this.workUnit,
          "sex": this.sex,
          "professionalTitle": this.professionalTitle,
          "duty": this.duty,
          "professional": this.professional,
          "linkPhone": this.linkPhone,
          "researchDirection": this.researchDirection,
          "partJob": this.partJob,
          "level": this.level,
          "phoneNumber": this.phoneNumber,
          "email": this.email,
          "wechat": this.wechat,
          "qqAccount": this.qqAccount,
          "note": this.note,
        	"projects":projects
        }).then(req => {
          console.log(req)
          if(req.data.code == 200){
            this.open('专家添加成功',"提示")
            this.zhuanjiaclose()
            this.professorList()
          }else{
            this.open('专家添加失败',"提示")
          }
        })
      },
      //添加专家取消
      zhuanjiaclose(){
        this.form.name = "";
        this.form.workUnit = "";
        this.form.sex = "男";
        this.form.professionalTitle = "";
        this.form.duty = "";
        this.form.professional = "";
        this.form.linkPhone = "";
        this.form.researchDirection = "";
        this.form.partJob = "";
        this.form.level = "";
        this.form.phoneNumber = "";
        this.form.email = "";
        this.form.qqAccount = "";
        this.form.note = "";
        this.form.wechat = "";
        this.form.projects = "";
        this.projects = []
        this.formX.name = false;
        this.formX.workUnit = true;
        this.formX.professionalTitle = true;
        this.formX.duty = true;
        this.formX.professional = false;
        this.formX.linkPhone = true;
        this.formX.researchDirection = false;
        this.formX.partJob = true;
        this.formX.level = false;
        this.formX.phoneNumber = false;
        this.formX.email = false;
        this.formX.qqAccount = true;
        this.formX.note = true;
        this.formX.wechat = true;
        this.formX.projects = true;
        this.$refs.insertzhuanjia.style.display = "none"
      },
      //提示弹框
    open(test,title) {
            this.$alert(test, title, {
            confirmButtonText: '确定',
            });
        },
      conss(){
        console.log(this.allSchool)
        this.$refs.insertzhuanjia.style.display = "block"
        let bwidth = document.body.clientWidth;
        let bheight = document.body.offsetHeight;
        if(bwidth >= this.$refs.insertzhuanjialsit.clientWidth){
            this.$refs.insertzhuanjialsit.style.left = ((bwidth / 2) - (this.$refs.insertzhuanjialsit.clientWidth /2)) + "px"
        }else{
            this.$refs.insertzhuanjialsit.style.left = "0"
        }
        if(bheight >= this.$refs.insertzhuanjialsit.offsetHeight){
            this.$refs.insertzhuanjialsit.style.top = ((bheight / 2) - (this.$refs.insertzhuanjialsit.offsetHeight /2)) + "px"
        }else{
            this.$refs.insertzhuanjialsit.style.top = 0
        }
      },
      //遴选结束提示
      openOut(index,row) {    
      console.log(index)
      console.log(row)
        this.$confirm('是否结束评审?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {          
          this.handleOut(index,row)
          this.$message({
            type: 'success',
            message: '评审结束成功!'
          });
        }).catch(() => {      
        });
      },
      //删除提示
       openDel(index,row) {      
      console.log(index)
      console.log(row)
        this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {          
          this.handleDelete(index,row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {         
        });
      },
      //导出专家签到表
      elportExperts(){
        if(this.multipleSelection !== ""){
          this.$axios.post("/api-eva/scientific/evaPageExpert",{
            "scientificIds" : this.multipleSelection
          },{
          responseType: 'blob'
          }).then(req => {
            console.log(req)    
            console.log(this.multipleSelection)        
            this.download1(req.data)
             if(req.data.size == ""){
              this.open('下载失败',"提示")
            }
          })
        }else{
          this.open('请勾选项目',"提示")
        }
      },
      //导出信息
      exportData(){
        if(this.tableChange.length == 1){
          this.$axios.post("/api-eva/scientific/evaPageExport",{
            "scientificIds" : this.multipleSelection
          }, {
          responseType: 'blob'
          }).then(req => {
            console.log(req)
            this.download1(req.data)
            if(req.data.size == ""){
              this.open('下载失败',"提示")
            }
          })
        }else if(this.tableChange.length == 0){
          this.$axios.post("/api-eva/scientific/evaPageExport",{
            "years":this.check.date,
            "projectName":this.check.name,
            "applyDept":this.check.company,
            "linkMan":this.check.contacts,
            "phoneNumber":this.check.phone,
            "wechat":this.check.weixin,
            "qqAccount":this.check.qq,
            "email":this.check.mail,
          }).then(req => {
            this.download1(req.data)
            if(req.data.size == ""){
              this.open('下载失败',"提示")
            }
          })
        }else{
          this.$axios.post("/api-eva/scientific/evaPageExport",{
            "scientificIds" : this.multipleSelection
          }, {
            responseType: 'blob'
          }).then(req => {
            console.log(req)
            this.download1(req.data)
            if(req.data.size == ""){
              this.open("下载失败","提示")
            }
          })
        }
          },
          download1 (data) {
          if (!data) {
          return
          }
          let url = window.URL.createObjectURL(new Blob([data]))
          console.log(url)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'excel.xls')
          document.body.appendChild(link)
          link.click()
      },
      //评审结束
      handleOut(index,row){
        this.$axios.post("/api-eva/scientific/evaluated",{
          "scientificId" : row.fdObjectid
        }).then(req => {
          if(req.data.code == 200){
            this.open('评审结束',"提示")
            this.evaPageList()
          }else{
            this.open(req.data.msg,"提示")
          }
        })
      },
      //上传专家
    linxuanUp(){
        let name = ""
        if(this.allTeam.length == 0){
          this.open("已选专家不能为空","提示")
          return
        }
        for(let i=0;i<this.allTeam.length;i++){
          if(i == this.allTeam.length - 1){
            name += this.allTeam[i].userId
          }else{
            name += this.allTeam[i].userId + ","
          }
        }
          this.$axios.post("/api-eva/scientific/expertChoice",{
            "scientificId": this.$refs.linxuan.id,
            "professorIds": name
          }).then(req => {
            console.log(req.data)
            if(req.data.code == 200){
              this.open("遴选成功","提示")
              this.$refs.linxuan.style.display = "none"
              this.$refs.linxuan.id = ""
              this.evaPageList()
              this.professorList()
              this.schoolsNames = [] //全部专家 选中的
              this.teamName = [] //已选专家 选中的
            }else{
              this.open(req.data.msg,"提示")
            }
          })
        
        
      },
    mylogin(){
      let date = new Date()
      this.check.date = date.getFullYear()
      this.evaPageList()
    },
    //搜索
    clickList(){
      this.currentPage1 = 1
      this.evaPageList()
    },
    //分页查询
    evaPageList(){
      
      this.$axios.post("/api-eva/scientific/evaPageList",{
        "years":this.check.date,
        "projectName":this.check.name,
        "applyDept":this.check.company,
        "linkMan":this.check.contacts,
        "phoneNumber": this.check.phone,
        "email":this.check.mail,
        "userAccount":this.check.qq,
        "wechat":this.check.weixin,
        "pageNumber": this.currentPage1,
        "limit": 10
      }).then(req => {
        let data = req.data.resultData
        if(req.data.code == 200){
          this.tableData = []
          this.pageCount = data.pages
          this.total = data.total
          console.log(req.data)
          for(let i=0;i<data.rows.length;i++){
            let obj = {}
            obj.applyDept = data.rows[i].applyDept
            obj.email = data.rows[i].email
            obj.years = data.rows[i].years
            obj.evaTarget = data.rows[i].evaTarget
            obj.qqAccount = data.rows[i].qqAccount
            obj.wechat = data.rows[i].wechat
            obj.projectName = data.rows[i].projectName
            obj.phoneNumber = data.rows[i].phoneNumber
            obj.linkMan = data.rows[i].linkMan
            obj.fdObjectid = data.rows[i].fdObjectid
            obj.choiceStatus = data.rows[i].choiceStatus
            this.tableData.push(obj)
          }
        }else{
          this.open(req.data.msg,"提示")
        }
        
      })
    },
      //穿梭框搜索功能
      searchExpert(){
        let val= this.$refs.searchExpert.value
        let re = new RegExp(val)
        let newss = []
        if(val !== ""){
        for(let i=0;i<this.yuanshi.length;i++){
          if(re.test(this.yuanshi[i].username)){
            let obj = {}
            obj.userId = this.yuanshi[i].userId
            obj.username = this.yuanshi[i].username
            newss.push(obj)
          }
        }
        
          this.allSchool = newss
        }else{
          if(this.allTeam.length !==0){
          for(let s=0;s<this.yuanshi.length;s++){
            for(let n=0;n<this.allTeam.length;n++){
                if(this.yuanshi[s].userId == this.allTeam[n].userId){
                  this.yuanshi.splice(s,1)
                }
              }
            }
          }
          this.allSchool = this.yuanshi
        }
      },
      allExpert(){
        for(let i=0;i<this.allSchool.length;i++){
          let id = document.getElementById(this.allSchool[i].userId)
          id.click()
          if(this.schoolsNames.length == 0){
            this.all = "全部专家"
          }else{
            this.all = "取消全选"
          }          
        }
      },
      async toRightTeam() {
        let moveName= await this.matching(this.allSchool,this.schoolsNames);
        let allArr= await this.myFilter(this.allSchool,moveName);
        this.allSchool = allArr;
        for(let i=0;i<moveName.length;i++){
          this.allTeam.push(moveName[i])
        }
        this.schoolsNames=[];
      },
      async toLeftSchools() {
        let moveName= await this.matching(this.allTeam,this.teamName);
        let allArr =await this.myFilter(this.allTeam,moveName);
        this.allTeam = allArr;
        for(let i=0;i<moveName.length;i++){
          this.allSchool.push(moveName[i])
        }
        this.teamName=[];
        let yuanshi = this.yuanshi.concat(this.allSchool)
        let newarr = []
        for(let n=0;n<yuanshi.length;n++){
          let flag = 0;
          for(let m=0;m<yuanshi.length;m++){
            if(yuanshi[n].userId == yuanshi[m].userId){
              flag++
              if(flag == 2){
                yuanshi.splice(n,1)
                flag--
              }
            }
          }
            newarr.push(yuanshi[n])
          
        }
        this.yuanshi = newarr
      },
     // 过滤 相同选项
      async myFilter(allArr, selArr) {
        let ary03 = [];
        for (let i = 0; i < allArr.length; i++) {
          for (let j = 0; j < selArr.length; j++) {
            if (allArr[i].userId == selArr[j].userId) {
              allArr.splice(i,1);
            }
          }
        }
        return allArr;
      },
      //  匹配 移动的 选项
      async matching(allArr, matchArr) {
        let matArr = [];
        for (let i = 0; i < allArr.length; i++) {
          for (let j = 0; j < matchArr.length; j++) {
            if (allArr[i].userId == matchArr[j]) {
              matArr.push(allArr[i]);
              console.log(987)
            }
          }
        }
        return matArr;
      },
      linxuanclose(){
          this.$refs.linxuan.style.display = "none"
          this.$refs.linxuan.id = ""
          this.schoolsNames = [] //全部专家 选中的
          this.teamName = [] //已选专家 选中的
          this.professorList()
      },
        linxuanChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        },
        empty(){
                for(let key in this.check){
                  this.check[key] = ""
                 }
            },
        //直接搜索分页
        jump(){
          let numReg = /^[0-9]+$/
          let page = parseInt(this.$refs.jump.value)
          if(numReg.test(page) && page > 0){
            this.currentPage1 = page
            if(this.currentPage1 <= parseInt(this.pageCount)){    
              this.evaPageList()
            }else{
              this.currentPage1 = this.pageCount
            }
          }
            
        },
        //点击分页
        handleCurrentChange(){ 
          this.evaPageList()
        },
        //获取专家列表
        professorList(){
          this.$axios.post("/api-eva/professor/professorList",{
            "professorName": ""
            }).then(req =>{
              this.allSchool = []
              this.yuanshi = []
              let data = req.data.resultData
              if(req.data.code == 200){
                for(let i=0;i<data.length;i++){
                  let obj = {}
                  obj.userId = data[i].fdObjectid
                  obj.username = data[i].name
                  this.allSchool.push(obj)
                  this.yuanshi.push(obj)
                }                
              }else{                               
                this.open(req.data.msg,"提示")
              }
              
            })
        },
        tableHeaderColor({row,column,rowIndex,columnIndex}){
            if(rowIndex ===0){return "background-color:#fbfbfb;color:#000;font-size:0.9rem;"}      
            },
        tableRowStyle({row,rowIndex}){
            return "font-size:1rem"
        },
        handleEdit(index, row) {
            this.$axios.post("/api-eva/professor/getProfessorsBySc",{
              "scientificId" : row.fdObjectid
            }).then(req => {
              if(req.data.code == 200){
                console.log(req.data)
                this.allTeam = []
                for(let i=0;i<req.data.resultData.length;i++){
                  let obj = {}
                  obj.userId = req.data.resultData[i].fdObjectid
                  obj.username = req.data.resultData[i].name
                  this.allTeam.push(obj)                  
                }
                
                for(let i=0;i<this.allTeam.length;i++){
                  for(let n=0;n<this.allSchool.length;n++){
                    if(this.allTeam[i].userId == this.allSchool[n].userId){
                      this.allSchool.splice(n,1)
                      this.yuanshi.splice(n,1)
                      break
                    }
                    console.log(1)
                  }
                }
                this.$refs.linxuan.id = row.fdObjectid
                this.$refs.linxuan.style.display = "block"
                let di = document.body.clientWidth;
                if(di >= this.$refs.linxuaninner.clientWidth){
                  this.$refs.linxuaninner.style.left = ((di / 2) - (this.$refs.linxuaninner.clientWidth /2)) + "px"
                }else{
                  this.$refs.linxuaninner.style.left = "0"
                }
                let ht = document.body.offsetHeight
                if(ht >= this.$refs.linxuaninner.offsetHeight){
                  this.$refs.linxuaninner.style.top = ((ht / 2) - (this.$refs.linxuaninner.offsetHeight /2)) + "px"
                }else{
                  this.$refs.linxuaninner.style.top = 0
                }
              }else{
                this.open(req.data.msg,"提示")
              }
            })
        },
        handleDelete(index, row) {
            console.log(row.fdObjectid);
            this.$axios.post("/api-eva/scientific/delete",{
              "scientificId": row.fdObjectid
            }).then(req => {
              console.log(req.data)
              this.evaPageList()              
            })
        },
        handleSelectionChange(val) {
          this.tableChange = val
            console.log(val)
            let data = ""
            for(let i=0;i<val.length;i++){
              if(i == (val.length - 1)){
                data += val[i].fdObjectid
              }else{
                data += val[i].fdObjectid + ","
              }
              
            }
            this.multipleSelection = data
            // if(this.multipleSelection.length !== 0){
            //   console.log(this.$refs.multipleTable)
            // }else{
            //     console.log(this.$refs.multipleTable)
            // }
        },
        text(){
            console.log("hello")
        }
    },
}
</script>
<style>
    .pingshen .linxuan{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background: rgba(150,150,150,0.3);    
        z-index:100;    
        display:none;
    }
    .pingshen .linxuan>div{
        position: absolute;
        top:100px;
        left:100px;
        width:50rem;
        height:27rem;
        background:#fff;
        border-radius:0.3rem;
        overflow: hidden;

    }
    .pingshen .el-table .cell,
    .pingshen .el-table__row td .cell {
        white-space: nowrap !important;
    }
    .pingshen  .el-table{
        min-height:538px;
    }
    .pingshen a{
        text-decoration: none;
    }
    .pingshen{
        width:100%;
        background: #eee;
        font-family: Microsoft YaHei;
    }
    .pingshen .list{
        width:98%;
        margin:0 auto;
        margin-top:2rem;
        padding-left:2%;
        padding-right:2%;
        padding-top:2%;
        box-sizing:border-box;
    }
    .pingshen .list a{
        color:#03a0fd;
    }
    .pingshen .search{
        width:100%;
        padding:0.5rem 2%;
        box-sizing:border-box;
        background: #fff;
        border-top:1px solid #eee;
    }
    .pingshen .search>div{
      width:100%;
      margin-bottom:1rem;
    }
    .pingshen .search>div>div{
        width:20%;
        display:inline-block;
        text-align:right;
        margin-top:1rem;
        font-size:1.1rem;

    }
    .pingshen  .search div>input{
        width:60%;
        border-radius: 5px;
        border:1px solid rgba(241,240,240,0.95);
        background: #fbfbfb;
        outline: none;
        margin-left:5%;
        height:2rem;
        box-sizing: border-box;
        padding-left:10px;
    }
    .pingshen .search div>button{
        display: inline-block;
        width:45%;
        height:2rem;
        border:none;
        background: #02a2f8;
        color:#fff;
        text-align: center;
        border-radius: 3px;
    }
    .pingshen .d-ilblock{
        display: inline-block;
    }
    .pingshen .v-middle{
        vertical-align: middle;
    }
    .pingshen .w-100{
        width:100%;
    }
    .pingshen .bg-w{
        background: #fff;
    }
    .pingshen .fl-lt{
        float:left;
    }
    .pingshen .fl-rt{
        float:right;
    }
    .pingshen .xiala{
        width:14px;
        height:14px;
        background-image:url("../assets/img/index/xiala.png");
        background-position: 50% 50%;
        background-size: 100% 100%;
    }
    .pingshen .top{
        padding:0 2%;
        box-sizing:border-box;
    }
    .pingshen .top img{
        border-radius: 50%;
        width:2.5rem;
        height:2.5rem;
    }
    .pingshen .top>p:first-child{
        color:#2993ff;
        line-height:2.5rem;
    }
    .pingshen .top::after{
        content:"";
        display: block;
        clear: both;
    }
    .pingshen .paging{
        font-size:1rem;
        position: relative;
        top:0.3rem;
    }
    .pingshen .jump>input{
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
    .pingshen .page-count .fenpei-button{
        height:30px;
        width:30%;
        line-height:30px;
        text-align:center;
        background:#02a2f8;
        color:#fff;
        border-radius:5px;
    }
    .pingshen .paging{
        font-size:1rem;
        position: relative;
        top:0.3rem;
    }
    .pingshen .page-count{
        text-align: right;
        background: #fff;
    }
    .pingshen .list>p>a.daochu{
        color:#fff;
        background: #03a0fd;
        font-size:1rem;
        padding:0.6rem 1rem;
        
        border-radius: 0.3rem;
        text-align:center;
    }
    
    .pingshen .list>p>a.daochu>img{
        width:1rem;
        height:1rem;
        position: relative;
        top:0.15rem;
    }
    .pingshen .mis-button{
        margin-top:3rem;
    }
    .pingshen .shuttle {
    width:100%;
    text-align:center;
    padding:0 2.5%;
    box-sizing:border-box;
    margin-top:1rem;
  }
  .pingshen .list>p:first-child{
      text-align:left;
  }
  .pingshen .shuttle::after{
    content:'';
    display:block;
    clear: both;
  }
  .pingshen  .shuttle_item {
      width: 40%;
      text-align:left;
    }
    .pingshen .shuttle_item span {
    font-size: 1rem;
  }
  .pingshen .fl-lt{
     float:left;
   }
   .pingshen .fl-rt{
     float:right;
   }
 
   .pingshen .shuttle_arrow {
      width: 10%;
      display:inline-block;
      margin-top:5rem;
    }
    .pingshen .el-button+.el-button{
        margin-left:0 !important;
    }
 
    .pingshen .school {
      background:#fafafa;
      width:100%;
      height: 17rem;
      overflow: auto;
      margin-top:0.5rem;
    }
    .pingshen .shuttle_item-lt>a{
        font-size:1rem;
        color:#000;
    }
    .pingshen .shuttle_item-lt>button{
        font-size:1rem;
        width:3rem;
        height:1.5rem;
        box-sizing:border-box;
        border:1px solid #b9b7b8;
        background:#fff;
        color:#b9b7b8;
        position: relative;
        top:-0.25rem;
        border-radius: 0.2rem;
    }
    .pingshen .shuttle_item-rt>p{
        font-size:1rem;
        color:#000;
    }
    .pingshen .school li {
        padding-top: 0.6rem;
        padding-left:0.6rem;
        list-style: none;
        font-size:0.9rem;
      }
      .pingshen .school-left li:first-child{
      padding-top: 0;
      padding-left:0;
    }
    .pingshen .school-left li:first-child>input{
      width:100%;
      box-sizing:border-box;
      padding-left:0.6rem;
      border:1px solid #b9b7b8;
      outline:none;
      height:1.5rem;
    }
    .pingshen .linxuan>div>p,.pingshen .insertzhuanjia>div>p{
        text-align:left;
        padding:15px 15px 10px;
        font-size:18px;
        color:#000;
        background:#fff;
    }
    .pingshen .linxuan>div>p:first-child>a,.pingshen .insertzhuanjia>div>p:first-child>a{
        float:right;
        border:none;
        outline:none;
        width:18px;
        height:18px;
        background-image:url("../assets/img/index/close.png");
        background-position: 50% 50%;
        background-size:100% 100%;
        background-color: #fff;
        
    }
    .pingshen .linxuan>div>p:last-child{
        padding:0;
        width:100%;
        text-align:right;
        background: #fff;
        margin-top:0.6rem;
    }
    .pingshen .linxuan>div>p:last-child a{
        display:inline-block;
        height: 2rem;
        width:5rem;
        text-align:center;
        line-height:2rem;
        color:#fff;
        font-weight:400;
        background:#02a2f8;
        border-radius:0.2rem;
        font-size:0.9rem;
        margin-right:2.5%
    }
    .pingshen .insertzhuanjia{
      position: fixed;
      background:rgba(150,150,150,0.3);
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index: 1000;
      display: none;
    }
    .pingshen .insertzhuanjia>div{
      width:50rem;
      background:#fff;
      position: absolute;
      top:0;
      left:0;
      border-radius: 0.3rem;
      overflow: hidden;
    }
    .pingshen .insertzhuanjiadata{
      width:100%;
      padding-left:1rem;
      padding-right:1.5rem;
      padding-top:1rem;
      padding-bottom:1rem;
      height:40rem;
      overflow: auto;
    }
  .pingshen  .el-form-item{
    width:45%;
    box-sizing:border-box;
  }
  .pingshen  .el-form-item>div{
    width:60%;
  }
  .pingshen  .el-form-item>div input{
    height:34px;
  }
 .pingshen .beizhu{
   width:90%;
 }
 .pingshen .beizhu>div{
   width:82.5%;
 }
 .pingshen .insertzhuanjiaup{
   width:60%;
   margin:0 auto;
   text-align: center;
 }
 .pingshen .insertzhuanjia-tj{
   position: relative;
 }
 .pingshen .insertzhuanjia-tjx{
   width:2.5rem;
   height:2.5rem;
   position: absolute;
   top:0;
   right:-3.5rem;
 }
 .pingshen .insertzhuanjia .projectsclose{
  padding:0.15rem 0.25rem;
  background:#fff;
  color:#4daff9;
  border:none;
  border:1px solid #4daff9;
  border-radius:50%;
  box-sizing:border-box;
  outline:none;
  margin-left:0.2rem;
 }
 .pingshen .insertzhuanjia .projectsclose:hover{
  color:#fff;
  background:#0a90f5;
  box-sizing:border-box;
 }
 .pingshen .projectsclose-out{
   text-align:left;
   padding-left:10%;
   margin-bottom:2rem;
 }
 .pingshen .projectsclose-out>span{
   padding-left:0.5rem;
 }
</style>
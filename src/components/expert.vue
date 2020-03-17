<!--
--- author: 王松
--- creation time: 2019-07-14
--- module: 专家页面
--- description: 专家页面 包括添加 导入 下载模板 查询 重置 修改 删除 查看 功能
-->
<template>
  <div id="expert">
    <!--模板层-->
    <div v-show="this.mask==true" id="mask-defined"></div>
    <!--查询栏-->
    <div class="query-box">
     <el-form :inline="true" label-width="100px">
       <el-form-item label="姓名">
         <el-input v-model="name" placeholder="姓名"></el-input>
       </el-form-item>
       <el-form-item label="参与项目">
         <el-input v-model="projectName" placeholder="参与项目"></el-input>
       </el-form-item>
       <el-form-item label="从事专业">
         <el-input v-model="professional" placeholder="从事专业"></el-input>
       </el-form-item>
       <el-form-item label="级别">
         <el-input v-model="level" placeholder="级别"></el-input>
       </el-form-item>
       <el-form-item label="手机号">
         <el-input v-model="phoneNumber1" placeholder="手机号"></el-input>
       </el-form-item>
       <el-form-item label="评审项目年份">
         <el-input v-model="year" placeholder="评审项目年份"></el-input>
       </el-form-item>
       <el-form-item label="研究方向">
         <el-input v-model="researchDirection" placeholder="研究方向"></el-input>
       </el-form-item>
       <el-form-item id="expert-query-btn" class="query-btn-right">
         <el-button type="primary" @click="search">查询</el-button>
         <el-button type="primary" @click="reset">重置</el-button>
       </el-form-item>
     </el-form>
   </div>
    <!--主体内容-->
    <div class="content-box">
      <!--三个按钮+表格+分页-->
      <div class="table-top-btn-group">
        <el-button type="primary" @click="open(1,2,'添加')">
          <img src="../assets/img/pictrue/operationButton/addExpert.png" class="buttonimg1" >添加专家
        </el-button>
        <el-button type="primary" @click="upload1">
          <img src="../assets/img/pictrue/operationButton/input.png"  class="buttonimg1">导入
          <input v-show="3>4" type="file" id="upload" @change="upload" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" >
        </el-button>
        <el-button type="primary" @click="downloadmodel">
          <img src="../assets/img/pictrue/operationButton/inputModel.png"  class="buttonimg1">下载模板
        </el-button>
      </div>
      <!--表格-->
      <div class="table-box">
        <el-table
         :data="tableData"
         style="width:100%"
         :height="tableHeight"
         :row-style="tableRowStyle"
        >
           <el-table-column  width="50" label="序号">
               <template slot-scope="scope">
               <span>{{scope.$index + 1 + (pageNumber - 1) * 10}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="name" label="姓名" width="110">
             <template slot-scope="scope">
              <span :title="scope.row.name">{{scope.row.name}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="sex" label="性别" width="50"></el-table-column>
           <el-table-column prop="workUnit" label="工作单位" >
             <template slot-scope="scope">
              <span :title="scope.row.workUnit">{{scope.row.workUnit}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="duty" label="职务"  width="90">
             <template slot-scope="scope">
              <span :title="scope.row.duty">{{scope.row.duty}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="professionalTitle" label="职称" width="50">
             <template slot-scope="scope">
              <span :title="scope.row.professionalTitle">{{scope.row.professionalTitle}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="professional" label="从事专业" >
             <template slot-scope="scope">
              <span :title="scope.row.professional">{{scope.row.professional}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="linkPhone" label="联系电话" width="130">
             <template slot-scope="scope">
              <span :title="scope.row.linkPhone">{{scope.row.linkPhone}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="level" label="级别" width="50">
             <template slot-scope="scope">
              <span :title="scope.row.level">{{scope.row.level}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="partJob" label="社会兼职" >
             <template slot-scope="scope">
              <span :title="scope.row.partJob">{{scope.row.partJob}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="projects" label="参与项目" >
             <template slot-scope="scope">
              <span :title="scope.row.projects">{{scope.row.projects}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="note" label="备注" >
             <template slot-scope="scope">
              <span :title="scope.row.note">{{scope.row.note}}</span>
             </template>
           </el-table-column>
           <el-table-column  label="操作" width="150">
            <template slot-scope="scope">
              <el-button class="table-btns" @click="open(scope.$index,scope.row,'修改')" type="text">修改</el-button>
              <span class="table-btns-split">|</span>
              <el-button class="table-btns" @click="deleste(scope.$index,scope.row,'删除')" type="text">删除</el-button>
              <span class="table-btns-split">|</span>
              <el-button class="table-btns" @click="look(scope.$index,scope.row,'查看')" type="text">查看</el-button>
            </template>

           </el-table-column>
       </el-table>
        <!--分页-->
        <div class="foot-pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="pageNumber"
            :page-size="limit"
            layout="total, prev, pager, next, jumper"
            :total="total"
            >
          </el-pagination>
        </div>
      </div>
    </div>

    <!--弹窗1(添加点击)-->
    <div v-show="this.popup==true" id="changefrom" class="el-dialog dialog-defined">
      <!--弹窗头-->
      <div class="el-dialog__header" id="changefromheader">
        <div class="el-dialog__title" id="changefromheaderson1"></div>
        <button id="changefromheaderson2" type="button" class="el-dialog__headerbtn" @click="close">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <el-scrollbar class="wrapper no-x-scroll" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize="false">
        <!--弹窗主体 form表单校验提交-->
        <div id="changefromcontent">
          <el-form :model="expertdata" status-icon :rules="rules" ref="expertdata" label-width="100px" >
            <!--表单第一行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="姓名:" prop="name">
                  <el-input type="text" v-model="expertdata.name" autocomplete="off" class="inputnone1 h34"  ></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="工作单位:" prop="workUnit">
                  <el-input type="text" v-model="expertdata.workUnit" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第二行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="expertdata.sex" class="inputnone1">
                    <el-radio label="男" id="sex1"></el-radio>
                    <el-radio label="女" id="sex2"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="职称:" prop="professionalTitle">
                  <el-input type="text" v-model="expertdata.professionalTitle" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第三行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="职务:" prop="duty">
                  <el-input type="text" v-model="expertdata.duty" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="从事专业:" prop="professional">
                  <el-input type="text" v-model="expertdata.professional" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第四行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="联系电话:" prop="linkPhone">
                  <el-input type="text" v-model="expertdata.linkPhone" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="研究方向:" prop="researchDirection">
                  <el-input type="text" v-model="expertdata.researchDirection" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第五行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="社会兼职:" prop="partJob">
                  <el-input type="text" v-model="expertdata.partJob" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="级别:" prop="level">
                  <el-input type="text" v-model="expertdata.level" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第六行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="手机号:" prop="phoneNumber">
                  <el-input type="text" v-model="expertdata.phoneNumber" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="邮箱:" prop="email">
                  <el-input type="text" v-model="expertdata.email" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第七行-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-form-item label="微信:" prop="wechat">
                  <el-input type="text" v-model="expertdata.wechat" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="QQ:" prop="qqAccount">
                  <el-input type="text" v-model="expertdata.qqAccount" autocomplete="off" class="inputnone1"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第八行-->
            <el-row :gutter="10">
              <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22"><div class="grid-content bg-purple-light">
                <el-form-item label="备注" prop="note">
                  <el-input type="textarea" v-model="expertdata.note"></el-input>
                </el-form-item>
              </div></el-col>
            </el-row>
            <!--表单第九行-->
            <!--参与项目加号-->
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-form-item label="参与项目" prop="myvalue">
                  <el-input  v-model="myvalue" class="inputnone1" ></el-input>
                  <img id="add" src="../assets/img/pictrue/add.png" alt=""  @click="addtodolist" >
                </el-form-item>
              </div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="grid-content bg-purple-light">
                  <!--参与项目的子组件-->
                  <div id="todolist">
                    <todoitem
                      v-for="(item,index) of mylist" :key="index"
                      :index="index"
                      :content="item"
                      v-on:sonwanttogive="deletes"
                    ></todoitem>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-scrollbar>
      <!--弹窗尾巴 两个按钮-->
      <div id="changefromfoot" class="el-dialog__footer">
        <el-button type="primary" id="expertbtn111" class="expertbtn1" @click="save">保存</el-button>
        <el-button type="primary" id="expertbtn222" class="expertbtn2" @click="close">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import todoitem from './todoitem.vue'
export default {
  name: 'HelloWorld',
  components: {
    "todoitem": todoitem
  },
  data () {
   //校验专家名字
   var validname = (rule, value, callback) => {
     if (!value) {
       return callback(new Error('姓名不能为空'));
     } else {
       callback()
       this.nameisexit = true
     }
   };
   //校验手机号
   var validphoneNumber = (rule, value, callback) => {
     var phonereg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
     if (phonereg.test(value)) {
       callback()
       this.phonetest1 = true
     } else {
       this.phonetest1 = false
       return callback(new Error('手机号格式有误'));
     }
   };
   //校验邮箱
   var validemail = (rule, value, callback) => {
     var emailreg=/^[a-zA-Z0-9_]{3,16}[a-zA-Z0-9]@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
     if (emailreg.test(value)) {
       callback()
       this.emailtest1 = true
     } else {
       this.emailtest1 = false
       return callback(new Error('邮箱格式不正确'));
     }
   };
   //从事专业
   var validprofessional = (rule, value, callback) => {
     if (!value) {
       this.professional1=false;
       return callback(new Error('从事专业不能为空'));
     } else {
       callback()
       this.professional1 = true
     }
   };
    //研究方向
   var valideresearchDirection = (rule, value, callback) => {
     if (!value) {
       this.researchDirection1=false;
       return callback(new Error('研究方向不能为空'));
     } else {
       callback()
       this.researchDirection1 = true
     }
   };
    //级别
   var validelevel = (rule, value, callback) => {
     if (!value) {
       this.level1=false;
       return callback(new Error('级别不能为空'));
     } else {
       callback()
       this.level1 = true
     }
   };
    return {
      //查询条件数据
      name:"",                  //名字
      projectName:"",           //参与项目
      professional:"",          //从事专业
      level:"",                 //级别
      phoneNumber1:"",           //手机号
      year:"",                  //评审项目年份
      researchDirection:"",     //研究方向
      tableHeight: 'calc(100% - 110px)', // 表格高度
      //做表格使用的
      tableData: [],
      //分页组件所需数据
      pageNumber:1,             //当前页
      limit:10,                 //每页数据
      total:0,                  //总数据量
      //expertdata弹窗数据
      expertdata:{},            //专家数据
      rules: {
          name: [                   //姓名
            { required:true,  validator: validname, trigger: 'blur' }
          ],
          phoneNumber :[            //手机号
            { required:true,validator: validphoneNumber, trigger: 'blur' }
          ],
          email :[                  //邮箱
            { required:true,validator: validemail, trigger: 'blur' }
          ],
          professional :[                  //从事专业
            { required:true,validator: validprofessional, trigger: 'blur' }
          ],
          researchDirection :[                  //研究方向
            { required:true,validator: valideresearchDirection, trigger: 'blur' }
          ],
          level :[                  //级别
            { required:true,validator: validelevel, trigger: 'blur' }
          ],
      },
      //弹窗正则开关
      nameisexit:false,          //名字是否存在
      phonetest1:false,          //手机号格式是否正确
      emailtest1:false,          //邮箱格式是否正确
      professional1:false,       //从事专业不能为空
      researchDirection1:false,  //研究方向不能为空
      level1:false,              //级别不能为空
      //其它控制
      value:"",
      mask:false,                //遮罩层
      popup: false,              //弹窗
      myvalue:"",                //参与项目
      mylist:[],
    }
  },
  mounted () {
    let contentBoxH = this.$utils.setContentHeight(true) // 设置内容显示区域高度
    //
    // let tableQueryBtn = document.querySelector('.table-top-btn-group')
    // let tableQueryBtnH = window.getComputedStyle(tableQueryBtn, null).marginTop.split('px')[0]
    //
    //
    // this.$nextTick(() => {
    //   document.querySelector('.el-table__body-wrapper').style.height = contentBoxH - 60 - tableQueryBtnH + 'px'
    //   console.log(contentBoxH - 60 - tableQueryBtnH)
    // })

    // 获取数据
    this.search();
    this.drag();
  },
  methods: {
    //拖动弹窗
    drag(){
      var changefromheader = document.getElementById("changefromheader")
      var changefrom = document.getElementById("changefrom");
      //定义开关变量控制div能否跟随鼠标一定
      var canMove=false;
      //定义两个变量，保存图片移动过程中不变的offsetX和offsetY
      var X,Y;
      //当鼠标在div上按下时，打开开关
      changefromheader.onmousedown=function(e){
        canMove=true;
      	//元素的坐标系的 x y  鼠标距离网页的距离 减去 弹窗的 left top
      	X=e.offsetX
        Y=e.offsetY
      }
      //当鼠标在div上抬起时，关闭开关
      changefromheader.onmouseup=function(){
      	canMove=false;
      }
      //当鼠标在window范围内移动时 移动图片
      document.onmousemove=(e)=>{
        //只有打开开关时
      	if(canMove==true){
          //定义弹窗新的left top
          var left=(e.clientX-X)
          var top=(e.clientY-Y)
          if(left<=259){
             left=259
          }
          if(top<=66){
             top=66
          }
          changefrom.style.left=left+"px";
          changefrom.style.top=top+"px";
      	}
      }
    },
    //格式有误
    open5() {
        this.$alert('格式有误', '提示', {
          confirmButtonText: '确定',
        });
    },
    //修改成功
    changeokalert() {
      this.$alert('修改成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //删除成功
    deleteokalert(){
      this.$alert('删除成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //上传失败
    uploadfail(){
      this.$alert('上传失败', '提示', {
        confirmButtonText: '确定',
      });
    },
    //上传成功
    uploadok(){
      this.$alert('上传成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //专家已存在
    expertexist(){
      this.$alert('专家已存在', '提示', {
        confirmButtonText: '确定',
      });
    },
    //上传成功添加
    addok(){
     this.$message({
          message: '上传成功',
          type: 'success'
        });
    },
    //搜索
    search () {
      this.pageNumber=1
      let data = {  //名字 地址 电话号 当前页码 每页数量
         name:this.name,
         professional:this.professional,
         researchDirection:this.researchDirection,
         level:this.level,
         qqAccount:this.qqAccount,
         phoneNumber:this.phoneNumber1,
         year:this.year,
         projectName:this.projectName,
         pageNumber:this.pageNumber,
         limit:this.limit,
      }
      var url = "/api-eva/professor/pageList"
      this.$axios.post(url,data).then(res=>{
        if(res.data.code==200){
            //获取总页数
            this.total=res.data.resultData.total
            //获取单页的数据
            this.tableData=res.data.resultData.rows
        }
      })
    },
    //重置
    reset () {
      this.pageNumber=1
      this.name=""
      this.professional=""
      this.researchDirection=""
      this.level=""
      this.qqAccount=""
      this.phoneNumber1=""
      this.year=""
      this.projectName=""
      this.search();
    },
    //触发上传
    upload1 () {
      //触发上传input
      var file = document.getElementById("upload");
      file.click();
    },
    //上传文件
    upload () {
      //首先获取文件
      var file = document.querySelector("#upload")
      //发送请求
      var url  = "/api-eva/professor/insertByExcel"
      var fd = new FormData()
      fd.append('sourceFile', file.files[0])
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      this.$axios.post(url,fd,config).then( res => {
          if(res.data.code==200){
            //上传成功
            this.uploadok()
             //验证它
             //去掉值
            file.value=""
            this.search()
          }else {
            this.uploadfail()
          }
      })
    },
     //下载模板
    downloadmodel () {
      let url = "/api-eva/scientific/downProfessorTemplate"
      this.$axios.post(url,{},{
          responseType: 'blob'
          }).then(res=>{
           this.download1(res.data)
      })
    },
    download1 (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
    },
    //分页
    handleCurrentChange () {
       let data = {  //名字 地址 电话号 当前页码 每页数量
         name:this.name,
         professional:this.professional,
         researchDirection:this.researchDirection,
         level:this.level,
         qqAccount:this.qqAccount,
         phoneNumber:this.phoneNumber1,
         year:this.year,
         projectName:this.projectName,
         pageNumber:this.pageNumber,
         limit:this.limit,
      }
      var url = "/api-eva/professor/pageList"
      this.$axios.post(url,data).then(res=>{
                if(res.data.code==200){
                    //获取总页数
                    this.total=res.data.resultData.total
                    //获取单页的数据
                    this.tableData=res.data.resultData.rows
                }
      })
    },
    //添加或修改
    open (data0,data1,data2) {
      //弹窗和遮罩层显示
       this.popup = true
       this.mask = true
       //点击添加触发
       if(data0==1&&data1==2){
        //获取弹窗头部栏 要是添加
          var changefromheaderson1 = document.getElementById("changefromheaderson1");
          changefromheaderson1.innerHTML="添加"
          return
       }else{
        //要不然是修改
          var changefromheaderson1 = document.getElementById("changefromheaderson1");
          changefromheaderson1.innerHTML="修改"
         //根据两个接口获取数据 /api-eva/professor/getProfessorById  /api-eva/professor/getProjects "professorId": "187c5d5165a74adfb52676ad38322210"
         var obj = data1
         var url ="/api-eva/professor/getProfessorById"
         let data = {fdObjectid:obj.fdObjectid}
         this.$axios.post(url,data).then(res=>{
            if(res.data.code==200){
              //成功获取数据
              //把数据交给弹窗
              this.expertdata = res.data.resultData
              this.myvalue = res.data.resultData.projects
            }
         })
       }

    },
    //删除
    deleste (data0,data1) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var obj = data1
            var url = "/api-eva/professor/delete"
            let data  = { "fdObjectid":obj.fdObjectid}
            this.$axios.post(url,data).then(res=>{
              //删除成功
              if(res.data.code==200){
                this.deleteokalert()
                this.search();
              }
            })
       }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    },
    //查看
    look (data0,data1,data2) {
      //点击查看为查看
      var changefromheaderson1 = document.getElementById("changefromheaderson1");
      changefromheaderson1.innerHTML="查看"
      //弹窗和遮罩层显示
      this.popup = true
      this.mask = true
      //加号和按钮消失
       add.style.display="none";
       expertbtn111.style.display="none";
      //让所有input框只读
        var inputs = document.querySelectorAll("#changefromcontent input")
        var note = document.querySelector("#changefromcontent textarea")
        var sex1 =document.getElementById("sex1")
        var sex2 = document.getElementById("sex2")
              for(var input of inputs){
                   input.disabled = true
              }
           note.disabled = true;
           sex1.onclick = function(){return false}
           sex2.onclick = function(){return false}
      //发送请求获取此id的值
         //传的参数
         var obj = data1
         var url ="/api-eva/professor/getProfessorById"
         let data = {fdObjectid:obj.fdObjectid}
         this.$axios.post(url,data).then(res=>{
            if(res.status==200){
              //成功获取数据
              //把数据交给弹窗
              this.expertdata = res.data.resultData
              this.myvalue = res.data.resultData.projects
            }
         })
    },
    //添加或者修改
    save () {
     //触发input框失焦事件
       //获取input框
      var inputs = document.querySelectorAll("#changefromcontent input");
      for(var input of inputs){
        input.focus()
      }

     //验证正则 如果通过
       if( this.professional1==true&&this.phonetest1==true&&this.researchDirection1==true&&
           this.emailtest1==true&&this.level1==true&&this.nameisexit==true){
         //修改
         if(this.expertdata.fdObjectid){
          //修改 需要id
          //先判断用户名是否重复
             let  url = "/api-eva/professor/checkProfessor"
             let data={
                "fdObjectid": this.expertdata.fdObjectid,
                "name": this.expertdata.name
             }
             this.$axios.post(url,data).then(res=>{
                //如果发现重复
                if(res.data.code==20001){
                   //进行判断
                    //确认是否进行
                    this.$confirm('专家名字重复是否进行操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                       var url ="/api-eva/professor/update"
                       //把专家的项目的数据从数组变成字符串 交给专家data对象
                       if(this.mylist.length==0){
                         this.expertdata.projects=""
                       }else{
                       this.expertdata.projects = this.mylist.join(",");
                       }
                      let data = {
                       "fdObjectid": this.expertdata.fdObjectid,
                       "name": this.expertdata.name,
	                     "workUnit":  this.expertdata.workUnit,
	                     "sex":  this.expertdata.sex,
	                     "professionalTitle":  this.expertdata.professionalTitle,
	                     "duty":  this.expertdata.duty,
	                     "professional":  this.expertdata.professional,
	                     "linkPhone":  this.expertdata.linkPhone,
	                     "researchDirection":  this.expertdata.researchDirection,
	                     "partJob":  this.expertdata.partJob,
	                     "level":  this.expertdata.level,
	                     "phoneNumber":  this.expertdata.phoneNumber,
	                     "email":  this.expertdata.email,
	                     "wechat":  this.expertdata.wechat,
	                     "qqAccount":  this.expertdata.qqAccount,
	                     "note":  this.expertdata.note,
	                     "projects": this.expertdata.projects
                       }
                       //发送请求
                      this.$axios.post(url,data).then(res=>{
                         if(res.data.code==200){
                            this.changeokalert()
                           //关闭
                           this.close();
                           this.search();
                        }
                      })
                   }).catch(() => {
                     this.$message({
                        type: 'info',
                        message: '已取消操作'
                      });
                   });
                }else{
                 //没发现重复直接提交
                 var url ="/api-eva/professor/update"
                 //把专家的项目的数据从数组变成字符串 交给专家data对象
                 if(this.mylist.length==0){
                 this.expertdata.projects=""
                 }else{
                 this.expertdata.projects = this.mylist.join(",");
                 }
                 let data = {
                   "fdObjectid": this.expertdata.fdObjectid,
                   "name": this.expertdata.name,
	                 "workUnit":  this.expertdata.workUnit,
	                 "sex":  this.expertdata.sex,
	                 "professionalTitle":  this.expertdata.professionalTitle,
	                 "duty":  this.expertdata.duty,
	                 "professional":  this.expertdata.professional,
	                 "linkPhone":  this.expertdata.linkPhone,
	                 "researchDirection":  this.expertdata.researchDirection,
	                 "partJob":  this.expertdata.partJob,
	                 "level":  this.expertdata.level,
	                 "phoneNumber":  this.expertdata.phoneNumber,
	                 "email":  this.expertdata.email,
	                 "wechat":  this.expertdata.wechat,
	                 "qqAccount":  this.expertdata.qqAccount,
	                 "note":  this.expertdata.note,
	                 "projects": this.expertdata.projects
                 }
                 //发送请求
                 this.$axios.post(url,data).then(res=>{
                    if(res.data.code==200){
                     this.changeokalert()
                     //关闭
                     this.close();
                     this.search();
                    }
                 })
                }
             })
         }else{
         //添加
          //判断名字是否重复
           var url = "/api-eva/professor/checkProfessor"
           let data ={
             "name": this.expertdata.name
           }
           this.$axios.post(url,data).then(res=>{
             //如果发现重复专家名字
            if(res.data.code==20001){
              //this.expertexist()
              //确认是否进行
              this.$confirm('专家名字重复是否进行操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   var url ="/api-eva/professor/insert"
                   //把专家的项目的数据从数组变成字符串 交给专家data对象
                   if(this.mylist.length==0){
                     this.expertdata.projects=""
                   }else{
                   this.expertdata.projects = this.mylist.join(",");
                   }
                   let data = {
                            "name": this.expertdata.name,
	                          "workUnit": this.expertdata.workUnit,
	                          "sex": this.expertdata.sex,
	                          "professionalTitle": this.expertdata.professionalTitle,
	                          "duty": this.expertdata.duty,
	                          "professional": this.expertdata.professional,
	                          "linkPhone": this.expertdata.linkPhone,
	                          "researchDirection": this.expertdata.researchDirection,
	                          "partJob": this.expertdata.partJob,
	                          "level":this.expertdata.level,
	                          "phoneNumber": this.expertdata.phoneNumber,
	                          "email": this.expertdata.email,
	                          "wechat":this.expertdata.wechat,
	                          "qqAccount": this.expertdata.qqAccount,
	                          "note": this.expertdata.note,
	                          "projects":this.expertdata.projects
                   }
                   //发送请求
                   this.$axios.post(url,data).then(res=>{
                      if(res.data.code==200){
                           this.addok()
                           //关闭
                           this.close();
                           this.search();
                      }
                   })
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消操作'
                  });
              });
            }else{
            //否则 直接添加
              var url ="/api-eva/professor/insert"
              //把专家的项目的数据从数组变成字符串 交给专家data对象
              if(this.mylist.length==0){
                this.expertdata.projects=""
              }else{
              this.expertdata.projects = this.mylist.join(",");
              }
              let data = {
                            "name": this.expertdata.name,
	                          "workUnit": this.expertdata.workUnit,
	                          "sex": this.expertdata.sex,
	                          "professionalTitle": this.expertdata.professionalTitle,
	                          "duty": this.expertdata.duty,
	                          "professional": this.expertdata.professional,
	                          "linkPhone": this.expertdata.linkPhone,
	                          "researchDirection": this.expertdata.researchDirection,
	                          "partJob": this.expertdata.partJob,
	                          "level":this.expertdata.level,
	                          "phoneNumber": this.expertdata.phoneNumber,
	                          "email": this.expertdata.email,
	                          "wechat":this.expertdata.wechat,
	                          "qqAccount": this.expertdata.qqAccount,
	                          "note": this.expertdata.note,
	                          "projects":this.expertdata.projects
              }
              //发送请求
              this.$axios.post(url,data).then(res=>{
                if(res.data.code==200){
                     this.addok();
                     //关闭
                     this.close();
                     this.search();
                }
              })
            }
           })
         }
       }else{
       //不通过
         this.open5()
       }
    },
    //关闭弹窗
    close () {
       //弹窗和遮罩层消失
       this.popup = false
       this.mask = false
      //专家数据和值全部空
       this.expertdata = {}
       //this.expertdata.name = ""
       this.myvalue = ""
       this.mylist = []
      //去除正则验证
      // this.$nextTick(()=>{ //}); 这个狗币导致第二次点击添加不能输入值
       this.$refs.expertdata.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.staffForm.resetFields()，去除验证

      //保存按钮和加号出现
      expertbtn111.style.display="";
      add.style.display="block";
      //所有input变为正常
      var inputs = document.querySelectorAll("#changefromcontent input")
      for(var input of inputs){
         input.disabled=false

      }

      var note = document.querySelector("#changefromcontent textarea")
      var sex1 =document.getElementById("sex1")
      var sex2 = document.getElementById("sex2")
           note.disabled = false;
           sex1.onclick = null
           sex2.onclick = null
    },
    //点击添加
    addtodolist () {
         this.myvalue = this.myvalue.trim()
         if(this.myvalue!=""){
         //把获取的值放到数组
         this.mylist.push(this.myvalue);
         this.myvalue=""
        }
    },
    //点击删除
    deletes (data) {
        this.mylist.splice(data,1)
    },
    //这是改主体
    tableRowStyle({row,rowIndex}){
      return "font-size:14px"
    },
  }
}
</script>
<style scoped>
#changefromcontent .grid-content{
  margin-bottom:20px;
}
/*专家库*/
#expert{
  width:100%;
  height:100%;
}
/*header 布局*/
  .el-col {
    border-radius: 4px;
    height:60%;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.s3{
  width:100%;
  margin-left:0px;
  font-size:14px;
  font-weight:700;
  height:80%;
}
/*弹窗的input样式*/
el-form-item{
  margin-bottom:22px !important;
}
.el-input__suffix{
  display: none;
}
.inputnone1{
  outline-style: none ;
  border-radius: 5px;
  width:96%;
  color:black;
  background:rgba(253,253,253,1);
  margin-top:3px;
  margin-right:10px;
}
/*header的input样式*/
.inputnone{
  outline-style: none ;
  border-radius: 5px;
  border: 1px solid  rgba(241,240,240,0.95);
  width:50%;
  color:black;
  background:rgba(253,253,253,1);
}
/*三个按钮容器样式*/
.buttonimg1{
  position:relative;
  top:3px;
  left:-5px;
}
/*弹窗错误提示*/
.el-form-item__error{
  top:89% !important;
}
.el-form-item__content{
  height:40px;
  margin-top:-2px;
}
.el-input{
  background:white;
}
/*子项目*/
#todolist{
  width: 100%;
  padding-left: 100px;
  list-style-type: none;
  text-align: left;
}
#admin{
   margin-top:10px;
   margin-right:-74%;
}
#select{
  border:0px;
  outline-style: none;
  float:right;
  margin-top:-16px;
}
#todolist>li{
  margin-left:48%;
  text-align: left;
  width:100%;
}
#todolist>li span{
  display: inline-block;
}
label{
      vertical-align: text-bottom;
    margin-bottom: 2px;
}
#header2{
  width:100%;
  height:80px;
  background:white;
}
#header2::after{
  display:block;
  content:"";
  clear:both;
}
.s1{
  color:rgb(99,159,229,0.9);
  font-size:24px;
  font-weight: 500;
  line-height: 60px;
  float:left;
  margin-left:22px;
}
.s2{
  font-size:14px;
  margin-right:-82%;
  margin-top:-39px;
}
.s3{
  float:left;
  width:100%;
  margin-left:0px;
  font-size:14px;
  font-weight:700;
  margin-left:1.4%;
  height:80%;
  white-space: nowrap;
}
.s3>input{
   height:37%;
}
#changefrom{
	width: 50%;
	left: 25%;
}
#changefromcontent{
   margin-top:1.5rem;
   width: 96%;
   font-size:14px;
}
.s5{
  height:10%;
  width:45%;
}
/*加号按钮*/
#add{
  position:absolute;
  top:19%;
  left:100%;
  cursor: pointer;
}

.wrapper {
	height: 400px;
	margin-bottom: 15px;
}
</style>

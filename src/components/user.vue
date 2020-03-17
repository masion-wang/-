<!--
--- author:王松
--- creation time: 2019-07-14
--- module: 用户页面
--- description: 用户页面 包括查询 重置 添加负责人 修改 冻结 重置密码
-->
<template>
<div id="user">
  <div v-show="mask==true" id="mask-defined"></div>
  <!--导航栏-->
  <div class="query-box">
    <el-form :inline="true" label-width="60px">
      <el-form-item label="姓名">
        <el-input v-model="userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="userAccount" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userPhone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="qqAccount" placeholder="QQ"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="content-box">
    <div class="table-top-btn-group">
      <el-button type="primary" @click="open(1,2,'添加')" id="addcharge">
        <img src="../assets/img/pictrue/operationButton/addChargePerson.png" class="buttonimg">添加负责人
      </el-button>
    </div>
    <!--表格-->
    <div class="table-box" id="tabledata">
      <el-table
        :data="tableData"
        :height="tableHeight"
        style="width:100%"
        :header-cell-style="tableHeaderColor"
        :row-style="tableRowStyle"
      >
        <el-table-column label="序号" width="80"  class="notwrap" >
          <template slot-scope="scope">
            <span>{{scope.$index + 1 + (pageNumber - 1) * 10}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名"  class="notwrap"        ></el-table-column>
        <el-table-column prop="userAccount" label="账号"  class="notwrap"      ></el-table-column>
        <el-table-column prop="userSex" label="性别"  class="notwrap"    width="60"         ></el-table-column>
        <el-table-column prop="qqAccount" label="QQ"  class="notwrap"               ></el-table-column>
        <el-table-column prop="userEmail" label="邮箱"  class="notwrap"              ></el-table-column>
        <el-table-column prop="userPhone" label="手机号" class="notwrap"    width="120"           ></el-table-column>
        <el-table-column prop="createDate" label="加入时间" class="notwrap"                ></el-table-column>
        <el-table-column prop="remark" label="备注"  class="notwrap"            ></el-table-column>
        <el-table-column prop="isStop" label="用户状态"  class="notwrap">
          <template slot-scope="scope">
            <div>{{scope.row.isStop==0?"未冻结":"已冻结"}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="180" class="notwrap">
          <template slot-scope="scope">
            <el-button class="table-btns" @click="open(scope.$index,scope.row,'修改')" type="text">修改</el-button>
            <span class="table-btns-split">|</span>
            <el-button class="table-btns" @click="freeze(scope.$index,scope.row)" type="text">{{scope.row.isStop==0?"冻结":"解冻"}}</el-button>
            <span class="table-btns-split">|</span>
            <el-button class="table-btns" @click="resetpassword(scope.$index,scope.row)" type="text">重置密码</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="foot-pagination" id="page">
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
    <!--弹窗-->
    <div v-show="this.show==true" id="changefrom" class="el-dialog dialog-defined">
         <!--弹窗头-->
         <div class="el-dialog__header" id="changefromheader">
           <div class="el-dialog__title" id="changefromheaderson1">编辑</div>
           <button id="changefromheaderson2" type="button" class="el-dialog__headerbtn" @click="close">
             <i class="el-dialog__close el-icon el-icon-close"></i>
           </button>
         </div>
         <el-scrollbar class="wrapper no-x-scroll" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize="false">
           <!--弹窗内容-->
           <div id="changefromcontent">
            <el-form :model="userdata" :rules="rules" ref="userdata" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="userName">
                <el-input type="text" v-model="userdata.userName" autocomplete="off" id="useruser"></el-input>
              </el-form-item>
              <el-form-item label="性别" >
                <el-radio-group  v-model="userdata.userSex">
                  <el-radio label="MALE">男</el-radio>
                  <el-radio label="FEMALE">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="账号" prop="userAccount">
                <el-input type="text" v-model="userdata.userAccount" autocomplete="off" id="useruserAccount"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userPwd">
                <el-input type="text" v-model="userdata.userPwd" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qqAccount">
                <el-input type="text" v-model="userdata.qqAccount" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="userEmail">
                <el-input type="text" v-model="userdata.userEmail" autocomplete="off" id="useruserEmail"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="userPhone">
                <el-input type="text" v-model="userdata.userPhone" autocomplete="off" id="useruserPhone"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="userdata.remark" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
           </div>
         </el-scrollbar>
         <!--弹窗尾部-->
         <div id="changefromfoot" class="el-dialog__footer">
            <el-button type="primary" @click="add">保存</el-button>
            <el-button type="primary" @click="close">取消</el-button>
         </div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  name: 'user',
  data () {
   //校验用户名
   var validuserName = (rule, value, callback) => {
     if (!value) {
       this.userNamecontrol = false
       return callback(new Error('户名不能为空'));
     } else {
       callback()
       this.userNamecontrol = true
     }
   };
   //校验邮箱
   var validuserEmail = (rule, value, callback) => {
     var emailreg=/^[a-zA-Z0-9_]{3,16}[a-zA-Z0-9]@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
     if(value ==this.userEmailrepeat){
        this.userEmailcontrol = false
       return callback(new Error('该邮箱被注册'));
     }
     else if (emailreg.test(value)) {
       callback()
       this.userEmailcontrol = true
     } else {
       this.userEmailcontrol = false
       return callback(new Error('邮箱格式不正确'));
     }
   };
   //校验手机号校验
   var validuserPhone = (rule, value, callback) => {
     var phonereg=/\d{3}-\d{8}|\d{4}-\d{7}|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
     if (!value) {
       this.userPhonecontrol = false
       return callback(new Error('手机号不能为空'));
       //判断顺序 这个要在前面
     }else if(value==this.userPhonerepeat){
        this.userPhonecontrol = false
        return callback(new Error('该手机已经注册'));
     }
     else if (phonereg.test(value)) {
       callback()
       this.userPhonecontrol = true
     } else {
       this.userPhonecontrol = false
       return callback(new Error('格式不正确'));
     }
   };
   //校验账号
   var validuserAccount = (rule, value, callback) => {
     if (!value) {
       this.userAccountcontrol = false
       return callback(new Error('账号不能为空'));
     } else if(value==this.userAccountrepeat){

       this.userAccountcontrol = false
       return callback(new Error('该账号已注册'));
     }
     else {
       callback()
       this.userAccountcontrol = true
     }
   };
   //校验密码
   var validuserPwd = (rule, value, callback) => {
     if (!value) {
       this.userPwdcontrol = false
       return callback(new Error('密码不能为空'));
     } else {
       callback()
       this.userPwdcontrol = true
     }
   };
   //校验QQ
   var validqqAccount = (rule, value, callback) => {
     var qqreg=/^[1-9]\d{4,13}$/
     if (qqreg.test(value)) {
       callback()
       this.qqAccountcontrol = true
     } else {
       this.qqAccountcontrol = false
       return callback(new Error('4到13位之间'));
     }
   };
    return {
      //查询分页所需
      userName:"",            //用户名
      userAccount:"",         //用户账号
      userPhone:"",           //用户手机
      qqAccount:"",           //QQ号
      pageNumber:1,           //页码
      limit:10,               //一页数量
      total:10,               //总数量
      tableHeight: 'calc(100% - 110px)', // 表格高度
      //table数据
      tableData: [],
      userAccount:"",
      userName:"",
      userSex:"",
      userPhone:"",
      userEmail:"",
      remark:"",
      qqAccount:"",
      createDate:"",
      //弹窗数据
      userdata:{},
      rules:{
        userName: [                  //用户名
          { required: true, validator: validuserName, trigger: 'blur' }
          ],
        userAccount: [                //账号
          { required: true, validator: validuserAccount, trigger: 'blur' }
          ],
        userPwd :[                    //密码
          { required: true,validator: validuserPwd, trigger: 'blur' }
        ],
        qqAccount :[                   //QQ号
          { required: true,validator: validqqAccount, trigger: 'blur' }
        ],
        userEmail :[                   //纳税人识别号
          { required: true,validator: validuserEmail, trigger: 'blur' }
        ],
        userPhone :[                   //手机号
          { required: true,validator: validuserPhone, trigger: 'change' }
        ]
      },
      //用来判断 用户名 邮箱 手机号是否重复的值
      userAccountrepeat:"",
      userPhonerepeat:"",
      userEmailrepeat:"",
      //控制校验的开关
      userNamecontrol:false,               //用户名校验开关
      userPwdcontrol:false,                //密码校验开关
      qqAccountcontrol:false,              //qq校验开关
      userEmailcontrol:false,              //邮箱校验开关
      userPhonecontrol:false,              //手机号校验开关
      userAccountcontrol:false,            //账号校验开关
      //用户id
      //fdObjectid:"",
      //其它
      passwwordshow:false,    //控制密码框是否显示
      mask:false,             //弹窗和遮罩层 是否显示
      show: false,
      value:"",
    }
  },
  mounted () {
    this.$utils.setContentHeight(true) // 设置内容显示区域高度
    this.search()
    this.drag()
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
        //canMove=true;
      	//元素的坐标系的 x y  鼠标距离网页的距离 减去 弹窗的 left top
      	X=e.offsetX
        Y=e.offsetY
        document.onmousemove=function(e){
          //定义弹窗新的left top
          var left=(e.clientX-X)
          var top=(e.clientY-Y)
          if(left<=199){
             left=199
          }
          if(top<=66){
             top=66
          }
          changefrom.style.left=left+"px";
          changefrom.style.top=top+"px";
      	}
      }
      //当鼠标在div上抬起时，关闭开关
      changefromheader.onmouseup=function(){
         document.onmousemove=null;
      }
    },
    //提示用户
    //格式alert
    Regalert() {
      this.$alert('资料有误', '提示', {
        confirmButtonText: '确定',
      });
    },
    //添加成功alert
    addokalert() {
      this.$alert('添加成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //修改成功alert
    changealert() {
      this.$alert('修改成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //修改成功alert
    changealert() {
      this.$alert('修改成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //重置密码成功alert
    resetalert() {
      this.$alert('重置密码成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //冻结成功alert
    freezealert() {
      this.$alert('冻结成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //解冻成功alert
    unfreezealert() {
      this.$alert('解冻成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //解冻成功alert
    unfreezealert() {
      this.$alert('解冻成功', '提示', {
        confirmButtonText: '确定',
      });
    },
    //搜索
    search () {
       this.pageNumber=1
      let data = {  //名字 地址 电话号 当前页码 每页数量
        userName:this.userName,
        userAccount:this.userAccount,
        userPhone:this.userPhone,
        qqAccount:this.qqAccount,
        pageNumber:this.pageNumber,
      	limit:this.limit
      }
      var url = "/api-eva/evaUser/pageList"
      this.$axios.post(url,data).then(res=>{
                if(res.data.code==200){
                    //获取总数量
                    this.total=res.data.resultData.total
                    //获取单页的数据
                    this.tableData=res.data.resultData.rows
                    //遍历请求的数组
                    for(var a of this.tableData){
                             if(a.userSex=="FEMALE"){
                                 a.userSex="女"
                             }else{
                                 a.userSex="男"
                             }
                    }
                }
      })
    },
    //重置 值为空
    reset () {
      this.pageNumber=1
      this.userName="";this.userAccount="";this.userPhone="";this.qqAccount=""
      this.search();
    },
    //分页事件
    handleCurrentChange () {
       let data = {  //名字 地址 电话号 当前页码 每页数量
         userName:this.userName,
         userAccount:this.userAccount,
         userPhone:this.userPhone,
         qqAccount:this.qqAccount,
         pageNumber:this.pageNumber,
      	 limit:this.limit
      }
      var url = "/api-eva/invoice/pageList"
      this.$axios.post(url,data).then(res=>{
                if(res.data.code==200){
                    //总页数
                    this.total=res.data.resultData.total
                    //单页的数据
                    this.tableData=res.data.resultData.rows
                }
      })
    },
    //冻结或者解冻用户
    freeze (data0,data1){
      //获取用户名信息
      var obj = data1
      //首先判断冻结还是解冻
      //isStop==0 是冻结操作
      if(obj.isStop==0){
        this.$confirm(`是否冻结 ${obj.userAccount} 用户?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           //进行冻结
           let url  = "/api-eva/evaUser/freeze"
           let data  = {
                      "userAccount": obj.userAccount
           }
           this.$axios.post(url,data).then(res=>{
             if(res.data.code==200){
               this.freezealert()
               this.search()
             }
           })
        }).catch(() => {
           this.$message({
           type: 'info',
           message: '已取消冻结'
           });
        });
      }
      else{
        //进行解冻操作
        this.$confirm(`是否解冻 ${obj.userAccount} 用户?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           //进行解冻
           let url  = "/api-eva/evaUser/unFreeze"
           let data  = {
               "userAccount": obj.userAccount
           }
           this.$axios.post(url,data).then(res=>{
             if(res.data.code==200){
               this.unfreezealert()
               this.search()
             }
           })
        }).catch(() => {
           this.$message({
           type: 'info',
           message: '已取消解冻'
           });
        });
      }
    },
    //重置密码
    resetpassword (data0,data1){
       this.$confirm('是否密码重置为000000?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
           //获取用户id
           var obj = data1
           let url  = "/api-eva/evaUser/resetUserPSW"
           let data  = {
               "fdObjectid": obj.fdObjectid
           }
           this.$axios.post(url,data).then(res=>{
             if(res.data.code==200){
               this.resetalert()
               //this.search()
             }
           })
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消密码重置'
           });
      });
    },
    //添加或修改
    open(data0,data1,data3) {
      this.show = true
      this.mask = true
      //this.$refs.userdata.resetFields();
      if(data0==1&&data1==2){
         //添加
         //密码框显示
         this.passwwordshow=true;
         //密码头部为添加
         changefromheaderson1.innerHTML = data3
         //默认选择男性
         var sexchoose1 = document.querySelector(".el-radio__original")
         sexchoose1.click()
         //账号 邮箱 手机号绑定input事件
         //1.
         let useruserAccount = document.getElementById("useruserAccount");
                        //这边要用箭头函数打通this指向
         useruserAccount.addEventListener("input",()=>{
            let url = "/api-eva/evaUser/checkUserName"
            let data = {
               "userAccount": this.userdata.userAccount,
            }
            this.$axios.post(url,data).then(res=>{
                //如果有重复的用户
                if(res.data.code==11026){
                  //保存重复信息
                  this.userAccountrepeat=this.userdata.userAccount
                }
            })
         });
         //2.手机号
         let useruserPhone = document.getElementById("useruserPhone");
         useruserPhone.addEventListener("input",()=>{
            let url = "/api-eva/evaUser/checkUserPhone"
            let data = {
               "userPhone": this.userdata.userPhone,
            }
            this.$axios.post(url,data).then(res=>{
                //如果有重复的用户
                if(res.data.code==11031){
                  //保存重复信息
                  this.userPhonerepeat=this.userdata.userPhone
                }
            })
         });
         //3.邮箱useruserEmail
         var useruserEmail = document.getElementById("useruserEmail")
         useruserEmail.addEventListener("input",()=>{
            let url = "/api-eva/evaUser/checkUserEmail"
            let data = {
               "userEmail": this.userdata.userEmail,
            }
            this.$axios.post(url,data).then(res=>{
                //如果有重复的用户
                if(res.data.code==11032){
                  //保存重复信息
                  this.userEmailrepeat=this.userdata.userEmail
                }
            })
         })
         return;
      }else{
         //用户值可读
         changefromheaderson1.innerHTML = data3
         var useruser = document.getElementById("useruser")
         useruser.readOnly = true;
         //当时修改的时候 开关默认为true
         this.userNamecontrol=true;               //用户名校验开关
         this.userPwdcontrol=true;                //密码校验开关
         this.qqAccountcontrol=true;              //qq校验开关
         this.userEmailcontrol=true;              //邮箱校验开关
         this.userPhonecontrol=true;              //手机号校验开关
         this.userAccountcontrol=true;            //账号校验开关
         //
         //发送请求
         //传的参数 获取数据
         var obj = data1
         var url ="/api-eva/evaUser/getUserById"
         let data ={
            "fdObjectid": obj.fdObjectid,
         }
         //白用户id值交给data里面保存
         this.fdObjectid=obj.fdObjectid
         this.$axios.post(url,data).then(res=>{
            if(res.data.code==200){
              //成功获取数据
              //把数据交给弹窗
              this.userdata = res.data.resultData
            }
         })
         //获取数据开始判断 账号 手机号 邮箱是否重复
         //账号 邮箱 手机号绑定input事件
         //1.账号名字
         let useruserAccount = document.getElementById("useruserAccount");
         //这边要用箭头函数打通this指向
         useruserAccount.addEventListener("input",()=>{
            let url = "/api-eva/evaUser/checkUserName"
            let data = {
               "userAccount": this.userdata.userAccount,
               "fdObjectid":obj.fdObjectid
            }
            this.$axios.post(url,data).then(res=>{
                //如果有重复的用户
                if(res.data.code==11026){
                  //保存重复信息
                  this.userAccountrepeat=this.userdata.userAccount
                }
            })
         });
         //2.手机号
         let useruserPhone = document.getElementById("useruserPhone");
         useruserPhone.addEventListener("input",()=>{
            let url = "/api-eva/evaUser/checkUserPhone"
            let data = {
               "userPhone": this.userdata.userPhone,
               "fdObjectid":obj.fdObjectid
            }
            this.$axios.post(url,data).then(res=>{
                //如果有重复的用户
                if(res.data.code==11031){
                  //保存重复信息
                  this.userPhonerepeat=this.userdata.userPhone
                }
            })
         });
         //3.邮箱useruserEmail
         var useruserEmail = document.getElementById("useruserEmail")
         useruserEmail.addEventListener("input",()=>{
            let url = "/api-eva/evaUser/checkUserEmail"
            let data = {
               "userEmail": this.userdata.userEmail,
               "fdObjectid":obj.fdObjectid
            }
            this.$axios.post(url,data).then(res=>{
                //如果有重复的用户
                if(res.data.code==11032){
                  //保存重复信息
                  this.userEmailrepeat=this.userdata.userEmail
                }
            })
         })
      }
    },
    //保存或者修改
    add () {
      //触发正则
      var inputs = document.querySelectorAll("#changefromcontent input");
      for(var input of inputs){
        input.focus();
      }
      //通过用户ID是否有值判断添加或更改
      if(!this.userdata.fdObjectid){
          //添加接口
          //是否通过正则
          if( this.userNamecontrol==true&&          //姓名
              this.userPwdcontrol==true&&           //密码
              this.qqAccountcontrol==true&&         //qq
              this.userEmailcontrol==true&&         //邮箱
              this.userPhonecontrol==true&&         //手机号
              this.userAccountcontrol==true){       //账号
               let url ="/api-eva/evaUser/insert"
               let data = {
                 userAccount:this.userdata.userAccount,                              //账号，限100字符
                 userName:this.userdata.userName,                                    //用户名称，限100字符
                 userPwd:this.userdata.userPwd ,                                     //用户密码
                 userSex: this.userdata.userSex,                                     //性别
                 userPhone:this.userdata.userPhone,                                  //手机号码
                 userEmail:this.userdata.userEmail,                                  //邮箱
                 remark:this.userdata.remark,                                        //备注
                 extendQqAccount:this.userdata.qqAccount,                            //QQ
               }
               this.$axios.post(url,data).then(res=>{
                 if(res.data.code==200){
                   this.addokalert()
                   this.close()
                   this.search()
                 }else if(res.data.code==11031){
                     this.$alert('手机号已被注册', '提示', {
                       confirmButtonText: '确定',
                    });
                 }
               })
          }else{
             this.Regalert();
          }
       }else{
          //修改接口
          //是否通过正则
          if(this.userNamecontrol==true&&           //姓名
              this.qqAccountcontrol==true&&         //qq号
              this.userAccountcontrol==true&&       //账号
              this.userEmailcontrol==true&&         //邮箱号
              this.userPhonecontrol==true){         //手机号
            let url ="/api-eva/evaUser/update"
            let data = {
                "fdObjectid": this.userdata.fdObjectid,                              //用户id
                "userName": this.userdata.userName,                                  //用户名
                "userSex": this.userdata.userSex,                                    //性别
                "userPhone": this.userdata.userPhone,                                //手机号
                "userEmail": this.userdata.userEmail,                                //邮箱
                "remark": this.userdata.remark,                                      //备注
                "extendQqAccount": this.userdata.qqAccount,                          //QQ
            }
            this.$axios.post(url,this.userdata).then(res=>{
            if(res.data.code==200){
              this.changealert()
              this.close()
              this.search()
            }
            })
          }else{
            this.Regalert()
          }
       }
    },
    close () {
      //弹窗和遮罩层消失
      this.show = false
      this.mask = false
      //清空弹窗数据 并且密码框关闭 并且清空用户id
      this.userdata = {}
      this.passwwordshow=false
      //用户值可读
      var useruser = document.getElementById("useruser")
      useruser.readOnly = false;
      //正则样式消除
      this.$refs.userdata.resetFields();
    },
    //这是改头 tableHeaderColor rem默认16px
    tableHeaderColor({row,column,rowIndex,columnIndex}){
      if(rowIndex === 0){return "background-color:#fbfbfb;color:black;font-size:14px;"}
    },
    //这是改主体
    tableRowStyle({row,rowIndex}){
      return "font-size:14px"
    },
  }
}
</script>
<style scoped>
.alertdata{
  margin-top:15px;
}
#user{
  width:100%;
  height:100%;
}
label{
  vertical-align: text-bottom;
  margin-bottom: 2px;
}
#admin{
  margin-top:18px;
  margin-right:1%;
  float:right;
}
#select{
  width:1%;
  border:0px;
  outline-style: none;
  margin-top:32px;
  margin-right:0%;
  float:right;
}
.userbtn1{
  margin-top:30px;
  height:2rem;
  line-height: 0;
  width:5rem;
  margin-right:15px;
}
.userbtn2{
  margin-top:30px;
  height:2rem;
  line-height: 0;
  width:5rem;
  margin-right:15px;
}
#inputuser2{
  margin-left:-5%;
}
#inputuser3{
  margin-left:-4%;
}
#inputuser4{
  margin-left:-5%;
}
.notwrap{
  overflow: hidden;
}
.inputnone{
  outline-style: none ;
  border: 1px solid rgba(241,240,240,0.95);
  border-radius: 3px;
  height:72%;
  color:black;
  width:70%;
  background:rgba(253,253,253,1);
}
#header1{
  width:100%;
  height:80px;
  background:white;
  border-bottom:2px solid rgba(229,229,229,0.3);
}
#header1::after{
  display:block;
  content:"";
  clear:both;
}
.s1{
  color:rgb(99,159,229,0.9);
  font-size:24px;
  font-weight: 500;
  line-height: 66px;
  float:left;
  margin-left:22px;
}
.s2{
  line-height: 80px;
  font-size:14px;
  margin-right:0.2%;
  float:right;

}
.buttonimg{
  position:absolute;
  top:28%;
  left:12%;
}
.buttonimg3{
  position:absolute;
  top:28%;
  left:14%;
}
.s4{
  display:inline-block;
  color:#03a0fd;
  cursor: pointer;
}
#changefrom{
  left: 35%;
  width: 30%;
}
#changefromcontent{
   width: 87%;
   margin-top: 20px;
}
.wrapper {
	height: 400px;
	margin-bottom: 15px;
}
#d1,#d2,#d3,#d4,#d5,#d6,#d7,#d8,#d9{
  width:70%;
  height:10.5%;
  font-size:14px;
  margin:10px auto;
}
#d2{
  margin-left:-2%;
  margin-top:0%;
  height:8%;
}
#d6{
   margin-left:13.8%;
}
#text{
  border: 1px solid  rgba(241,240,240,0.95);
  outline:none;
  resize:none;
  width:49%;
  height:24%;
  font-size:14px;
  background:rgba(253,253,253,0.99)
}
</style>

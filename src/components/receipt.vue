<!--
--- author: 王松
--- creation time: 2019-07-14
--- module: 发票页面
--- description: 发票页面 包括添加 导入 下载模板 查询 重置 修改 删除 查看 功能
-->
<template>
<div id="receipt">
  <!--遮罩层-->
  <div v-show="this.mask==true" id="mask-defined"></div>
  <!--导航栏-->
  <div class="query-box">
    <el-form :inline="true" label-width="60px">
      <el-form-item label="用户">
        <el-input v-model="username" placeholder="用户"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="phonename" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--主体内容-->
  <div class="content-box">
    <!--1.四个按钮 表格 分页插件-->
    <div class="table-top-btn-group">
      <el-button type="primary" class="button4">
        <img src="../assets/img/pictrue/operationButton/output.png" class="buttonimg"><div class="four" @click="download"> 导出</div></el-button>
      <input v-show="3>4"  @click="download" type="file"  id="download">
      <el-button type="primary" class="button4">
        <img src="../assets/img/pictrue/operationButton/input.png" class="buttonimg"><div class="four" @click="upload1"> 导入</div>
        <input v-show="3>4" type="file" id="upload" @change="upload" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ></el-button>
      <el-button type="primary" @click="downloadmodel" class="button4">
        <img src="../assets/img/pictrue/operationButton/inputModel.png" class="buttonimg"><div class="four">  下载模板</div></el-button>
      <el-button type="primary" class="button4">
        <img src="../assets/img/pictrue/operationButton/add3.png" class="buttonimg"><div class="four" @click="open(1,2,'添加')">  添加</div></el-button>
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
             <el-table-column  label="序号" width="80"  class="notwrap">

               <template slot-scope="scope">
                 <span>{{scope.$index + 1 + (pageNumber - 1) * 10}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="name" label="户名"  class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.name">{{scope.row.name}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="bank" label="开户行"  class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.bank">{{scope.row.bank}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="taxpayerNumber" label="纳税人识别号" width="150" class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.taxpayerNumber">{{scope.row.taxpayerNumber}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="account" label="账号"  class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.account">{{scope.row.account}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="address" label="地址"  class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.address">{{scope.row.address}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="telNumber" label="电话" width="130" class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.telNumber">{{scope.row.telNumber}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="bankNum" label="行号" class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.bankNum">{{scope.row.bankNum}}</span>
               </template>
             </el-table-column>
             <el-table-column prop="note" label="备注"  class="notwrap">
               <template slot-scope="scope">
                <span :title="scope.row.note">{{scope.row.note}}</span>
               </template>
             </el-table-column>
             <el-table-column  label="操作" width="100" class="notwrap" >

               <template slot-scope="scope">
                 <el-button class="table-btns" @click="open(scope.$index,scope.row,'编辑')" type="text">编辑</el-button>
                 <span class="table-btns-split">|</span>
                 <el-button class="table-btns" @click="deleste(scope.$index,scope.row)" type="text">删除</el-button>
               </template>

             </el-table-column>
       </el-table>
        <!--分页插件-->
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
    <!--2.弹窗-->
    <div v-show="show==true" id="changefrom" class="el-dialog dialog-defined">
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
            <el-form :model="receiptdata" status-icon :rules="rules" ref="receiptdata" label-width="100px" >
              <el-row >
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple">
                    <el-form-item label="户名" prop="name">
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.name" ></el-input>
                    </el-form-item>
                 </div></el-col>
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple-light">
                   <el-form-item label="开户行" prop="bank">
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.bank" ></el-input>
                   </el-form-item>
                 </div></el-col>
              </el-row>
               <el-row >
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple">
                   <el-form-item label="账号" prop="account">
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.account" ></el-input>
                   </el-form-item>
                 </div></el-col>
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple-light">
                   <el-form-item  prop="taxpayerNumber" >
                      <span slot="label" style="font-size:12px;">纳税人识别号</span>
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.taxpayerNumber" ></el-input>
                   </el-form-item>
                 </div></el-col>
              </el-row>
               <el-row >
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple">
                   <el-form-item label="地址" prop="address">
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.address" ></el-input>
                   </el-form-item>
                 </div></el-col>
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple-light">
                   <el-form-item label="电话" prop="telNumber">
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.telNumber" ></el-input>
                   </el-form-item>
                 </div></el-col>
              </el-row>
               <el-row >
                 <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11"><div class="bg-purple">
                   <el-form-item label="行号" prop="bankNum">
                      <el-input type="text" style="height:30px;line-height:30px;" v-model="receiptdata.bankNum" ></el-input>
                   </el-form-item>
                 </div></el-col>
              </el-row>
               <el-row >
                 <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20"><div class="bg-purple" >
                   <el-form-item label="备注" prop="note" class="note">
                      <el-input type="textarea" v-model="receiptdata.note" ></el-input>
                   </el-form-item>
                 </div></el-col>
              </el-row>
            </el-form>
         </div>
      </el-scrollbar>
        <!--弹窗尾部-->
       <div id="changefromfoot" class="el-dialog__footer">
          <el-button type="primary" class="receiptbtn" @click="add">保存</el-button>
          <el-button type="primary" @click="close" class="receiptbtn">取消</el-button>
       </div>
    </div>
  </div>
</div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: 'receipt',
  data () {
   //校验户名
   var validname = (rule, value, callback) => {
     if (!value) {
       this.namecontrol = false
       return callback(new Error('户名不能为空'));
     } else {
       callback()
       this.namecontrol = true
     }
   };
   //校验开户行
   var validbank = (rule, value, callback) => {
     if (!value) {
       this.bankcontrol = false
       return callback(new Error('开户行不能为空'));
     } else {
       callback()
       this.bankcontrol = true
     }
   };
    //校验账号
   var validaccount = (rule, value, callback) => {
     if (!value) {
       this.accountcontrol = false
       return callback(new Error('账号不能为空'));
     } else {
       callback()
       this.accountcontrol = true
     }
   };
   //校验纳税人识别号
   var validtaxpayerNumber = (rule, value, callback) => {
       var taxnumberreg=/^[0-9a-zA-Z]+$/
     if (!value) {
       this.taxnumbercontrol = false
       return callback(new Error('不能为空'));
     }
     else if (taxnumberreg.test(value)&&value.length<=50) {
       callback()
       this.taxnumbercontrol = true
     } else {
       this.taxnumbercontrol = false
       return callback(new Error('格式不正确'));
     }
   };
   //校验地址
   var validaddress = (rule, value, callback) => {
     if (!value) {
       this.addresscontrol = false
       return callback(new Error('地址不能为空'));
     } else {
       callback()
       this.addresscontrol = true
     }
   };
   //校验行号
   var validbankNum = (rule, value, callback) => {
     if (!value) {
       this.bankNumcontrol = false
       return callback(new Error('行号不能为空'));
     } else if (value.length>25) {
       this.bankNumcontrol = false
       return callback(new Error('行号长度不能超过25'));
     }
     else {
       callback()
       this.bankNumcontrol = true
     }
   };
   //校验手机号校验
   var validtelNumber = (rule, value, callback) => {
     var phonereg=/\d{3}-\d{8}|\d{4}-\d{7}|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
     if (!value) {
       this.bankNumcontrol = false
       return callback(new Error('手机号不能为空'));
     }
     else if (phonereg.test(value)) {
       callback()
       this.telNumbercontrol = true
     } else {
       this.bankNumcontrol = false
       return callback(new Error('格式不正确'));
     }
   };
    return {
      //弹窗数值
      receiptdata:{},             //发票数据
      rules:{                     //表单正则
        name: [                   //户名
            { required: true, validator: validname, trigger: 'blur' }
          ],
        bank :[                 //开户行
          { required: true,validator: validbank, trigger: 'blur' }
        ],
        account :[                //账号
          { required: true,validator: validaccount, trigger: 'blur' }
        ],
        taxpayerNumber :[         //纳税人识别号
          { required: true,validator: validtaxpayerNumber, trigger: 'blur' }
        ],
        address :[                //地址
          { required: true,validator: validaddress, trigger: 'blur' }
        ],
        telNumber :[              //电话
          { required: true,validator: validtelNumber, trigger: 'blur' }
        ],
        bankNum :[                //行号 要么为空要么length小于25
          { validator: validbankNum, trigger: 'blur' }
        ],
      },
      //七个正则开关
      namecontrol:false,         //户名校验开关
      bankcontrol:false,         //开户行校验开关
      accountcontrol:false,      //账号校验开关
      taxnumbercontrol:false,    //纳税人号校验开关
      addresscontrol:false,      //地址校验开关
      telNumbercontrol:false,    //手机号校验开关
      bankNumcontrol:false,      //行号校验开关
      //其它
      fdObjecid:"",      //此数据id
      show: false,       //弹窗
      mask:false,        //遮罩层
      total:10,
      value:"",
      username:"",       //用户名
      address:"",        //地址
      phonename:"",      //电话号
      pageNumber:1,      //页码
      limit:10,          //每页数据
      tableHeight: 'calc(100% - 110px)', // 表格高度
      tableData: []      //表格数据
    }
  },
  mounted(){
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
        canMove=true;
        console.log(e.target)
      	//元素的坐标系的 x y  鼠标距离网页的距离 减去 弹窗的 left top
      	X=e.offsetX
        Y=e.offsetY
        console.log(X,Y)
      }
      //当鼠标在div上抬起时，关闭开关
      changefromheader.onmouseup=function(){
      	canMove=false;
      }
      //当鼠标在window范围内移动时 移动图片
      document.onmousemove=function(e){
        //只有打开开关时
      	if(canMove==true){
          //如果是弹窗头
          //if(e.target.getAttributeNode("id").value=="changefromheader"){
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
            console.log(left,top)

          //}
      	}
      }
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
      var url  = "/api-eva/invoice/insertByExcel"
      var fd = new FormData()
      fd.append('sourceFile', file.files[0])
      console.log(fd)
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      this.$axios.post(url,fd,config).then( res => {
          console.log(res)
          if(res.status==200){
            //上传成功
            this.open2()
            this.search()
          }else{
            this.open3()
          }
      }).catch( res => {
          console.log(res)
      })
      //验证它
      //去掉值
       //file.value=""
    },
    //格式有误
    open5() {
        this.$alert('格式有误', '提示', {
          confirmButtonText: '确定',
        });
    },
    //成功
    open2() {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
    },
    //失败
    open3() {
        this.$message({
          message: '失败',
          type: 'warning'
        });
    },
    //删除成功
    open4() {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
    },
    //下载文件
    download () {
      let data = {
         name:this.username,
         address:this.address,
         telNumber:this.phonename
      };
      let url = "/api-eva/invoice/evaInvoiceExport"
      this.$axios.post(url,data, {
          responseType: 'blob'
          }).then(res => {
            this.download1(res.data)
        })
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
    //下载模板
    downloadmodel () {
      let url = "/api-eva/scientific/downProfessorTemplate"
      this.$axios.post(url,{}).then(res=>{
          console.log(res)
           this.download2(res.data)
      })
    },
    download2 (data) {
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
    //编辑或添加
    open: function (data1,data2,data3) {
      //点击加号展示空窗
      if(data1==1&&data2==2){
         this.show = true
         this.mask = true
         changefromheaderson1.innerHTML = data3
      }else {
      //点击编辑展示发送请求的框
         //正则开关为true
         this.namecontrol=true,         //户名校验开关
         this.bankcontrol=true,         //开户行校验开关
         this.accountcontrol=true,      //账号校验开关
         this.taxnumbercontrol=true,    //纳税人号校验开关
         this.addresscontrol=true,      //地址校验开关
         this.telNumbercontrol=true,    //手机号校验开关
         this.bankNumcontrol=true,
         //弹窗 遮罩层打开
         this.show = true
         this.mask = true
         changefromheaderson1.innerHTML = data3
         //发送请求获取此id的值s
         console.log(data1,data2)
         //传的参数
         var obj = data2
         console.log(obj.fdObjecid)
         var url ="/api-eva/invoice/getEvaInvoiceById"
         let data = {fdObjectid:obj.fdObjecid}
         this.$axios.post(url,data).then(res=>{
            if(res.data.code==200){
              //成功获取数据
              console.log(res.data.resultData);
              //把数据交给弹窗
              this.receiptdata=res.data.resultData
            }
         })
      }
    },
    //删除
    deleste(data0,data1) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var obj = data1
            console.log(obj)
            console.log(obj.fdObjecid)
            var url = "/api-eva/invoice/delete"
            let data  = { "fdObjectid":obj.fdObjecid}
            this.$axios.post(url,data).then(res=>{
              console.log(res)
              //删除成功
              if(res.status==200){
                this.open4()
                this.search()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //关闭弹窗
    close () {
      this.show = false
      this.mask = false
      //数据清空
      this.receiptdata = {}
      //输入框警告样式清除
      this.$refs.receiptdata.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.staffForm.resetFields()，去除验证
    },
     //保存提交
    add () {
       //触发inpit的focus事件
        //获取input
        var inputs = document.querySelectorAll("#changefromcontent input")
        for(var input of inputs){
           input.focus()
        }
       //首先满足正则
       if(this.namecontrol==true&&
          this.bankcontrol==true&&
          this.accountcontrol==true&&
          this.taxnumbercontrol==true&&
          this.addresscontrol==true&&
          this.telNumbercontrol==true&&
          this.bankNumcontrol==true){
             //判断添加还是编辑
             if(!this.receiptdata.fdObjecid){
              //添加发送请求
              var url = "/api-eva/invoice/insert"
              this.show = false
              let data = {
                    name:this.receiptdata.name,
                    bank:this.receiptdata.bank,
                    account:this.receiptdata.account,
                    taxpayerNumber: this.receiptdata.taxpayerNumber,
                    address:this.receiptdata.address,
                    telNumber: this.receiptdata.telNumber,
                    bankNum:this.receiptdata.bankNum,
                    note:this.receiptdata.note
              }
              this.$axios.post(url,data).then(res=>{
                console.log(res);
                this.open2()
                this.mask = false
                this.search()
                //清空数据
              })
             } else {
              //编辑
              //添加发送请求
              var url = "/api-eva/invoice/update"
              this.show = false
              let data = {
                   fdObjecid:this.receiptdata.fdObjecid,
                   name:this.receiptdata.name,
                   bank:this.receiptdata.bank,
                   account:this.receiptdata.account,
                   taxpayerNumber: this.receiptdata.taxpayerNumber,
                   address:this.receiptdata.address,
                   telNumber: this.receiptdata.telNumber,
                   bankNum:this.receiptdata.bankNum,
                   note:this.receiptdata.note
              }
              this.$axios.post(url,data).then(res=>{
                console.log(res);
                this.open2()
                this.mask = false
                this.search()
                //清空数据
                this.receiptdata={}
              })
             }
       }else{
          this.open5()
       }

    },
    //这是改头 tableHeaderColor rem默认16px
    tableHeaderColor({row,column,rowIndex,columnIndex}){
      if(rowIndex === 0){return "background-color:#fbfbfb;color:black;font-size:14px;"}
    },
    //这是改主体
    tableRowStyle({row,rowIndex}){
      return "font-size:14px"
    },
    //搜索
    search () {
       this.pageNumber=1
      let data = {  //名字 地址 电话号 当前页码 每页数量
                name: this.username,
                address:this.address,
                telNumber:this.phonename,
                pageNumber:this.pageNumber,
                limit:this.limit,
      }
      var url = "/api-eva/invoice/pageList"
      this.$axios.post(url,data).then(res=>{
                console.log(res.data.resultData)
                if(res.data.code==200){
                    //获取总页数
                    this.total=res.data.resultData.total
                    //获取单页的数据
                    this.tableData=res.data.resultData.rows
                    //
                }
      })
    },
    //分页事件
    handleCurrentChange () {
       let data = {  //名字 地址 电话号 当前页码 每页数量
                name: this.username,
                address:this.address,
                telNumber:this.phonename,
                pageNumber:this.pageNumber,
                limit:this.limit,
      }
      var url = "/api-eva/invoice/pageList"
      this.$axios.post(url,data).then(res=>{
                console.log(res.data.resultData)
                if(res.data.code==200){
                    //总页数
                    this.total=res.data.resultData.total
                    //单页的数据
                    this.tableData=res.data.resultData.rows
                }
      })
    },
    //重置 值为空
    reset () {
      this.pageNumber=1
      this.username="";this.address="";this.phonename="";
      this.search()
    },


  }
}
</script>
<style scoped>
/*input样式*/
.grid-content-left{
  text-align: right;
}
/*查询栏两个按钮*/
#offset{
  margin-left:15%;
}
.userbtn1{
  height:2rem;
  line-height:0;
  width:5rem;
  margin-right:0%;
  margin-top:20px;
}
.userbtn2{
  height:2rem;
  line-height:0;
  width:5rem;
  margin-right:0%;
  margin-top:20px;
}
/*主体内容*/
#content{
  width: 100%;
  height:100%;
  padding:2%;
}

/*按钮里面图片样式*/
.buttonimg{
  display:inline-block;
  margin-right:2px;
  position: relative;
  top:-3px;
}
/*里面的字体*/
.four{
  display: inline-block;
  margin-left:5px;
  position:relative;
  top:-2px;
}
/*取消按钮*/
.receiptbtn{
  width: 15%;
  height:60%;
}
.notwrap{
  overflow: hidden;
}
.s4{
  display:inline-block;
  color:#03a0fd;
  cursor: pointer;
}
#changefrom{
  width: 50%;
  left: 25%;
}
#changefromcontent{
  margin-top: 20px;
}
.wrapper {
  height: 350px;
  margin-bottom: 15px;
}
#d1,#d2,#d3,#d4,#d5,#d6,#d7,#d8{
  width:45%;
  height:23%;
  font-size:14px;
}
#d1{
   position:absolute;
   top:5%;
   left:0%;
}
#d2{
   position:absolute;
   top:5%;
   left:54%;
}
#d3{
   position:absolute;
   top:20%;
   left:-0.1%;
}
#d4{
   position:absolute;
   top:20%;
   left:50%;
}
#d5{
   position:absolute;
   top:34%;
   left:0%;
}
#d6{
   position:absolute;
   top:33%;
   left:55%;
}
#d7{
   position:absolute;
   top:48%;
   left:0%;
}
#d8{
   position:absolute;
   top:63%;
   left:-6.7%;
}
#textarea{
  border: 1px solid  rgba(241,240,240,0.95);;
  outline:none;
  resize:none;
  width:80%;
  height:90%;
  font-size:20px;
  position:absolute;
  top:10%;
  left:18.5%;
}
#d8{
  width:100%;
  height:30%;
}
#d9{
  display:inline-block;
  width:10%;
  position:absolute;
  top:10%;
  left:9.5%;
}
</style>

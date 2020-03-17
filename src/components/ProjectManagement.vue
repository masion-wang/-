<!--
--- author: zhangpengyi
--- creation time: 2019-07-16
--- module: all administrator pages
--- description: 项目管理 包括所搜 编辑项目信息 上传等
-->
<template>
        <div class="admin">
            <div class="search">
                <div>
                    <div>
                        <span>申请时间</span><select ref="date" @change="thisref">
                            <option v-for="(item,index) of date" :value="item" :key="index">{{item}}</option>
                        </select>
                    </div
                    ><div>
                        <span>项目名称</span><input type="text"  v-model="check.name">
                    </div
                    ><div>
                        <span>委托单位</span><input type="text" v-model="check.company">
                    </div
                    ><div>
                        <span>联系人</span><input type="text" v-model="check.contacts">
                    </div
                    ><div>
                        <span>评价水平</span><select ref="evaL" @change="thisref">
                            <option v-for="(item,index) of evaLevel" :value="item.code" :key="index">{{item.val}}</option>
                        </select>
                    </div
                    ><div>
                        <span>专业技术领域</span
                        ><select ref="certificate"  @change="thisref">
                            <option v-for="(item,index) of technicalField" :value="item.code" :key="index">{{item.val}}</option>
                        </select>
                    </div
                    ><div>
                        <button v-on:click="query">查询</button>
                        <button v-on:click="empty">重置</button>
                    </div>
                </div>
            </div>
            <div class="list bg-w">
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
                        label="序号"
                        min-width="5%">
                        <template slot-scope="scope">
                                <span>{{scope.$index + 1 + (currentPage1 - 1) * 10}} </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="projectName"
                        label="项目名称"
                        min-width="6.66%"
                        >
                        <template slot-scope="scope">
                            <span :title="scope.row.projectName">{{scope.row.projectName}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="applyDept"
                        label="委托单位"
                        min-width="6.66%"
                        >
                        <template slot-scope="scope">
                            <span :title="scope.row.applyDept">{{scope.row.applyDept}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="years"
                        label="申请时间"
                        min-width="6.66%">
                        </el-table-column>
                        <el-table-column
                        prop="linkMan"
                        label="联系人"
                        min-width="6.66%">
                        <template slot-scope="scope">
                            <span :title="scope.row.linkMan">{{scope.row.linkMan}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="userAccount"
                        label="负责人"
                        min-width="6.66%">
                        <template slot-scope="scope">
                            <span :title="scope.row.userAccount">{{scope.row.userAccount}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="evaLevel"
                        label="评价水平"
                        min-width="6.66%">
                        <template slot-scope="scope">
                            <span :title="scope.row.evaLevel">{{scope.row.evaLevel}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="technicalField"
                        label="专业技术领域"
                        min-width="6.66%">
                        <template slot-scope="scope">
                            <span :title="scope.row.technicalField">{{scope.row.technicalField}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="invoiceStatus"
                        label="发票"
                        min-width="6.66%">
                        </el-table-column>
                        <el-table-column
                        prop="contractStatus"
                        label="合同"
                        min-width="6.66%">
                        </el-table-column>
                        <el-table-column
                        prop="paymentStatus"
                        label="到款情况"
                        min-width="6.66%"
                        >
                        <template slot-scope="scope">
                            <p v-if='scope.row.paymentStatus == 0'>否</p>
                            <p v-else-if="scope.row.paymentStatus == 1">是</p>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="newsStatus"
                        label="新闻稿"
                        min-width="6.66%">
                        <template slot-scope="scope">
                            <p v-if='scope.row.newsStatus == 0'>否</p>
                            <p v-else-if="scope.row.newsStatus == 1">是</p>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="awardStatus"
                        label="是否评奖"
                        min-width="6.66%"
                        >
                        <template slot-scope="scope">
                            <p v-if='scope.row.awardStatus == 0'>否</p>
                            <p v-else-if="scope.row.awardStatus == 1">是</p>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="winStatus"
                        label="是否获奖"
                        min-width="6.66%"
                        >
                        <template slot-scope="scope">
                            <p v-if='scope.row.winStatus == 0'>否</p>
                            <p v-else-if="scope.row.winStatus == 1">是</p>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        min-width="6.66%"
                        >
                        <template slot-scope="scope">
                            <p>
                                <a href="javascript:;" v-on:click="handleEdit(scope.$index,scope.row)">编辑</a>
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
             <div class="info" ref="infoBody">
                <div ref="info" class="infoinner">
                    <p @mousedown="move($event)">项目信息 <a href="javascript:;" v-on:click="close"></a></p>
                    <div class="insertzhuanjiadata">
                        <el-form :inline="true" :model="changes" xlass="w-100" label-width="35%" :rules="rules">
                            <!-- 第一行 -->
                            <el-form-item label="项目名称" prop="projectName">
                                <el-input v-model="changes.projectName" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="成果类型"  prop="resultType">
                                <el-input  :value="chengguo.val" :id="chengguo.code"  :disabled="true"></el-input>
                            </el-form-item>
                            <!-- 第二行 -->
                            <el-form-item label="委托单位" prop="applyDept">
                                <el-input v-model="changes.applyDept"></el-input>
                            </el-form-item>
                            <el-form-item label="任务来源"  prop="taskSource" >
                                <el-select  ref="taskSource" v-model="changes.taskSource">
                                    <el-option v-for="(item,index) of taskSource" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <!-- 第三行 -->
                            <el-form-item label="拟评价时间" prop="evaTime">
                                <el-input v-model="changes.evaTime"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人"  prop="linkMan">
                                <el-input v-model="changes.linkMan"></el-input>
                            </el-form-item>
                            <!-- 第四行 -->
                            <el-form-item label="评价水平"  prop="evaLevel">
                                <el-select ref="evaLevel" v-model="changes.evaLevel" >
                                    <el-option v-for="(item,index) of evaLevel" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="评价证书"  prop="certificateStatus">
                                <el-select  ref="certificateStatus"  v-model="changes.certificateStatus">
                                    <el-option v-for="(item,index) of certificateStatus" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <!-- 第五行 -->
                            <el-form-item label="发票"  prop="invoiceStatus">
                                <el-select ref="invoiceStatus" v-model="changes.invoiceStatus">
                                    <el-option v-for="(item,index) of invoiceStatus" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="合同"  prop="contractStatus">
                                <el-select  ref="contractStatus" v-model="changes.contractStatus">
                                    <el-option v-for="(item,index) of contractStatus" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <!-- 第六行 -->
                            <el-form-item label="研究开始时间" prop="researchBeginTime">
                                <el-date-picker v-model="changes.researchBeginTime" type="date"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="手机号"  prop="phoneNumber">
                                <el-input v-model="changes.phoneNumber"></el-input>
                            </el-form-item>
                            <!-- 第七行 -->
                            <el-form-item label="研究结束时间" prop="researchEndTime">
                                <el-date-picker v-model="changes.researchEndTime" type="date"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="微信"  prop="wechat">
                                <el-input v-model="changes.wechat"></el-input>
                            </el-form-item>
                            <!-- 第八行 -->
                            <el-form-item label="评价目的" prop="evaTarget" style="position:relative">
                                
                                <el-select ref="evaTarget" v-model="changes.evaTarget">
                                    <el-option v-for="(item,index) of evaTarget" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="QQ"  prop="qqAccount">
                                <el-input v-model="changes.qqAccount"></el-input>
                            </el-form-item>
                            <!-- 插入行 -->
                            <el-form-item v-if="changes.evaTarget == 5" label="评价目的">
                                <el-input v-model="evaTargettest" style="width:274%"></el-input>
                            </el-form-item>
                            <el-form-item v-if="changes.evaTarget == 5">
                            </el-form-item>
                            <!-- 第九行 -->
                            <el-form-item label="专业技术领域" prop="technicalField">
                                <el-select ref="technicalField"  v-model="changes.technicalField">
                                    <el-option v-for="(item,index) of technicalField" :label="item.val" :key="index" :value="item.code"></el-option>                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="邮箱"  prop="email">
                                <el-input v-model="changes.email"></el-input>
                            </el-form-item>
                            <!-- 第十行 -->
                            <el-form-item label="到款情况">
                                <el-radio-group v-model="changes.paymentStatus">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="新闻稿">
                                <el-radio-group v-model="changes.newsStatus">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 第十一行 -->
                            <el-form-item label="是否评奖">
                                <el-radio-group v-model="changes.awardStatus">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否获奖">
                                <el-radio-group v-model="changes.winStatus">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 第十二行 -->                        
                            <el-form-item label="负责人">
                                <el-input v-model="changes.userAccount" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item>                           
                            </el-form-item>
                            <el-form-item label="评价证书">    
                                <el-input type="text" ref="fileValue" :disabled="true" v-if="fileDel == 0" class="fileValue"></el-input>
                                <a href="javascript:;" v-if="fileDel == 1" @click="filedown">{{changes.projectName + '.Pdf'}}</a>            
                            </el-form-item>
                            <el-form-item>    
                                <input type="file" accept="*.pdf" ref="file" id="file" class="d-none" @change="upload">
                                <input type="button" v-on:click="fileDelete" class="file-button" v-if="fileDel == 1" value="删除">
                                <input type="button" v-on:click="file" class="file-button" v-if="fileDel == 0" value="上传">                       
                            </el-form-item>
                        </el-form>
                        <p class="insertzhuanjiaup">
                            <el-button type="primary" @click="fileUp">保存</el-button>
                            <el-button type="primary" @click="close">取消</el-button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script>
    export default {
        name: "admin",
        data() {
            //验证委托单位
            let applyDeptX = (rule,value,callback)=>{
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
            let evaTimeX = (rule,value,callback)=>{
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
            let linkManX = (rule,value,callback)=>{
                if(value == ""){
                    this.yanz.linkMan = false
                    callback()
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
            let phoneNumberX = (rule,value,callback)=>{
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
            let wechatX = (rule,value,callback)=>{
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
            let qqAccountX = (rule,value,callback)=>{
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
            let emailX = (rule,value,callback)=>{
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
            //验证任务来源
            let taskSourceX = (rule,value,callback)=>{
                console.log(value)
                if(value == ""){
                    this.yanz.taskSource = false
                    callback(new Error("任务来源不能为空"))
                }else{
                    this.yanz.taskSource = true
                    callback()
                }
            }
            //验证专业技术领域
            let technicalFieldX = (rule,value,callback)=>{
                console.log(value)
                if(value == ""){
                    this.yanz.technicalField = false
                    callback(new Error("专业技术领域不能为空"))
                }else{
                    this.yanz.technicalField = true
                    callback()
                }
            }
            //验证评价目的
            let evaTargetX = (rule,value,callback)=>{
                console.log(value)
                if(value == ""){
                    this.yanz.evaTarget = false
                    callback(new Error("评价目的不能为空"))
                }else{
                    this.yanz.evaTarget = true
                    callback()
                }
            }
            return {
                msg: "123123",
                pageCount: 14,
                total: 54,
                currentPage1 : 1,
                check : {
                    name : "",
                    phone : "",
                    contacts : "",
                    date : "",
                    mail : "",
                    company : ""
                },
                yanz:{                    
                    applyDept : true,  //单位
                    evaTime : true,  //拟评价时间
                    linkMan : true,  //联系人
                    phoneNumber : true,  //电话
                    wechat : true,  //微信
                    qqAccount :true,  //QQ
                    email : true,  //邮箱
                    taskSource : true, //任务来源 
                    evaTarget : true, //评价目的
                    technicalField : true //专业技术领域
                },
                date : [],
                tableData: [],
                multipleSelection: [],
                evaLevel : [{code:"",
                    val:"请选择"}],
                certificateStatus : [
                    {code:"",
                    val:"请选择"}
                ],
                evaL : "",
                certificate : "",
                changes : {
                    projectName : "",
                    resultType : "",
                    applyDept : "",
                    taskSource : "",
                    evaTime : "",
                    linkMan : "",
                    evaLevel : "",
                    certificateStatus : "",
                    invoiceStatus : "",
                    contractStatus : "",
                    researchBeginTime : "",
                    phoneNumber : "",
                    researchEndTime : "",
                    wechat : "",
                    evaTarget : "",
                    qqAccount : "",
                    technicalField : "",
                    email : "",
                    paymentStatus : "",
                    newsStatus : "",
                    awardStatus : "",
                    winStatus : "",
                    userAccount : ""
                },
                evaTargettest : "",
                resultType : [{code:"",
                    val:"请选择"}],
                taskSource : [{code:"",
                    val:"请选择"}],
                technicalField : [{code:"",
                    val:"请选择"}],
                invoiceStatus : [{code:"",
                    val:"请选择"}],
                contractStatus : [{code:"",
                    val:"请选择"}],
                evaTarget : [{code:"",
                    val:"请选择"}],
                fileData : "",
                fileDel : 1,
                chengguo : {
                    code : "",
                    val : ""
                },
                rules: {
                    applyDept: [
                        {required:true,validator:applyDeptX,trigger:'change'},
                    ],
                    evaTime: [
                        {required:true,validator:evaTimeX,trigger:'change'},
                    ],
                    linkMan: [
                        {required:true,validator:linkManX,trigger:'change'},
                    ],
                    phoneNumber: [
                        {required:true,validator:phoneNumberX,trigger:'change'},
                    ],
                    wechat: [
                        {validator:wechatX,trigger:'change'},
                    ],
                    qqAccount: [
                        {validator:qqAccountX,trigger:'change'},
                    ],
                    email: [
                        {required:true,validator:emailX,trigger:'change'},
                    ],
                    taskSource : [
                        {required:true,validator:taskSourceX,trigger:'change'},
                    ],
                    technicalField : [
                        {required:true,validator:technicalFieldX,trigger:'change'},
                    ],
                    evaTarget : [
                        {required:true,validator:evaTargetX,trigger:'change'},
                    ],
                }
            }

        },
        created() {
           this.text()
           this.newdate()
           this.listConstant()
            
        },
        computed: {
            newevaTarget(){
                return this.changes.evaTarget;
            }
        },
        watch: {
            newevaTarget(){
                this.evaTargettest = "";
            }
        },
        mounted() {
        },
        methods: {
            //编辑鼠标拖动事件
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
                // 每次执行后清除，鼠标抬起后就固定了
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null
                }

            },
            //下载Pdf
            filedown(){
                if(this.fileData == ""){
                    this.$axios.post("/api-eva/scientific/downCertificate",{
                        "scientificId":this.$refs.infoBody.id
                    }).then(req => {
                        console.log(req)
                    })
                }else{
                    this.open("提交完毕后才可下载","提示")
                }
            },
            //pdf删除
            fileDelete(){ 
                if(this.fileData == ""){        
                    this.$axios.post("/api-eva/scientific/deleteCertificate",{
                        "scientificId":this.$refs.infoBody.id
                    }).then(req => {
                        console.log(req)
                        if(req.data.code == 200){
                            this.fileData = "";
                            this.fileDel = 0
                            this.open("证书删除成功","提示")
                        }else{
                            this.open("证书删除失败","提示")
                        }
                    })
                }else{
                    this.fileData = "";
                    this.fileDel = 0
                }
            },
            //修改上传
            fileUp(){
                
                if(this.changes.applyDept == ""){
                    this.open("委托单位不能为空","提示")
                    return
                }
                if(!this.yanz.applyDept){
                    this.open("委托单位信息有误","提示")
                    return
                }
                if(this.changes.evaTime == ""){
                    this.open("拟评价时间不能为空","提示")
                    return
                }
                if(!this.yanz.evaTime){
                    this.open("拟评价时间信息有误","提示")
                    return
                }
                if (!this.changes.taskSource && typeof(this.changes.taskSource)!="undefined" && this.changes.taskSource!=0){
                    this.open("任务来源不能为空","提示")    
                    return
                }
                if(this.changes.taskSource == ""){
                    this.open("任务来源不能为空","提示")
                    return
                }
                if(!this.yanz.taskSource){
                    this.open("任务来源不能为空","提示")
                    return
                }
                if(this.changes.linkMan == ""){
                    this.open("联系人不能为空","提示")
                    return
                }
                if(!this.yanz.linkMan){
                    this.open("联系人信息有误","提示")
                    return
                }
                if(this.changes.phoneNumber == ""){
                    this.open("手机号不能为空","提示")
                    return
                }
                if(!this.yanz.phoneNumber){
                    this.open("手机号信息有误","提示")
                    return
                }
                if(this.changes.email == ""){
                    this.open("邮箱不能为空","提示")
                    return
                }
                if(!this.yanz.email){
                    this.open("邮箱信息有误","提示")
                    return
                }
                if (!this.changes.technicalField && typeof(this.changes.technicalField)!="undefined" && this.changes.technicalField!=0){
                    this.open("专业技术领域不能为空","提示")
                    return
                }
                if(this.changes.technicalField == ""){
                    this.open("专业技术领域不能为空","提示")
                    return
                }
                if(!this.yanz.technicalField){
                    this.open("专业技术领域不能为空","提示")
                    return
                }
                if(this.changes.evaTarget == ""){
                    this.open("评价目的不能为空","提示")
                    return
                }
                if (!this.changes.evaTarget && typeof(this.changes.evaTarget)!="undefined" && this.changes.evaTarget!=0){
                    this.open("评价目的不能为空","提示")
                    return
                }
                if(!this.yanz.evaTarget){
                    this.open("评价目的不能为空","提示")
                    return
                }
                console.log(this.changes.evaTarget)
                if(this.changes.wechat == "" && this.changes.qqAccount == ""){
                    this.open("微信或QQ必须填写一项","提示")
                    return
                }
                if(this.changes.evaTarget == 5){
                    if(this.evaTargettest.length > 50){
                        this.open("评价目的长度不能超过50个字符","提示")
                        return
                    }else if(this.evaTargettest == ""){
                        this.open("评价目的不能为空","提示")
                        return
                    }
                }
                console.log(this.changes.evaTarget)
                var fd = new FormData()
                // fd.append('sourceFile', this.fileData)
                fd.append('fdObjectid', this.$refs.infoBody.id)//
                fd.append('projectName', this.changes.projectName)//
                fd.append('resultType', this.chengguo.code)//
                fd.append('applyDept', this.changes.applyDept)//
                fd.append('taskSource', this.changes.taskSource)//
                fd.append('evaTime', this.changes.evaTime)//
                fd.append('linkMan', this.changes.linkMan)//
                fd.append('evaLevel', this.changes.evaLevel)//
                fd.append('certificateStatus', this.changes.certificateStatus)//
                fd.append('invoiceStatus', this.changes.invoiceStatus)//
                fd.append('contractStatus', this.changes.contractStatus)//
                fd.append('researchBeginTime', this.changes.researchBeginTime)//
                fd.append('phoneNumber', this.changes.phoneNumber)//
                fd.append('researchEndTime', this.changes.researchEndTime)//
                fd.append('wechat', this.changes.wechat)//
                fd.append('evaTarget', this.changes.evaTarget)//
                fd.append('qqAccount', this.changes.qqAccount)//
                fd.append('technicalField', this.changes.technicalField)//
                fd.append('email', this.changes.email)
                fd.append('paymentStatus', this.changes.paymentStatus)
                fd.append('newsStatus', this.changes.newsStatus)
                fd.append('awardStatus', this.changes.awardStatus)
                fd.append('winStatus', this.changes.winStatus)
                fd.append('userAccount', this.changes.userAccount)                
                if(this.changes.evaTarget == 5){
                    fd.append('otherEvaTarget', this.evaTargettest)
                }
                if (this.fileData !== ""){   
                    fd.append('sourceFile', this.fileData) //          
                }                 
                let config = {
                    headers: {
                         'Content-Type': 'multipart/form-data'
                    }
                }
                this.$axios.post("/api-eva/scientific/managePageUpdate",fd,config).then(req => {
                    if(req.data.code == 200){
                        this.open("保存成功","提示")
                        this.$refs.infoBody.style.display = "none"
                        this.currentPage1 = 1
                        this.evaPageList()

                    }else{
                        this.open(req.data.msg,"提示")
                    }
                }) 
                
            },
            //函数请求
            thisref(){
                this.evaL = this.$refs.evaL.value
                this.certificate = this.$refs.certificate.value
                this.check.date = this.$refs.date.value
            },
            //提示弹框
            open(test,title) {
                this.$alert(test, title, {
                    confirmButtonText: '确定',
                });
            },
            //获取常量
            listConstant(){
                this.$axios.post("/api-eva/constant/listConstant",[
                    "evaLevel",//评价水平
                    "certificateStatus",//评价证书
                    "resultType",//成果类型
                    "taskSource",//任务来源
                    "technicalField",//专业技术领域
                    "invoiceStatus",//发票
                    "contractStatus",//合同
                    "evaTarget"//评价目的
                ]).then(req => {
                    console.log(req.data)
                    let certificateStatus = req.data.resultData.certificateStatus
                    let evaLevel = req.data.resultData.evaLevel
                    let resultType = req.data.resultData.resultType
                    let taskSource = req.data.resultData.taskSource
                    let technicalField = req.data.resultData.technicalField
                    let invoiceStatus = req.data.resultData.invoiceStatus
                    let contractStatus = req.data.resultData.contractStatus
                    let evaTarget = req.data.resultData.evaTarget
                    //评价水平
                    for(let i=0;i<certificateStatus.length;i++){
                        let obj = {};
                        obj.code = certificateStatus[i].constantCode
                        obj.val = certificateStatus[i].constantValue
                        this.certificateStatus.push(obj)
                    }
                    //评价证书
                    for(let n=0;n<evaLevel.length;n++){
                        let objk = {};
                        objk.code = evaLevel[n].constantCode
                        objk.val = evaLevel[n].constantValue
                        this.evaLevel.push(objk)
                    }
                    //成果类型
                    for(let i=0;i<resultType.length;i++){
                        let obj = {};
                        obj.code = resultType[i].constantCode
                        obj.val = resultType[i].constantValue
                        this.resultType.push(obj)
                    }
                    //任务来源
                    for(let i=0;i<taskSource.length;i++){
                        let obj = {};
                        obj.code = taskSource[i].constantCode
                        obj.val = taskSource[i].constantValue
                        this.taskSource.push(obj)
                    }
                    //专业技术领域
                    for(let i=0;i<technicalField.length;i++){
                        let obj = {};
                        obj.code = technicalField[i].constantCode
                        obj.val = technicalField[i].constantValue
                        this.technicalField.push(obj)
                    }
                    //发票
                    for(let i=0;i<invoiceStatus.length;i++){
                        let obj = {};
                        obj.code = invoiceStatus[i].constantCode
                        obj.val = invoiceStatus[i].constantValue
                        this.invoiceStatus.push(obj)
                    }
                    //合同
                    for(let i=0;i<contractStatus.length;i++){
                        let obj = {};
                        obj.code = contractStatus[i].constantCode
                        obj.val = contractStatus[i].constantValue
                        this.contractStatus.push(obj)
                    }
                    //评价目的
                    console.log(evaTarget)
                    for(let i=0;i<evaTarget.length;i++){
                        let obj = {};
                        obj.code = evaTarget[i].constantCode
                        obj.val = evaTarget[i].constantValue
                        this.evaTarget.push(obj)
                    }
                })
            },
            //获取时间
            newdate(){

                let date = new Date()
                this.check.date = date.getFullYear()
                for(let i=0;i<10;i++){
                    this.date.push((date.getFullYear() - i).toString())
                }
                this.evaPageList()
            },
            //分页查询
            evaPageList(){
                let date = new Date();
                if(this.check.date == ""){
                    date = date.getFullYear()
                }else(
                    date = this.check.date
                )
                console.log(this.evaL)
                console.log(1)
                this.$axios.post("/api-eva/scientific/managePageList",{
                    "years": date,
                    "projectName": this.check.name,
                    "applyDept": this.check.company,
                    "linkMan": this.check.contacts,
                    "evaLevel": this.evaL,
                    "technicalField": this.certificate,
                    "pageNumber":this.currentPage1,
                    "limit": 10
                }).then(req => {                   
                    let data = req.data.resultData.rows 
                    console.log(req.data)
                    if(req.data.code ==200){
                        this.tableData = []
                        this.pageCount = req.data.resultData.pages
                        this.total = req.data.resultData.total
                        for(let i =0;i<data.length;i++){
                            let obj = {}
                            obj.fdObjectid = data[i].fdObjectid//id
                            obj.projectName = data[i].projectName//项目名称
                            obj.applyDept = data[i].applyDept//申报单位
                            obj.linkMan = data[i].linkMan//联系人
                            obj.userAccount = data[i].userAccount//负责人
                            obj.years = data[i].years//没有备注
                            obj.evaLevel = data[i].evaLevel//评价水平
                            obj.technicalField = data[i].technicalField//专业技术领域
                            obj.invoiceStatus = data[i].invoiceStatus//发票
                            obj.contractStatus = data[i].contractStatus//合同
                            obj.paymentStatus = data[i].paymentStatus//到款情况
                            obj.newsStatus = data[i].newsStatus//新闻稿
                            obj.awardStatus = data[i].awardStatus//是否评奖
                            obj.winStatus = data[i].winStatus//是否获奖
                            this.tableData.push(obj)
                        }
                        
                    }else{
                        this.open(req.data.msg,"提示")
                    }
                   
                })
            },
            close(){
                this.$refs.infoBody.style.display = "none"
                this.fileData = ""
            },
            file(){
                let file = document.getElementById("file")
                file.click()
            },
            //上传文件
            upload(){
                //首先获取文件
                var file = document.querySelector("#file")
                //发送请求
                // var url = "/api-eva/invoice/insertByExcel"
                 this.fileData = file.files[0]
                 if(this.fileData == ""){
                     this.fileDel = 0
                 }else{
                     this.fileDel = 1
                 }
                },
            query(){
                this.currentPage1 = 1
                this.evaPageList()
            },
            empty(){
                this.$refs.date.value= 2019;
                this.check.name = "";
                this.check.contacts = "";
                this.check.company = "";
                this.$refs.evaL.value = "";
                this.$refs.certificate.value = "";
                this.query()
            },
            jump(){
                let numReg = /^[0-9]+$/
                let page = parseInt(this.$refs.jump.value)
                if(numReg.test(page) && page > 0){
                    this.currentPage1 = page
                    if(this.currentPage1 <= parseInt(this.pageCount)){    
                    console.log("发送请求")
                    }else{
                    this.currentPage1 = this.pageCount
                    }
                }
            },
            handleCurrentChange(){
                console.log(123)
            },
            tableHeaderColor({row,column,rowIndex,columnIndex}){
                if(rowIndex ===0){return "background-color:#fbfbfb;color:#000;font-size:0.9rem;"}      
                },
                tableRowStyle({row,rowIndex}){
                return "font-size:1rem"
            },
            //数据编辑
            handleEdit(index, row) {
                this.$refs.infoBody.id = row.fdObjectid
                this.$axios.post("/api-eva/scientific/checkCertificate",{
                    "scientificId" : this.$refs.infoBody.id
                }).then(req => {
                    if(req.data.code == 30007){
                        this.fileDel = 1
                    }
                    if(req.data.code == 11009){
                        this.fileDel = 0
                    }
                })
                let bwidth = document.body.clientWidth;
                let bheight = document.body.offsetHeight;
                this.$axios.post("/api-eva/scientific/getByPrimaryKey",{
                    "scientificId" : this.$refs.infoBody.id
                }).then(req => {
                    console.log(req)
                    let data = req.data.resultData
                    if(req.data.code == 200){
                        console.log(data)
                        console.log(this.resultType)
                        this.changes.projectName = data.projectName
                        this.changes.applyDept = data.applyDept
                        this.changes.linkMan = data.linkMan
                        this.changes.wechat = data.wechat
                        this.changes.qqAccount = data.qqAccount
                        this.changes.phoneNumber = data.phoneNumber
                        this.changes.email = data.email
                        this.changes.researchBeginTime = data.researchBeginTime
                        this.changes.researchEndTime = data.researchEndTime
                        this.changes.evaTime = data.evaTime
                        this.changes.evaTarget = data.evaTarget
                        this.changes.resultType = data.resultType
                        this.changes.taskSource = data.taskSource
                        this.changes.technicalField = data.technicalField
                        this.changes.evaLevel = data.evaLevel
                        this.changes.certificateStatus = data.certificateStatus
                        this.changes.invoiceStatus = data.invoiceStatus
                        this.changes.contractStatus = data.contractStatus
                        this.changes.paymentStatus = data.paymentStatus
                        this.changes.newsStatus = data.newsStatus
                        this.changes.awardStatus = data.awardStatus
                        this.changes.winStatus = data.winStatus
                        this.$refs.infoBody.style.display = "block"
                        for(let i = 0; i<this.resultType.length;i++){
                            if(this.resultType[i].code == this.changes.resultType){
                                this.chengguo.code = this.resultType[i].code
                                this.chengguo.val = this.resultType[i].val
                            }
                        }
                        if(bwidth >= this.$refs.info.clientWidth){
                        this.$refs.info.style.left = ((bwidth / 2) - (this.$refs.info.clientWidth /2)) + "px"
                        }else{
                            this.$refs.info.style.left = "0"
                        }
                        if(bheight >= this.$refs.info.offsetHeight){
                            this.$refs.info.style.top = ((bheight / 2) - (this.$refs.info.offsetHeight /2)) + "px"
                        }else{
                            this.$refs.info.style.top = 0
                        }
                    }else{
                        this.open(req.data.msg,"提示")    
                    }
                    
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection.length !== 0){
                  console.log(this.$refs.multipleTable)
                }else{
                    console.log(this.$refs.multipleTable)
                }
            },
            text(){
                console.log("hello")
            }
        },
    }
    </script>
    <style>
        .admin .el-table .cell,
        .admin .el-table__row td .cell {
            white-space: nowrap !important;
        }
        .admin .el-table{
            min-height:538px;
        }
        .admin a{
            text-decoration: none;
        }
        .admin{
            width:100%;
            background: #eee;
            font-family: Microsoft YaHei;
        }
        .admin .list{
            width:98%;
            margin:0 auto;
            margin-top:2rem;
            padding-left:2%;
            padding-right:2%;
            padding-top:2%;
            box-sizing:border-box;
        }
        .admin .list a{
            color:#03a0fd;
        }
        .admin .d-none{
            display:none;
        }
        .admin .search{
            width:100%;
            padding:0.5rem 2%;
            box-sizing:border-box;
            background: #fff;
        }
        .admin .search>div{
            width:100%;
            margin-bottom: 1rem;
        }
        .admin .search>div>div{
            width:14.28%;
            font-size:1.1rem;
            display :inline-block;
            white-space: nowrap;
        }
        .admin .search>div>div:last-child{
            text-align: right;
        }
        .admin .search div>input,.search div>select{
            width:50%;
            border-radius: 5px;
            border:1px solid #eee;
            background: #fbfbfb;
            outline: none;
            margin-left:5%;
            height:2rem;
            box-sizing: border-box;
        }
        .admin .search div>button{
            display: inline-block;
            width:40%;
            height:2rem;
            border:none;
            background: #02a2f8;
            color:#fff;
            text-align: center;
            border-radius: 3px;
        }
        .admin .d-ilblock{
            display: inline-block;
        }
        .admin .v-middle{
            vertical-align: middle;
        }
        .admin .w-100{
            width:100%;
        }
        .admin .bg-w{
            background: #fff;
        }
        .admin .fl-lt{
            float:left;
        }
        .admin .fl-rt{
            float:right;
        }
        .admin .xiala{
            width:14px;
            height:14px;
            background-image:url("../assets/img/index/xiala.png");
            background-position: 50% 50%;
            background-size: 100% 100%;
        }
        .admin .top{
            padding:0 2%;
            box-sizing:border-box;
        }
        .admin .top img{
            border-radius: 50%;
            width:2.5rem;
            height:2.5rem;
        }
        .admin .top>p:first-child{
            color:#2993ff;
            line-height:2.5rem;
        }
        .admin .top>p:last-child{
            line-height:2.5rem;
        }
        .admin .top::after{
            content:"";
            display: block;
            clear: both;
        }
        .admin .paging{
            font-size:1rem;
            position: relative;
            top:0.3rem;
        }
        .admin .jump>input{
            display: inline-block;
            width:10%;
            height:1.37rem;
            background:#f4f4f5;
            border-radius: 3px;
            border:1px solid #efefef;
            position:relative;
            top:-0.1rem;
            outline:none;
            text-align:center;
            
        }
        .admin .page-count .fenpei-button{
            height:30px;
            width:30%;
            line-height:30px;
            text-align:center;
            background:#02a2f8;
            color:#fff;
            border-radius:5px;
        }
        .admin .page-count{
            text-align: right;
            background: #fff;
        }
        .admin .info{
            display:none;
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            border:1px solid #f00;
            z-index:1;
            background:rgba(150,150,150,0.3)
        }
        .admin .info>div{
            width:50rem;
            background:#fff;
            position: absolute;
            top:0;
            left:0;
            font-size:1rem;
            border-radius:0.3rem;
            overflow: hidden;
        }
        .admin .info>div>p{
            text-align:left;
            padding:15px 15px 10px;
            font-size:18px;
            color:#000;
            background:#fff;
        }  
        .admin .info>div>p>a{
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
        .admin .info table>tr>td{
            width:15%;
        }
        .admin .info .danxuan{
            max-width:25%;
            height:0.8rem;
        }
        .admin .info .file-button{
            width:6rem;
            box-sizing:border-box;
            margin-left:2%;
            height:34px;
            outline: none;
            background:#fff;
            border:1px solid #efefef;
            border-radius:3px;
        }
        .admin .info .button{
            width:100%;
            background:#03a0fd;
            height:1.75rem;
            border:none;
            outline:none;
            border-radius:0.2rem;
            color:#fff;
        }
        .admin .info b{
            padding-left:0.6rem;
        }
        .admin .el-form-item{
            width:45%;
            box-sizing:border-box;
        }
        .admin .insertzhuanjiadata{
            height:40rem;
            overflow: auto;
            padding-bottom:1.5rem
        } 
        .admin .el-form-item>div{
            width:60%;
        }
        .admin .el-form-item>div>div{
            width:100%;
        }
        .admin .el-form-item>div input{
            box-sizing:border-box;
            width:100%;
            height:34px;
        }
        .admin .el-form-item .fileValue{
            width:170%;
        }
    </style>
<!--
--- author: zhangpengyi
--- creation time: 2019-07-16
--- module: all administrator pages
--- description: 账号管理 包括基本信息设置 密码 手机 邮箱修改
-->
<template>
    <div class="AccountSettings" ref="AccountSettings">
        <div class="centered" ref="centered">
            <img src="../assets/img/index/title.png" alt="">
            <div class="listbody ">
                <p class="list-title"><span>账号设置</span><button class="bjbutton" @click="edit('query')">编辑</button></p>
                <div class="t-left w-100 list-cont">
                    <div class="d-ilblock t-left list-left ">
                        <p>姓名:</p>
                        <p>性别:</p>
                        <p>QQ:</p>
                    </div>
                    <div class="d-ilblock t-list list-right">
                        <p class="col-e">{{query.name}}</p>
                        <p class="col-e">
                            <span v-if="query.sex == 'MALE'">男</span>
                            <span v-else-if="query.sex == 'FEMALE'">女</span>
                        </p>
                        <p class="col-e">{{query.qq}}</p>
                    </div>
                </div>
                <p class="list-title"><span>高级设置</span></p>
                <div class="t-left w-100 list-cont">
                        <div class="d-ilblock t-left list-left">
                            <p>密码:</p>
                            <p>邮箱:</p>
                            <p>手机号:</p>
                        </div>
                        <div class="d-ilblock t-list list-right">
                            <p class="col-e">******<a href="javascript:;" class="list-edit" @click="edit('password')">编辑</a></p>
                            <p class="col-e">
                                {{query.mail}}<a href="javascript:;" class="list-edit" @click="edit('mail')">编辑</a>
                            </p>
                            <p class="col-e">{{query.phoneM}}<a href="javascript:;" class="list-edit" @click="edit('phone')">编辑</a></p>
                        </div>
                    </div>
                    <p class="t-right">
                        <button class="list-button list-button-left" @click="ondown">保存并关闭</button>
                    </p>
                    
            </div>
        </div>
        <div class="phonechange" ref="phone">
            <div ref="phonedata">
                <p class="phonechange-title">
                    修改手机号
                    <a href="javscript:;" class="fl-rt" @click="close('phone')">x</a>
                </p>
                <div class="phonechange-list">
                    <div class="d-ilblock phonechange-list-1">
                        <p>原手机号:</p>
                        <p>短信验证码:</p>
                        <p>新手机号</p>
                        <p>&nbsp;</p>
                    </div
                    ><div class="d-ilblock phonechange-list-2">
                        <p>{{query.phoneM}}</p>
                        <p><input type="text" ref="phoneCode"> </p>
                        <p><input type="text" @blur="newphone" ref="newphone"> </p>
                        <p><button class="list2-button" @click="phoneup">保存</button></p>
                    </div
                    ><div class="d-ilblock phonechange-list-3">
                        <p>&nbsp;</p>
                        <p><button class="list3-button" v-if="verification == 0" @click="phoneins">发送验证码</button><button class="list3-button" v-if="verification > 0"><nobr>{{verification}}s后再次发送</nobr></button></p>
                        <p class="yanzheng" ref='phoneyanzheng'>手机号格式不正确</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="phonechange" ref="mail">
            <div ref="maildata">
                <p class="phonechange-title">
                            修改邮箱
                    <a href="javscript:;" class="fl-rt" @click="close('mail')">x</a>
                </p>
                <div class="phonechange-list">
                        <div class="d-ilblock phonechange-list-1">
                            <p>原邮箱号:</p>
                            <p>邮箱验证码:</p>
                            <p>新邮箱号</p>
                            <p>&nbsp;</p>
                        </div
                        ><div class="d-ilblock phonechange-list-2">
                            <p>{{query.mail}}</p>
                            <p><input type="text" ref="mailCode"> </p>
                            <p><input type="text" @blur="newmail" ref="newmail"> </p>
                            <p><button class="list2-button" @click="mailup">保存</button></p>
                        </div
                        ><div class="d-ilblock phonechange-list-3">
                            <p>&nbsp;</p>
                            <p><button class="list3-button" v-if="verifmailication == 0" @click="mailins">发送验证码</button><button class="list3-button" v-if="verifmailication > 0"><nobr>{{verifmailication}}s后再次发送</nobr></button></p>
                            <p class="yanzheng" ref='mailyanzheng'>手机号格式不正确</p>
                            <p>&nbsp;</p>
                        </div>
                    </div>
            </div>
        </div>
        <div class="phonechange" ref="password">
            <div ref="passworddata">
                <p class="phonechange-title">
                            修改密码
                    <a href="javscript:;" class="fl-rt" @click="close('password')">x</a>
                </p>
                <div class="phonechange-data">
                <el-form ref="pwd" :model="pwd"  :rules="addRules" label-width="25%" size="small" >
                    <el-form-item  label='旧密码' size="small" class="wid" prop="password1" ref="password1">
                        <el-input v-model="pwd.password1" type="password" ></el-input>
                    </el-form-item>
                    <el-form-item  label='新密码' size="small" class="wid" prop="password2" ref="password1">
                        <el-input v-model="pwd.password2" type="password" ></el-input>
                    </el-form-item>
                    <el-form-item  label='确认密码' size="small" class="wid" prop="password3" ref="password1">
                        <el-input v-model="pwd.password3" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="wid">
                        <el-button  type="primary" @click="passwordup">保存</el-button>
                        <el-button @click="close('password')">取消</el-button>
                    </el-form-item>
                </el-form>
               </div>
            </div>
        </div>
        <div class="phonechange" ref="query">
            <div ref="querylsit">
                <p class="phonechange-title">
                            修改基本信息
                    <a href="javscript:;" class="fl-rt" @click="close('query')">x</a>
                </p>
                <div class="phonechange-data">
                <el-form ref="querydata" :model="querydata"  :rules="addord" label-width="25%" size="small">
                    <el-form-item  label='姓名' size="small" class="wid" prop="name">
                        <el-input v-model="querydata.name"></el-input>
                    </el-form-item>
                    <el-form-item  label='性别' size="small" class="wid" >
                        <el-radio-group v-model="querydata.sex" class="widradio">
                            <el-radio label="MALE">男</el-radio>
                            <el-radio label="FEMALE">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item  label='QQ' size="small" class="wid" prop="qq">
                        <el-input v-model="querydata.qq"></el-input>
                    </el-form-item>
                    <el-form-item class="wid">
                        <el-button  type="primary" @click="queryup">保存</el-button>
                        <el-button @click="close('query')">取消</el-button>
                    </el-form-item>
                </el-form>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name : "AccountSettings",    
    data(){
        let password1 = (rule,value,callback)=>{
            let pwdreg = /^[0-9a-zA-Z]{6,21}$/
            if(pwdreg.test(value)){
                if(rule.field == "password1"){
                    this.ispass1 = true
                }
                if(rule.field == "password2"){
                    this.ispass2 = true
                }
                if(rule.field == "password3"){
                    this.ispass3 = true
                    if(value == this.pwd.password2){
                    this.ispass = true
                    }else{
                        this.ispass = false
                        callback(new Error("密码必须一致"))
                    }
                }
                callback()
            }else{
                callback(new Error("密码格式有误，6-21位数组字母组合"))
                if(rule.field == "password1"){
                    this.ispass1 = false
                }
                if(rule.field == "password2"){
                    this.ispass2 = false
                }
                if(rule.field == "password3"){
                    this.ispass3 = false
                }
            }
        }
        let judgeqq = (rule,value,callback)=>{
            let qqreg = /^\d{6,20}$/
            if(qqreg.test(value)){
                this.isqq = true
                callback()
            }else{
                this.isqq = false
                callback(new Error("QQ格式有误"))
            }
        }
        return {
            query:{
                name : "",
                sex : 1 ,
                qq : "",
                mail : "",
                phone : "",
                phoneM : ""
            },
            querydata : {
                name : "",
                sex : "",
                qq : "",
            },
            pwd : {
                password1 : "",
                password2 : "",
                password3 : "",
            },
            verification : 0,
            verifmailication : 0,
            ispass : false,//验证密码是否重复
            ispass1 : false,//验证旧密码
            ispass2 : false,//验证新密码
            ispass3 : false,//验证确认密码
            ismail : false,//验证邮箱
            isphone : false, //验证手机号
            isname : false, //验证姓名
            isqq : false, //验证QQ
            issex : false,
            addRules : {
                password1 : 
                    {validator:password1,trigger:'blur'},
                 
                password2 : 
                    {validator:password1,trigger:'blur'},
                 
                 password3 : 
                    {validator:password1,trigger:'blur'},
                 
            },
            addord : {
                name : [
                    { required: true, message: '请输入姓名', trigger: 'change' },
                 ],
                 qq : [
                    { required: true, message: '请输入QQ', trigger: 'blur' },
                    {validator:judgeqq,trigger:'change'},
                 ],
            }
        }
    },
    created() {
       //this.token()
       this.information()
    },
    methods:{
        //基本信息提交
        queryup(){
            if(this.querydata.name == ""){
                this.open("姓名不能为空","错误提醒")
                return
            }
            if(this.querydata.sex == ""){
                this.open("性别不能为空","错误提醒")
                return
            }
            if(this.querydata.qq == ""){
                this.open("QQ不能为空","错误提醒")
                return
            }
            if(!this.isqq){
                this.open("QQ格式有误","错误提醒")
                return
            }
            if(!this.issex){
                this.open("性别必须选中","错误提醒")
                return
            }
            this.$refs.query.style.display = "none"
            this.$axios.post("/api-eva/evaUser/userChangeUser",{
                "userName": this.querydata.name,
                "userSex": this.querydata.sex,
                "extendQqAccount": this.querydata.qq
            }).then(req => {
                this.information()
            })
        },
        //关闭当前页面
        ondown(){
            window.opener=null;window.close()
        },
        //密码提交
        passwordup(){
            if(!this.ispass1){
                this.open("原始密码格式有误","错误提醒")
                return
            }
            if(!this.ispass2){
                this.open("新密码格式有误","错误提醒")
                return
            }
            if(!this.ispass3){
                this.open("确认密码格式有误","错误提醒")
                return
            }
            if(!this.ispass){
                this.open("两次密码不同","错误提醒")
                return
            }
            this.$refs.password.style.display = "none"
            this.$axios.post("/api-eva/evaUser/userChangePSW",{
                "userOldPwd": this.pwd.password1,
	            "userNewPwd": this.pwd.password2
            }).then(req => {
                if(req.data.code == 200){
                    this.open("密码修改成功","提示")
                    localStorage.setItem("hsst-token","")
                    this.$router.push("/login")

                }else{
                    this.open(req.data.msg,"提示")
                }
            })
        },
        //错误弹出提示框，形参一：内容，形参二：标题
         open(test,title) {
            this.$alert(test, title, {
            confirmButtonText: '确定',
            });
        },
        //邮箱验证
        newmail(){       
            if(this.$refs.newmail.length > 50){
                this.$refs.newmail.length = 50
            }   
            let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
            if(reg.test(this.$refs.newmail.value)){
                this.ismail = true
                this.$refs.mailyanzheng.style.visibility = "hidden"
            }else{
                this.ismail = false
                this.$refs.mailyanzheng.style.visibility = "visible"
            }
        },
        //邮箱修改提交
        mailup(){
             if(this.$refs.mailCode.value == ""){
                     this.open("邮箱验证码不能为空","提示")
                     return
                }
              if(this.$refs.newmail.value == ""){
                  this.open("邮箱不能为空","提示")
                    return
              }
              if(!this.ismail){
                     this.open("邮箱格式有误","提示")
                     return
                }
                this.$refs.mail.style.display = "none"
            this.$axios.post("/api-eva/evaUser/userChangeEmail",{
                "oldEmail": this.query.mail,//旧邮箱
                "newEmail": this.$refs.newmail.value,//新邮箱
                "emailCode": this.$refs.mailCode.value//验证码
            })
        },
        //手机号的验证
        newphone(){
            let reg = /^1[3456789]\d{9}$/
            if(reg.test(this.$refs.newphone.value)){
                this.$refs.phoneyanzheng.style.visibility = 'hidden'
                this.isphone = true
            }else{
                this.$refs.phoneyanzheng.style.visibility = 'visible'
                this.isphone = false
            }
        },
        //修改手机号提交
        phoneup(){
                    this.$refs.phone.style.display = "none"
                if(!this.isphone){
                     this.open("手机号格式有误","提示")
                     return
                }
                if(this.$refs.phoneCode.value == ""){
                     this.open("手机验证码不能为空","提示")
                     return
                }
                this.$axios.post("/api-eva/evaUser/userChangeMobile",{
                    "oldPhone": this.query.phone,
                    "newPhone": this.$refs.newphone.value,
                    "phoneCode":this.$refs.phoneCode.value
                }).then(req => {
                    if(req.data.code == 200){
                        this.open("修改成功","提示")
                        this.information()
                    }else{
                        this.open(req.data.msg,"提示")
                    }
                })
            
        },
        //手机验证码设置
        phoneins(){
            this.verification = 500
            this.timer()
             this.$axios.post("/api-eva/message/updateMobile",{
                 "phoneNumber":this.query.phone
             }).then(req => {
             })
            
        },
        //邮箱发送验证码
        mailins(){
            this.verifmailication = 300
            this.timermail()
            this.$axios.post("/api-eva/message/updateEmail",{
                "email":this.query.mail
            }).then(req => {
                console.log(req)
            })
        },
        //手机号的验证码计时
        timer(){ 
            return setInterval(() => {                
                if(this.verification > 0){                   
                    this.verification--
                }else{
                    clearInterval(this.timer)
                }
            },1000)
            },
        //邮箱的验证码计时
         timermail(){ 
            return setInterval(() => {                
                if(this.verifmailication > 0){                   
                    this.verifmailication--
                }else{
                    clearInterval(this.timermail)
                }
            },1000)
            },
        //请求TOKRN
        token(){
            this.$axios.post("/api-auth/user/auth/login",{
                "username": "glxh",
                "accountSource": "auth",
                "password": this.$md5('111111')
            }).then(req => {
                console.log(req)
                
           
            })
        },
        //获取账号信息
        information(){
            this.$axios.post("/api-eva/evaUser/getCurrentUser").then(req => {
                let data = req.data.resultData
                if(req.data.code == 200){
                    this.query.phone = data.userPhone
                    this.query.name = data.userName
                    this.query.mail = data.userEmail
                    this.query.qq = data.extendQqAccount
                    this.query.sex = data.userSex
                    this.query.phoneM = data.userPhone
                    let mm = ""
                    for(let i=0;i<this.query.phoneM.length;i++){
                        let ss = this.query.phoneM.charAt(i)
                        if(i>=3 && i<7){
                            ss = '*'
                        }
                        mm += ss
                    }
                    this.query.phoneM = mm
                }
            })
        },
        //设置页面显示
        edit(val){
            let bwidth = document.body.clientWidth;
            let bheight = document.body.offsetHeight;
            if(val == "query"){
                if(this.querydata.name !== ""){
                    this.isname = true//验证姓名
                }
                if(this.querydata.qq !== ""){
                    this.isqq = true
                }
                if(this.querydata.sex !== ""){
                    this.issex = true
                }
                this.querydata.sex = this.query.sex
                this.querydata.name = this.query.name
                this.querydata.qq = this.query.qq
                this.$refs.query.style.display = "block"
                if(bwidth >= this.$refs.querylsit.clientWidth){
                    this.$refs.querylsit.style.left = ((bwidth / 2) - (this.$refs.querylsit.clientWidth /2)) + "px"
                }else{
                    this.$refs.querylsit.style.left = "0"
                }
                if(bheight >= this.$refs.querylsit.offsetHeight){
                    this.$refs.querylsit.style.top = ((bheight / 2) - (this.$refs.querylsit.offsetHeight /2)) + "px"
                }else{
                    this.$refs.querylsit.style.top = 0
                }
            }
            if(val == 'password'){
                
                this.$refs.password.style.display = "block"
                if(bwidth >= this.$refs.passworddata.clientWidth){
                    this.$refs.passworddata.style.left = ((bwidth / 2) - (this.$refs.passworddata.clientWidth /2)) + "px"
                }else{
                    this.$refs.passworddata.style.left = "0"
                }
                if(bheight >= this.$refs.passworddata.offsetHeight){
                    this.$refs.passworddata.style.top = ((bheight / 2) - (this.$refs.passworddata.offsetHeight /2)) + "px"
                }else{
                    this.$refs.passworddata.style.top = 0
                }
            }
            if(val == 'phone'){
                this.$refs.phone.style.display = "block"
                if(bwidth >= this.$refs.phonedata.clientWidth){
                    this.$refs.phonedata.style.left = ((bwidth / 2) - (this.$refs.phonedata.clientWidth /2)) + "px"
                }else{
                    this.$refs.phonedata.style.left = "0"
                }
                if(bheight >= this.$refs.phonedata.offsetHeight){
                    this.$refs.phonedata.style.top = ((bheight / 2) - (this.$refs.phonedata.offsetHeight /2)) + "px"
                }else{
                    this.$refs.phonedata.style.top = 0
                }
            }
            if(val == 'mail'){
                this.$refs.mail.style.display = "block"
                 if(bwidth >= this.$refs.maildata.clientWidth){
                    this.$refs.maildata.style.left = ((bwidth / 2) - (this.$refs.maildata.clientWidth /2)) + "px"
                }else{
                    this.$refs.maildata.style.left = "0"
                }
                if(bheight >= this.$refs.maildata.offsetHeight){
                    this.$refs.maildata.style.top = ((bheight / 2) - (this.$refs.maildata.offsetHeight /2)) + "px"
                }else{
                    this.$refs.maildata.style.top = 0
                }
            }
        },
        //关闭页面设置
        close(val){
            if(val == 'password'){                
                this.pwd.password1 = "";
                this.pwd.password2 = "";
                this.pwd.password3 = "";
                this.ispass = false,//验证密码是否重复
                this.ispass1 = false,//验证旧密码
                this.ispass2 = false,//验证新密码
                this.ispass3 = false,//验证确认密码
                this.$refs.password.style.display = "none"
                //去除new错误
                this.$nextTick(() =>{
                    this.$refs.pwd.resetFields();
                })
            }
            if(val == 'phone'){
                this.$refs.phone.style.display = "none"
                this.$refs.phoneCode.value = "";
                this.$refs.newphone.value = "";
                this.$refs.phoneyanzheng.style.visibility = "hidden"
            }
            if(val == 'mail'){
                this.$refs.mail.style.display = "none"
                this.$refs.mailCode.value = "";
                this.$refs.newmail.value = "";
                this.$refs.mailyanzheng.style.visibility = "hidden"
            }
            if(val == "query"){
                this.$refs.query.style.display = "none"
                this.$nextTick(() =>{
                    this.$refs.querydata.resetFields();
                })
            }
        },
    }
}
</script>
<style scoped>

    
    .AccountSettings{
        width: 100%;
        height:100%;
        background-image:url("../assets/img/index/background.png");
        display:flex;
        justify-content: center;
        align-items: center;
        font-family: Microsoft YaHei;
    }
    .t-left{
        text-align: left
    }
    .d-ilblock{
        display:inline-block;
    }
    .listbody{
        width:30rem;
        position:relative;
        background:#fff;
        margin: 0 auto;
        padding:3rem;
    }
    .fl-rt{
        float:right;
    }
    .list-title{
        font-size:1.25rem;
        font-weight: bold;
        text-align: left;
        padding-bottom:1rem;
        border-bottom:1px solid #eee
    }
    .w-100{
        width:100%;
    }
    .col-e{
        color:#999;
    }
    .bjbutton{
        color:#fff;
        font-size:1rem;
        padding:0.3rem 1rem;
        float:right;
        background:#1198fd;
        outline:none;
        border:none;
        border-radius:0.3rem;
    }
    .list-left{
        width:20%;
    }
    .list-left>p,.list-right>p{
        width:100%;
        margin-top:1rem;
    }
    .list-right{
        width:70%
    }
    .list-cont{
        margin-bottom: 2rem;
    }
    .list-button{
        padding:0.5rem 3rem;
        border:none;
        outline:none;
        border-radius:2rem;
        color:#fff;
    }
    .list-button-left{
        background: #1198fd;
    }
    .list-button-right{
        background:#eee;
    }
    .t-right{
        text-align: right;
    }
    .list-edit{
        margin-left:2rem;
        text-decoration: none;
        color:#1198fd;
    }
    .phonechange{
        width:100%;
        height:100%;
        position:fixed;
        background: rgba(150, 150, 150, 0.3);
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:100;
        display:none;
    }
    .phonechange>div{
        width:30rem;
        background: #fff;
        border-radius:0.3rem;
        overflow: hidden;
        position: absolute;
        top:0;
        left:0;
    }
    .phonechange-list{
        width:100%;
        padding:2rem 5%;
        text-align: left;
        box-sizing:border-box;
    }
    .phonechange-list p{
        margin-top:1rem;
        height:1.5rem;
    }
    .phonechange-list-1{
        width:25%;
        text-align:right;
    }
    .phonechange-list-2{
        width:40%;
        text-align: left;
        color:#c1bdbd;
    }
    .phonechange-list-2>p{
        padding-left:5%;
        box-sizing:border-box;
    }
    .phonechange-list-2 input,.passchange-right input{
        width:90%;        
        padding-left:5%;
        box-sizing:border-box;
        outline:none;
        border:1px solid #f1f0f0;
        background:#fafafa;
        border-radius:0.2rem;
        height:100%;
        position:relative;
        top:-0.2rem;
        color:#000;
    }
    .phonechange-list-3{
        width:30%;
    }
    .list3-button{
        width:100%;
        height:100%;
        color:#fff;    
        border:none;
        outline:none;
        background:#dcdcdc;
        border-radius: 0.2rem;
        position:relative;
        top:-0.2rem;
    }
    .list2-button{
        width:50%;
        border:none;
        outline:none;
        background:#1198fd;
        color:#fff;
        border-radius:0.2rem;
        height:100%;
    }
    .yanzheng{
        font-size:0.9rem;
        color:#f00;
        visibility: hidden;
    }
    .phonechange-title{
        text-align: left;
        padding:0.5rem;
        background:#fafafa;
        border-bottom:1px solid #f1f0f0;
        color:#1198fd;
        font-weight:bold;
    }
    .phonechange-title>a{
        text-decoration: none;
        color:#797878;
    }
    .passchange-right{
        display:inline-block;
        width:50%;
    }
    .passchange-left{
        display:inline-block;
        width:30%;
        text-align:right;
    }
    .passchange-right button{        
        width:40%;
        border:none;
        outline:none;
        background:#1198fd;
        color:#fff;
        border-radius:0.2rem;
        height:100%;
    }
    .passchange-right button:last-child{
        margin-left:10%;
    }
    .phonechange-data{
        padding-top:2rem;
        width:80%;
        margin: 0 auto;
    }
    .widradio{
        width:100%;
        text-align:left;
    }
</style>
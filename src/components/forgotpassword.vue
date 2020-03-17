<!--
--- author: 王松
--- creation time: 2019-07-30
--- module: 忘记密码页面
--- description: 忘记密码页面,包括验证手机号(+86)是否存在、短信验证form.code
-->
<template>
   <div id="forgotpassword">
     <img src="../assets/img/logo2.png" alt="">
     <div id="phonegetpassword">
        <table></table>
      
        <h1>找回登陆密码</h1>
         <!-- <div v-show="show==true">  
           <div class="right" v-show="isright==true">正确</div>
           <div class="wrong" v-show="isright==false">有误</div>
         </div> -->
        <h6>通过您的手机号找回登陆密码</h6>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="手机号" size="small" class="wid">
            <el-input v-model="form.phone" @input="testphone"></el-input>
          </el-form-item>
          <el-form-item label="短信验证" size="small" class="wid" style="position:relative;">
            <el-input v-model="form.code">
            </el-input> 
            <el-link  style="position:absolute;top:10%;right:5%;width:20%;" type="info" class="smscode" @click="getsmscode($event)">{{show2==false?"点击获取":"还剩"+count+"秒"}}</el-link>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="btn1" round @click="submit">下一步</el-button>
        <el-button plain class="btn2" round @click="backtologin">返回登录</el-button>
     </div>
   </div>
</template>

<script>
export default {
  name: 'adminMenu',
  data () {
    return {
       form: {
          phone:"",
          code: "",
       },
       phoneeist:false,  //手机号是否正确
       show2:false,      //短信有效期开关 false代表失效 true代表有效
       smssame:false,    //用户输入验证码是否和后台一样
       isright:false,    //显示对错
       show:false,       //显示显示对错
       count:0,  
    }
  },
  methods: {
    //
    //验证手机号正确与否
    testphone (){
      this.show=true
      //时刻获取用户户手机号
      var phone = this.form.phone
      let url = "/api-eva/evaUser/passCheck/checkUserByPhoneNum"
      let data = {
          "userPhone":phone
      }
      this.$axios.post(url,data).then(res=>{
        console.log(res)
        if(res.data.code==200){
          //手机号正则
          this.phoneeist=true
          this.isright=true
        }else{
          this.phoneeist=false
          this.isright=false
        }
      })      
    },
    //获取验证码
    getsmscode(e){
      //如果手机号正确 可以发送验证码
      if(this.phoneeist==true){
        //关于验证框的那些事
        const TIME_COUNT = 300
        //过60秒重新获取
        if (!this.timer) {
          //发送请求 获取验证码
          let url = "/api-eva/message/passCheck/foregetPsw"
          let data = {phoneNumber:this.form.phone}
          this.$axios.post(url,data).then(res=>{
            console.log(res)
          })
          this.count = TIME_COUNT
          this.show2 = true
          //时间特效
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              clearInterval(this.timer)
              this.timer = null
              this.show2 = false
            }
          }, 1000)
        }
      }else{
        //否则点击无效
        e.target.href="javascript:;"
      }
    },
    //提交(下一步)
    submit(){
      //如果手机号正确 且 短信有效期 且 短信和后台一样
        if(this.phoneeist==true){        
             //把用户的输入验证码发送后台进行判断
             var canclick = true
             let url = "/api-eva/evaUser/passCheck/forgetPSWCheckPhone"
             var a = this.form.phone
             var b = this.form.code
             let data = {
               	"userPhone": a,
	              "phoneCode": b
             }
             this.$axios.post(url,data).then(res=>{
                 console.log(res)
                 if(res.data.code==200){
                   //通过手机号和短信验证码 获取到另一个安全码
                   var userPhoneCheck = res.data.resultData
                   //提交成功 跳转重置密码页面
                   this.$router.push({path:`/resetpassword/${userPhoneCheck}`})
                 }else if(res.data.code==11003){
                   this.$alert('验证码失效', '提示', {
                    confirmButtonText: '确定',
                   });
                 }else {
                  this.$alert('验证码不正确', '提示', {
                    confirmButtonText: '确定',
                   });
                 }
                
             })
        }else{
          //alert("手机号或验证码有误")
          this.$alert('手机号或验证码有误', '提示', {
          confirmButtonText: '确定',
          });
        }
    },
    //返回登录页面
    backtologin () {
      this.$router.push({ path: '/login' })
    },
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>
  #forgotpassword{
    width: 100%;
    height:100%;
    background: url(../assets/img/index/background.png) no-repeat
  }
  img{
    margin-top:10%;
    margin-left:-5%;
  }
  #phonegetpassword{
    width:45%;
    height:45%;
    background:white;
    margin-left:24%;
    margin-top:2%;
    position: relative;
  }
  h1{
    margin-top:5%;
  }
  h6{
    margin-top:5%;
    margin-left:-28%;
  }
  .wid{
    width:70%;
    margin-top:15px;
    margin-left:12%;
  }
  .btn1{
    width:60%;
    margin-left:22%;
    display:block;
    margin-bottom:10px;
  }
  .btn2{
    width:60%;
    margin-left:22%;
    display:block;
    font-size:12px;
    color:rgba(0,0,0,0.1);
  }
  .smscode{
    position:absolute;
    top:49%;
    left:72%;
    z-index:99;
  }
  .right{
      position:absolute;
      display: inline-block;
      top:37%;
      left:84%;
      color:lightgreen;    
  }
  .wrong{
     position:absolute;
     display: inline-block;
     top:37%;
     left:84%;
     color:red;      
  }
  /*@media screen and (max-height: 700px) {
    .header {
      height: 60px;
      line-height: 60px;
    }
  }
  @media screen and (max-height: 700px) {
    .top-title {
      font-size: 20px;
    }
  }*/

</style>

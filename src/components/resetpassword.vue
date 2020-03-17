<!--
--- author: 王松
--- creation time: 2019-07-31
--- module: 重置密码页面
--- description: 重置密码页面 重置密码功能
-->

<template>
   <div id="resetpassword">
      <img src="../assets/img/logo2.png" alt="">
      <div id="phonegetpassword">
        <table></table>
        <h1>重置科技评价系统的密码</h1>
         <el-form ref="form" :model="form"  :rules="addRules" label-width="80px" size="small">
          <el-form-item label="新密码" size="small" class="wid" prop="password">
            <el-input v-model="form.password" ></el-input>
          </el-form-item>
          <el-form-item label="再次确认" size="small" class="wid" prop="repassword">
            <el-input v-model="form.repassword">
            </el-input> 
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn1" round @click="submit('form')">完成</el-button>
            <el-button plain class="btn2" round @click="backtologin">返回登录</el-button>
          </el-form-item>
        </el-form>
     </div>
   </div>
</template>

<script>
export default {
  name: 'adminMenu',
  data () {
  // 添加确认密码的延要求 必须一致
  let validrepassword=(rule,value,callback)=>{  
    console.log(value,this.form.password)
     console.log(value==this.form.password)
       //如果一直
      if(value==this.form.password){
         callback()
         this.inputcontrol=true
      }else{
         callback(new Error('密码必须一致'))
         this.inputcontrol=false 
      }
  };
    return {
       //两个input框数据集合
       form: {
          password:"",
          repassword: "",
       },
       //从忘记密码传过来的值
       userPhoneCheck:"",
       //开关控制 确保两个input的值满足正确的情况
       inputcontrol:false,
       //正则样式展现
       addRules:{
          password:[
            {required:true,message:'请输入新密码',trigger:'blur'},
          ],
          repassword:[
            //是否需要参数 
            {required:true,message:'请输入确认密码',trigger:'blur'},
            {validator:validrepassword,trigger:'change'},
          ],
       },
    }
  },
  //这边获取忘记密码传来的值
  created(){
        var userPhoneCheck = this.$route.params.userPhoneCheck;
        console.log("我是安全码"+userPhoneCheck);
        this.userPhoneCheck=userPhoneCheck    
  },
  methods: {
    //返回登录页面
    backtologin () {
      this.$router.push({ path: '/login' })
    },
    submit(){
      //如果开关为true 可以进行请求
      alert(this.inputcontrol)
      if(this.inputcontrol==true){
        alert("发送请求")
        let url = "/api-eva/evaUser/passCheck/resetPsw"
        let data = {
          "userPhoneCheck": this.userPhoneCheck,
	        "userPwd": this.form.password
        }
        this.$axios.post(url,data).then(res=>{
          console.log(res)
        })
        
      }else{
      //否则提示请输入相同的密码
        this.$alert('密码不一致', '提示', {
          confirmButtonText: '确定',
        });
      }
      
    },
  },
  mounted () {
  }
}
</script>
<style scoped>
  #resetpassword{
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
  .wid{
    width:70%;
    margin-top:15px;
    margin-left:12%;
  }
  .btn1{
    width:60%;
    margin-left:17%;
    display:block;
    margin-bottom:10px;
  }
  .btn2{
    width:60%;
    margin-left:17%;
    display:block;
    font-size:12px;
    color:rgba(0,0,0,0.1);
  }
  
</style>

<!--
--- author: 王松
--- creation time: 2019-07-16
--- module: 登录页面
--- description: 登录页面 包括登录 五天自动登录 验证码功能
-->
<template>
  <div id="login">
     <div id="whitelogin">
       <img id="title" src="../assets/img/pictrue/loginPage/title.png" alt="">
       <h1 class="s1">科技成果评价系统</h1>
       <input id="name" class="s2 inputnone" type="text" v-model="username" placeholder="请输入用户名">
       <input id="password" class="s2 inputnone" type="password" v-model="password" placeholder="请输入密码">
       <input id="test" class="s2 inputnone" type="text" placeholder="请输入验证码" v-model="usertxt" @input="input">
       <img class="s3" id="nameimg" src="../assets/img/pictrue/loginPage/userName.png" alt="">
       <img class="s3" id="passwordimg" src="../assets/img/pictrue/loginPage/password.png" alt="">
       <img class="s3" id="testimg" src="../assets/img/pictrue/loginPage/codeTest.png" alt="">
       <div id="codetestimg">
       <canvas  v-show="this.usertxt!=this.txts" id="canvas" width="130" height="40" @click="codetest"></canvas>
       <h3 v-show="txtsControl==true" class="yes">验证通过!</h3>
       </div>
       <div id="autoLogin"><input type="checkbox" id="remberpassword" v-model="text" >五天内记住密码</div>
       <h4 id="forget" @click="toforgotpassword">忘记密码</h4>
       <img @mouseenter="enter" @mouseleave="leave" @click="reallogin" :src="src" id="imgchange" ref="aaa" >
     </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      code:1,
      src:require('../assets/img/pictrue/loginPage/beforeLogin.png'),
      usertxt:"",
      txts:"",
      txtsControl:false,//验证码正确与否
      username:"",             //同户名
      password:"",             //密码
      text:false,
    }
  },
  created () {
  },
  mounted () {
    this.codetest();
    this.remberpassword();
  },
  updated () {},
  destroyed () {},
  methods : {
     //弹窗提示
     //验证码未通过
     testcodealert() {
        this.$alert('验证码未通过', '提示', {
          confirmButtonText: '确定',
        });
     },
     //冻结提示
     freezealert() {
        this.$alert('您已被冻结 无法登陆', '提示', {
          confirmButtonText: '确定',
        });
     },
     //登录失败提示
     loginlosealert() {
        this.$alert('登录失败 请输入正确的用户名和密码', '提示', {
          confirmButtonText: '确定',
        });
     },
     //登录
     reallogin () {
       //1.如果验证码通过
       if(this.txtsControl==true){
          console.log("验证码通过")
            //判断有没有cookie值
            if(document.cookie){
               var cookies = document.cookie.split(";");
               var password = cookies[cookies.length-2].split("=")[1];
               var username = cookies[cookies.length-1].split("=")[1];
               console.log(typeof password)
               //如果密码为空 代表登出 没有token和cookie
               if(password==""){
                 //需要加密
                 this.password = this.$md5(this.password)
               }else{
                 //如果有cookie值 密码不加密
                 this.password = this.password
               }
            }else{
              //如果没有cookie值 需要加密
              this.password = this.$md5(this.password)
            }
            //先判断是否冻结
            let url = "/api-eva/evaUser/passCheck/checkUserIsStop"
            let data = {
              "userAccount":this.username
            }
            this.$axios.post(url,data).then(res=>{
              console.log(res)
              if(res.data.code==11046){
                      //发送请求 做路径和data
                        var url = "/api-auth/user/auth/login";
                        let data = {"username":this.username,"accountSource": "auth","password":this.password};
                        this.$axios.post(url,data)
                        .then(res=>{
                            console.log(res.data);
                            //3.如果请求成功
                            if(res.data.code==200){
                                  //4.将请求的数据token保存到localstore
                                   var token = res.data.resultData.accessTokenEntity.access_token
                                   console.log(token);
                                   localStorage.setItem("hsst-token", token);
                                   localStorage.setItem("hsst-user", res.data.resultData.userAccount);
                                  //5.如果点击五天记住密码 保存用户名和密码到cookies
                                   if(this.text){
                                     //关于cookie的那些事
     	                               //设置用户名密码
     	                               var username=this.username.trim()
     	                               var password=this.password.trim()
     	                               //设置过期时间  5天
     	                               var exp = new Date();
                                     var time = 5*86400000;
                                     exp = exp.setTime(exp.getTime() + time);
     	                               //给cookie存值
     	                               document.cookie="username="+username+";"
     	                               document.cookie="password="+password+";"+"expires="+exp;
                                     console.log(document.cookie)
                                   }
                                   else{
                                     //如果未选中 啥也不干
                                   }
                                  //登陆成功
                                  this.$router.push({ path: '/admin/home' })
                            }else{  //否则登录失败
                              this.loginlosealert()
                            }
                        })
              }else{
               this.freezealert()
              }
            })

              //为了防止用户五天不关网页 这样cookie里面的过了有效期也还存在 所以需要手动删除
	                     /*setTimeout(function(){
                         document.cookie="username=;"
                         document.cookie="password=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
                         console.log("手动删除此cookie的key=value")
                       },time)*/
       }else{
       //2.否则提示验证码不正确
          this.testcodealert()
       }

     },
     //自动登陆函数
     remberpassword(){
       console.log(document.cookie)
        if(document.cookie){

        var cookies = document.cookie.split(";");
        var username = cookies[cookies.length-2].split("=")[1];
        var password = cookies[cookies.length-1].split("=")[1];
        //再次登录账号密码会显示在商户框里面 只需要验证码即可
        this.username = username;
        this.password = password;
        this.text=true;
        }
     },
     enter () {
       this.src=require('../assets/img/pictrue/loginPage/selectedLogin.png')
     },
     leave () {
       this.src=require('../assets/img/pictrue/loginPage/beforeLogin.png')
     },
     //验证码生成函数
     codetest(){
        /**生成一个随机数**/
        function randomNum(min,max){
            return Math.floor( Math.random()*(max-min)+min);
        }

        /**生成一个随机色**/
        function randomColor(min,max){
            var r = randomNum(min,max);
            var g = randomNum(min,max);
            var b = randomNum(min,max);
            return "rgb("+r+","+g+","+b+")";
        }
        /**绘制验证码图片**/
        //验证码
        var txts="";
        function drawPic(){
            var canvas=document.getElementById("canvas");
            var width=canvas.width;
            var height=canvas.height;
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';

            /**绘制背景色**/
            ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
            ctx.fillRect(0,0,width,height);
            /**绘制文字**/
            var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
            for(var i=0; i<4; i++){
                var txt= str[randomNum(0,str.length)];
                ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
                ctx.font = randomNum(25,35)+'px SimHei'; //随机生成字体大小
                var x = 10+i*25;
                var y = randomNum(25,45);
                var deg = randomNum(-45, 45);
                //修改坐标原点和旋转角度
                ctx.translate(x,y);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(txt, 0,0);
                //恢复坐标原点和旋转角度
                ctx.rotate(-deg*Math.PI/180);
                ctx.translate(-x,-y);
                txts+=txt;
            }
            /**绘制干扰线**/
            for(var i=0; i<3; i++){
                ctx.strokeStyle = randomColor(40,180);
                ctx.beginPath();
                ctx.moveTo( randomNum(0,width), randomNum(0,height) );
                ctx.lineTo( randomNum(0,width), randomNum(0,height) );
                ctx.stroke();
            }
        }
        drawPic();
        console.log(txts);
        this.txts = txts;
     },
     //验证码验证函数
     input () {
       if(this.usertxt==this.txts){
          this.txtsControl=true
       }else{
          this.txtsControl=false
       }
     },
     //跳转忘记密码
     toforgotpassword (){
       this.$router.push({ path: '/forgotpassword' })
     }
  },
  watch : {
    code (){
        console.log("我在实时观测code变量")
    }
  }
}
</script>
<style scoped>

#canvas{
  z-index:7;
  cursor: pointer;
}
.inputnone{
  outline-style: none ;
  border:none;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
  width:70%;
  height:10%;
  color:black;
}
.s1{
  color:rgba(72,150,217,0.89);
  position:absolute;
  top:10%;
  left:30%;
}
.s2{
  position:absolute;
  left:15%;
  padding-left:5%;
  font-size:16px;
}
.s3{
  position:absolute;
  left:15%;
}
.yes{
  margin-top:19%;
  transform: translateX(50%);
  color:limegreen;
}
#name{
  top:30%;
}
#password{
  top:45%;
}
#test{
  top:60%;
}
#nameimg{
  top:33%;
}
#passwordimg{
  top:48%;
}
#testimg{
  top:63%;
}
#login{
  background:url(../assets/img/pictrue/loginPage/background.png) no-repeat;
  background-size:100% 100%;
  height:100%;
  width: 100%;
  position:relative;
}
#title{
  width:433px;
  height:112px;
  position: absolute;
  top:-14%;
  left:5.5%;
  z-index:5;
}
#whitelogin{
  width: 482px;
  height: 400px;
  background:white;
  border-radius:10px;
  position: absolute;
  top:15%;
  left:31%;
}
#autoLogin{
  position: absolute;
  top:76%;
  left:15%;
  font-weight: 700;
}
#forget{
  position: absolute;
  top:76%;
  left:73%;
  color:lightskyblue;
  cursor:pointer;
}
#imgchange{
  position: absolute;
  top:84%;
  left:9%;
}
#codetestimg{
  position:absolute;
  top:58%;
  left:57%;
}
/*加载顺序很重要 还有and后面您必须要有空格必须要有*/
@media screen and (max-width: 1920px) and (min-width: 1440px) {
   #whitelogin{
     top:20%;
     left:30%;
     width:603px;
     height:500px;
   }
   #title{
     width:577px;
     height:130px;
     top:-13%;
     left:3%;
   }
   #imgchange{
     width:530px;
     height:80px;
   }
   #codetestimg{
     left:64%;
   }
}
</style>

<!--
--- author: 王松
--- creation time: 2019-07-14
--- module: 申报页面
--- description: 申报页面 包括用户申报提交功能
-->
<template>
  <div id="fill">
    <!--本子模板-->
    <div class="content">
      <!--环扣-->
      <ul class="loop-box">
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
        <li class="loop-cell"></li>
      </ul>
      <!--文具图片-->
      <div class="pen">
        <img width="100%" src="../assets/img/fill/pen.png">
      </div>

      <h3 id="template" @click="download">温馨提示：<span class="el-link" @click="download">申请模板下载</span></h3>
      <el-scrollbar class="wrapper" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName"></el-input>
            </el-form-item>
            <el-form-item label="申报单位" prop="applyDept">
              <el-input v-model="ruleForm.applyDept"></el-input>
            </el-form-item>
            <el-form-item label="评价目的" prop="evaTarget">
              <el-select class="target target-sel" v-model="ruleForm.evaTarget" placeholder="请选择评价目的" @change="changeTarget">
                <el-option
                  v-for="item in targetArr"
                  :key="item.constantCode"
                  :label="item.constantValue"
                  :value="item.constantCode"></el-option>
              </el-select>
              <!--选择其他时显示自定义输入框-->
              <el-input class="target target-input" v-model="ruleForm.otherEvaTarget"></el-input>
            </el-form-item>
            <el-form-item label="拟评价时间" prop="evaTime">
              <el-input v-model="ruleForm.evaTime"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkMan">
              <el-input v-model="ruleForm.linkMan"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="ruleForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wechat">
              <el-input v-model="ruleForm.wechat"></el-input>
            </el-form-item>
            <el-form-item label="QQ账号" prop="qqAccount">
              <el-input v-model="ruleForm.qqAccount"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-form>
      </el-scrollbar>
    </div>

    <!--验证码弹窗-->
    <el-dialog
      title="短信验证码"
      class="dialog"
      width="420px"
      :close-on-click-modal="false"
      @closed="handleClose"
      :visible.sync="dialogVisible">
      <el-form
        :inline="true"
        :model="verification"
        :rules="verification.rules"
        ref="verificationForm">

        <el-form-item label="验证码" prop="code">
          <el-input v-model="verification.code" class="inline-input"></el-input>
          <el-button type="primary" @click="sendCode" :disabled="sendCodeBtnDisabled">
            <span v-show="!sendCodeBtnDisabled">发送验证码</span>
            <span v-show="sendCodeBtnDisabled">重新获取({{ count }} 秒)</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'fill',
  data () {
    return {
      TIME_COUNT: 60, // 重新获取验证码的时间间隔（单位：秒）
      count: this.TIME_COUNT, // 重新获取验证码的倒计时时间
      targetArr: [], // 评价目的下拉框常量选项
      dialogVisible: false, // 验证码弹窗是否显示
      sendCodeBtnDisabled: false, // 发送验证码按钮是否禁止点击
      ruleForm: {
        projectName: '', // 项目名称
        applyDept: '', // 申报单位
        evaTarget: '', // 评价目的
        otherEvaTarget: '', // 其他评价目的
        evaTime: '', // 拟评价时间
        linkMan: '', // 联系人
        phoneNumber: '', // 手机
        wechat: '', // 微信
        qqAccount: '', // qq
        email: '' // 邮箱
      },
      // 表单验证规则
      rules: {
        // 项目名称
        projectName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let len = this.$utils.getStrByteLen(value) // 获取输入内容的字节长度

              if (len === 0) { // 内容不能为空
                callback(new Error('请输入项目名称'))
              } else if (len >= 100) { // 最大长度
                callback(new Error('长度在 1 到 99 个字符'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 申报单位
        applyDept: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let len = this.$utils.getStrByteLen(value) // 获取输入内容的字节长度

              if (len === 0) { // 内容不能为空
                callback(new Error('请输入申报单位'))
              } else if (len >= 50) { // 最大长度
                callback(new Error('长度在 1 到 50 个字符'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 评价目的
        evaTarget: [
          { required: true, message: '请选择评价目的', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value === '5') {
                let other = this.ruleForm.otherEvaTarget

                if (!other) {
                  callback(new Error('其他评价目的不能为空'))
                } else if (other.length > 25) {
                  callback(new Error('其他评价目的长度不能超过25个字'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'change' }
        ],
        // 拟评价时间
        evaTime: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let len = this.$utils.getStrByteLen(value) // 获取输入内容的字节长度

              if (len === 0) { // 内容不能为空
                callback(new Error('请输入拟评价时间'))
              } else if (len >= 50) { // 最大长度
                callback(new Error('长度在 1 到 50 个字符'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 联系人
        linkMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          {
            required: true,
            validator: (rule, value, callback) => {
              let len = this.$utils.getStrByteLen(value) // 获取输入内容的字节长度

              if (len === 0) { // 内容不能为空
                callback(new Error('请输入拟评价时间'))
              } else if (len >= 20) { // 最大长度
                callback(new Error('长度在 1 到 20 个字符'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 手机号
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /\d{3}-\d{8}|\d{4}-\d{7}|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        // 微信号
        wechat: [
          { required: true, message: '请输入微信号', trigger: 'blur' },
          { pattern: /^[1-9][a-zA-Z\d_]{4,}$/, message: '请输入正确的微信号', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        // QQ
        qqAccount: [
          { required: true, message: '请输入QQ账号', trigger: 'blur' },
          { pattern: /^[1-9]\d{4,13}$/, message: '请输入正确的QQ号', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '请输入正确的邮箱', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      },
      // 验证码弹窗相关
      verification: {
        code: '', // 验证码
        rules: {
          // 验证码校验
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
          ]
        }
      }
    }
  },
  mounted () {
    this.getTarget()
  },
  methods: {
    // 获取评价目的下拉框常量选项
    getTarget () {
      this.$axios.post('/api-eva/constant/passCheck/listConstant', ['evaTarget']).then(res => {
        if (res.data.code === 200) {
          this.targetArr = res.data.resultData.evaTarget
          // //给个默认值
          // this.select=res.data.resultData.evaTarget[0].constantCode
        } else {
          this.$alert(res.data.msg, '提示', {
            confirmButtonText: '关闭'
          })
        }
      })
    },

    // 评价目的选项变化时对应的变化
    changeTarget (code) {
      let ele = document.querySelectorAll('.target')
      // 选择了其他
      if (code === '5') {
        ele.forEach((item, index) => {
          item.classList.add('other')
        })
      } else {
        ele.forEach((item, index) => {
          item.classList.remove('other')
        })
      }
    },

    // 点击提交验证表单信息
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        } else {
          return false
        }
      })
    },

    // 重置表单信息及验证
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 发送验证码
    sendCode () {
      // 判断是否在倒计时
      if (!this.timer) {
        let _this = this

        _this.$axios.post('/api-eva/message/passCheck/applyDept', {
          phoneNumber: this.ruleForm.phoneNumber
        }).then(res => {
          this.$utils.axiosPostResponse(res, (result) => {
            // 返回成功
            if (result.isSuccess) {
              this.sendCodeBtnDisabled = true // 发送按钮禁止点击
              // 重新获取倒计时
              this.count = this.TIME_COUNT
              this.timer = setInterval(() => {
                if (this.count > 0) {
                  this.count--
                } else {
                  clearInterval(this.timer)
                  this.timer = null
                  this.sendCodeBtnDisabled = false
                }
              }, 1000)

            } else { // 返回的数据有误，进行提示
              _this.$message.error(result.msg)
            }
          })
        })
      }
    },

    // 保存填写的信息
    saveInfo () {
      let _this = this

      // 校验验证码是否按格式填写
      _this.$refs['verificationForm'].validate((valid) => {
        if (valid) {
          _this.ruleForm.phoneCode = _this.verification.code // 添加验证码

          _this.$axios.post('/api-eva/scientific/passCheck/addScientific', _this.ruleForm).then(res => {
            _this.$utils.axiosPostResponse(res, (result) => {
              // 返回成功
              if (result.isSuccess) {
                _this.dialogVisible = false // 关闭弹窗

                _this.$confirm('项目已成功提交，中国公路学会工作人员将会与您取得联系！', '提示', {
                  confirmButtonText: '确 定',
                  showCancelButton: false,
                  type: 'success',
                  closeOnClickModal: false,
                  showClose: false,
                  confirmButtonClass: 'tips-dialog-btn'
                }).then(() => {
                  _this.resetForm('ruleForm')
                }).catch(() => {
                })
              } else { // 返回的数据有误，进行提示
                _this.$message.error(result.msg)
              }
            })
          })
        } else {
          return false
        }
      })
    },

    // 弹窗关闭后销毁定时器，放开发送按钮
    handleClose () {
      clearInterval(this.timer)
      this.timer = null
      this.sendCodeBtnDisabled = false
    },

    // 下载申请模板
    download () {
      this.$axios.post('/api-eva/scientific/passCheck/downApplyDeptFileTemplate', null).then(res => {
        if (!res) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        console.log(url)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>
<style scoped>
#fill{
  width:100%;
  height:100%;
  background-color: #3e97ff;
  background-image: url("../assets/img/fill/fill-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
/*中间本子模板背景*/
.content {
  width: 50%;
  height: 90%;
  position: absolute;
  top: 11%;
  left: 20%;
  width: 60%;
  height: 78%;
  padding: 40px 100px 20px 100px;
  background-color: #fff;
  border: 12px solid #0764fe;
  border-radius: 60px;
}
.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: 2px dotted #0764fe;
  border-radius: 48px;
}
.loop-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 50px;
}
.loop-cell {
  position: relative;
  top: -34px;
  float: left;
  width: 10%;
  height: 68px;
  background-image: url("../assets/img/fill/loop.png");
  background-position: left;
  background-repeat: no-repeat;
  background-size: auto 100%;
}
.pen {
  position: absolute;
  right: -70px;
  bottom: -68px;
  width: 200px;
}
@media screen and (max-width: 1366px) {
  .loop-cell {
    top: -30px;
    height: 60px;
  }
  .pen {
    right: -70px;
    bottom: -68px;
    width: 200px;
  }
}

/*下载链接*/
.el-link {
  text-decoration: underline;
}
/*表单*/
#template {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 400;
  color: #ff3839;
}
.wrapper {
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;
}
form.el-form.demo-ruleForm {
  width: 66%;
  margin-left: 10%;
}
.el-select {
  width: 100%;
}
.other.target-sel {
  display: inline-block;
  float: left;
  width: 30%;
}
.target-input {
  display: none;
  float: left;
  width: 68%;
  margin-left: 2%;
}
.other.target-input {
  display: inline-block;
}
</style>

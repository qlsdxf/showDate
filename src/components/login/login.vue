<template>
  <div class="main">
    <div class="login">
      <div style="font-weight: bold;color: black;font-size: 28px;text-align: center">
        <span>小熊药店</span>
      </div>
      <!--登录-->
      <div style="text-align: center">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 30px">
          <el-tab-pane label="密码登录" name="1" style="font-weight: bold;color: black;font-size: 38px;font-weight: bold;">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="phone">
                            <span class="svg-container">
                            手账号
                            </span>
                <el-input ref="loginForm.phone"placeholder="请输入手机号" v-model="loginForm.phone" style="width: 300px;margin-top: 10px;" />
              </el-form-item>
              <el-form-item prop="password">
                      <span class="svg-container">
                        密码
                      </span>
                <el-input ref="password" placeholder="请输入密码" v-model="loginForm.password" show-password style="width: 300px;margin-top: 10px;"></el-input>
              </el-form-item>
              <!--登录按钮-->
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:5px;" @click="handleLogin">登录</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="2" style="font-weight: bold;color: black">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="phone">
                              <span class="svg-container">
                                手机号
                              </span>
                <el-input ref="loginForm.phone" placeholder="请输入手机号" v-model="loginForm.phone" style="width: 300px;margin-top: 10px;" />
              </el-form-item>
              <el-form-item prop="verification">
                              <span class="svg-container">
                                验证码
                              </span>
                <el-input
                        class="bind_code_input code"
                        v-model="loginForm.verification"
                        type="text"
                        placeholder="请输入验证码"
                        style="width: 200px;margin-top: 10px;"
                />
                <el-button  :disabled="display2===1?false:true" class="but" @click="bindforgetSendCode()" style="font-weight: bold">{{content}}</el-button>

                <!--<el-button-->
                        <!--@click.native.prevent="bindforgetSendCode"-->
                        <!--class="bind_code_gain"-->
                        <!--:disabled="display2===1?false:true"-->
                        <!--style="width: 100px;margin-top: 10px;"-->
                <!--&gt;发送验证码</el-button>-->
              </el-form-item>
              <!--登录按钮-->
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:5px;" @click="handleLogin">登录</el-button>
            </el-form>
          </el-tab-pane>
          <el-row :span="24" style="margin-top: 20px">
            <el-col :span="6"><div>&nbsp;</div></el-col>
            <el-col :span="6"><div class="but" @click="showDigon">忘记密码</div></el-col>
            <el-col :span="6"><div class="but" @click="register(2)">用户注册</div></el-col>
            <el-col :span="6"><div class="but" @click="register(3)">商家通道</div></el-col>
          </el-row>
        </el-tabs>
      </div>

      <el-dialog title="重置密码" :visible.sync="dialogFormVisible" :modal="false">
        <el-form :model="reset">
          <el-form-item  style="background-color:white;color: black" label-width="30px">
                              <span class="svg-container">
                                手机号
                              </span>
            <el-input  placeholder="请输入手机号" v-model="reset.phone" style="width: 70%;background-color:white;margin-top: 10px;" />
          </el-form-item>
          <el-form-item style="background-color:white;color: black" label-width="30px">
                              <span class="svg-container">
                                验证码
                              </span>
            <el-input
                    class="bind_code_input code"
                    v-model="reset.verification"
                    type="text"
                    placeholder="请输入验证码"
                    style="width: 70%;margin-top: 10px;"
            />
            <el-button  :disabled="display3===1?false:true" class="but" @click="SendCode()" style="font-weight: bold">{{content1}}</el-button>

            <!--<el-button-->
                    <!--@click.native.prevent=""-->
                    <!--class="bind_code_gain"-->
                    <!--style="width: 100px;margin-top: 10px;"-->
            <!--&gt;发送验证码</el-button>-->
          </el-form-item>
          <el-form-item label="新密码" label-width="80px"  style="background-color:white;width: 80%;">
            <el-input v-model="reset.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" label-width="80px" style="background-color:white;width: 80%;">
            <el-input v-model="password2" type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="resetPassword">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>

        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
    export default {
        data () {
            // 此处自定义校验手机号码js逻辑
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
            var validatePhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('号码不能为空!!'))
                }
                setTimeout(() => {
                    if (!phoneReg.test(value)) {
                        callback(new Error('格式有误'))
                    } else {
                        callback()
                    }
                }, 1000)
            }
            return {
                password:'',
                password2:'',
                loginRules: {
                    phone: [
                        { required: true, message: '请输入正确的电话号码',validator: validatePhone, trigger: 'blur'},
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 8,  message: '不能低于8个字符', trigger: 'blur' }
                    ],
                    Verification: [
                        { required: true, message: '请输入验证码', trigger: 'change' },
                        { type:'number',len:4, message: '请输入4位数字', trigger: 'blur' }
                    ],
                },
                activeName:'1',
                carouselImages: [

                ],
                reset:{

                },

                loading: false,
                loginForm: {
                    phone: '',
                    type:'1',
                    password: '',
                    verification:''
                },
                runNum:60,
                verification:'',
                dialogFormVisible:false,
                passwordType: 'password', // 密码类型
                redirect: undefined,
                otherQuery: {},
                display2:1,
                content:'发送验证码',
                content1:'发送验证码',
                display3:1,
                runNum1:60,
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        mounted () {

        },
        methods: {
            // 登录
            handleLogin () {
                this.password = this.loginForm.password;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                          let url = "/api/message/provide/user/login";
                          this.loginForm.password = this.$md5(this.loginForm.password);
                          this.$axios.post(url, this.loginForm).then((res) => {
                              if (res.data.code == 200) {
                                  this.$message.success(res.data.message)
                                  // this.$store.dispatch('setUser', res.data.data)
                                  // localStorage.setItem('token', res.data.token)
                                  localStorage.setItem("user",JSON.stringify(res.data.data))
                                  localStorage.setItem("token",res.data.data.token)
                                  this.$router.push('/mainInterface')

                              } else {
                                  this.$message.error(res.data.message)
                                  this.loginForm.password = this.password;
                              }
                          })


                    }
                })
            },
            handleClick() {
                this.loginForm.type = this.activeName
            },
            resetPassword(){
                if (this.reset.password == this.password2) {
                    let data  = {
                        'phone':this.reset.phone,
                        'password':this.$md5(this.reset.password),
                        'verification':this.reset.verification
                    }

                    console.log(data)
                    this.$axios.post("/api/message/provide/user/resetPassword",data).then((res)=>{
                        if (res.data.code == 200) {
                            this.$message.success("重置成功！！！")
                            this.dialogFormVisible  =false
                        } else {
                            this.$message.error(res.data.message)
                            this.reset.password = this.password2;
                        }
                    })
                } else {
                    this.$message.error("请输入相同密码！！！")
                }

            },
            showDigon(){
                this.reset.phone = this.loginForm.phone
                console.log(this.reset.phone)
                this.dialogFormVisible = true

            },
            register(val) {
                if (val == 1) {
                    this.dialogFormVisible = true
                }
                if(val == 2){
                    const {href} = this.$router.resolve({
                        path: '/registerTab',
                    })
                    window.open(href, '_blank')
                } else if (val == 3) {
                    const {href} = this.$router.resolve({
                        path: '/merchantLogin',
                    })
                    window.open(href, '_blank')
                }
            },
            bindforgetSendCode(){
                this.$axios.get("/api/message/provide/verification/send/"+this.loginForm.phone).then((res)=>{
                    this.$message.success(res.data.message)
                })
                this.display2=2;
                let that = this;
                let myTime = setInterval(function () {
                    that.runNum--;
                    if(that.runNum <= 0){
                        that.content = "获取验证码"
                        that.display2 = 1;
                        that.runNum = 60;
                        clearInterval(myTime);
                    }else {
                        that.content = that.runNum+"s后重发";
                    }
                },1000);
                this.content="60s后重发"
            },
            SendCode(){
                // this.$axios.get("/api/message/provide/verification/send/"+this.reset.phone).then((res)=>{
                //     this.$message.success(res.data.message)
                // })
                this.display3=2;
                let that = this;
                let myTime = setInterval(function () {
                    that.runNum1--;
                    if(that.runNum1 <= 0){
                        that.content1 = "获取验证码"
                        that.display3 = 1;
                        that.runNum1 = 60;
                        clearInterval(myTime);
                    }else {
                        that.content1 = that.runNum1+"s后重发";
                    }
                },1000);
                this.content1="60s后重发"
            },
            // 获取其他的查询条件
            getOtherQuery (query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            }
        }
    }
</script>

<style scoped>
  .box-card {
    width: 650px;
    margin: 200px auto;
    text-align: center;
  }
  .el-form-item{
    background-color: #eaecf0;
  }
  .el-input{
    display: inline-block;
    height: 47px;
    width: 100%;
  }
  .but{
    width: 100px;
  }
  .but:hover{
    cursor:pointer;
  }
  input{
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: black;
    height: 47px;
    caret-color: black;
  }

  .main{
    background: url("http://124.222.128.245:955/image/qq_pic_merged_16498212306823e08f8ce.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  .el-carousel__item .el-image{
    border-radius: 10px;
  }
  .login{
    display: inline;
    width: 400px;
    height: 380px;
    background-color:hsla(0,0%,100%,.9);
    float: left;
    margin: 15% 10% 30% 60%;
    border-radius: 10px;
    padding: 10px 25px;
    border: 4px solid aliceblue;
  }

  .svg-container {
    color: #889aa4;
    vertical-align: middle;
    width: 50px;
    display: inline-block;
  }

</style>

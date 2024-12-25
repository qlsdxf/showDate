<template>
    <div class="main">
        <div class="login">
            <div style="font-weight: bold;color: black;font-size: 28px;text-align: center">
                <span>小熊药店</span>
            </div>
            <div style="text-align: center;height: 10px"><span>医生登录</span></div>
            <!--登录-->
            <div style="text-align: center">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 15px">
                    <el-tab-pane label="密码登录" name="1" style="font-weight: bold;color: black;font-size: 38px;font-weight: bold;">
                        <el-form  :model="loginForm" >
                            <el-form-item prop="phone">
                            <span class="svg-container">
                            手账号
                            </span>
                                <el-input placeholder="请输入手机号" v-model="loginForm.doctorPhone" style="width: 300px;margin-top: 10px;" />
                            </el-form-item>
                            <el-form-item prop="password">
                      <span class="svg-container">
                        密码
                      </span>
                                <el-input placeholder="请输入密码" v-model="loginForm.doctorPassword" show-password style="width: 300px;margin-top: 10px;"></el-input>
                            </el-form-item>
                            <!--登录按钮-->
                            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:5px;" @click="handleLogin">登录</el-button>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="验证码登录" name="2" style="font-weight: bold;color: black">
                        <el-form :model="loginForm" >
                            <el-form-item prop="phone">
                              <span class="svg-container">
                                手机号
                              </span>
                                <el-input  placeholder="请输入手机号" v-model="loginForm.doctorPhone" style="width: 300px;margin-top: 10px;" />
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
                                <el-button  :disabled="display===1?false:true" class="but" @click="bindforgetSendCode()" style="font-weight: bold">{{content}}</el-button>

                            </el-form-item>
                            <!--登录按钮-->
                            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:5px;" @click="handleLogin">登录</el-button>
                        </el-form>
                    </el-tab-pane>
                    <el-row :span="24" style="margin-top: 20px">
                        <el-col :span="12"><div>&nbsp;</div></el-col>
                        <el-col :span="6"><div class="but" @click="showDigon">忘记密码</div></el-col>
                        <el-col :span="6"><div class="but" @click="register(3)">医生注册</div></el-col>
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
                        <el-button
                                @click.native.prevent="SendCode"
                                class="bind_code_gain"
                                style="width: 100px;margin-top: 10px;"
                        >发送验证码</el-button>
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
            return {
                activeName:'1',
                loading: false,
                loginForm: {
                    doctorPhone: '',
                    type:'1',
                    doctorPassword: '',
                    verification:''
                },
                passwordType: 'password', // 密码类型
                redirect: undefined,
                password:'',
                reset:{},
                display:1,
                password2:'',
                runNum:60,
                content:'发送验证码'
            }
        },
        mounted () {

        },
        methods: {
            // 登录
            handleLogin () {
                    if (this.loginForm.doctorPhone != '' &&((this.activeName == '1' &&this.loginForm.doctorPassword != '') || (this.activeName == '2' &&this.loginForm.verification != ''))) {
                        let url = "/api/message/provide/doctor/login";
                        if (this.activeName == '1') {
                            this.password = this.loginForm.doctorPassword
                            this.loginForm.doctorPassword = this.$md5(this.loginForm.doctorPassword);
                        }
                        this.loginForm.type = this.activeName;

                        this.$axios.post(url, this.loginForm).then((res) => {
                            if (res.data.code == 200) {
                                this.$message.success(res.data.message)
                                console.log(res.data.data)
                                localStorage.setItem("doctor", JSON.stringify(res.data.data))
                                this.$router.push('/docRegister')

                            } else {
                                console.log(1232212)
                                this.loginForm.doctorPassword = this.doctorPassword
                                this.$message.error(res.data.message)
                            }
                        })
                    }
            },
            handleClick() {
                console.log(1)
            },
            showDigon(){
                this.dialogFormVisible = true
            },
            resetPassword(){

                if (this.reset.password == this.password2) {

                    let data  = {
                        'phone':this.reset.phone,
                        'password':this.$md5(this.reset.password),
                        'verification':this.reset.verification
                    }

                    console.log(data)
                    this.$axios.post("/api/message/provide/doctor/resetPassword",data).then((res)=>{
                        if (res.data.code == 200) {
                            this.$message.success("重置成功！！！")
                        } else {
                            this.$message.error(res.data.data)
                            this.reset.password = this.password2;
                        }
                    })
                }

            },
            SendCode(){
                this.$axios.get("/api/message/provide/verification/send/"+this.reset.phone).then((res)=>{
                    this.$message.success(res.data.message)
                })
            },
            checkPhone(phone){
                var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
                return phoneReg.test(phone);
            },
            register(val) {
                if(val == 2){
                    const {href} = this.$router.resolve({
                        path: '/registerTab',
                    })
                    window.open(href, '_blank')
                    // this.$router.push({
                    //     name:"registerTab",
                    //     params: {
                    //         activeName: "user"
                    //     }
                    // })
                } else if (val == 3) {
                    const {href} = this.$router.resolve({
                        path: '/doctorRegisterTab',
                    })
                    window.open(href, '_blank')
                    // this.$router.push({
                    //     name:"registerTab",
                    //     params: {
                    //         activeName: "merchant"
                    //     }
                    // })
                }
            },
            bindforgetSendCode(){
                this.$axios.get("/api/message/provide/verification/send/"+this.loginForm.doctorPhone).then((res)=>{
                    this.$message.success(res.data.message)
                })
                this.display=2;
                let that = this;
                let myTime = setInterval(function () {
                    that.runNum--;
                    if(that.runNum <= 0){
                        that.content = "获取验证码"
                        that.display = 1;
                        that.runNum = 60;
                        clearInterval(myTime);
                    }else {
                        that.content = that.runNum+"s后重发";
                    }
                },1000);
                this.content="60s后重发"

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

    element.style {
        margin-top: 15px;
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

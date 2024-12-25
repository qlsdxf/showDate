<template>
    <div class="main">
        <div class="login">
            <div style="font-weight: bold;color: black;font-size: 28px;text-align: center">
                <span>小熊药店</span>
            </div>
            <div style="text-align: center;height: 10px"><span>系统管理员后台登录</span></div>
            <!--登录-->
            <div style="text-align: center">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 15px">
                    <el-tab-pane label="密码登录" name="1" style="font-weight: bold;color: black;font-size: 38px;font-weight: bold;">
                        <el-form ref="loginForm" :model="loginForm" >
                            <el-form-item prop="phone">
                            <span class="svg-container">
                            账号
                            </span>
                                <el-input placeholder="请输入账号" v-model="loginForm.adminId" style="width: 300px;margin-top: 10px;" />
                            </el-form-item>
                            <el-form-item prop="password">
                      <span class="svg-container">
                        密码
                      </span>
                                <el-input  placeholder="请输入密码" v-model="loginForm.adminPassword" show-password style="width: 300px;margin-top: 10px;"></el-input>
                            </el-form-item>
                            <!--登录按钮-->
                            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:5px;" @click="handleLogin">登录</el-button>
                        </el-form>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                activeName:'1',
                loading: false,
                loginForm: {
                    adminId:'10001',
                    adminPassword:'12345678',
                },
                passwordType: 'password', // 密码类型
                redirect: undefined,
                otherQuery: {},
                password:'',
                display2:1,
                runNum:60,
                content:'发送验证码'
            }
        },
        mounted () {

        },
        methods: {
            // 登录
            handleLogin () {
                if (this.loginForm.adminId != null && this.loginForm.adminPassword != null) {
                    let url = "/api/message/provide/admin/login";
                    this.password = this.loginForm.adminPassword
                    this.loginForm.adminPassword = this.$md5(this.loginForm.adminPassword);

                    this.$axios.post(url, this.loginForm).then((res) => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            console.log(res.data.data)
                            localStorage.setItem("admin", JSON.stringify(res.data.data))

                            this.$router.push('/adminMain')
                        } else {
                            this.$message.error(res.data.message)
                            this.loginForm.adminPassword = this.password
                        }
                    })

                }else {
                   this.$message.error("请填写完整数据！！！")
                }


            },
            handleClick() {
                console.log(1)
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
                        path: '/registerTab',
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

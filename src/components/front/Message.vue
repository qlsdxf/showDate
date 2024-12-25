<template>
    <div class="my_message">
        <div class="heard">
            <header style="height: 100%">
                <article>
                    <div class="header_1">
                        <a title="我的药品">个人中心</a>
                    </div>
                    <div class="header_2">
                        <nav>
                            <ul id="menu">

                                <li>
                                    <a href = "./mainInterface">平台首页</a>
                                </li>
                                <li>
                                    <a href = "./personalCenter">订单中心</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </article>
            </header>
        </div>

        <div class="me_body">
            <div style="font-size: 20px;text-align: center;width: 100%;height: 60px;margin-top: 10px">
                <span >修改个人信息</span>
            </div>
                    <el-form ref="form" :model="form" label-width="120px" style="margin-top: 60px">
                        <el-row style="width: 100%">
                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="当前头像：">
                                    <el-upload
                                            class="avatar-uploader"
                                            action="http://124.222.128.245:955/uploadImageFile"
                                            :show-file-list="false"
                                            accept="image/jpeg,image/gif,image/png,image/jpg"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <el-avatar v-if="form.userAvatar":src="form.userAvatar" :size="100"></el-avatar>
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="昵称：">
                                    <el-input type="text" v-model="form.userName" style="width: 400px"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="绑定手机号：">
                                    <span type="text" v-model="form.userPhone" style="width: 400px">{{form.userPhone}}</span>
                                    <!--<el-button type="text" @click="changePhone">修改绑定手机</el-button>-->
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="地址：">
                                    <select  v-model="provinceCode" @change="seleProvince">
                                        <option disabled value="">请选择省份</option>
                                        <option  v-for="pro of province" :key="pro.provinceId" :value="pro.provinceId" :label="pro.provinceName" @select=""></option>
                                    </select>
                                    <select  v-model="cityCode" style="margin-left: 15px" @change="seleCity">
                                        <option disabled value="">请选择市</option>
                                        <option v-for="cy of city" :key="cy.cityId" :value="cy.cityId" :label="cy.name"></option>
                                    </select>
                                    <select  v-model="countryCode"  style="margin-left: 15px" >
                                        <option disabled value="">请选择县/区</option>
                                        <option v-for="ct of county" :key="ct.countyId" :value="ct.countyId" :label="ct.name"></option>
                                    </select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="详细地址">
                                    <el-input type="text" v-model="form.userDetailedAddress" style="width: 400px"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="原密码"  style="margin-left:1%;width: 45%" >
                                    <el-input type="password" v-model="password.oldPassword" style="width: 400px"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>


                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="新密码">
                                    <el-input type="password" v-model="password.newPassword" style="width: 400px"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col style="margin-left:1%;width: 45%" >
                            <div class="grid-content">
                                <el-form-item label="重复密码">
                                    <el-input type="password" v-model="password2" style="width: 400px"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        </el-row>
                        <el-row style="width: 100%">
                            <el-col :span="12" :offset="8">
                                <el-form-item>
                                    <el-button type="primary" @click="save">保存</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>

        </div>

    </div>

</template>

<script>
    export default {
        mounted() {
            this.user = JSON.parse(localStorage.getItem("user"));
            console.log(this.user)
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            this.provinceCode = this.user.userAddress.split("_")[0];
            this.cityCode = this.user.userAddress.split("_")[1];
            this.countryCode = this.user.userAddress.split("_")[2];
            this.form = this.user;
            this.getProvince();
            this.seleProvince();
            this.seleCity();
            console.log(this.form)
        },
        data() {
            return {
                tabPosition: 'top',
                province:[],
                city:[],
                county:[],
                password2:'',
                verification:'4856',
                display:1,
                runNum:60,
                provinceCode:'',
                active:0,
                dialogFormVisible:false,
                phone:'',
                cityCode:'',
                content:'获取验证码',
                countryCode:'',
                password:{
                        id:'',
                        oldPassword:'',
                        newPassword:'',
                },
                form: {
                },
                user:{
                    userAvatar:''
                },
            };
        },
        methods:{
            save() {
                this.$axios.post("/api/message/provide/user/changeUserMessage", this.form).then((res)=>{
                    this.$message.success(res.data.message)
                    localStorage.setItem("user", JSON.stringify(res.data.data))
                    this.user = res.data.data
                    this.form  = res.data.data
                })
                if (this.password.newPassword != '' && this.password.oldPassword != '' && this.password2 != '') {

                    this.password.id = this.user.userId
                    this.$axios.post("/api/message/provide/user/updatePassword", this.password).then((res)=>{
                        this.$message.success(res.data.message)
                        localStorage.setItem("user", JSON.stringify(res.data.data))
                        this.user = res.data.data
                        this.form  = res.data.data
                    })
                }


            },
            cancal() {
                this.dialogFormVisible = false;
                this.active = 0;
                this.phone = '';
                this.display=1;
                this.content = "获取验证码"
                this.runNum=0;
            },
            sure() {
                this.form.userPhone = this.phone;
                this.dialogFormVisible = false
                this.active = 0
                this.phone = '';
                this.display=1;
                this.content = "获取验证码"
                this.runNum=0;

            },
            checkOld() {
                let data = {
                    phone: this.form.userPhone,
                    verification:this.verification
                }
                this.$axios.post("/api/message/provide/verification/check",data).then((res)=>{
                    if(res.data.code == 200) {
                        this.$message.success(res.data.message)
                        this.active = 1;
                        this.display=1;
                        this.content = "获取验证码"
                        this.runNum=0;
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            checkNew() {
                if (this.form.userPhone == this.phone) {
                    this.$message.error('请不要')
                }
                let data = {
                    phone: this.phone,
                    verification:this.verification
                }
                this.$axios.post("/api/message/provide/verification/check",data).then((res)=>{
                    if(res.data.code == 200) {
                        this.$message.success(res.data.message)
                        this.active = 3;
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            getVerification(phone,type){
                let flag = 0;
                if (type == 1) {
                    if (this.form.userPhone == this.phone) {
                        this.$message.error("请不要填写与原来相同的电话号码")
                    } else {
                        this.$axios.get("/api/message/provide/user/isHavePhone/"+phone).then((res)=>{
                            if (res.data.code != 200) {
                                this.flag = 1
                                this.$message.error("该手机号被注册过")
                            }
                        })
                    }
                }
                if (flag == 0) {
                    if (phone != '' ) {
                        if (!this.checkPhone(phone)) {
                            this.$message.error("请输入正确的手机号")
                        } else {
                            this.$axios.get("/api/message/provide/verification/send/"+phone).then((res)=>{
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
                        }

                    } else {
                        this.$message.error("请填写手机号！！！")
                    }
                }

            },
            checkPhone(phone){
                let re = /^[1][3,4,5,7,8][0-9]{9}$/;
                let str = phone;
                if(re.test(str)){
                    return true;

                }else {
                    return false;
                }
            },
            changePhone() {
                this.dialogFormVisible = true
                this.display = 1;
                this.runNum = 60;
            },
            handleAvatarSuccess(res, file) {
                console.log(1233)
                console.log(res)
                this.form.userAvatar = res.data;
                console.log(this.form.userAvatar)
            },
            beforeAvatarUpload(file) {
               console.log('上次成功')
            },
            getProvince() {
                this.$axios.post("/api/message/provide/province/getAllProvince").then((res)=> {
                    this.province = res.data.data
                })
            },
            getCity(val) {
                this.$axios.post("/api/message/provide/city/getCity/"+val).then((res)=> {
                    this.city = res.data.data
                })
            },
            getCounty(val) {
                this.$axios.post("/api/message/provide/county/getCounty/"+val).then((res)=> {
                    this.county = res.data.data
                })
            },
            seleProvince() {
                this.getCity(this.provinceCode);
            },
            seleCity() {
                this.getCounty(this.cityCode);
            },

        }
    }
</script>

<style scoped>
    .mt-menu-tree {
        font-size: 12px;
        padding-left: 3px;
        _position: relative;
    }
    .mt-menu-tree {
        overflow: inherit;
        margin-top: -5px;
    }
    .my_message{
        position: absolute;
        width: 100%;
        /*height: 100%;*/
        overflow-y: auto;
        transition: left .3s ease-in-out;
    }
    dl {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    *{
        margin: 0;
        padding: 0;
    }

    .heard{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #999;
        margin-top: 0px;
    }
    .header_1{
        width: 80px;
        height: 30px;
        float: left;
        margin-left: 20px;
        margin-top: 5px;

    }
    .header_1>a{
        color: #fff;
        text-decoration:none; /* 去掉下划线 */
    }
    .header_2{
        width: 250px;
        height: 30px;
        float: left;
        margin-left: 80px;
    }
    .me_body{
        border: black solid 2px;
        width: 80%;
        margin-left: 10%;
        height: 100%;
        margin-top: 10px;
    }
    .message_st{
        width: 100%;
        height: 100%;
    }

    #menu {
        font:14px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
        width: 800px;
        height: 30px;

    }
    #menu>li{
        list-style:none; /* 将默认的列表符号去掉 */
        padding:0; /* 将默认的内边距去掉 */
        float: left;
        margin-left: 50px;
        margin-top: 0px;
    }
    #menu>li>a{
        width:20px; /* 设置宽度 */
        height:0px; /* 设置高度 */
        line-height:30px; /* 设置行高，将行高和高度设置同一个值，可以让单行文本垂直居中 */
        text-align:center; /* 居中对齐文字 */
        /*background:#3A4953; !* 设置背景色 *!*/
        color:white; /* 设置文字颜色 */
        text-decoration:none; /* 去掉下划线 */

    }

    #menu1{
        font:14px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
        background-color: #B3C0D1;
    }
    #menu1>li{
        list-style:none; /* 将默认的列表符号去掉 */
        padding:0; /* 将默认的内边距去掉 */
        float: left;
        margin-left: 40px;
        margin-top: 55px;
    }
    #menu1>li>a {
        width:20px; /* 设置宽度 */
        height:5px; /* 设置高度 */
        line-height:30px; /* 设置行高，将行高和高度设置同一个值，可以让单行文本垂直居中 */
        text-align:center; /* 居中对齐文字 */
        color:white; /* 设置文字颜色 */
        text-decoration:none; /* 去掉下划线 */


    }

</style>
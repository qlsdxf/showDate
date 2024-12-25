<template>
    <div style="text-align: center;width: 100%"  >
        <el-steps :active="active" finish-status="success" style="text-align: left">
        <el-step title="填写商家基本信息"></el-step>
        <el-step title="填写店铺基本信息"></el-step>
        <el-step title="上传店铺相关照片"></el-step>
        <el-step title="注册成功"></el-step>
    </el-steps>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" style="margin-top: 20px;" v-if="display == 1?true:false">
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="姓名" required prop="name">
                            <el-input v-model="ruleForm.merchantName"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="身份证"prop="merchantIdCard" required style="width: 98%;">
                            <el-input v-model="ruleForm.merchantIdCard"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="手机号" required prop="merchantPhone" style="width: 98%;">
                            <el-input v-model="ruleForm.merchantPhone"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="验证码" required style="width: 98%;">
                            <el-input v-model="ruleForm.verification" style="width: 72%;"  placeholder="输入验证码"></el-input>
                            <el-button  :disabled="display2===1?false:true" class="but" @click="getVerification()" style="font-weight: bold">{{content}}</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="密码"  style="width: 98%;" required>
                            <el-input v-model="ruleForm.merchantPassword" type="password"  placeholder="密码位数不能于8位"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="重复密码" style="width: 98%;" required>
                            <el-input v-model="password2" type="password"  placeholder="再次输入密码"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="选择性别" required>
                            <el-radio-group v-model="ruleForm.merchantSex" style="width: 150px;">
                                <el-radio label="1" select value="1">男</el-radio>
                                <el-radio label="2" value="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="上传头像" prop="avator">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://124.222.128.245:955/uploadImageFile"
                                    :show-file-list="false"
                                    accept="image/jpeg,image/gif,image/png,image/jpg"
                                    :on-success="handleAvatarSuccess_avatar">
                                <img v-if="avatar" :src="avatar" class="avatar" style="width: 100px;height: 100px">
                                <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col :span="12" :offset="6">
                    <el-form-item>
                        <el-button type="primary" @click="next('form')">下一步</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-form :model="ruleForm" ref="ruleForm" label-width="230px"  v-if="display == 2?true:false">
            <el-row style="width: 100%">
                <el-form-item label="店铺名称" required >
                    <el-col style="margin-left:1%;width: 45%">
                        <el-input v-model="ruleForm.pharmacyName"   placeholder="店铺名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择地址" required >
                    <el-col style="margin-left:1%;width: 45%">
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
                    </el-col>
                </el-form-item>
                <el-form-item label="详细地址信息" required >
                    <el-col style="margin-left:1%;width: 45%">
                        <el-input v-model="ruleForm.pharmacyDetailedAddress"   placeholder="输入详细地址"></el-input>
                    </el-col>
                </el-form-item>

                <el-col style="margin-left:1%;width: 45%">
                    <el-form-item label="店铺头像" prop="desc">
                        <el-upload
                                class="avatar-uploader"
                                action="http://124.222.128.245:955/uploadImageFile"
                                :show-file-list="false"
                                accept="image/jpeg,image/gif,image/png,image/jpg"
                                :on-success="handleAvatarSuccess_pc">
                            <img v-if="picUrl" :src="picUrl" class="avatar" style="width: 100px;height: 100px">
                            <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col :span="12" :offset="6">
                    <el-form-item>
                        <el-button type="primary" @click="next">下一步</el-button>
                        <el-button @click="back">返回上一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-form :model="ruleForm" ref="ruleForm" label-width="230px" class="demo-ruleForm" v-if="display == 3?true:false">
            <el-row style="width: 100%">
                    <el-col style="margin-left:1%;width: 45%">
                        <el-form-item label="身份证复印件" prop="desc">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://124.222.128.245:955/uploadImageFile"
                                    :show-file-list="false"
                                    accept="image/jpeg,image/gif,image/png,image/jpg"
                                    :on-success="handleAvatarSuccess_idCard"
                            >
                                <img v-if="idCardPic" :src="idCardPic" class="avatar" style="width: 100px;height: 100px">
                                <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger" style="width: 100px;height: 100px"></i>
                            </el-upload>
                    </el-form-item>
                </el-col>
                <el-col style="margin-left:1%;width: 45%">
                    <el-form-item label="营业执照" prop="desc">
                        <el-upload
                                class="avatar-uploader"
                                action="http://124.222.128.245:955/uploadImageFile"
                                :show-file-list="false"
                                accept="image/jpeg,image/gif,image/png,image/jpg"
                                :on-success="handleAvatarSuccess_bL"
                        >
                            <img v-if="businessLicensePic" :src="businessLicensePic" class="avatar" style="width: 100px;height: 100px">
                            <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger" style="width: 100px;height: 100px"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col style="margin-left:1%;width: 45%">
                    <el-form-item label="银行开户许可" prop="desc" >
                        <el-upload
                                class="avatar-uploader"
                                action="http://124.222.128.245:955/uploadImageFile"
                                :show-file-list="false"
                                accept="image/jpeg,image/gif,image/png,image/jpg"
                                :on-success="handleAvatarSuccess_bank"
                        >
                            <img v-if="bankAccountPic" :src="bankAccountPic" class="avatar" style="width: 100px;height: 100px">
                            <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger" style="width: 100px;height: 100px"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col style="margin-left:1%;width: 45%">
                    <el-form-item label="药品经营许可证" prop="desc">
                        <el-upload
                                class="avatar-uploader"
                                action="http://124.222.128.245:955/uploadImageFile"
                                :show-file-list="false"
                                accept="image/jpeg,image/gif,image/png,image/jpg"
                                :on-success="handleAvatarSuccess_drug"
                        >
                            <img v-if="drugLicensePic" :src="drugLicensePic" class="avatar" style="width: 100px;height: 100px">
                            <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger" style="width: 100px;height: 100px"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>

            </el-row>


            <el-row style="width: 100%">
                <el-col :span="12" :offset="6">
                    <el-form-item>
                        <el-button type="primary" @click="register('form')">立即注册</el-button>
                        <el-button @click="back">返回上一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-row style="width: 100%" v-if="display == 4?true:false">
            <el-col :span="12" :offset="6">
                <div style="height: 200px;font-size: 18px;margin-top: 20px">
                    <span>恭喜您注册成功，登录系统，请耐心等待审核，系统工作人员将在三个工作日内与您取得联系</span>
                    <!--<el-button @click="resetForm('form')">返回登录界面</el-button>-->
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>


    export default {
        mounted(){
        },
        data() {
            return {
                content:'获取验证码',
                choice:'',
                active:0,
                avatar:'',
                picUrl:'',
                businessLicensePic:'',
                bankAccountPic:'',
                drugLicensePic:'',
                idCardPic:'',
                runNum:60,
                id:'',
                province:[],
                city:[],
                county:[],
                merchantTradeUrl:'',
                provinceCode:'',
                cityCode:'',
                countryCode:'',
                display:1,
                display2:1,
                runNum:60,
                password2:'1999319xjj',
                area: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
                    31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
                    43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
                    61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
                },
                Wi: [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2 ],
                ValideCode: [1,0,'X',9,8,7,6,5,4,3,2],
                value: '',
                ruleForm: {
                    pharmacyName:'浅蓝的店铺',
                    pharmacyAddress:'',
                    pharmacyAvatar: "http://124.222.128.245:955/image/logoa06853f7.png",
                    pharmacyDetailedAddress:'北京市市辖区东城区幸福路108号',
                    merchantName: 'qlsdxf',
                    merchantPhone: '17807060775',
                    verification: '4856',
                    merchantSex:'',
                    merchantAvatar:"http://124.222.128.245:955/image/head0549c630.jpg",
                    merchantPassword:'1999319xjj',
                    merchantBusinessLicense:"http://124.222.128.245:955/image/营业执照d9b6a2b4.jpg",
                    merchantBankAccount:"http://124.222.128.245:955/image/银行开户a507dab8.jpg",
                    merchantDrugLicense:"http://124.222.128.245:955/image/药品经营许可证0d5d2e12.jpg",
                    merchantIdCardPic:"http://124.222.128.245:955/image/身份证复印件a8f69f75.jpg",
                    merchantIdCard:'362202199903193316',
                    merchantAge:'',

                },
            }
        },
        methods: {
            getVerification(){
                console.log(this.ruleForm.merchantPhone)

                if (this.ruleForm.merchantPhone != '') {
                    if (!this.checkPhone()) {
                        this.$message.error("请输入正确的手机号")
                    } else {
                        this.$axios.get("/api/message/provide/verification/send/"+this.ruleForm.merchantPhone).then((res)=>{
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
                    }

                } else {
                    this.$message.error("请填写手机号！！！")
                }


            },
            handleAvatarSuccess_avatar(res, file) {
                this.avatar = URL.createObjectURL(file.raw);
                this.ruleForm.merchantAvatar = res.data;
            },
            handleAvatarSuccess_bL(res, file) {
                this.businessLicensePic = URL.createObjectURL(file.raw);
                this.ruleForm.merchantBusinessLicense = res.data;
            },
            handleAvatarSuccess_pc(res, file) {
                this.picUrl = URL.createObjectURL(file.raw);
                this.ruleForm.pharmacyAvatar = res.data;
            },
            handleAvatarSuccess_idCard(res, file) {
                this.idCardPic = URL.createObjectURL(file.raw);
                this.ruleForm.merchantIdCardPic = res.data;
            },
            handleAvatarSuccess_bank(res, file) {
                this.bankAccountPic = URL.createObjectURL(file.raw);
                this.ruleForm.merchantBankAccount = res.data;
            },
            handleAvatarSuccess_drug(res, file) {
                this.drugLicensePic = URL.createObjectURL(file.raw);
                this.ruleForm.merchantDrugLicense = res.data;
            },
            merchantRegister(){
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        let url = "/api/message/provide/merchant/register";
                        this.$axios.post(url, this.loginForm).then((res) => {
                            if (res.data.code == 200) {
                                console.log(res.data)
                                this.$message.success(res.data.message)
                                // this.$store.dispatch('setUser', res.data.data)
                                // localStorage.setItem('token', res.data.token)
                                // localStorage.setItem("user",JSON.stringify(res.data.data))
                            } else {
                                this.$message.error(res.data.message)
                                this.ruleForm.merchantPassword = this.password2
                            }
                        })
                    }
                })
            },
            back(){
              this.display = this.display - 1;
              this.active = this.active - 1;
            },
            next() {
                this.display = this.display + 1;
                this.active = this.active + 1;
                if (this.display == 2) {
                    this.getProvince();
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            register(){
                console.log(this.ruleForm)
                console.log(11111)
                if(this.ruleForm.merchantName != '' && this.ruleForm.merchantSex != '') {
                    // if (this.ruleForm.merchantPassword != this.password2) {
                    //     this.$message.error("2次密码不一致，请仔细检查输入密码")
                    // }else
                        if (!this.checkCard()){
                        this.$message.error("你的年龄不符合注册，该系统适用于16到70周岁的用户")
                    } else {
                        let url = "/api/message/provide/merchant/register";
                        this.ruleForm.merchantPassword = this.$md5(this.ruleForm.merchantPassword);
                        this.ruleForm.pharmacyAddress = this.provinceCode + "_" + this.cityCode + "_" + this.countryCode;
                        console.log(this.ruleForm)
                        this.$axios.post(url, this.ruleForm).then((res)=>{
                            if (res.data.code == 200) {
                                this.$message.success(res.data.message)
                                this.sleep(500);
                                this.display = 4;
                                this.active = this.active + 1;
                            } else {
                                this.$message.error(res.data.message)
                            }

                        })
                    }
                } else {
                    this.$message.error("请将必须填写的参数填写完成，")
                }
            },
            getProvince() {
                this.$axios.post("/api/message/provide/province/getAllProvince").then((res)=> {
                    this.province = res.data.data
                })
            },
            getCity(val) {
                this.$axios.post("/api/message/provide/city/getCity/"+val).then((res)=> {
                    this.city = res.data.data
                    console.log(res.data)
                    console.log(res.data.data)
                })
            },
            getCounty(val) {
                this.$axios.post("/api/message/provide/county/getCounty/"+val).then((res)=> {
                    this.county = res.data.data
                    console.log(res)
                    console.log(res.data.data)
                })
            },
            seleProvince() {
                console.log(this.provinceCode)
                this.getCity(this.provinceCode);
            },
            seleCity() {
                this.getCounty(this.cityCode);
            },

            checkPhone(){
                let re = /^[1][3,4,5,7,8][0-9]{9}$/;
                let str = this.ruleForm.merchantPhone;
                if(re.test(str)){
                    return true;

                }else {
                    return false;
                }
            },

            checkCard() {
                if(!this.ruleForm.merchantIdCard)
                    return;
                let CardId = this.ruleForm.merchantIdCard;
                if(CardId.length == 15) {
                    if(this.is15Card(CardId)) {
                        // this.go(CardId.length);
                    }
                    else {
                        return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'});
                    }
                } else if (CardId.length == 18) {
                    let a_iden = CardId.split("");
                    if (this.is18Card(CardId) && this.is18CardEnd(a_iden) ) {
                        // this.go(CardId.length);
                        return this.is18Card(CardId);
                    }
                    else {
                        return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'});
                    }
                } else {
                    return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'});
                }
            },

            // 检测18位身份证号最后一位是否符合要求
            is18CardEnd(a_idCard) {
                let sum = 0;
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10;
                }
                for ( var i = 0; i < 17; i++) {
                    sum += this.Wi[i] * a_idCard[i];
                }
                let valCodePosition = sum % 11;
                if (a_idCard[17] == this.ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            },
            // 验证最后一位校正码
            is18Card(idCard18){
                let year =  idCard18.substring(6,10);
                let month = idCard18.substring(10,12);
                let day = idCard18.substring(12,14);
                let temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
                if(temp_date.getFullYear()!=parseFloat(year)
                    ||temp_date.getMonth()!=parseFloat(month)-1
                    ||temp_date.getDate()!=parseFloat(day)){
                    return false;
                }else{
                    return true;
                }
            },
            is15Card(idCard15){
                let year =  idCard15.substring(6,8);
                let month = idCard15.substring(8,10);
                let day = idCard15.substring(10,12);
                let temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
                if(temp_date.getYear()!=parseFloat(year)||temp_date.getMonth()!=parseFloat(month)-1 ||temp_date.getDate()!=parseFloat(day)) {
                    return false;
                }else{
                    return true;
                }
            },
            sleep(numberMillis) {
                var now = new Date();
                var exitTime = now.getTime() + numberMillis;
                while (true) {
                    now = new Date();
                    if (now.getTime() > exitTime)
                        return;
                }
            },

        }

    }
</script>

<style scoped>
    .el-row{
        margin-bottom: 10px;
    }
    .el-col {
        border-radius: 2px;
    }
    .grid-content {
        border-radius: 10px;
        min-height: 30px;
    }
    .but {
        width: 25%;
        height: 40px;
        margin-left: 5px;
    }
</style>
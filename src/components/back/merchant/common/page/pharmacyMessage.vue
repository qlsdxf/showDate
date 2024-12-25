<template>
    <div style="text-align: center;width: 100%" class="au_to_2">

        <el-form :model="ruleForm"  label-width="100px"  v-if="display == 1?true:false">
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 35%" >
                    <div class="grid-content">
                        <el-form-item label="店铺名称"  >
                            <el-input v-model="ruleForm.pharmacyName"   placeholder="店铺名称"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 35%" >
                    <div class="grid-content">
                        <el-form-item label="选则省份"  >
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

                <el-col style="margin-left:1%;width: 35%" >
                    <div class="grid-content">
                        <el-form-item label="详细地址信息"  >
                            <el-input v-model="ruleForm.pharmacyDetailedAddress"   placeholder="输入详细地址"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 35%" >
                    <div class="grid-content">
                        <el-form-item label="店铺头像"  >
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
                    </div>
                </el-col>



            </el-row>


            <el-row style="width: 100%">
                <el-col :span="12" :offset="2">
                    <el-form-item>
                        <el-button type="primary" @click="changeMessage">立即修改</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>




    </div>
</template>

<script>


    export default {
        mounted(){
            this.pharmacy = JSON.parse(localStorage.getItem('pharmacy'))
            this.pharmacy = JSON.parse(localStorage.getItem('pharmacy'))
            if (this.pharmacy == undefined) {
                this.$router.push("/merchantLogin")
            }
            this.ruleForm = this.pharmacy;
            this.businessLicensePic = this.ruleForm.merchantBusinessLicense
            this.bankAccountPic = this.ruleForm.merchantBankAccount
            this.drugLicensePic = this.ruleForm.merchantDrugLicense
            this.idCardPic = this.ruleForm.merchantIdCard
            console.log(this.ruleForm)
            // this.ruleForm.merchantPassword = ''
            // this.avatar = this.ruleForm.merchantAvatar
        },
        data() {
            return {
                content:'获取验证码',
                choice:'',
                pharmacy:{},
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
            changeMessage(){

            },
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
                        this.loginForm.pharmacy.pharmacyStatus = null
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
    .au_to_2{
        position: fixed;
        width: 100%;
        height: 80%;
        overflow-y: scroll;
    }
    .avatar {
        width: 278px;
        height: 278px;
        display: block;
    }
    .grid-content {
        border-radius: 10px;
        min-height: 30px;
    }
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
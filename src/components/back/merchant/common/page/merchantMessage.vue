<template>
    <div class="mer" >

        <el-form :model="ruleForm"  label-width="100px" style="margin-top: 20px;" >
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="姓名"  prop="name">
                            <el-input v-model="ruleForm.merchantName"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="身份证"prop="merchantIdCard"  style="width: 98%;">
                            <el-input v-model="ruleForm.merchantIdCard"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="手机号"  prop="merchantPhone" style="width: 98%;">
                            <el-input v-model="ruleForm.merchantPhone" disabled></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="选择性别" >
                            <el-select v-model="ruleForm.merchantSex" placeholder="请选择" >
                                <el-option
                                        v-for="item in sex"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="密码"  style="width: 98%;" >
                            <el-input v-model="ruleForm.merchantPassword" type="password"  placeholder="密码位数不能于8位"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="重复密码" style="width: 98%;" >
                            <el-input v-model="password2" type="password"  placeholder="再次输入密码"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="商家头像" prop="avator">
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


                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="店铺名称"  >
                            <el-input v-model="ruleForm.pharmacyName"   placeholder="店铺名称"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="选则省份"  >
                            <select  v-model="provinceCode" @change="seleProvince"  :selected="provinceCode">
                                <option disabled value="">请选择省份</option>
                                <option  v-for="pro of province" :key="pro.provinceId" :value="pro.provinceId" :label="pro.provinceName"></option>
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
                        <el-form-item label="详细地址信息"  >
                            <el-input v-model="ruleForm.pharmacyDetailedAddress"   placeholder="输入详细地址"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 45%" >
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

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="身份证复印件"  >
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
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="营业执照"  >
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
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="银行开户许可"  >
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
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="药品经营许可证"  >
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
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%;margin-top: 100px">
                <el-col :span="12" :offset="4">
                    <el-form-item>
                        <el-button type="primary" @click="changeMessage">修改信息</el-button>
                        <el-button type="primary" @click="changeMessage">刷新状态</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>

<script>


    export default {
        mounted(){
            let data1 = "{" + localStorage.getItem('pharmacy').replaceAll("{","").replaceAll("}","") + ",";
            let data2 =  localStorage.getItem('merchant').replaceAll("{","").replaceAll("}","") + "}";
            this.message = JSON.parse(data1 + data2)
            if (this.message == undefined) {
                this.$router.push("/merchantLogin")
            }
            // console.log(this.message)

            this.ruleForm = this.message;
            console.log(this.ruleForm)
            this.businessLicensePic = this.ruleForm.merchantBusinessLicense
            this.bankAccountPic = this.ruleForm.merchantBankAccount
            this.drugLicensePic = this.ruleForm.merchantDrugLicense
            this.idCardPic = this.ruleForm.merchantIdCardPic
            this.picUrl = this.ruleForm.pharmacyAvatar
            this.ruleForm.merchantPassword = ''
            this.avatar = this.ruleForm.merchantAvatar


            this.provinceCode = this.ruleForm.pharmacyAddress.split("_")[0];
            this.cityCode = this.ruleForm.pharmacyAddress.split("_")[1];
            this.countryCode = this.ruleForm.pharmacyAddress.split("_")[2];
            this.getProvince();
            this.seleProvince();
            this.seleCity();
        },
        data() {
            return {
                content:'获取验证码',
                choice:'',
                active:0,
                sex:[
                    {
                        value: 1,
                        label: '男'
                    },
                    {
                        value: 2,
                        label: '女'
                    }
                ],
                avatar:'',
                picUrl:'',
                businessLicensePic:'',
                bankAccountPic:'',
                drugLicensePic:'',
                idCardPic:'',
                merChant:'',
                runNum:60,
                merchant:{},
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
                password2:'',
                message:{},
                pharmacy:{},
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
            handleAvatarSuccess_avatar(res, file) {
                this.avatar = res.data;
                this.ruleForm.merchantAvatar = res.data;
            },
            handleAvatarSuccess_bL(res, file) {
                this.businessLicensePic = res.data;
                this.ruleForm.merchantBusinessLicense = res.data;
            },
            handleAvatarSuccess_pc(res, file) {
                this.picUrl = res.data;
                this.ruleForm.pharmacyAvatar = res.data;
            },
            handleAvatarSuccess_idCard(res, file) {
                this.idCardPic = res.data;
                this.ruleForm.merchantIdCardPic = res.data;
            },
            handleAvatarSuccess_bank(res, file) {
                this.bankAccountPic = res.data;
                this.ruleForm.merchantBankAccount = res.data;
            },
            handleAvatarSuccess_drug(res, file) {
                this.drugLicensePic = res.data;
                this.ruleForm.merchantDrugLicense = res.data;
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
                    console.log(res)
                    console.log(res.data.data)
                })
            },
            seleProvince() {
                this.getCity(this.provinceCode);
            },
            seleCity() {
                this.getCounty(this.cityCode);
            },

            handleAvatarSuccess_avatar(res, file) {
                this.avatar = res.data;
                this.ruleForm.merchantAvatar = res.data;
            },
            changeMessage(){
                this.ruleForm.pharmacyStatus =  null
                this.ruleForm.pharmacyAddress = this.provinceCode + "_" + this.cityCode + "_" + this.countryCode;
                if (this.ruleForm.merchantPassword == '' && this.password2 == '') {
                    this.ruleForm.merchantPassword = null
                    this.$axios.post("/api/message/provide/merchant/updateMerchant",this.ruleForm).then((res)=>{
                        if(res.data.code == 200) {
                            this.$message.success("操作成功!!!");
                            this.merchant = res.data.data[1];
                            this.pharmacy = res.data.data[0];
                            console.log(res.data.data)
                            console.log(this.merchant)
                            console.log(this.pharmacy)

                            localStorage.setItem("pharmacy",JSON.stringify(this.pharmacy))
                            localStorage.setItem("merchant",JSON.stringify(this.merchant))
                            location.reload();
                        }
                    })
                } else {
                    if (this.ruleForm.merchantPassword != this.password2 ){
                        this.$message.success("2次密码不一致")
                    } else{
                        console.log(this.ruleForm)
                        this.ruleForm.merchantPassword = this.$md5(this.ruleForm.merchantPassword)
                        console.log(this.ruleForm)

                    }
                }



            },



        }

    }
</script>

<style scoped>
    .mer{
        position: fixed;
        text-align: center;
        width: 80%;
        height: 80%;
        overflow-y: scroll;
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
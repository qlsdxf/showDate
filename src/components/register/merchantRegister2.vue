<!--<template>-->
    <!--<div class="main2">-->
        <!--<div style="height: 30px"></div>-->
        <!--<div class="body2">-->
            <!--<div><span style="font-weight: bold;color: black;font-size: 28px;margin-bottom: 10px">商家注册</span></div>-->
            <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px" class="demo-ruleForm">-->
                <!--<el-form-item label="活动名称" prop="name">-->
                    <!--<el-input v-model="ruleForm.merchantName"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="商家昵称" prop="merchantName" required style="width: 98%;">-->
                    <!--<el-input v-model="ruleForm.merchantName"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="手机号" required prop="merchantPhone" style="width: 98%;">-->
                    <!--<el-input v-model="ruleForm.merchantPhone"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="验证码"prop="verification" required style="width: 98%;">-->
                    <!--<el-input v-model="ruleForm.verification" style="width: 80%;"></el-input><button  class="but" @click="">{{content}}</button>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="身份证"prop="merchantIdCard" required style="width: 98%;">-->
                    <!--<el-input v-model="ruleForm.merchantIdCard"></el-input>-->
                <!--</el-form-item>-->

                <!--<el-form-item label="密码"  prop="password" style="width: 98%;">-->
                    <!--<el-input v-model="ruleForm.merchantPhone" type="password"></el-input>-->
                <!--</el-form-item>-->

                <!--<el-form-item label="重复密码"  prop="password" style="width: 98%;">-->
                    <!--<el-input v-model="password2" type="password"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="选择店铺地址" required prop="address">-->
                    <!--<select  v-model="ruleForm.provinceCode" >-->
                        <!--<option disabled value="">请选择省份</option>-->
                        <!--<option  v-for="pro of province" :key="pro.code" :value="pro.name" :label="pro.name"></option>-->
                    <!--</select>-->
                    <!--<select  v-model="ruleForm.cityCode" style="margin-left: 15px">-->
                        <!--<option disabled value="">请选择市</option>-->
                        <!--<option v-for="cy of city" :key="cy.code" :value="cy.name" :label="cy.name"></option>-->
                    <!--</select>-->
                    <!--<select  v-model="ruleForm.countryCode"  style="margin-left: 15px">-->
                        <!--<option disabled value="">请选择县/区</option>-->
                        <!--<option v-for="ct of country" :key="ct.code" :value="ct.name" :label="ct.name"></option>-->
                    <!--</select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="详细地址" prop="desc">-->
                    <!--<el-input v-model="ruleForm.detailedAddress"></el-input>-->
                <!--</el-form-item>-->

                <!--<el-form-item label="上传头像" prop="avatar">-->
                    <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--ref='pic_one'-->
                            <!--:auto-upload='false'-->
                            <!--:multiple='false'-->
                            <!--:limit="1"-->
                            <!--:http-request="upload1"-->
                            <!--accept="image/jpeg,image/gif,image/png,image/jpg"-->
                            <!--action=''-->
                            <!--:on-change='change1'-->
                            <!--:show-file-list="false"-->
                    <!--&gt;-->
                        <!--<img v-if="avatarUrl" :src="avatarUrl" class="avatar" style="width: 100px;height: 100px">-->
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>-->
                    <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="互联网药品信息服务资格证书" prop="desc">-->
                    <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--ref='pic_tow'-->
                            <!--:auto-upload='false'-->
                            <!--:multiple='false'-->
                            <!--:limit="1"-->
                            <!--:http-request="upload2"-->
                            <!--accept="image/jpeg,image/gif,image/png,image/jpg"-->
                            <!--action=''-->
                            <!--:on-change='change2'-->
                            <!--:show-file-list="false"-->
                    <!--&gt;-->
                        <!--<img v-if="merchantBusinessLicenseUrl" :src="merchantBusinessLicenseUrl" class="avatar" style="width: 100px;height: 100px">-->
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>-->
                    <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="互联网药品交易服务机构资格证" prop="desc">-->
                    <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--ref='pic_three'-->
                            <!--:auto-upload='false'-->
                            <!--:multiple='false'-->
                            <!--:limit="1"-->
                            <!--:http-request="upload3"-->
                            <!--accept="image/jpeg,image/gif,image/png,image/jpg"-->
                            <!--action=''-->
                            <!--:on-change='change3'-->
                            <!--:show-file-list="false"-->
                    <!--&gt;-->
                        <!--<img v-if="merchantTradeUrl" :src="merchantTradeUrl" class="avatar" style="width: 100px;height: 100px">-->
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>-->
                    <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="merchantRegister2('ruleForm')">立即创建</el-button>-->
                    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->

        <!--</div>-->
        <!--<div style="height: 30px"></div>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data() {-->
            <!--return {-->
                <!--content:'获取验证码',-->
                <!--password2:'',-->
                <!--avatarUrl:'',-->
                <!--merchantBusinessLicenseUrl:'',-->
                <!--merchantTradeUrl:'',-->
                <!--choice:'',-->
                <!--province:[-->
                    <!--{name:"北京",-->
                        <!--code:"100010"}-->
                <!--],-->
                <!--city:[-->
                    <!--{name:"东城区",-->
                        <!--code:"100011"}-->
                <!--],-->
                <!--country:[-->
                    <!--{name:"故宫北门",-->
                        <!--code:"100012"}-->
                <!--],-->
                <!--ruleForm: {-->
                    <!--merchantName: '',-->
                    <!--merchantPhone: '',-->
                    <!--verification: '',-->
                    <!--merchantSex:'',-->
                    <!--merchantEmail:'',-->
                    <!--avatar:'',-->
                    <!--avatarName:'',-->
                    <!--merchantPassword:'',-->
                    <!--merchantAvatar:'',-->
                    <!--merchantIdCard:'',-->
                    <!--address: '',-->
                    <!--detailedAddress:'',-->
                    <!--merchantAge:'',-->
                    <!--provinceCode:'',-->
                    <!--cityCode:'',-->
                    <!--countryCode:'',-->
                    <!--merchantBusinessLicense:'',-->
                    <!--merchantTrade:'',-->
                    <!--merchantBusinessLicenseName:'',-->
                    <!--merchantTradeName:'',-->
                <!--},-->
                <!--rules: {-->
                    <!--name: [-->
                        <!--{ required: true, message: '请输入活动名称', trigger: 'blur' },-->
                        <!--{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }-->
                    <!--],-->
                    <!--region: [-->
                        <!--{ required: true, message: '请选择活动区域', trigger: 'change' }-->
                    <!--],-->
                    <!--date1: [-->
                        <!--{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }-->
                    <!--],-->
                    <!--date2: [-->
                        <!--{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }-->
                    <!--],-->
                    <!--type: [-->
                        <!--{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }-->
                    <!--],-->
                    <!--resource: [-->
                        <!--{ required: true, message: '请选择活动资源', trigger: 'change' }-->
                    <!--],-->
                    <!--desc: [-->
                        <!--{ required: true, message: '请填写活动形式', trigger: 'blur' }-->
                    <!--]-->
                <!--}-->
            <!--};-->
        <!--},-->
        <!--methods: {-->
            <!--merchantRegister(){-->
                <!--this.$refs.loginForm.validate(valid => {-->
                    <!--if (valid) {-->
                        <!--let url = "/api/api/user/register";-->
                        <!--this.$axios.post(url, this.loginForm).then((res) => {-->
                            <!--if (res.data.code == 200) {-->
                                <!--console.log(res.data)-->
                                <!--this.$message.success(res.data.message)-->
                                <!--// this.$store.dispatch('setUser', res.data.data)-->
                                <!--// localStorage.setItem('token', res.data.token)-->
                                <!--// localStorage.setItem("user",JSON.stringify(res.data.data))-->
                            <!--} else {-->
                                <!--this.$message.error(res.data.message)-->
                            <!--}-->
                        <!--})-->
                    <!--}-->
                <!--})-->
            <!--},-->
            <!--resetForm(formName) {-->
                <!--this.$refs[formName].resetFields();-->
            <!--},-->
            <!--readAvatar(){-->
                <!--let That = this;-->
                <!--// this.$refs['importFile'].$refs['fileRefs'].$refs['upload-inner'].handleClick()触发选择文件-->
                <!--let file = this.$refs.pic_one.$refs['upload-inner'].$refs.input; //获取文件数据-->
                <!--let fileList = file.files;-->
                <!--this.ruleForm.avatarName = fileList[0].name;-->
                <!--let imgFile;-->
                <!--let reader = new FileReader();   //html5读文件-->
                <!--reader.readAsDataURL(fileList[0]); //转BASE64-->
                <!--reader.onload = function (e) {    //读取完毕后调用接口-->
                    <!--imgFile = e.target.result;-->
                    <!--That.ruleForm.avatar=imgFile;-->
                    <!--That.avatarUrl = imgFile;-->
                <!--}-->
            <!--},-->
            <!--readMerchantBusinessLicense(){-->
                <!--let That = this;-->
                <!--let file = this.$refs.pic_tow.$refs['upload-inner'].$refs.input; //获取文件数据-->
                <!--let fileList = file.files;-->
                <!--this.ruleForm.merchantBusinessLicenseName = fileList[0].name;-->
                <!--let imgFile;-->
                <!--let reader = new FileReader();   //html5读文件-->
                <!--reader.readAsDataURL(fileList[0]); //转BASE64-->
                <!--reader.onload = function (e) {    //读取完毕后调用接口-->
                    <!--imgFile = e.target.result;-->
                    <!--That.ruleForm.merchantBusinessLicense=imgFile;-->
                    <!--That.merchantBusinessLicenseUrl = imgFile;-->
                <!--}-->
            <!--},-->
            <!--readMerchantTrade(){-->
                <!--let That = this;-->
                <!--let file = this.$refs.pic_three.$refs['upload-inner'].$refs.input; //获取文件数据-->
                <!--let fileList = file.files;-->
                <!--this.ruleForm.merchantTradeName = fileList[0].name;-->
                <!--let imgFile;-->
                <!--let reader = new FileReader();   //html5读文件-->
                <!--reader.readAsDataURL(fileList[0]); //转BASE64-->
                <!--reader.onload = function (e) {    //读取完毕后调用接口-->
                    <!--imgFile = e.target.result;-->
                    <!--That.ruleForm.merchantTrade=imgFile;-->
                    <!--That.merchantTradeUrl=imgFile;-->

                <!--}-->
            <!--},-->
            <!--getProvince() {-->
                <!--this.$axios.post("/api/api/user/getProvince").then((res)=> {-->
                    <!--this.province = res.data.data-->
                <!--})-->
            <!--},-->
            <!--getCity(val) {-->
                <!--this.$axios.post("/api/api/user/getCity/"+val).then((res)=> {-->
                    <!--this.city = res.data.data-->
                    <!--console.log(res.data)-->
                    <!--console.log(res.data.data)-->
                <!--})-->
            <!--},-->
            <!--getCounty(val) {-->
                <!--this.$axios.post("/api/api/user/getCounty/"+val).then((res)=> {-->
                    <!--this.county = res.data.data-->
                    <!--console.log(res)-->
                    <!--console.log(res.data.data)-->
                <!--})-->
            <!--},-->
            <!--seleProvince() {-->
                <!--console.log(this.provinceCode)-->
                <!--this.getCity(this.provinceCode);-->
            <!--},-->
            <!--seleCity() {-->
                <!--this.getCounty(this.cityCode);-->
            <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style scoped>-->

    <!--{-->
        <!--margin: 0;-->
        <!--padding: 0;-->
    <!--}-->
    <!--.main2{-->
        <!--background: url("../../assets/bj.jpg");-->
        <!--background-size: 100% 100%;-->
        <!--height: auto;-->
        <!--width: 100%;-->
    <!--}-->
    <!--.body2{-->
        <!--background-color: beige;-->
        <!--height: 100%;-->
        <!--padding-bottom: 5px;-->
        <!--width: 80%;-->
        <!--margin-left: 10%;-->

    <!--}-->
    <!--.but {-->
        <!--width: 15%;-->
        <!--height: 35px;-->
        <!--margin-left: 5px;-->
    <!--}-->
    <!--.but:hover{-->
        <!--cursor:pointer;-->
    <!--}-->
<!--</style>-->
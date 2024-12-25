<template>
    <div style="margin-top: 5%;text-align: center;width: 100%" >
        <el-form :model="form"  ref="form" label-width="100px" style="margin-top: 20px;">
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="医生昵称"   style="width: 98%;" >
                            <el-input v-model="form.doctorName" placeholder="医生昵称"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="身份证"  style="width: 98%;">
                            <el-input v-model="form.doctorIdCard"  placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="手机号"  style="width: 98%;">
                            <el-input v-model="form.doctorPhone"  placeholder="请输入手机号"></el-input>
                        </el-form-item>

                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="验证码"  style="width: 98%;">
                            <el-input v-model="form.verification" style="width: 72%;"  placeholder="输入验证码"></el-input>
                            <el-button  :disabled="display===1?false:true" class="but" @click="getVerification()" style="font-weight: bold">{{content}}</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="新密码"  style="width: 98%;" >
                            <el-input v-model="form.doctorPassword" type="password"  placeholder="密码位数不能于8位" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="重复密码" style="width: 98%;" >
                            <el-input v-model="password" type="password"  placeholder="再次输入密码" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="选择性别" >
                            <el-select v-model="form.doctorSex" placeholder="请选择" >
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

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item  label="详细地址" >
                            <el-input v-model="form.doctorAddress"  placeholder="请填入详细地址"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" v-if="" >
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
                <el-col style="margin-left:1%;width: 45%"  >
                    <div class="grid-content " :disabled="dis">
                        <el-form-item label="上传执业医师资格证书(具有本人照片的页面的照片)" prop="avator" label-width="180px">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://124.222.128.245:955/uploadImageFile"
                                    :show-file-list="false"
                                    accept="image/jpeg,image/gif,image/png,image/jpg"
                                    :on-success="handleAvatarSuccess_Li">
                                <img v-if="doctorsLicense" :src="doctorsLicense" class="avatar" style="width: 100px;height: 100px">
                                <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col :span="12" :offset="4">
                    <el-form-item>
                        <el-button type="primary" @click="updateMessage">修改信息</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    import md5 from 'js-md5'
    export default {
        mounted(){
            if(localStorage.getItem("doctor") == undefined) {
                this.$router.push("/doctorLogin")
            }

            this.doctor = JSON.parse(localStorage.getItem("doctor"))
            this.form = JSON.parse(localStorage.getItem("doctor"))

            this.avatar = this.form.doctorAvatar
            this.doctorsLicense = this.form.doctorCertificate
            this.form.doctorPassword = "";
            this.form.doctorSex = 1
            this.password = ""
            if (this.doctor.doctorStatus != 1) {
                this.dis = false;
            }
        },
        data() {


            return {
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
                content:'获取验证码',
                choice:'',
                avatar:'',
                doctorsLicense:'',
                picUrl:'',
                runNum:60,
                display:1,
                dis:true,
                doctor:{},
                form: {
                    // doctorAvatar:'',
                    // doctorName: '浅蓝色的幸福',
                    // doctorPhone: '13044124565',
                    // verification: '4586',
                    // doctorSex:'1',
                    // doctorCertificate:'',
                    // doctorPassword:'1999319xjj',
                    // doctorIdCard:'362202199903193316',
                    // doctorSchool: '南昌航空大学',
                    // doctorAddress:'江西省宜春市丰城市梅林镇',
                },
                password:'',
                value: ''
            };
        },
        methods: {

            handleAvatarSuccess_avatar(res, file) {
                this.avatar = URL.createObjectURL(file.raw);
                this.form.doctorAvatar = res.data;
            },
            handleAvatarSuccess_Li(res, file) {
                this.doctorsLicense = URL.createObjectURL(file.raw);
                this.form.doctorCertificate = res.data;
            },

            // changeDoctor(){
            //     if(this.form.doctorName != '' && this.form.doctorSex != '' && this.form.doctorAvatar != ''
            //         && this.form.doctorCertificate != '' && this.form.doctorIdCard != '') {
            //         if (this.form.doctorPassword != this.password2) {
            //             this.$message.error("2次密码不一致，请仔细检查输入密码")
            //         }else if (!this.checkCard()){
            //             this.$message.error("你的年龄不符合注册，该系统适用于16到70周岁的用户")
            //         }
            //         let url = "/provide/provide/doctor/update";
            //         this.form.doctorPassword = this.$md5(this.form.doctorPassword);
            //         console.log(this.form)
            //         this.$axios.post(url, this.form).then((res)=>{
            //             if (res.data.code == 200) {
            //                 this.$message.success(res.data.message)
            //                 localStorage.setItem("doctor")
            //             } else {
            //                 this.form.doctorPassword = this.password2;
            //                 this.$message.error(res.data.message)
            //             }
            //
            //         })
            //     } else {
            //         this.$message.error("请将必须填写的参数填写完成，")
            //     }
            // },

            updateMessage() {

                let data = {

                };
                if (this.doctor.doctorPhone != this.form.doctorPhone){
                    if (this.form.verification == null) {
                        this.$message.error("1请填写完数据!!!")
                    }else {
                        data.doctorPhone = this.form.doctorPhone
                        data.verification = this.form.verification
                    }
                }
                if(this.doctor.doctorName != this.form.doctorName){
                    data.doctorName = this.form.doctorName
                }
                if (this.doctor.doctorAvatar != this.form.doctorAvatar){
                    data.doctorAvatar = this.form.doctorAvatar
                }
                if (this.doctor.doctorSex != this.form.doctorSex){
                    data.doctorSex = this.form.doctorSex
                }
                if (this.doctor.doctorCertificate != this.form.doctorCertificate){
                    data.doctorCertificate = this.form.doctorCertificate
                }
                if (this.doctor.doctorIdCard != this.form.doctorIdCard){
                    data.doctorIdCard = this.form.doctorIdCard
                }
                if (this.doctor.doctorSchool != this.form.doctorSchool){
                    data.doctorSchool = this.form.doctorSchool
                }
                if (this.doctor.doctorAddress != this.form.doctorAddress){
                    data.doctorAddress = this.form.doctorAddress
                }

                if (this.form.doctorPassword != '' && this.password != '' ){
                    data.doctorPassword = this.$md5(this.form.doctorPassword)
                }
                data.doctorId = this.doctor.doctorId;
                console.log(data)
                this.$axios.post("/api/message/provide/doctor/updateDoctor",data).then((res)=>{
                    if(res.data.code == 200) {
                        this.$message.success("修改成功!!!");
                        this.form = res.data.data;
                        this.doctor = res.data.data;
                        localStorage.setItem("doctor",JSON.stringify(res.data.data))
                        location.reload();
                    }
                })
            },

            getVerification(){
                console.log(this.form.doctorPhone)
                if (this.form.doctorPhone != '') {
                    if (!this.checkPhone()) {
                        this.$message.error("请输入正确的手机号")
                    } else {
                        this.$axios.get("/api/message/provide/verification/send/"+this.form.doctorPhone).then((res)=>{
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


            },
            checkPhone(){
                let re = /^[1][3,4,5,7,8][0-9]{9}$/;
                let str = this.form.doctorPhone;
                if(re.test(str)){
                    return true;

                }else {
                    return false;
                }
            },

            checkCard() {
                if(!this.form.doctorIdCard) return;
                let CardId = this.form.doctorIdCard;
                if(CardId.length == 15) {
                    if(this.is15Card(CardId)) {
                        this.go(CardId.length);
                    }
                    else {
                        return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'});
                    }
                } else if (CardId.length == 18) {
                    let a_iden = CardId.split("");
                    if (this.is18Card(CardId) && this.is18CardEnd(a_iden) ) {
                        this.go(CardId.length);
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

            // 实现自动生成生日，性别，年龄
            go(val) {
                let iden = this.form.doctorIdCard;
                let sex = null;
                let birth = null;
                let myDate = new Date();
                let month = myDate.getMonth() + 1;
                let day = myDate.getDate();
                let age = 0;
                if(val===18){
                    age = myDate.getFullYear() - iden.substring(6, 10) - 1;
                    sex = iden.substring(16,17);
                    birth = iden.substring(6,10)+"-"+iden.substring(10,12)+"-"+iden.substring(12,14);
                    if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day)
                        age++;
                    if(age>=16 && age <= 70){
                        return true;
                    }else{
                        return false;
                    }

                }
                if(val===15){
                    age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
                    sex = iden.substring(13,14);
                    birth = "19"+iden.substring(6,8)+"-"+iden.substring(8,10)+"-"+iden.substring(10,12);
                    if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day)
                        age++;
                    if(age>=18){
                        return true;
                        this.$message.success("已成年")
                    }else{
                        return false;
                        this.$message.error("未成年")
                    }
                }

            }

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

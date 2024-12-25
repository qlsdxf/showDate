<template>
    <div style="margin-top: 5%;text-align: center;width: 100%" >
        <el-form :model="form"  ref="form" label-width="100px" style="margin-top: 20px;">
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="用户昵称"required  required style="width: 98%;" >
                            <el-input v-model="form.userName" placeholder="用户昵称"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="身份证" required style="width: 98%;">
                            <el-input v-model="form.userIdCard"  placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="手机号" required style="width: 98%;">
                            <el-input v-model="form.userPhone"  placeholder="请输入手机号"></el-input>
                        </el-form-item>

                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="验证码" required style="width: 98%;">
                            <el-input v-model="form.verification" style="width: 72%;"  placeholder="输入验证码"></el-input>
                            <el-button  :disabled="display===1?false:true" class="but" @click="getVerification()" style="font-weight: bold">{{content}}</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="密码"  style="width: 98%;" required>
                            <el-input v-model="form.userPassword" type="password"  placeholder="密码位数不能于8位"></el-input>
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
                            <el-radio-group v-model="form.userSex" style="width: 150px;">
                                <el-radio label="1" value="1">男</el-radio>
                                <el-radio label="2" value="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="选择地址" required >
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
                        <el-form-item required label="详细地址" >
                            <el-input v-model="form.userDetailedAddress"  placeholder="请填入详细地址"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="上传头像" prop="avator">
                            <el-upload
                                    class="avatar-uploader"
                                    ref='pic'
                                    :auto-upload='false'
                                    :multiple='false'
                                    :limit="1"
                                    :http-request="upload"
                                    accept="image/jpeg,image/gif,image/png,image/jpg"
                                    action=''
                                    :on-change='change'
                                    :show-file-list="false"
                            >
                                <img v-if="picUrl" :src="picUrl" class="avatar" style="width: 100px;height: 100px">
                                <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col :span="12" :offset="6">
                    <el-form-item>
                        <el-button type="primary" @click="register('form')">立即注册</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
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
            this.getProvince();
        },
        data() {

            return {
                content:'获取验证码',
                choice:'',
                picUrl:'',
                runNum:60,
                provinceCode:'',
                cityCode:'',
                countryCode:'',
                display:1,
                form: {
                    userName: '浅蓝色的幸福',
                    userPhone: '17807060775',
                    verification: '4586',
                    userSex:'1',
                    userAvatar:'',
                    avatarName:'',
                    userPassword:'1999319xjj',
                    userIdCard:'362202199903193316',
                    userAddress: '',
                    userDetailedAddress:'江西省宜春市丰城市梅林镇',
                },
                password2:'1999319xjj',
                province:[],
                city:[],
                county:[],
                area: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
                    31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
                    43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
                    61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
                },
                Wi: [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2 ],
                ValideCode: [1,0,'X',9,8,7,6,5,4,3,2],
                value: ''
            };
        },
        methods: {
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
            register(){
                if(this.form.userName != '' && this.form.userSex != '' && this.provinceCode != '' && this.cityCode != '' && this.countryCode != '') {
                    if (this.form.userPassword != this.password2) {
                        this.$message.error("2次密码不一致，请仔细检查输入密码")
                    }else if (!this.checkCard()){
                        this.$message.error("你的年龄不符合注册，该系统适用于16到70周岁的用户")
                    }
                    let url = "/api/api/login/register";
                    this.form.userPassword = this.$md5(this.form.userPassword);
                    this.form.userAddress = this.provinceCode + "_" + this.cityCode + "_" + this.countryCode;
                    console.log(this.form)
                    this.$axios.post(url, this.form).then((res)=>{
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.sleep(500);
                            this.$router.push({
                                name:"login"
                            })
                        } else {
                            this.$message.error(res.data.message)
                        }

                    })

                } else {
                    this.$message.error("请将必须填写的参数填写完成，")
                }
            },
            getFile(){
                let That = this;
                let file = this.$refs.pic.$refs['upload-inner'].$refs.input; //获取文件数据
                let fileList = file.files;
                this.form.avatarName = fileList[0].name;
                let imgFile;
                let reader = new FileReader();   //html5读文件
                reader.readAsDataURL(fileList[0]); //转BASE64
                reader.onload = function (e) {    //读取完毕后调用接口
                    imgFile = e.target.result;
                    That.form.userAvatar=imgFile;
                    That.picUrl = imgFile;
                    console.log(That.picUrl)
                }
            },
            upload(){
                this.getFile();
            },
            change(){
                this.getFile();
            },
            getVerification(){
                console.log(this.form.userPhone)
                if (this.form.userPhone != '') {
                    if (!this.checkPhone()) {
                        this.$message.error("请输入正确的手机号")
                    } else {
                        this.$axios.get("/api/message/provide/verification/send/"+this.form.userPhone).then((res)=>{
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
                let str = this.form.userPhone;
                if(re.test(str)){
                    return true;

                }else {
                    return false;
                }
            },

            checkCard() {
                if(!this.form.userIdCard) return;
                let CardId = this.form.userIdCard;
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
                let iden = this.form.userIdCard;
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

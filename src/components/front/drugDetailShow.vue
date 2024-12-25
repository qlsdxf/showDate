<template>
    <div class="content-box">
        <div class="wrapper">
            <div class="search">
                <el-row :gutter="10" align="middle" style="height: 60px">
                    <el-col :span="6" style="line-height: 30px;" :offset="1" >
                        <div style="display: flex;flex-direction: row" @click='back' class="hov">
                            <el-image
                                    style="width: 30px; height: 30px;"
                                    src="http://124.222.128.245:955/image/药品259b0cacd.png"></el-image>
                            <span style="font-size: 14px;color: #999;margin-left: 5px">{{pharmacy.pharmacyName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" style="line-height: 30px;" :offset="10" v-if="showPerson == 1?true:false">
                        <div style="display: flex;flex-direction: row">
                            <span class="login" @click="login" >你好，请登录</span>
                            <el-divider direction="vertical" style="height: 30px"></el-divider>
                            <span style="font-size: 14px;color: #999;margin-left: 10px" class="login" @click="register">免费注册</span>
                            <el-divider direction="vertical"></el-divider>
                            <span class="login"style="font-size: 14px;color: #999;margin-left: 15px"  @click="order" >我的订单</span>
                            <el-divider direction="vertical"></el-divider>
                        </div>
                    </el-col>

                    <el-col :span="6" style="line-height: 30px;" :offset="10" v-if="showPerson == 2?true:false">
                        <div style="display: flex;flex-direction: row">
                            <el-image :src="user.userAvatar" style="width: 30px;height: 30px;border-radius: 50%"></el-image>
                            <span class="login" style="font-size: 14px;color: #999;margin-left: 15px"  >{{user.userName}}</span>

                            <el-divider direction="vertical"></el-divider>
                            <span class="login"style="font-size: 14px;color: #999;margin-left: 15px"  @click="order" >我的订单</span>
                            <el-divider direction="vertical"></el-divider>
                        </div>
                    </el-col>


                </el-row>
            </div>

            <div>
                <div style="margin-top: 5%;margin-left:5%;width:40%;float: left;">
                    <!--<img :src="drug.drugImage" style="width: 400px;height: 400px">-->
                    <el-carousel indicator-position="outside" style="width: 400px;height: 400px">
                        <el-carousel-item v-for="item in images" :key="item">
                            <img :src="item"  style="width: 400px;height: 400px">
                        </el-carousel-item>
                    </el-carousel>
                    <hr>
                    <div>
                        <el-row :gutter="10">
                            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"><el-button type="text" @click="">药品介绍</el-button></div></el-col>
                            <!--<el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"><el-button type="text" @click="">使用说明</el-button></div></el-col>-->
                        </el-row>
                    </div>
                    <div>

                        <span >{{drug.drugIntroduce}}</span>
                        <!--<span v-show="choice2">{{drug.superDrugUsageMethod}}</span>-->
                    </div>

                </div>
                <div style="margin-top: 5%;float: left;height: 90%;width:45%;margin-left: 50px">
                    <div style="width: 90%;height: 5%;font-size: 28px;font-weight: bolder">
                        <p>{{drug.drugName}}</p>

                    </div>
                    <div style="width: 90%;height: 6%;margin-top: 20px">
                        <p style="font-size: xx-large;color: red;background-color:rgb(221, 221, 221);padding: 20px">价格栏:<sapn style="margin-left: 10px">￥ {{drug.drugPrice}}</sapn></p>
                    </div>
                    <br>
                    <div style="width: 90%;height: 5%;">
                        <p style="margin-top: 15px">生产厂家: <span style="margin-left: 20px"> {{drug.drugFactory}}</span> </p>
                        <p style="margin-top: 15px">生产日期:  <span style="margin-left: 20px"> {{drug.drugCratetime}}</span></p>
                        <p style="margin-top: 15px">保质日期:<span style="margin-left: 20px">{{drug.drugExpiredtime}}</span></p>
                        <p style="margin-top: 15px">国家批准:<span style="margin-left: 20px">{{drug.drugApprovalNumber}}</span></p>
                        <p style="margin-top: 15px">药品类型:<span style="margin-left: 20px">{{drug.drugType}}</span></p>
                        <p style="margin-top: 15px">药品规格：<span style="margin-left: 20px">{{drug.drugSpecification}}</span></p>
                    </div>
                    <br>

                    <br>
                    <div style="width: 90%;height: 5%">购买数量&nbsp;
                        <el-input-number v-model="num" @change="changeNum" :min="1" :max="drug.drugNum" label="购买数量" ></el-input-number>
                    </div>
                    <br>
                    <div style="width: 90%;height: 5%">
                        <p>总金额栏:<span style="font-size: large;color: red;margin-left: 20px">{{allMoney}}</span></p>
                    </div>
                    <br>
                    <div style="width: 90%;height: 15%;margin-top: 50px;text-align: center">
                        <el-row>

                            <el-button type="danger" @click="buyDrug">立即购买</el-button>
                            <el-button type="danger" @click="dialogFormVisible =true" >举报药品</el-button>
                        </el-row>
                    </div>

                </div>
            </div>
            <el-dialog title="举报原因" :visible.sync="dialogFormVisible"  :modal="false">
                <el-input v-model="report.reportRespon"type="textarea" :rows="5" ></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="reportDrug">确定举报</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </el-dialog>

        </div>
        <div class="foot">
            <div class="allComment">
                <span class="comtent">全部评论</span><sapn style="font-size: 20px">(共{{totalNum}}条评论)</sapn>
            </div>
            <div v-if="totalNum > 0">
                <div  >
                    <el-row :gutter="10" v-for="(value, item) in comments" :key="item" style="border-bottom: solid 1px rgb(221, 221, 221);padding-bottom: 10px">
                            <el-col :span="2" :offset="2" style="margin-top: 20px">
                                <div>
                                    <el-avatar shape="square"  style="border: solid 1px rgb(221, 221, 221)" :size="80" :src="value.userAvatar"></el-avatar>
                                </div>
                                <div>{{value.userName}}</div>
                            </el-col>
                            <el-col :span="16" :offset="1" style="padding: 10px">
                                <div class="content">
                                    <p style="line-height: 50px;" v-if="value.commentContent.length > 100">{{value.commentContent}}</p>
                                </div>
                                <div class="content">
                                    <p style="line-height: 100px;" v-if="value.commentContent.length <= 100">{{value.commentContent}}</p>
                                </div>
                                <div>
                                    <p style="font-size: 12px;color: #B0B0B0;">{{value.commentCreateTime}}</p>
                                </div>
                            </el-col>

                    </el-row>
                </div>
                <div style="text-align: center">
                    <el-button v-if="totalNum>total" type="text" style="color: #8A8B99" class="loadMore" icon="el-icon-arrow-down"
                               @click="getMore">点击加载更多
                    </el-button>
                    <el-button v-if="totalNum==total" type="text" style="color: #8A8B99">已经到底了~~</el-button>
                </div>
            </div>
            <div v-if="totalNum == 0">
                <el-empty description="暂无评论"  ></el-empty>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drug-detail-show",
        mounted() {
            this.user = JSON.parse(localStorage.getItem("user"))
            console.log(this.user)
            if (this.user != null) {
                this.showPerson = 2;
            }

            if (this.$route.query.drug == undefined) {
                this.drug = JSON.parse(localStorage.getItem("drug"));
                console.log(this.drug)
            } else {
                this.drug = JSON.parse(this.$route.query.drug);
                console.log(this.drug)
            }
            this.images = this.drug.drugImage.split(",");
            console.log(this.images)
            this.getAllComment();
            this.getPharmacy();
            this.allMoney = this.drug.drugPrice
        },
        data() {
            return{
                drug:{},
                showPerson:1,
                user:{},
                num:1,
                allMoney:0,
                pharmacy:{},
                totalNum : 0,
                report:{},
                dialogFormVisible:false,
                total:5,
                images:[],
                comments:[],
                form: {
                    drugId: '',
                    drugName: '',
                    pharmacyId: '',
                    orderNum: '',
                    orderTotal: '',
                    userId: '',
                }

            }
        },
        methods:{
            login() {
                this.$router.push("/login")
            },
            order(){
                this.$router.push("/personCenter")
            },
            back(){
                this.$router.push({
                    path: '/drugDetail',
                    query: {
                        pharmacyId: this.pharmacy.pharmacyId,
                    }
                })
            },
            reportDrug(){
                let data = {
                    'reportUserId': this.user.userId,
                    'reportDrugId': this.drug.drugId,
                    'reportStatus': 0,
                    'reportRespon': this.report.reportRespon,
                }
                this.$axios.post('/api/message/provide/report/addReport/', data).then((res)=>{
                    this.$message.success("举报成功！！！")
                    this.dialogFormVisible = false
                })
            },
            register() {
                this.$router.push("/userRegiste")
            },
            changeNum(){
                this.allMoney = this.num * this.drug.drugPrice;
            },
            getPharmacy(){
                this.$axios.get('/api/message/provide/pharmacy/getPharmacyById/'+this.drug.drugPharmacyId).then((res)=>{
                    console.log(11)
                    console.log(res.data.data)
                    this.pharmacy = res.data.data
                })
            },
            getMore() {
                if (this.total + 5 > this.totalNum) {
                    this.total = this.totalNum;
                }else {
                    this.total = this.total + 5;
                }
                this.getAllComment()
            },
            getAllComment() {

                let data = {
                    'content': this.content,
                    'drugId':this.drug.drugId,
                    'pageNum': 1,
                    'pageSize': this.total,
                }
                console.log(data)
                this.$axios.post("/api/message/provide/comment/getAllComment",data).then((res)=>{
                    this.totalNum = res.data.data.total;
                    this.comments = res.data.data.records;
                    console.log(this.comments)
                })
            },
            buyDrug() {
                if (this.num > this.drug.drugNum) {
                    this.$message.error("超出库存，现在库存为："+ this.drug.drugNum)
                } else {
                    this.form.userId = this.user.userId;
                    this.form.drugId = this.drug.drugId;
                    this.form.drugName = this.drug.drugName;
                    this.form.orderNum = this.num;
                    this.form.orderTotal = this.allMoney;
                    this.$axios.post('/api/pay/provide/order/getOrder',this.form).then((res)=>{
                        console.log(res.data.data)
                        document.write(res.data.data)
                    })
                }

            }
        }
    }
</script>

<style scoped>
    
    .hov:hover{
        cursor: pointer;
    }


    .content{
        width: 100%;
        height: 100%;

    }
    .loadMore{
        text-align: center;
    }
    .loadMore:hover {
        cursor: pointer;
        color: skyblue;
    }

    .allComment{
        text-align: center;
        border: 1px solid rgb(221, 221, 221);
        background-color: rgb(252, 252, 252);
        width: 100%;
    }

    .textColor /deep/ .el-dropdown-item__inner {
        color: skyblue;
    }

    .comtent{
        font-weight: bolder;
        font-size: 20px;
        text-align: center;
        height: 30px;
    }
    .foot{
        margin-top: 10px;
        width: 100%;
        height: 300px;
    }
    *{
        margin: 0;
        padding: 0;
    }
    .search{
        width: 100%;
        height: 30px;
        background-color: #eeebeb;
    }
    .el-divider--vertical {
        display: inline-block;
        width: 1px;
        height: 30px;
        margin: 0 8px;
        vertical-align: middle;
        position: relative;
    }
    .nav{
        width: 60px;
        text-align: center;
        font-size: large;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .wrapper{
        height: 100%;
        width: 100%;


    }
    ::-webkit-scrollbar {
        width: 0 !important;
    }
    ::-webkit-scrollbar {
        width: 0 !important;height: 0;
    }
    .el-menu-demo{
        height: 10px;
        font-size: 10px;
    }
    .search-input{
        textIndent: 10px;
        right: 80px;
        height: 32px;
        fontSize: 14px;
        width: 190px;
        border: 2px solid #3E424C;
        color: #333;
        margin-top: 30px;
    }

    .search-local {
        background-color: #3E424C;
        margin-top: 30px;
        color: #FFF;
        right: 0;
        height: 36px;
        border: 0;
        font-size: 16px;
        letter-spacing: 4px;
        cursor: pointer;
        padding: 0 10px;
    }
    .search-input, .search-local {
        top: 25px;
        line-height: 36px;
        font-family: '\5FAE\8F6F\96C5\9ED1',arial,"\5b8b\4f53";
    }

    .content-box{
        margin-top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        transition: left .3s ease-in-out;
    }
    .horizontal{
        text-align: center;
    }
    .nav[data-v-10f32f3a] {

        font-size: large;
    }
    li.el-menu-item.nav {
        height: 10px;
    }
    .login{
        font-size: 14px;
        color: #999;
    }
    .login:hover{
        font-size: 14px;
        font-weight:bolder;
        cursor:pointer;
        color: #999;
    }
    .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: #ffffff;
        font-weight: bolder;
        color: #303133;
    }

</style>
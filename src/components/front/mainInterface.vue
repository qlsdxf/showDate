<template>
    <div class="wrapper">
        <div class="search">
            <el-row :gutter="10" align="middle" style="height: 60px">
                <el-col :span="6" style="line-height: 30px;" :offset="1">
                    <div style="display: flex;flex-direction: row">
                        <el-image
                                style="width: 30px; height: 30px;"
                                src="http://124.222.128.245:955/image/9827634f首页.png"></el-image>
                        <span style="font-size: 14px;color: #999;margin-left: 5px">欢迎来小熊药店平台</span>
                    </div>
                </el-col>
                <el-col :span="6" style="line-height: 30px;" :offset="10" v-if="showPerson == 1?true:false">
                    <div style="display: flex;flex-direction: row">
                        <span class="login" @click="login" >你好，请登录</span>
                        <el-divider direction="vertical" style="height: 30px"></el-divider>
                        <span style="font-size: 14px;color: #999;margin-left: 10px" class="login" @click="register">免费注册</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="login" style="font-size: 14px;color: #999;margin-left: 15px"  @click="personCenter" >医师咨询</span>
                        <el-divider direction="vertical"></el-divider>
                    </div>
                </el-col>

                <el-col :span="8" style="line-height: 30px;" :offset="8" v-if="showPerson == 2?true:false">
                    <div style="display: flex;flex-direction: row">
                        <el-image :src="user.userAvatar" style="width: 30px;height: 30px;border-radius: 50%"></el-image>
                        <span class="login" style="font-size: 14px;color: #999;margin-left: 15px" @click="myMessage" >{{user.userName}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="login" style="font-size: 14px;color: #999;margin-left: 15px"  @click="query" >医师咨询</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="login"style="font-size: 14px;color: #999;margin-left: 15px"  @click="order" >我的订单</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="login"style="font-size: 14px;color: #999;margin-left: 15px"  @click="out" >退出</span>
                        <el-divider direction="vertical"></el-divider>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="mid">
            <el-col :span="4" style="line-height: 60px;" :offset="3">
                <div style="display: flex;flex-direction: row">
                    <el-image
                            style="width: 200px; height: 100px;margin-top: 12px"
                            src="http://124.222.128.245:955/image/b6a51121小熊药店.png"
                            ></el-image>
                </div>
            </el-col>
            <el-col :span="2" style="line-height: 60px;" :offset="4">
                <div style="display: flex;flex-direction: row;margin-top: 20px;">
                    <el-image
                            style="width: 30px; height: 30px;margin-top: 12px"
                            src="http://img.alicdn.com/tps/TB1aCwLOVXXXXXfaFXXXXXXXXXX-36-36.png"></el-image>
                    <span style="font-size: 14px;color: #666">正品药店</span>
                </div>
            </el-col>
            <el-col :span="2" style="line-height: 60px">
                <div style="display: flex;flex-direction: row;margin-top: 20px">
                    <el-image
                            style="width: 30px; height: 30px;margin-top: 12px"
                            src="https://img.alicdn.com/tps/TB1tVI.OVXXXXc1XFXXXXXXXXXX-34-35.png"></el-image>
                    <span style="font-size: 14px;color: #666">担保交易</span>
                </div>
            </el-col>
            <el-col :span="2" style="line-height: 60px;">
                <div style="display: flex;flex-direction: row;margin-top: 20px">
                    <el-image
                            style="width: 30px; height: 30px;margin-top: 12px"
                            src="https://img.alicdn.com/tps/TB1yvRbPXXXXXadXFXXXXXXXXXX-34-35.png"></el-image>
                    <span style="font-size: 14px;color: #666">药师服务</span>
                </div>
            </el-col>
            <el-col :span="6" style="line-height: 60px;">
                <div style="display: flex;flex-direction: row">
                    <input class="search-input" v-model="content_f" placeholder="输入药品或店铺关键字" data-spm-anchor-id="a222y.8236280.a2226n0.i0.22297676SAPbwi">
                    <button class="search-local" @click="search">搜店铺</button>
                    <!--<el-input style="width: 280px;" placeholder="请输入关键字"></el-input>-->
                    <!--<el-button type="primary" style="margin-left: 20px;height: 40px;margin-top: 10px"><i class="el-icon-search"></i>搜索</el-button>-->
                </div>
            </el-col>
        </div>
        <div class="topImage">
           <div class="font">
               <span >热卖药品</span>
           </div>
            <div style="text-align: center;background-color: white;margin-top: 20px">
                <el-carousel indicator-position="none" type="card" >
                    <el-carousel-item v-for="item in image" :key="item.drugId">
                        <el-image
                                style="height: 100%;width: 80%"
                                @click="seeDrug(item)"
                                :src="item.drugImage.split(',')[0]"
                        ></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="content-box">
            <div class="font2">
                <span  >小熊好店</span>
            </div>
            <Top :content="content" style="margin-left: 100px"></Top>
        </div>

        <el-backtop target=".wrapper">回到顶部</el-backtop>

    </div>
</template>

<script>
    import Top from './topPharmacy'
    export default {
        name: "CommonHome",
        components:{
            Top
        },
        data() {
            return {
                activeIndex: '1',
                content:'',
                content_f:'',
                showPerson: 1,
                user:{},
                image:['https://image.360kad.com/group2/M00/E9/1D/CgAgFF4WwBSARfWdAALv3cHZFi0090.jpg',
                        'https://image.360kad.com/group1/M00/89/EF/CgAgD2FC7yaANvF5AAIIP50OWD0555.jpg',
                        'https://image.360kad.com/group2/M00/F4/B8/CgAgFF6DN4aAVkvjAAHiEeHkPCI300.jpg',
                        'https://image.360kad.com/group2/M00/B3/38/CgAgFVzrg1GAD5bKAAJ_YeqLBW4620.jpg',
                        'https://image.360kad.com/group1/M00/75/16/CgAgD2EvTVqAd2AcAAJxfFb-4R0122.jpg',
                        'https://image.360kad.com/group2/M00/B3/D3/CgAgFVz3X1GAH-AWAAI8hewvYdg436.jpg',


                ]
            };
        },
        mounted() {
            // this.index()
            this.user = JSON.parse(localStorage.getItem("user"))
            console.log(this.user)
            if (this.user != null) {
                this.showPerson = 2;
            }
            this.getSysDrug();

        },
        methods: {
            handleSelect(key, keyPath) {

            },
            myMessage() {
                const {href} = this.$router.resolve({
                    path: '/myMessage',
                })
                window.open(href, '_blank')
            },
            personCenter() {

            },
            seeDrug(item) {
                this.$router.push({
                    path: "/drugShow",
                    query: {
                        drug: JSON.stringify(item),
                    }
                })
            },
            getSysDrug(){
              this.$axios.post('/api/message/provide/drug/getSystemDrug').then((res)=>{
                  console.log(res.data.data)
                  this.image = res.data.data
              })
            },
            search(){
                console.log(111)
              this.content = this.content_f
            },

            query(){
                const {href} = this.$router.resolve({
                    path: '/personChat',
                })
                window.open(href, '_blank')
            },
            order(){
                this.$router.push("/personCenter")
            },
            out(){
                localStorage.setItem("user",undefined);
                this.$router.push("/login")
            },
            login() {
              this.$router.push("/login")
            },
            register() {
              this.$router.push({
                  name:"registerTab",
                  params: {
                      activeName: "user"
                  }
              })
            },
        }
    }
</script>

<style scoped>
    /*.el-carousel__item{*/

        /*background-color: rgb(223, 241, 251);*/
    /*}*/
    /*.el-carousel__item:nth-child(2n) {*/
        /*background-color: rgb(223, 241, 251);*/
    /*}*/
    /*.el-carousel__item:nth-child(2n+1) {*/
        /*background-color: rgb(223, 241, 251);*/
    /*}*/
    .font{
        font-size: 38px;
        font-weight: bold;
        /*border: 1px solid white;*/
        /*background: white;*/
        width: 100%;
        height: 50px;
    }
    .font:hover{
        cursor: pointer;
    }
    .font2{

        margin-left: 10%;
        margin-top: 200px;
        font-size: 38px;
        font-weight: bold;

        /*border: 1px solid white;*/
        /*background: white;*/
        width: 80%;
        height: 60px;
    }
    .font2:hover{
        cursor: pointer;
    }
    *{
        margin: 0;
        padding: 0;
    }
    .topImage{
        height: 200px;
        margin-top: 150px;
        width: 80%;
        margin-left: 10%;

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

    .wrapper{
        background-color: #f7f8fb;
        position: fixed;
        width: 100%;
        height: 100%;
        overflow-y: scroll;

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
        margin-top: 150px;
        width: 100%;
        height: 100%;
        /*overflow-y: scroll;*/

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
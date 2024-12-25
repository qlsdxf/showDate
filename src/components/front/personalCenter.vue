<template>
    <div class="con_person">
        <div class="heard1">
            <header>
                <article>
                    <div class="header1_1" >
                        <a title="我的药品">个人中心</a>
                    </div>
                    <div class="header1_2">
                        <nav>
                            <ul id="menu">
                                <li class="selected">
                                    <a href = "/mainInterface">首页</a>
                                </li>
                                <li>
                                    <a href = "./myMessage">修改个人信息</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </article>
            </header>
        </div>
        <div class="body">
            <div class="person">
                <div style="height: 100%;float: left">
                    <el-avatar :size="80">
                        <img :src="user.userAvatar">
                    </el-avatar>
                </div>
                <div style="height: 100px;float: left;margin-top: 50px">
                    <span style="font-size: 20px;font-weight: bolder">{{user.userName}}</span>
                </div>

                <div style="margin-left: 80px;float: left;margin-top: 20px;">
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export1" ></i>
                    </dl>
                    <el-button type="text"   style="margin-left: 10px;float: left;color: black" @click = "selectOrder(0,'全部订单')">全部订单</el-button>
                </div>
                <!--<div style="margin-left: 80px;float: left;margin-top: 20px;" >-->
                    <!--<dl style="font-size: 30px;text-align: center">-->
                        <!--<i class="el-icon-my-export2" ></i>-->
                    <!--</dl>-->
                    <!--<el-button type="text" style="margin-left: 10px;float: left;color: black" @click = "selectOrder(1)">购物车</el-button>-->
                <!--</div>-->

                <div style="margin-left: 80px;float: left;margin-top: 20px;">
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export1" ></i>
                    </dl>
                    <el-button type="text"   style="margin-left: 10px;float: left;color: black" @click = "selectOrder(7,'待付款')">待付款</el-button>
                </div>
                <div style="margin-left: 80px;float: left;margin-top: 20px;" >
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export2" ></i>
                    </dl>
                    <el-button type="text" style="margin-left: 10px;float: left;color: black" @click = "selectOrder(2,'待发货')">待发货</el-button>
                </div>
                <div style="margin-left: 60px;float: left;margin-top: 20px;" >
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export" ></i>
                    </dl>
                    <el-button type="text" style="margin-left: 10px;float: left;color: black" @click = "selectOrder(3,'待收货')">待收货</el-button>
                </div>
                <div style="margin-left: 80px;float: left;margin-top: 20px;" class="click">
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export3" ></i>
                    </dl>
                    <el-button type="text" style="margin-left: 10px;float: left;color: black" @click = "selectOrder(4,'待评价')">待评价</el-button>
                </div>
                <div style="margin-left: 80px;float: left;margin-top: 20px;" >
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export4" ></i>
                    </dl>
                    <el-button type="text" style="margin-left: 10px;float: left;color: black" @click = "selectOrder(8,'退款')">退款</el-button>
                </div>
                <div style="margin-left: 80px;float: left;margin-top: 20px;" >
                    <dl style="font-size: 30px;text-align: center">
                        <i class="el-icon-my-export4" ></i>
                    </dl>
                    <el-button type="text" style="margin-left: 10px;float: left;color: black" @click = "selectOrder(9,'我的消息')">我的消息</el-button>
                </div>

            </div>

        </div>
        <div class="mid">
            <div class="title">
                <h3>{{content}}</h3>
            </div>
            <allOrder v-if="orderStatus == 0"></allOrder>
            <!--<shopping v-if="orderStatus == 1"></shopping>-->
            <payOrder v-if="orderStatus == 7"></payOrder>
            <sendOrder v-if="orderStatus == 2"></sendOrder>
            <getOrder v-if="orderStatus == 3"></getOrder>
            <evaluateOrder v-if="orderStatus == 4"></evaluateOrder>
            <refundOrder v-if="orderStatus == 8"></refundOrder>
            <sysMessage v-if="orderStatus == 9"></sysMessage>
        </div>

 </div>

</template>

<script>
    import allOrder from './allOrder';
    import shopping from './shoppingCart'
    import payOrder from './payOrder'
    import sendOrder from './sendOrder'
    import getOrder from './getOrder'
    import evaluateOrder from './evaluateOrder'
    import refundOrder from './refundOrder'
    import sysMessage from './SysMessage'


    export default {
        components:{
            allOrder,
            getOrder,
            shopping,
            payOrder,
            sendOrder,
            evaluateOrder,
            refundOrder,
            sysMessage,
        },
        data() {
            return {
                flag:true,
                url:"",
                imageBase64:'',
                diagUrl:'',
                content:'全部订单',
                dialogVisible:false,
                isDeleteVisible:false,
                status:200,
                orderStatus:0,
                user:{},
                order:[],
                pageSize:4,
                pageNum:1,
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            this.orderStatus = localStorage.getItem("orderStatus");
            this.content = localStorage.getItem("content");
            if (this.orderStatus == undefined) {
                this.orderStatus = 0;
            }
            if (this.content == 'undefined') {
                this.content = '全部订单';
            }

        },
        filters: {
            getDrugStatus: (status) => { // msg表示要过滤的数据，a表示传入的参数
                switch (status){
                    case 0:
                        return '立即购买'
                    case 1:
                        return '申请退货'
                    case 2:
                        return '确认签收'
                    case 3:
                        return '去评价'
                    case 4:
                        return '删除订单'
                    case 7:
                        return '立即付款'
                }
                if (status == 1) {
                    return "非处方药"
                } else {
                    return "处方药"
                }
            },
            getDrugTime: (time) =>{
                return time.split('T')[0];
            }

        },
        methods: {
            pageChange(page) {
                this.pageNum = page
            },
            selectOrder(val,content) {
                this.orderStatus = val;
                localStorage.setItem("orderStatus", val);
                localStorage.setItem("content", content);
                this.content = content;
            },


            // getOrderByStatus() {
            //     let orderQueryDto = {
            //         userId: this.user.userId,
            //         orderStatus: this.orderStatus,
            //         pageSize: this.pageSize,
            //         pageNum: this.pageNum
            //     }
            //
            //     console.log(orderQueryDto)
            //    this.$axios.post('/pay/provide/order/getOrderByStatus',orderQueryDto).then((res)=>{
            //        this.order = res.data.data.records;
            //        console.log(res.data.data)
            //        this.total = res.data.data.pages
            //    })
            // },
            getMessage() {

            }
        }
    }
</script>

<style scoped>

    .order_head{
        border: #daf3ff solid 1px;
        background-color: #daf3ff;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    .content{
        /*display: inline-block;*/
        height: 55px;

    }
    .con_person{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        transition: left .3s ease-in-out;
    }
    .imgSize{
        width: 80px;
        height: 80px
    }

    .heard1{
        width: 100%;
        height: 30px;
        background-color: #999;
        margin-top: 0px;
        float: left;
    }
    .click:hover{
        cursor: pointer;
        color: red;
    }
    .header1_1{
        width: 80px;
        height: 30px;
        float: left;
        margin-left: 20px;
        margin-top: 5px;

    }
    .order{
        height: 100%;
        width: 100%;
        margin-top: 20px;
    }
    .header1_1>a{
        color: #fff;
        text-decoration:none; /* 去掉下划线 */
    }
    .header1_2{
        width: 250px;
        height: 30px;
        float: left;
        margin-left: 80px;
    }
    .body{
        width: 80%;
        margin-left: 10%;
        height: auto;
        display: inline-block;
    }
    .person{
        display: inline-block;
        width: 100%;
        height: 100px;
        background-color: #f5f8fa;
        margin-top: 10px;
    }

    .el-icon-my-export{
        background: url('http://124.222.128.245:955/image/%E7%89%A9%E6%B5%81%E8%BD%A618c514df.png') center no-repeat;
        background-size: cover;
        width: 40px;
        height: 30px;
    }
    .el-icon-my-export:before{
        content: "替";
        font-size: 17px;
        visibility: hidden;
    }
    .el-icon-my-export1{
        background: url('http://124.222.128.245:955/image/待付款 (1)7c43ebde.png') center no-repeat;
        background-size: cover;
        width: 40px;
        height: 32px;
    }
    .el-icon-my-export1:before{
        content: "替";
        font-size: 17px;
        visibility: hidden;
    }
    .el-icon-my-export2{
        background: url('http://124.222.128.245:955/image/待发货857ddda2.png') center no-repeat;
        background-size: cover;
        width: 40px;
        height: 35px;
    }
    .el-icon-my-export2:before{
        content: "替";
        font-size: 17px;
        visibility: hidden;
    }
    .el-icon-my-export3{
        background: url('http://124.222.128.245:955/image/待评价221cc2373.png') center no-repeat;
        background-size: cover;
        width: 40px;
        height: 30px;
    }
    .el-icon-my-export3:before{
        content: "替";
        font-size: 17px;
        visibility: hidden;
    }

    .el-icon-my-export4{
        background: url('http://124.222.128.245:955/image/退款d1f67c78.png') center no-repeat;
        background-size: cover;
        width: 40px;
        height: 32px;
    }
    .el-icon-my-export4:before{
        content: "替";
        font-size: 17px;
        visibility: hidden;
    }


    .mid{
        width: 80%;
        height: 100%;
        margin-left: 10%;
        margin-top: 10px;
    }
    .title{
        height: 30px;
        background-color: #e4e7ed;
        text-align: center;
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
    #menu2{
        font:14px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
    }

    #menu2>li{
        list-style:none; /* 将默认的列表符号去掉 */
        padding:0; /* 将默认的内边距去掉 */
        float: left;
        margin-left: 40px;
        margin-top: 10px;
    }
    #menu2>li>a {
        width:20px; /* 设置宽度 */
        height:5px; /* 设置高度 */
        line-height:30px; /* 设置行高，将行高和高度设置同一个值，可以让单行文本垂直居中 */
        color:black; /* 设置文字颜色 */
        text-decoration:none; /* 去掉下划线 */
        text-align:center; /* 居中对齐文字 */
        border-right:1px solid #000; /* 在左侧加上分隔线 */
        margin-right: 50px;

    }

    .body1_3_1>h3{
        color: white;
        margin-left:700px;
    }



</style>

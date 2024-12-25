<template>
    <div class="order">
        <div v-if="show" style="width: 100%;height: 50%">
            <el-empty description="暂时没有待发货的订单"></el-empty>
        </div>
        <div v-for="item in order"  style="margin-top: 20px">
            <div class="order_head" style="font-size: 14px">
                <span style="height: 40px;width:100px;text-align: center;margin-left: 20px;font-weight: bolder">{{item.orderStartTime | getDrugTime(item.orderStartTime)}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 230px;">订单号:{{item.orderUuid}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 120px;">店铺:{{item.pharmacyName}}</span>
            </div>

            <el-card >
                <div class="content">
                    <div style="float: left">
                        <div style="float: left">
                            <img :src="item.drug.drugImage.split(',')[0]" class="imgSize">

                        </div>
                        <div style="float: left;width: 200px;margin-left: 10px">
                            <div>
                                <span style="font-size: 16px;text-align: center">{{item.drug.drugName}}</span>
                            </div>
                            <div style="margin-top: 10px">
                                <span style="font-size: 10px;text-align: center">{{item.drug.drugSpecification}}</span>
                            </div>

                            <div style="margin-top: 10px">
                                <el-image src="https://img.alicdn.com/tps/i2/T1SyeXFpliXXaSQP_X-16-16.png" style="margin-left: 4px"></el-image>
                                <el-image src="https://img.alicdn.com/tps/TB1PDB6IVXXXXaVaXXXXXXXXXXX.png" style="margin-left: 4px"></el-image>
                                <el-image src="https://img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png" style="margin-left: 4px"></el-image>
                            </div>

                        </div>
                    </div>
                    <!--<div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;text-align: center">-->
                        <!--<div style="margin-top: 0px">快件由{{item.merchantAddress}}发往{{user.userDetailedAddress}}</div>-->
                        <!--<div style="margin-top: 5px">{{item.delivery.deliveryName}}：{{item.delivery.deliveryNumber}}</div>-->
                        <!--<div style="margin-top: 5px">{{item.delivery.deliveryCreateTime | getDrugTime(item.delivery.deliveryCreateTime)}}</div>-->
                    <!--</div>-->
                    <div  style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 200px">
                        <span>等待商家发货</span>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;margin-top: 20px">
                        <div style="">数量：{{item.orderNum}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;margin-top: 20px;width: 80px">
                        <div style="">￥{{item.orderTotal}}</div>
                    </div>

                    <div style="float: left;margin-left: 10px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">买家待付款</div>
                    </div>

                    <div style="float:left;margin-left: 50px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="remind(item)">提醒发货</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="Refund(item)">申请退款</el-button>
                    </div>
                    <!--<div style="float:left;margin-left: 20px;margin-top: 10px">-->
                        <!--<el-button class="deleteDiv" @click="isDeleteVisible = true">取消订单</el-button>-->
                    <!--</div>-->

                </div>
            </el-card>
        </div>
        <div style="margin-top: 10px;text-align: center;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    @current-change="pageChange"
                    :page-count="total"
            >
            </el-pagination>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                flag:true,
                url:"",
                show:false,
                order:[
                    // {
                    //     merchantAddress:'吴兴区',
                    //     userAddress:'南昌',
                    //     express:'中通快递',
                    //     experssNum:'12138',
                    //     sendTiem:'2022-03-19 23:14:07',
                    //     num:2,
                    //     totalNum:328.00
                    // },
                    // {
                    //     merchantAddress:'吴兴区',
                    //     userAddress:'南昌',
                    //     express:'中通快递',
                    //     experssNum:'12138',
                    //     sendTiem:'2022-03-19 23:14:07',
                    //     num:2,
                    //     totalNum:328.00
                    // },
                    // {
                    //     merchantAddress:'吴兴区',
                    //     userAddress:'南昌',
                    //     express:'中通快递',
                    //     experssNum:'12138',
                    //     sendTiem:'2022-03-19 23:14:07',
                    //     num:2,
                    //     totalNum:328.00
                    // },
                    // {
                    //     merchantAddress:'吴兴区',
                    //     userAddress:'南昌',
                    //     express:'中通快递',
                    //     experssNum:'12138',
                    //     sendTiem:'2022-03-19 23:14:07',
                    //     num:2,
                    //     totalNum:328.00
                    // }
                ],
                imageBase64:'',
                diagUrl:'',
                tempUrl:'',
                ImgName:'',
                Name:'',
                userHead:'',
                dialogVisible:false,
                isDeleteVisible:false,
                status:200,
                orderStatus:2,
                pageSize:4,
                pageNum:1,
                user:{},
                total:0,
            }
        },
        mounted(){
            console.log('代发货订单')
            this.user = JSON.parse(localStorage.getItem("user"));
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            this.getOrderByStatus();

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
                return time.replaceAll('T', ' ');;
            }

        },
        methods: {
            pageChange(page) {
                console.log(page)
                this.pageNum = page
                this.getOrderByStatus()
            },
            remind(item) {
                let message = {
                    content:this.user.userName + "提醒您，" + item.orderUuid + "订单还未发货，请尽快发货！！",
                    userId:this.user.userId,
                    orderId:item.orderId,
                    orderUuid:item.orderUuid,
                    messageType:1,
                    pharmacyId:item.pharmacyId,
                }
              this.$axios.post("/api/pay/provide/pay/message/sendMessage",message).then((res)=>{
                  this.$message.success(res.data.message);
              })
            },
            Refund(item) {
                let message = {
                    content:item.orderUuid + "号订单已被取消，请勿发货，避免损失带来！！",
                    userId:this.user.userId,
                    orderId:item.orderId,
                    orderUuid:item.orderUuid,
                    messageType:2,
                    pharmacyId:item.pharmacyId,
                }
                this.$axios.post("/api/pay/provide/pay/message/sendMessage",message).then((res)=>{
                    console.log(res.data.message)
                })
                let refund = {
                    userId:this.user.userId,
                    orderId:item.orderId,
                    orderUuid:item.orderUuid,
                }
                this.$axios.post("/api/pay/provide/order/refundOrder",refund).then((res)=>{
                    console.log(res.data.data)
                    this.$message.success(res.data.message)
                    this.getOrderByStatus();
                })
            },
            getOrderByStatus() {
                let orderQueryDto = {
                    userId: this.user.userId,
                    orderStatus: this.orderStatus,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                }
                console.log(orderQueryDto)
                this.$axios.post('/api/pay/provide/order/getOrderByStatus',orderQueryDto).then((res)=>{
                    this.order = res.data.data.records;
                    console.log(res.data.data)
                    console.log(this.order.length == 0)
                    if (this.order.length == 0) {
                        this.show = true
                    }
                    this.total = res.data.data.pages
                })
            },
            showImg() {

            },
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

    .imgSize{
        width: 80px;
        height: 80px
    }

    .order{
        height: 100%;
        width: 100%;
        margin-top: 20px;
    }



</style>
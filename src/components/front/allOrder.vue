<template>
    <div class="order">
        <div v-if="show" style="width: 100%;height: 50%">
            <el-empty description="暂时没有订单"></el-empty>
        </div>
        <!--<allOrder v-if="orderStatus == 0"></allOrder>-->
        <!--&lt;!&ndash;<shopping v-if="orderStatus == 1"></shopping>&ndash;&gt;-->
        <!--<payOrder v-if="orderStatus == 7"></payOrder>-->
        <!--<sendOrder v-if="orderStatus == 2"></sendOrder>-->
        <!--<getOrder v-if="orderStatus == 3"></getOrder>-->
        <!--<evaluateOrder v-if="orderStatus == 4"></evaluateOrder>-->
        <!--<refundOrder v-if="orderStatus == 8"></refundOrder>-->

        <div v-for="item in order"  style="margin-top: 20px">
            <div class="order_head" style="font-size: 14px">
                <span style="height: 40px;width:100px;text-align: center;margin-left: 20px;font-weight: bolder">{{item.orderStartTime | getDrugTime(item.orderStartTime)}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 200px;">订单号:{{item.orderUuid}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 180px;">店铺:{{item.pharmacyName}}</span>
            </div>
            <el-card v-show="item.orderStatus == 5">
                <div class="content">
                    <div style="float: left">
                        <div style="float: left">
                            <img :src="item.drug.drugImage.split(',')[0]" class="imgSize">

                        </div>
                        <div style="float: left;width: 200px;margin-left: 10px;width: 200px">
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
                    <div  style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 150px">
                        <span>用户已评价</span>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">数量：{{item.orderNum}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;margin-top: 20px;width: 80px">
                        <div style="">￥{{item.orderTotal}}</div>
                    </div>

                    <div style="float: left;margin-left: 10px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">用户已评价</div>
                    </div>

                    <div style="float:left;margin-left: 50px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="again(item)">再来一单</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="Refund(item)">删除订单</el-button>
                    </div>

                </div>
            </el-card>
            <el-card v-show="item.orderStatus == 7">
                <div class="content">
                    <div style="float: left;width: 300px">
                        <div style="float: left">
                            <img :src="item.drug.drugImage.split(',')[0]" class="imgSize">
                        </div>
                        <div style="float: left;width: 200px;margin-left: 10px">
                            <div>
                                <span style="font-size: 16px;text-align: center;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">{{item.drug.drugName}}</span>
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
                    <div v-if="item.delivery == null || item.delivery == undefined"  style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 150px">
                        <span>等待用户付款</span>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">数量：{{item.orderNum}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;margin-top: 20px;width: 80px">
                        <div style="">￥{{item.orderTotal}}</div>
                    </div>

                    <div style="float: left;margin-left: 10px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">买家待付款</div>
                    </div>

                    <div style="float:left;margin-left: 50px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="pay(item)">立即付款</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="dialog(item)">取消订单</el-button>
                    </div>
                    <el-dialog
                            title="提示"
                            :visible.sync="isDeleteVisible"
                            width="30%"
                            :show-close="false">
                        <span style="font-size: large">是否取消该订单？</span>
                        <div slot="footer" class="dialog-footer" >
                            <el-button type="primary" style="width: 100px" @click="cancelOrder">是</el-button>
                            <el-button type="danger" style="width: 100px" @click="isDeleteVisible = false">否</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-card>
            <el-card v-show="item.orderStatus == 2">
                <div class="content">
                    <div style="float: left">
                        <div style="float: left">
                            <img :src="item.drug.drugImage.split(',')[0]" class="imgSize">

                        </div>
                        <div style="float: left;width: 200px;margin-left: 10px;width: 200px">
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
                    <div  style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 150px">
                        <span>等待商家发货</span>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">数量：{{item.orderNum}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;margin-top: 20px;width: 80px">
                        <div style="">￥{{item.orderTotal}}</div>
                    </div>

                    <div style="float: left;margin-left: 10px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">买家已付款</div>
                    </div>

                    <div style="float:left;margin-left: 50px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="remind(item)">提醒发货</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="Refund(item)">申请退款</el-button>
                    </div>

                </div>
            </el-card>
            <el-card v-show="item.orderStatus == 3">
                <div class="content">
                    <div style="float: left">
                        <div style="float: left">
                            <img :src="item.drug.drugImage.split(',')[0]" class="imgSize">

                        </div>
                        <div style="float: left;width: 200px;margin-left: 10px;width: 190px">
                            <div>
                                <span style="font-size: 16px;text-align: center">{{item.drug.drugName}}</span>
                            </div>
                            <div style="margin-top: 10px">
                                <!--{{item.drugType}}-->
                                <span style="font-size: 10px;text-align: center">{{item.drug.drugSpecification}}</span>
                            </div>

                            <div style="margin-top: 10px">
                                <el-image src="https://img.alicdn.com/tps/i2/T1SyeXFpliXXaSQP_X-16-16.png" style="margin-left: 4px"></el-image>
                                <el-image src="https://img.alicdn.com/tps/TB1PDB6IVXXXXaVaXXXXXXXXXXX.png" style="margin-left: 4px"></el-image>
                                <el-image src="https://img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png" style="margin-left: 4px"></el-image>
                            </div>

                        </div>
                    </div>
                    <div v-if="item.delivery != null && item.delivery != undefined" style="float: left;margin-left: 0px;font-size: 16px;text-align: center;width: 160px">
                        <div style="margin-top: 0px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;" :title="'快件由'+item.delivery.deliveryStartAddress+'发往'+item.delivery.deliveryEndAddress">快件由{{item.delivery.deliveryStartAddress}}发往{{item.delivery.deliveryEndAddress}}</div>
                        <div style="margin-top: 5px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;":title="item.delivery.deliveryName+':'+item.delivery.deliveryNumber">{{item.delivery.deliveryName}}：{{item.delivery.deliveryNumber}}</div>
                        <div style="margin-top: 5px">{{item.delivery.deliveryCreateTime | getDrugTime(item.delivery.deliveryCreateTime)}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">数量：{{item.orderNum}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;margin-top: 20px;width: 80px">
                        <div style="">￥{{item.orderTotal}}</div>
                    </div>

                    <div style="float: left;margin-left: 10px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">商家已发货</div>
                    </div>

                    <div style="float:left;margin-left: 50px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="confirm(item)">确认收货</el-button>
                    </div>

                </div>
            </el-card>
            <el-card v-show="item.orderStatus == 4">
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
                    <div   style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 200px">
                        <span>用户已经确认收货</span>
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

                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="confirm(item)">前往评价</el-button>
                    </div>
                    <div style="float:left;margin-left: 10px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="confirm(item)">再来一单</el-button>
                    </div>

                </div>
            </el-card>
            <el-card v-show="item.orderStatus == 8">
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
                    <div   style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 200px">
                        <span>商家已经成功推退款</span>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;margin-top: 20px">
                        <div style="">数量：{{item.orderNum}}</div>
                    </div>
                    <div style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;margin-top: 20px;width: 80px">
                        <div style="">￥{{item.orderTotal}}</div>
                    </div>

                    <div style="float: left;margin-left: 10px;font-size: 16px;margin-top: 20px;width: 80px">
                        <div style="">买家已退款</div>
                    </div>

                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="again(item)">重新购买</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="delt(item)">删除订单</el-button>
                    </div>

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
                show:true,
                order:[],
                imageBase64:'',
                diagUrl:'',
                tempUrl:'',
                ImgName:'',
                Name:'',
                userHead:'',
                dialogVisible:false,
                isDeleteVisible:false,
                status:200,
                orderStatus:0,
                pageSize:4,
                pageNum:1,
                user:{},
                total:0,
                orderUuid:'',
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            console.log(this.order)
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
                return time.replaceAll('T', ' ');
            }

        },
        methods: {
            pageChange(page) {
                this.pageNum = page
                this.getOrderByStatus()
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
                    console.log(11112313)
                    console.log(this.order)
                    this.total = res.data.data.pages
                    if (this.order.length > 0) {
                        this.show = false
                        console.log(12313)
                    }
                })
            },
            showImg() {

            },
            //待付款方法
            dialog(item) {
                console.log(item)
                this.isDeleteVisible = true
                this.orderUuid = item.orderUuid
            },
            pay(item) {
                this.$axios.get("/api/pay/provide/order/continuePay?orderId="+item.orderId).then((res)=>{
                    console.log(res.data.data)
                    document.write(res.data.data)
                })
            },
            cancelOrder() {
                this.$axios.get("/api/pay/provide/order/cancelOrder?orderUuId="+this.orderUuid).then((res)=>{
                    this.$message.success(res.data.message)
                })
                this.isDeleteVisible = false;
                this.getOrderByStatus();
                console.log("重新刷新订单")
            },
            //待发货订单
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
            //待收货订单
            confirm(item){
                // let message = {
                //     content:item.orderUuid + "号订单已确认，请勿发货，避免损失带来！！",
                //     userId:this.user.userId,
                //     orderId:item.orderId,
                //     orderUuid:item.orderUuid,
                //     messageType:2,
                //     pharmacyId:item.pharmacyId,
                // }
                // this.$axios.post("/pay/provide/pay/message/sendMessage",message).then((res)=>{
                //     console.log(res.data.message)
                // })
                let refund = {
                    orderId:item.orderId,
                    orderUuid:item.orderUuid,
                }
                this.$axios.post("/api/pay/provide/order/confirm",refund).then((res)=>{
                    console.log(res.data.data)
                    this.$message.success(res.data.message)
                    this.getOrderByStatus();
                })
            },
            //已退款订单
            again(item) {
                const {href} = this.$router.resolve({
                    path: '/drugDetail',
                    query: {
                        pharmacyId: item.pharmacyId,
                    }
                })
                window.open(href, '_blank')
            },
            delt(item) {
                let del = {
                    orderId:item.orderId,
                    orderUuid:item.orderUuid,
                }
                this.$axios.post("/api/pay/provide/order/delete",del).then((res)=>{
                    console.log(res.data.data)
                    this.$message.success(res.data.message)
                    this.getOrderByStatus();
                })
            },
            //待评价订单
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
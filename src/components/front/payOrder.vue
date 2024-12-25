<template>
    <div class="order">
        <div v-if="show" style="width: 100%;height: 50%">
            <el-empty description="暂时没有需要付款的订单"></el-empty>
        </div>
        <div v-for="item in order"  style="margin-top: 20px">
            <div class="order_head" style="font-size: 14px">
                <span style="height: 40px;width:100px;text-align: center;margin-left: 20px;font-weight: bolder">{{item.orderStartTime | getDrugTime(item.orderStartTime)}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 230px;">订单号:{{item.orderUuid}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 120px;">店铺:{{item.drug.pharmacyName}}</span>
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
                    <div v-if="item.delivery == null || item.delivery == undefined"  style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 200px">
                        <span>等待用户付款</span>
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
                        <el-button class="deleteDiv" @click="pay(item)">立即付款</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="dialog(item)">取消订单</el-button>
                    </div>

                </div>
            </el-card>

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
                show:true,
                userHead:'',
                dialogVisible:false,
                isDeleteVisible:false,
                status:200,
                orderStatus:7,
                pageSize:4,
                pageNum:1,
                user:{},
                total:0,
                orderUuid:''
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            console.log(this.user)
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            this.pageSize = 4;
            this.pageNum = 1;
            console.log('pageSize' + this.pageSize)
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
            dialog(item) {
                console.log(item)
                this.isDeleteVisible = true
                this.orderUuid = item.orderUuid
            },
            cancelOrder() {
              this.$axios.get("/api/pay/provide/order/cancelOrder?orderUuId="+this.orderUuid).then((res)=>{
                  this.$message.success(res.data.message)
                  this.getOrderByStatus();
                  this.isDeleteVisible = false;
              })
            },
            pageChange(page) {
                console.log(page)
                this.pageNum = page
                this.getOrderByStatus()
            },
            pay(item) {
                this.$axios.get("/api/pay/provide/order/continuePay?orderId="+item.orderId).then((res)=>{
                    console.log(res.data.data)
                    document.write(res.data.data)
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
                    this.total = res.data.data.pages
                    if (this.order.length > 0) {
                        this.show = false
                    }
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
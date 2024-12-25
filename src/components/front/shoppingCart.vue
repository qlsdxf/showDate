<template>
    <div class="order">
        <div v-for="item in order"  style="margin-top: 20px">
            <div class="order_head" style="font-size: 14px">
                <span style="height: 40px;width:100px;text-align: center;margin-left: 20px;font-weight: bolder">{{item.orderStartTime | getDrugTime(item.orderStartTime)}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 230px;">订单号:{{item.orderUuid}}</span>
                <span style="height: 40px;width:100px;text-align: center;margin-left: 120px;">店铺:{{item.orderUuid}}</span>
            </div>
            <el-card >
                <div class="content">
                    <div style="float: left">
                        <div style="float: left">
                            <img :src="item.drugImage.split(',')[0]" class="imgSize">

                        </div>
                        <div style="float: left;width: 200px;margin-left: 10px">
                            <div>
                                <span style="font-size: 16px;text-align: center">{{item.drugName}}</span>
                            </div>
                            <div style="margin-top: 10px">
                                <!--{{item.drugType}}-->
                                <span style="font-size: 10px;text-align: center">规格：10g*9袋</span>
                            </div>

                            <div style="margin-top: 10px">
                                <el-image src="https://img.alicdn.com/tps/i2/T1SyeXFpliXXaSQP_X-16-16.png" style="margin-left: 4px"></el-image>
                                <el-image src="https://img.alicdn.com/tps/TB1PDB6IVXXXXaVaXXXXXXXXXXX.png" style="margin-left: 4px"></el-image>
                                <el-image src="https://img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png" style="margin-left: 4px"></el-image>
                            </div>

                        </div>
                    </div>
                    <div v-if="item.delivery != null && item.delivery != undefined" style="float: left;margin-left: 80px;font-size: 16px;font-weight: bolder;text-align: center">
                        <div style="margin-top: 0px">快件由{{item.merchantAddress}}发往{{user.userDetailedAddress}}</div>
                        <div style="margin-top: 5px">{{item.delivery.deliveryName}}：{{item.delivery.deliveryNumber}}</div>
                        <div style="margin-top: 5px">{{item.delivery.deliveryCreateTime | getDrugTime(item.delivery.deliveryCreateTime)}}</div>
                    </div>
                    <div v-if="item.delivery == null || item.delivery == undefined"  style="float: left;margin-left: 10px;font-size: 16px;font-weight: bolder;text-align: center;margin-top: 20px;width: 200px">
                        <span>欢迎</span>
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
                        <el-button class="deleteDiv" @click="isDeleteVisible = true">{{item.orderStatus | getDrugStatus(item.orderStatus)}}</el-button>
                    </div>
                    <div style="float:left;margin-left: 20px;margin-top: 10px">
                        <el-button class="deleteDiv" @click="isDeleteVisible = true">取消订单</el-button>
                    </div>

                </div>
            </el-card>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="isDeleteVisible"
                width="30%"
                :show-close="false">
            <span style="font-size: large">是否确定删除该订单？</span>
            <div slot="footer" class="dialog-footer" >
                <el-button type="primary" style="width: 100px" @click="isDeleteVisible = false">否</el-button>
                <el-button type="danger" style="width: 100px" @click="">是</el-button>
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
        // props:{
        //     orderStatus:{
        //         type: String,
        //         required: true
        //     }
        // },
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
                userHead:'',
                dialogVisible:false,
                isDeleteVisible:false,
                status:200,
                orderStatus:0,
                pageSize:4,
                pageNum:1,
                user:{},
                total:3,
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            console.log(this.user)
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
                console.log(time.split('T')[0])
                return time.split('T')[0];
            }

        },
        methods: {
            pageChange(page) {
                console.log(page)
                this.pageNum = page
                this.getOrderByStatus()
            },
            getOrderByStatus() {
                let orderQueryDto = {
                    userId: this.user.userId,
                    orderStatus: 1,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                }
                console.log(orderQueryDto)
                this.$axios.post('/api/pay/provide/order/getOrderByStatus',orderQueryDto).then((res)=>{
                    this.order = res.data.data.records;
                    console.log(res.data.data)
                    this.total = 3
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
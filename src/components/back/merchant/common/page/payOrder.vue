<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">未发货订单</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="cantainer">
                <div class="handle-box">
                    <el-input class="search-input" placeholder="筛选关键词" size="small" v-model="ListSearch"></el-input>
                    <el-button type="primary" @click="search" class="handle-del mr10" style="margin-left: 5px;height: 35px;margin-top: 8px">搜索</el-button>
                </div>
                <el-table
                        :data="list"
                        tooltip-effect="dark"
                        style="width: 100%"
                >
                    <!--<el-table-column type="selection" width="55"></el-table-column>-->
                    <el-table-column
                            prop="orderUuid"
                            label="订单编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="orderStartTime"
                            label="订单生成时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="drugName"
                            label="购买药品名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="orderNum"
                            label="购买数目"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="orderTotal"
                            label="总金额"
                            sortable
                            width="100"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="user.userName"
                            label="购买用户"
                            width="110">
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >发货</el-button>
                            <!--<el-button-->
                                    <!--size="mini"-->
                                    <!--type="danger"-->
                                    <!--@click="deleteList(scope.$index,scope.row)">举报恶意卡库存</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalNum">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="添加物流信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="物流名称" label-width="120px">
                    <el-input v-model="form.deliveryName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物流单号" label-width="120px">
                    <el-input v-model="form.deliveryNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="send">发货</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>

            </div>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        mounted(){
            this.getOrder();
        },
        data () {
            return {
                list:[], //数据存储
                dialogFormVisible:false,
                totalNum:0,
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                ruleForm:{},
                item:{},

                form:{    //需要添加的字段
                    deliveryName:'',
                    deliveryNumber:'',
                    deliveryStartAddress:'',
                    deliveryEndAddress:JSON.parse(localStorage.getItem("pharmacy")).pharmacyDetailedAddress,
                    deliveryCreateTime:'',
                    deliveryStatus:0,
                    deliveryOrderId:'',
                },
                editForm:{   //编辑需要的字段
                    name:"",
                    date:"",
                    address:""
                },
                addLoading:false,
                currentPage:1, //初始页
                pageSize:5 , //	每页的数据
                content:''
            }
        },
        created() {

        },
        filters: {
            getType: (msg) => { // msg表示要过滤的数据，a表示传入的参数
                if (msg == 1) {
                    return "非处方药"
                } else {
                    return "处方药"
                }
            },
            getStatus: (msg) =>{
                if (msg == 0) {
                    return "上架"
                } else {
                    return "未上架"
                }
            }
        },
        methods:{
            search() {
                this.content = this.ListSearch
                this.getOrder();
                this.pageNum = 1;
            },
            getOrder(){
                console.log(JSON.parse(localStorage.getItem("pharmacy")).pharmacyId)
                let data = {
                    'orderStatus': 2,
                    'content': this.content,
                    'pharmacyId' : JSON.parse(localStorage.getItem("pharmacy")).pharmacyId,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                }
                this.$axios.post('/api/pay/provide/order/merGetOrder',data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    console.log(res.data.data)
                    // this.$message.success(res.data.message)
                })
            },
            send() {
                this.$axios.post("/api/pay/provide/order/merSendOrder",this.form).then((res)=>{
                    this.$message.success(res.data.message)
                    this.dialogFormVisible = false
                    this.getOrder()
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getDrug();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getDrug();
            },
            // 显示编辑弹出框
            handleEdit(index, row){
                console.log(row)
                this.form = {    //需要添加的字段
                        deliveryName:'',
                        deliveryNumber:'',
                        deliveryStartAddress:row.user.userDetailedAddress,
                        deliveryEndAddress:JSON.parse(localStorage.getItem("pharmacy")).pharmacyDetailedAddress,
                        deliveryCreateTime:new Date(),
                        deliveryStatus:0,
                        deliveryOrderId:row.orderId,
                },
                this.dialogFormVisible = true
                // this.editFormVisible = true;
                // this.editForm = Object.assign({}, row);
                // console.log(this.editForm)
            },



        }
    }
</script>
<style scoped>
    .search-input {
        width: 200px;
        margin-left: 50px;
    }
    .el-table__body-wrapper{
        height: 500px;
    }
    .crumbs{
        margin-bottom:20px;
    }

    .cantainer {
        padding: 10px;
        background: #ffffff;
        border-radius: 5px;
        border: 1px #ddd solid;
        margin-top: 20px;
    }

</style>

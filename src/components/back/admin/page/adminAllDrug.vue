<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">所有药品</i>
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
                            prop="drugId"
                            label="药品编号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="drugName"
                            label="药品名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="drugType"
                            label="药品类型"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="drugIsPrescription"
                            label="处方类型"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.drugIsPrescription | getType(scope.row.drugIsPrescription)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="drugCratetime"
                            label="生产日期"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="drugExpiredtime"
                            label="过期日期"
                            sortable
                            width="120"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="drugPrice"
                            label="药品价格"
                            show-overflow-tooltip>
                    </el-table-column>



                    <el-table-column
                            prop="drugStatus"
                            label="药品状态"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.drugStatus | getStatus(scope.row.drugStatus)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyName"
                            label="所属店铺"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="drugPharmacyId"
                            label="店铺ID"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="merchantName"
                            label="店铺老板"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >下架</el-button>
                            <el-button
                                    size="mini"
                                    @click="deleteList(scope.$index,scope.row)">提醒商家</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout=" prev, pager, next, jumper"
                        :total="totalNum">
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        mounted(){
            this.getDrug();
        },
        data () {
            return {
                list:[], //数据存储
                totalNum:0,
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                ruleForm:{},
                form:{    //需要添加的字段
                    name:"",
                    date:"",
                    address:""
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
                this.currentPage = 1;
                this.getDrug();

            },
            getDrug(){
                let data = {
                    'content': this.content,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                }
                this.$axios.post('/api/message/provide/drug/getAllAdminDrug',data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
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
            deleteList(index, row){
                let message = {
                    messageContent:"您店铺编号："+row.drugId +"号药品,"+row.drugName +"被用户举报为违法药品，现已下架请及时处理",
                    messageSend:0,
                    messageGet:row.drugPharmacyId,
                    messageOther:row.drugId,
                    messageType:6,
                    messageStatus:0
                }
                this.$axios.post("/api/pay/provide/pay/message/allSendMessage",message).then((res)=>{
                    this.$message.success("提醒成功！！！")
                })
            },
            // 显示编辑弹出框
            handleEdit(index, row){

                let data = {
                    'drugId':row.drugId,
                    'drugStatus':1
                }
                this.$axios.post('/api/message/provide/drug/updateDrug',data).then((res)=>{
                    this.$message.success("下架成功")
                    this.getDrug()
                })
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

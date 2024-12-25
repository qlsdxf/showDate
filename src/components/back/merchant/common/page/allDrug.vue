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
                            width="200">
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
                            prop="drugNum"
                            label="药品数量"
                            sortable
                            show-overflow-tooltip
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="drugPrice"
                            label="药品价格"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="drugFactory"
                            label="药品厂商"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="drugApprovalNumber"
                            label="批准文号"
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
                            prop="drugPopular"
                            label="热门药品"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteList(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
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
                content:'12138'
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
                this.getDrug();
                this.pageNum = 1;
            },
            getDrug(){
                console.log(JSON.parse(localStorage.getItem("pharmacy")).pharmacyId)
                this.$axios.get('/api/message/provide/drug/getDrugs',{
                    params:{
                        'content': this.content,
                        'pageNum': this.currentPage,
                        'pageSize': this.pageSize,
                        'pharmacyId' : JSON.parse(localStorage.getItem("pharmacy")).pharmacyId
                    }

                }).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    console.log(res.data.data)
                    this.$message.success(res.data.message)
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
                let data = {
                    'drugId':row.drugId,
                    'drugStatus':2
                }
                this.$axios.post('/api/message/provide/drug/updateDrug',data).then((res)=>{
                    this.$message.success("删除成功")
                    this.getDrug()
                })
            },
            // 显示编辑弹出框
            handleEdit(index, row){
                localStorage.setItem("editDrug", JSON.stringify(row))
                this.$router.push({
                    path: '/editDrug',
                })
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

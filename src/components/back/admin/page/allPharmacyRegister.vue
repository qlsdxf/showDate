<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">店铺审核</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="cantainer">
                <el-table
                        :data="list"
                        tooltip-effect="dark"
                        style="width: 100%"
                >
                    <!--<el-table-column type="selection" width="55"></el-table-column>-->
                    <el-table-column
                            prop="pharmacyName"
                            label="店铺名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="merchantName"
                            label="店铺主人名称"
                            width="120px"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyDetailedAddress"
                            label="店铺详细地址"
                            width="250px"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            prop="merchantIdCardPic"
                            label="身份复印件图片"
                            width="170px"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-image :src="scope.row.merchantIdCardPic"
                                      :preview-src-list="merchantBusinessLicense"
                                      width="70" height="70" ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="merchantBankAccount"
                            label="银行开户许可证"
                            width="170px"
                    >
                        <template slot-scope="scope">
                            <el-image :src="scope.row.merchantBankAccount"
                                      :preview-src-list="merchantBankAccount"
                                      width="70" height="70" ></el-image>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="merchantDrugLicense"
                            label="药品经营许可证"
                            width="170px"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-image :src="scope.row.merchantDrugLicense"
                                      :preview-src-list="merchantDrugLicense"
                                      style="width: auto;height: auto" ></el-image>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="merchantBusinessLicense"
                            label="营业执照"
                            width="170px"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-image :src="scope.row.merchantBusinessLicense"
                                      :preview-src-list="merchantBusinessLicense"
                                      min-width="170px" height="170px" ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyResult"
                            label="审核结果"
                            width="130px"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" width="240px">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row)"
                            >审核通过</el-button>
                            <el-button
                                    size="mini"
                                    @click="getItem(scope.row)"
                            >存在问题</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="给出原因" :visible.sync="dialogFormVisible">
                    <el-input v-model="item.pharmacyResult"type="textarea" :rows="5" ></el-input>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="getMessage">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
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
            this.getAudit();
        },
        data () {
            return {
                list:[], //数据存储
                totalNum:0,
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                messageContent:'',
                editFormVisible: false,  //编辑器弹出框
                merchantBusinessLicense:[],
                merchantIdCardPic:[],
                merchantDrugLicense:[],
                merchantBankAccount:[],
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
                content:'感冒',
                item:{}
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
        watch:{
            ListSearch(val) {
                this.list.forEach(val => {

                })
            }
        },
        methods:{
            getMessage(){
                this.$axios.post("/api/message/provide/pharmacy/update",this.item).then((res)=>{
                    this.$message.success("驳回成功，等待用户修改！！！")
                    this.getAudit();
                    this.dialogFormVisible = false
                })
            },
            getItem(row){
                this.item.pharmacyId = row.pharmacyId
                this.dialogFormVisible =true
            },
            getAudit(){

                this.$axios.get('/api/message/provide/merchant/getAllAudit',{
                    params:{
                        'pageNum' :this.currentPage,
                        'pageSize' : this.pageSize,
                    }
                }).then((res)=>{
                    this.list = res.data.data.records
                    console.log(this.list)
                    this.totalNum = res.data.data.total
                    console.log(res.data.data)


                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getAudit();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getAudit();
            },

            // 显示编辑弹出框
            handleEdit(row){
                console.log(12)
                console.log(row)
                let data = {
                    'pharmacyId': row.pharmacyId,
                    'pharmacyStatus':1
                }
                this.$axios.post("/api/message/provide/pharmacy/update",data).then((res)=>{
                    this.$message.success("审核成功！！！")
                    this.getAudit();
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

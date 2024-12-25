<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">店铺审核结果</i>
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
                            width="170px"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" width="170px">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >修改信息</el-button>
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

        <!--编辑弹出框-->
        <el-dialog title="编辑" :visible.sync="editFormVisible"  width="30%">
            <el-form :model="editForm" label-width="50px" ref="addForm">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>

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
                content:'感冒'
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
            getAudit(){
                console.log(JSON.parse(localStorage.getItem("merchant")))
                console.log(JSON.parse(localStorage.getItem("merchant")).merchantId)
                this.$axios.get('/api/message/provide/merchant/getAudit',{
                    params:{
                        'merchantId' : JSON.parse(localStorage.getItem("merchant")).merchantId
                    }
                }).then((res)=>{
                    this.list.push(res.data.data)
                    console.log(res.data.data)
                    this.$message.success(res.data.message)
                    this.merchantBusinessLicense.push(res.data.data.merchantBusinessLicense)
                    this.merchantIdCardPic.push(res.data.data.merchantIdCardPic)
                    this.merchantDrugLicense.push(res.data.data.merchantDrugLicense)
                    this.merchantBankAccount.push(res.data.data.merchantBankAccount)
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },

            // 显示编辑弹出框
            handleEdit(index, row){
                this.$router.push("/merMessage")
            },
            // 编辑
            editSubmit(row) {
                if (!this.editForm.name || !this.editForm.address || !this.editForm.date) {
                    this.$messageerror('内容不能为空');
                } else {
                    let HandleEdit = {
                        name: this.form.name,
                        address: this.form.address,
                        date: this.form.date
                    }
                    this.$http.post("https://wd6176291011jokkcy.wilddogio.com/vuetable.json",HandleEdit).then(res => {
                        this.editFormVisible = false
                        this.$message.success('添加成功');
                    })
                    console.log(HandleEdit)
                }

            },
            // 删除
            deleteList(index,row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete("https://wd6176291011jokkcy.wilddogio.com/vuetable/"+row.id+".json").then(res => {
                        this.list.splice(index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 添加数据
            add() {
                if (!this.form.name || !this.form.address || !this.form.date) {
                    this.$message.error('内容不能为空');
                } else {
                    let handleAddClick ={
                        name: this.form.name,
                        address: this.form.address,
                        date: this.form.date
                    }
                    this.$http.post("https://wd6176291011jokkcy.wilddogio.com/vuetable.json",handleAddClick).then(res => {
                        this.dialogFormVisible = false;
                        this.$message.success('添加成功');

                    })
                }
            }
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

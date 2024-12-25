<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">店铺排名情况</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="cantainer">
                <div class="handle-box">
                    <el-button type="primary" @click="seeOwn" class="handle-del mr10" style="margin-left: 5px;height: 35px;margin-top: 8px">查看自己</el-button>
                    <el-button type="primary" @click="getPharmacyRank" class="handle-del mr10" style="margin-left: 5px;height: 35px;margin-top: 8px">查看所有</el-button>
                </div>
                <el-table
                        :data="list"
                        tooltip-effect="dark"
                        :row-class-name="tableRowClassName"
                        style="width: 100%"
                >

                    <el-table-column
                            prop="pharmacyName"
                            label="店铺名称"
                            style="text-align: center"
                            width="220">
                        <!--<template slot-scope="scope">-->
                            <!--{{ scope.row.pharmacyName | getName(scope.row.pharmacyName)}}-->
                        <!--</template>-->
                    </el-table-column>
                    <el-table-column
                            prop="pharmacySort"
                            label="店铺排名"
                            width="120px"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            prop="pharmacyBuyRank"
                            label="是否购买排名"
                            width="170px"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.pharmacyBuyRank | getStatus(scope.row.pharmacyBuyRank)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyBuyPic"
                            label="是否购买热门图片"
                            width="170px"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.pharmacyBuyPic | getStatus(scope.row.pharmacyBuyPic)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyNum"
                            label="购买排名次数"
                            width="170px"
                    ></el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    v-if="scope.row.pharmacyId == pharmacy.pharmacyId"
                                    @click="buyPic(scope.row)"
                            >购买热门图片</el-button>

                            <el-button
                                    size="mini"
                                    v-if="scope.row.pharmacyId == pharmacy.pharmacyId"
                                    @click="buyRank(scope.row)"
                            >购买排名</el-button>
                            <el-button
                                    size="mini"
                                    v-if="scope.row.pharmacyId != pharmacy.pharmacyId"
                            >不可操作</el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total,  prev, pager, next, jumper"
                        :total="totalNum">
                </el-pagination>
            </div>
        </div>

        <!--&lt;!&ndash;编辑弹出框&ndash;&gt;-->
        <!--<el-dialog title="编辑" :visible.sync="editFormVisible"  width="30%">-->
            <!--<el-form :model="editForm" label-width="50px" ref="addForm">-->
                <!--<el-form-item label="日期">-->
                    <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="姓名">-->
                    <!--<el-input v-model="editForm.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="地址">-->
                    <!--<el-input v-model="editForm.address"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="editFormVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="editSubmit">确 定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->

    </div>
</template>

<script>

    export default {
        mounted(){
            this.pharmacy = JSON.parse(localStorage.getItem('pharmacy'))
            if (this.pharmacy == undefined) {
                this.$router.push("/merchantLogin")
            }
            this.getPharmacyRank();
            this.getRankNum();
        },
        data () {
            return {
                list:[], //数据存储
                totalNum:0,
                pharmacy:{},
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                merchantBusinessLicense:[],
                merchantIdCardPic:[],
                merchantDrugLicense:[],
                merchantBankAccount:[],
                addLoading:false,
                currentPage:1, //初始页
                pageSize:5 , //	每页的数据
                content:'',
                rankNum:4,
            }
        },
        created() {

        },
        filters: {
            getName: (msg) => { // msg表示要过滤的数据，a表示传入的参数
                return "****";
            },
            getStatus: (msg) =>{

                if (msg == 0) {
                    return "否"
                } else {
                    return "是"
                }
            }
        },
        methods:{
            getRankNum() {
                this.$axios.post("/api/pay/provide/pay/getNum").then((res)=>{
                    if (res.data.code == 200) {
                        this.rankNum = res.data.data
                    }
                })
            },
            buyPic(row){
                console.log(row)
                // this.$axios.get("/provide/provide/pharmacy/rankNum").then((res)=>{
                //     console.log(res.data)
                // })
                let data = {
                    'pharmacyId':this.pharmacy.pharmacyId,
                    'type':1,
                    'name':'购买热门图片'
                }
                if(this.pharmacy.pharmacyBuyPic == 1){
                    this.$message({
                        type: 'warning',
                        message: '你已经购买了，请不要重复购买'
                    });
                }else if(this.rankNum > 0) {
                    this.$confirm('系统现在还有'+this.rankNum +"个热门图片位置是否购买？", '购买热门图片', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        this.$axios.post("/api/pay/provide/pay/buyPic",data).then((res)=>{
                            document.write(res.data.data)
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else{
                    this.$confirm('系统现在没有热门图片位置，请耐心等待', '购买热门图片', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // this.$message({
                        //     type: 'success',
                        //     message: '删除成功!'
                        // });
                    }).catch(() => {
                        // this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        // });
                    });
                }

            },
           buyRank(row){
               let data = {
                   'pharmacyId':row.pharmacyId,
                   'type':1,
                   'name':'购买热门图片'
               }
               console.log(this.pharmacy.pharmacyNum)
                // this.$axios.get("/provide/provide/pharmacy/rankNum").then((res)=>{
                //     console.log(res.data)
                // })
               if(this.pharmacy.pharmacyBuyPic == 1){
                   this.$message({
                       type: 'warning',
                       message: '你已经购买了，请不要重复购买'
                   });
               }else if(this.pharmacy.pharmacyNum == 2) {
                   this.$confirm('你本周还有二次购买机会，第一次免费，确认购买排名？', '购买热门图片', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'info'
                   }).then(() => {
                       this.$axios.post("/api/pay/provide/pay/buyRank",data).then((res)=>{
                            if(res.data.data == 1) {
                                this.$message.success("购买成功")
                            }else{
                                document.write(res.data.data)
                            }
                       })
                   }).catch(() => {
                       this.$message({
                           type: 'info',
                           message: '已取消删除'
                       });
                   });
               } else if(this.pharmacy.pharmacyNum == 1){
                   this.$confirm('你本周还有一次购买机会，确认购买排名？', '购买热门图片', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'warning'
                   }).then(() => {
                       document.write(res.data.data)
                   }).catch(() => {
                       this.$axios.post("/api/pay/provide/pay/buyRank",data).then((res)=>{

                               document.write(res.data.data)

                       })
                       // this.$message({
                       //     type: 'info',
                       //     message: '已取消删除'
                       // });
                   })
               } else if(this.pharmacy.pharmacyNum == 0) {
                   this.$confirm('你本周没有购买排名资格了，请等待下周在购买', '购买店铺排名', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'warning'
                   }).then(() => {
                       // this.$message({
                       //     type: 'success',
                       //     message: '删除成功!'
                       // });
                   }).catch(() => {
                       // this.$message({
                       //     type: 'info',
                       //     message: '已取消删除'
                       // });
                   });
               }

            },
            tableRowClassName({row, rowIndex}) {

                // console.log("row: " + row.pharmacyId)
                // console.log("pha: " + this.pharmacy.pharmacyId)
                // console.log(row.pharmacyId === this.pharmacy.pharmacyId)
                if (row.pharmacyId === this.pharmacy.pharmacyId) {
                    return 'success-row';
                }
                return '';

             },
            seeOwn(){
                let data = {
                    'content': this.pharmacy.pharmacyId,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'pharmacyStatus' : 1
                }
                console.log(data)
                this.$axios.post('/api/message/provide/pharmacy/getOwn',data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    console.log(res.data)
                    this.$message.success(res.data.message)
                })
            },
            getPharmacyRank(){
                let data = {
                    'content': this.content,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'pharmacyStatus' : 1
                }
                console.log(data)
                this.$axios.post('/api/message/provide/pharmacy/getAllPharmacy',data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    console.log(res.data)
                    this.$message.success(res.data.message)
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.currentPage = size;
                this.getPharmacyRank()
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getPharmacyRank()
            },

            // 显示编辑弹出框
            handleEdit(index, row){
                this.$router.push("/merMessage")
            },

        }
    }
</script>
<style >
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

</style>
<style scoped>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
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

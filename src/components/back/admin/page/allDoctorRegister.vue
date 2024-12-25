<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">所有医生</i>
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
                            prop="doctorName"
                            label="医生昵称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="doctorAge"
                            label="医生年龄"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="doctorSex"
                            label="医生性别"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.doctorSex | getSex(scope.row.doctorSex)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="doctorCreatetime"
                            label="注册时间"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="doctorPhone"
                            label="医生电话"
                            sortable
                            width="120"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="doctorAddress"
                            label="医生地址"
                            sortable
                            show-overflow-tooltip
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="doctorSchool"
                            label="毕业学校"
                            show-overflow-tooltip>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="doctorStatus"-->
                            <!--label="医生状态"-->
                            <!--show-overflow-tooltip>-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.doctorStatus | getStatus(scope.row.doctorStatus)}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="doctorResult"
                            label="审核结果"
                            width="200">
                        <template slot-scope="scope">
                            {{scope.row.doctorResult | getResult(scope.row.doctorResult)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="doctorCertificate"
                            label="医师执照"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-image :src="scope.row.doctorCertificate"
                                      :preview-src-list="doctorCertificates"
                                      @click="showDetail(scope.row.doctorCertificate)"
                                      width="70" height="70" ></el-image>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="pass(scope.$index, scope.row)"
                            >通过审核</el-button>
                            <el-button
                                    size="mini"
                                    @click="getItem(scope.row)"
                            >存在问题</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-dialog title="给出原因" :visible.sync="dialogFormVisible">
                    <el-input v-model="item.doctorResult"type="textarea" :rows="5" ></el-input>
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
            this.getAllDoctor();
        },
        data () {
            return {
                list:[], //数据存储
                item:{},
                totalNum:0,
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                ruleForm:{},
                doctorCertificates:[],
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
            getSex: (msg) => { // msg表示要过滤的数据，a表示传入的参数
                if (msg == 1) {
                    return "男"
                } else {
                    return "女"
                }
            },
            getResult: (msg) => { // msg表示要过滤的数据，a表示传入的参数
                console.log(msg)
                if (msg == null) {
                    return "正在审核"
                } else {
                    return msg
                }
            },
            getStatus: (msg) =>{
                if (msg == 1) {
                    return "审核成功"
                } else if (msg == 2) {
                    return "店铺医生"
                } else if (msg == 3) {
                    return "系统医生"
                } else if(msg == 0){
                    return "待审核"
                } else {
                    return "审核失败"
                }
            }
        },
        methods:{
            search() {
                this.content = this.ListSearch
                this.getAllDoctor();
                this.pageNum = 1;
            },
            getMessage(){
                console.log(this.item)
                this.$axios.post("/api/message/provide/doctor/updateDoctor",this.item).then((res)=>{
                    this.$message.success("驳回成功，等待用户修改！！！")
                    this.getAudit();
                    this.dialogFormVisible = false
                })
            },
            getItem(row){
                this.item.doctorId = row.doctorId

                this.dialogFormVisible =true
            },
            getAllDoctor(){
                let data = {
                    'content': this.content,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'doctorStatus' : "0"
                }
                this.$axios.post('/api/message/provide/doctor/getAllDoctor',data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    console.log(this.list)
                    this.$message.success(res.data.message)
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getAllDoctor();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getAllDoctor();
            },
            // 显示编辑弹出框
            pass(index, row){

                let data = {
                    doctorId: row.doctorId,
                    doctorStatus: 1
                }
                console.log(data)
                this.$axios.post("/api/message/provide/doctor/updateDoctor",data).then((res)=>{
                    if (res.data.code == 200) {
                        this.$message.success("审核成功");
                        localStorage.setItem("doctor",JSON.stringify(res.data.data));
                        this.getAllDoctor();
                    }
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

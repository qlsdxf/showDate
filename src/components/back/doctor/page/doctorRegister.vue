<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">审核情况</i>
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
                            prop="doctorName"
                            label="医生昵称"
                            width="180">
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
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="doctorPhone"
                            label="医生电话"
                            width="120"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="doctorAddress"
                            label="医生地址"
                            show-overflow-tooltip
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="doctorSchool"
                            label="毕业学校"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="doctorStatus"
                            label="医生状态"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.doctorStatus | getStatus(scope.row.doctorStatus)}}
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

                    <el-table-column label="操作" width="150">
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


    </div>
</template>

<script>
    export default {
        mounted(){

            this.doctor = JSON.parse(localStorage.getItem("doctor"))
            if (this.doctor == undefined || this.doctor == null) {
                this.$router.push("/doctorLogin")
            }
            this.getDoctor();
        },
        data () {
            return {
                list:[], //数据存储
                totalNum:0,
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                ruleForm:{},
                doctor:{},
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
                this.getDoctor();
                this.pageNum = 1;
            },
            getDoctor(){
                // let data = {
                //     'content': this.content,
                //     'pageNum': this.currentPage,
                //     'pageSize': this.pageSize,
                //     'doctorStatus' : "0"
                // }
                console.log(this.doctor)
                this.$axios.get('/api/message/provide/doctor/getDocotorByDoctor/'+this.doctor.doctorId).then((res)=>{
                    this.list = [];
                    this.list.push(res.data.data)
                    this.$message.success(res.data.message)
                    console.log(this.list)
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getDoctor();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getDoctor();
            },
            // 显示编辑弹出框
            handleEdit(index, row){
                this.$router.push("/docChangeMessage");
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

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
                    <el-table-column
                            prop="doctorStatus"
                            label="医生状态"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.doctorStatus | getStatus(scope.row.doctorStatus)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pharmacy.pharmacyName"
                            label="所属店铺"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.pharmacy.pharmacyName | getBelong(scope.row.doctorStatus,scope.row.pharmacy.pharmacyName)}}
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

                    <!--<el-table-column label="操作" width="150">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button-->
                                    <!--size="mini"-->
                                    <!--@click="handleEdit(scope.row,1)"-->
                                    <!--type="danger"-->
                            <!--&gt;封禁医生</el-button>-->
                            <!--<el-button-->
                                    <!--size="mini"-->
                                    <!--@click="handleEdit(scope.row,2)"-->
                                    <!--type="danger"-->
                            <!--&gt;解封医生</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
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
            this.getAllDoctor();
        },
        data () {
            return {
                list:[], //数据存储
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
            getBelong:(name,msg)=>{
                console.log("msg:"+msg)
                console.log("name:"+name)
                if (msg == 3) {
                    return "系统"
                } else{
                    return name;
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
            getAllDoctor(){
                let data = {
                    'content': this.content,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'doctorStatus' : "0,1,2,3,4"
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
            handleEdit(row,type){
                let data = {
                    doctorId: row.doctorId,
                    doctorStatus: doctorStatus
                }
                this.$axios.post("/api/message/provide/doctor/updateUser",data).then((res=>{
                    if (res.data.code == 200) {
                        if (userStatus == 1) {
                            this.$message.success("封号成功！！！，该账号已被封禁")
                        } else {
                            this.$message.success("解封成功！！！")
                        }

                    }
                }))
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

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
                            prop="messageCreateTime"
                            label="消息发送时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="messageContent"
                            label="内容"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="messageType"
                            label="消息类型"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.messageType | getType(scope.row.messageType)}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="messageStatus"
                            label="消息状态"
                            sortable
                            width="120">
                        <template slot-scope="scope">
                            {{scope.row.messageStatus | getStatus(scope.row.messageStatus)}}
                        </template>
                    </el-table-column>

                    <!--<el-table-column-->
                    <!--prop="doctorCertificate"-->
                    <!--label="医师执照"-->
                    <!--show-overflow-tooltip>-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-image :src="scope.row.doctorCertificate"-->
                    <!--:preview-src-list="doctorCertificates"-->
                    <!--@click="showDetail(scope.row.doctorCertificate)"-->
                    <!--width="70" height="70" ></el-image>-->
                    <!--</template>-->
                    <!--</el-table-column>-->


                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="read(scope.row)"
                                    type="message"
                            >确认读取</el-button>
                            <el-button
                                    size="mini"
                                    @click="del(scope.row)"
                                    type="danger"
                            >删除消息</el-button>
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

            this.pharmacy = JSON.parse(localStorage.getItem("pharmacy"))
            if (this.doctor == undefined || this.doctor == null) {
                this.$router.push("/merchantLogin")
            }
            this.getMessage();
        },
        data () {
            return {
                list:[], //数据存储
                totalNum:0,
                pharmacy:{},
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
                content:'',
            }
        },
        created() {

        },

        filters: {
            getType: (msg) => { // msg表示要过滤的数据，a表示传入的参数
                if (msg == 6) {
                    return "举报消息"
                }
                return "发货消息";
            },
            getStatus: (msg) =>{
                if (msg == 0) {
                    return "未读"
                } else  {
                    return "已读"
                }
            }
        },
        methods:{
            search() {
                this.content = this.ListSearch
                this.getMessage();
                this.pageNum = 1;
            },
            read(row){
                if (row.messageStatus == 1) {
                    this.$message.success("该消息确认已读")
                } else{
                    let data = {
                        'messageStatus': '1',
                        'messageId': row.messageId,
                    }
                    this.$axios.post("/api/message/provide/message/updateMessage",data).then((res)=>{

                        this.$message.success("确认已读")
                        this.getMessage();
                    })
                }

            },
            del(row){
                if (row.messageStatus == 2) {
                    this.$message.success("该消息确认已读")
                } else{
                    let data = {
                        'messageStatus': '2',
                        'messageId': row.messageId,
                    }
                    this.$axios.post("/api/message/provide/message/updateMessage",data).then((res)=>{
                        this.$message.success("删除成功！！！")
                        this.getMessage();
                    })
                }
            },
            getMessage(){
                let data = {
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'messageType': "1,6",
                    'messageGet': this.pharmacy.pharmacyId
                }
                this.$axios.post('/api/message/provide/message/getAMessageBuyType',data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    // this.$message.success(res.data.message)
                    console.log(res.data.data)
                    console.log(this.totalNum)
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getMessage();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getMessage();
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

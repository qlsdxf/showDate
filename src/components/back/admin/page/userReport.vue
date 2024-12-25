<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">店铺注册申请</i>
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
                    <el-table-column type="expand">
                        <template slot-scope="props">

                            <div>
                                <span style="margin-left: 60px">投诉原因：</span><span style="width: 90px;color: #99a9bf;">{{ props.row.reportRespon }}</span>
                            </div>
                            <div style="margin-top: 5px">
                                <span style="margin-left: 60px">回复内容：</span><span style="width: 90px;color: #99a9bf;" v-if=" props.row.replyContent != null">{{props.row.replyContent}}</span>
                                <span style="width: 90px;color: #99a9bf;" v-if=" props.row.replyContent == null">暂未回复</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="投诉人"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="reportCreateTime"
                            label="投诉时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="drugName"
                            label="投诉药品"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyName"
                            label="投诉店铺"
                            sortable
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pharmacyId"
                            label="店铺ID"
                            sortable
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="reportStatus"
                            label="是否回复"
                            sortable
                            width="150">
                        <template slot-scope="scope">
                            {{scope.row.reportStatus | getReply(scope.row.reportStatus)}}
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="reply(scope.row)">回复用户</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="回复用户" :visible.sync="dialogFormVisible">
                    <el-input v-model="item.messageContent"type="textarea" :rows="5" ></el-input>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="sendMessage">确 定</el-button>
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
            this.getReport();
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
                item:{},
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
                if (msg == '1') {
                    return "男"
                } else {
                    return "女"
                }
            },
            getReply: (msg) =>{
                if (msg == 0) {
                    return "未回复"
                } else {
                    return "已回复"
                }
            }
        },
        methods:{
            search() {
                this.content = this.ListSearch
                this.getReport();
                this.pageNum = 1;
            },
            getReport(){
                let data = {
                    'content': this.content,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'userStatus' : 0
                }
                this.$axios.post('/api/message/provide/report/getAllReport',data).then((res)=>{
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
                this.getReport();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getReport();
            },
            sendMessage() {
                this.$axios.post("/api/pay/provide/pay/message/allSendMessage",this.item).then((res)=>{
                    if (res.data.code == 200) {
                        this.$message.success("回复成功！！")
                        let date = {
                            'reportId':this.item.messageOther,
                            'reportStatus':1
                        }
                        this.$axios.post("/api/message/provide/report/updateReport",date)
                        this.getReport();
                    }
                    this.dialogFormVisible = false
                })
            },
            // 显示编辑弹出框
            reply(row){
                if (row.reportStatus == 1) {
                    this.$message.error("改信息已回复！！!")
                } else {
                    this.item  = {
                        messageType:'5',
                        messageSend:0 ,
                        messageGet:row.reportUserId,
                        messageContent:'尊敬的用户，您举报的'+row.pharmacyName + "店铺的" + "编号:" + row.reportDrugId + "；名称："+row.drugName,
                        messageOther:row.reportId,
                        messageStatus:'0',
                    }
                    this.dialogFormVisible = true
                }

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

<template>
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
                    prop="messageType"
                    label="消息类型"
                    width="100">
                <template slot-scope="scope">
                    {{scope.row.messageType | getType(scope.row.messageType)}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="messageCreateTime"
                    label="消息发送时间"
                    width="200"
                    >
            </el-table-column>
            <el-table-column
                    prop="messageContent"
                    label="消息内容"
                    show-overflow-tooltip>
                <!--<template slot-scope="scope">-->
                    <!--&lt;!&ndash;{{scope.row.doctorSex | getSex(scope.row.doctorSex)}}&ndash;&gt;-->
                <!--</template>-->
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
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "sys-message",
        data() {
            return {
                list:[], //数据存储
                totalNum:0,
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                ruleForm:{},
                doctorCertificates:[],
                addLoading:false,
                currentPage:1, //初始页
                pageSize:5 , //	每页的数据
                content:'',
                user:{},
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            this.getAllMessage()
        },
        filters: {
            getType: (msg) => { // msg表示要过滤的数据，a表示传入的参数
                if (msg == 5) {
                    return "举报反馈"
                } else {
                    return "系统消息"
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
                if (msg == 0) {
                    return "未读"
                } else  {
                    return "已读"
                }
            }
        },
        methods: {
            read(row){
                let data = {
                    'messageStatus': '1',
                    'messageId': row.messageId,
                }
                this.$axios.post("/api/message/provide/message/updateMessage",data).then((res)=>{

                    this.$message.success("确认已读")
                    this.getAllMessage();
                })
            },
            del(row){
                let data = {
                    'messageStatus': '2',
                    'messageId': row.messageId,
                }
                this.$axios.post("/api/message/provide/message/updateMessage",data).then((res)=>{
                    this.$message.success("删除成功！！！")
                    this.getAllMessage();
                })
            },
            search() {
                this.content = this.ListSearch
                this.getAllMessage();
                this.pageNum = 1;
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getAllMessage();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getAllMessage();
            },
            getAllMessage(){
                let data = {
                    'pageSize': this.pageSize,
                    'pageNum': this.currentPage,
                    'messageType': '3,5',
                    'messageGet': this.user.userId,
                    'content': this.content,
                }
                this.$axios.post("/api/message/provide/message/getAMessageBuyType",data).then((res)=>{
                    this.list = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.totalNum = res.data.data.total;
                    console.log(res.data.data)
                    this.$message.success(res.data.message)
                })
            }
        }
    }
</script>

<style scoped>
    .cantainer {
        padding: 10px;
        background: #ffffff;
        border-radius: 5px;
        border: 1px #ddd solid;
        margin-top: 20px;
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
</style>
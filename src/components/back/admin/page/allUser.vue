<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">所有用户</i>
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
                               prop="userName"
                               label="用户名称"
                               width="200">
                       </el-table-column>
                       <el-table-column
                               prop="userAge"
                               label="用户年龄"
                               width="120">
                       </el-table-column>
                       <el-table-column
                               prop="userPhone"
                               label="用户电话"
                               width="120">
                       </el-table-column>
                       <el-table-column
                               prop="userSex"
                               label="用户性别"
                               sortable
                               width="120">
                           <template slot-scope="scope">
                           {{scope.row.userSex | getSex(scope.row.userSex)}}
                           </template>
                       </el-table-column>

                       <el-table-column
                               prop="userDetailedAddress"
                               label="用户地址"
                               sortable
                               width="250"
                               show-overflow-tooltip>
                       </el-table-column>

                       <el-table-column
                               prop="userStatus"
                               label="用户状态"
                               width="120">
                           <template slot-scope="scope">
                               {{scope.row.userStatus | getStatus(scope.row.userStatus)}}
                           </template>
                       </el-table-column>
                       <el-table-column label="操作" width="200">
                           <template slot-scope="scope">
                               <el-button
                                       v-show="scope.row.userStatus == 0"
                                       size="mini"
                                       @click="banUser(scope.row,1)"
                               >封号</el-button>
                               <el-button
                                       size="mini"
                                       v-show="scope.row.userStatus == -1"
                                       type="danger"
                                       @click="banUser(scope.row,2)">解除封禁</el-button>
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
            this.getAllUser();
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
            getStatus: (msg) =>{
                if (msg == 1) {
                    return "封号"
                } else {
                    return "正常"
                }
            }
        },
        methods:{
            search() {
                this.content = this.ListSearch
                this.getAllUser();
                this.pageNum = 1;
            },
            getAllUser(){
                let data = {
                        'content': this.content,
                        'pageNum': this.currentPage,
                        'pageSize': this.pageSize,
                        'userStatus' : 0
                }
                this.$axios.post('/api/message/provide/user/getAllUser',data).then((res)=>{
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
                this.getDrug();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getDrug();
            },
            // 显示编辑弹出框
            handleEdit(index, row,userStatus){

                let data = {
                    userId: row.userId,
                    userStatus: userStatus
                }
                this.$axios.post("/api/message/provide/user/updateUser",data).then((res=>{
                    if (res.data.code == 200) {
                        if (userStatus == 1) {
                            this.$message.success("封号成功！！！，该账号已被封禁")
                        } else {
                            this.$message.success("解封成功！！！")
                        }


                    }
                }))
            },
            banUser(row,type){
                let data  = {
                    'userId':row.userId,
                    'userPhone':row.userPhone,
                    'hour':3,
                    'type':type
                }
                this.$axios.post("/api/message/provide/user/banUser",data).then((res)=>{
                    if (type == 1) {
                        this.$message.success("成功封号")
                    } else {
                        this.$message.success("解封成功")
                    }
                    this.getAllUser();

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

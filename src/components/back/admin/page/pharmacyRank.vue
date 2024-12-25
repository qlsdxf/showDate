<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">店铺排名</i>
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
                    <!--<el-table-column type="expand">-->
                    <!--<template slot-scope="props">-->
                    <!--<span style="margin-left: 60px">投诉原因：</span><span style="width: 90px;color: #99a9bf;">{{ props.row.reportRespon }}</span>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="pharmacyName"
                            label="店铺名称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="merchant.merchantName"
                            label="店铺老板名称"
                            width="150">
                    </el-table-column>

                    <el-table-column
                            prop="merchant.merchantPhone"
                            label="店铺老板电话"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pharmacySort"
                            label="店铺排名"
                            width="150">
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.pharmacyStatus | getStatus(scope.row.pharmacyStatus)}}-->
                        <!--</template>-->
                    </el-table-column>

                    <el-table-column
                            prop="pharmacyNum"
                            label="排名次数"
                            width="150">
                        <!--<template slot-scope="scope">-->
                        <!--{{scope.row.pharmacyStatus | getStatus(scope.row.pharmacyStatus)}}-->
                        <!--</template>-->
                    </el-table-column>

                    <el-table-column
                            prop="pharmacyBuyPic"
                            label="是否购买热门图片"
                            width="150">
                        <template slot-scope="scope">
                        {{scope.row.pharmacyBuyPic | getBuy(scope.row.pharmacyBuyPic)}}
                        </template>
                    </el-table-column>


                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="update(scope.$index,scope.row)">取消购买热门图片</el-button>
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
            this.getAllPharmacy();
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
            getBuy: (msg) =>{
                if (msg == 0) {
                    return "未购买"
                } else if (msg == 1) {
                    return "已购买"
                }
            }
        },
        methods:{
            search() {
                this.content = this.ListSearch
                this.getAllPharmacy();
                this.pageNum = 1;
            },
            update(index, row){
                console.log(row)
                if (row.pharmacyBuyPic == 0){
                    this.$message.error("操作失败，该店铺未购买热门图片")
                }else {
                    let data = {
                        "pharmacyId":row.pharmacyId,
                        "pharmacyBuyPic":row.pharmacyBuyPic
                    }
                    console.log(data)
                    this.$axios.post("/api/message/provide/pharmacy/update",data).then((res)=>{
                        if (res.data.code == 200) {
                            this.$message.success("取消成功！！！")
                            this.getAllPharmacy()
                        }
                    })
                }

            },
            getAllPharmacy(){
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
                    console.log(this.list)
                    this.$message.success(res.data.message)
                })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getAllPharmacy();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getAllPharmacy();
            },
            // // 显示编辑弹出框
            // handleEdit(index, row,userStatus){
            //
            //     let data = {
            //         userId: row.userId,
            //         userStatus: userStatus
            //     }
            //     this.$axios.post("/provide/provide/user/updateUser",data).then((res=>{
            //         if (res.data.code == 200) {
            //             if (userStatus == 1) {
            //                 this.$message.success("封号成功！！！，该账号已被封禁")
            //             } else {
            //                 this.$message.success("解封成功！！！")
            //             }
            //
            //         }
            //     }))
            // },



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

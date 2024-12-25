<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-tickets">本店医生</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="cantainer">
                <div class="handle-box">
                    <el-input class="search-input" placeholder="筛选关键词" size="small" v-model="ListSearch"></el-input>
                    <el-button type="primary" @click="search" class="handle-del mr10" style="margin-left: 5px;height: 35px;margin-top: 8px">搜索</el-button>
                    <el-button type="primary" @click="addDoctor" class="handle-del mr10" style="margin-left: 20px;height: 35px;margin-top: 8px">添加已注册医生</el-button>
                </div>
                <el-table
                        :data="list"
                        tooltip-effect="dark"
                        style="width: 100%"
                >
                    <!--<el-table-column type="selection" width="55"></el-table-column>-->
                    <el-table-column
                            prop="doctorName"
                            label="医生名称"
                            width="200">
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
                            >免去任职</el-button>
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

            <el-dialog title="添加已注册医师" :visible.sync="dialogFormVisible">
                <el-form :model="form">

                    <el-form-item label="选择医生" label-width="120px">
                        <el-select v-model="value" placeholder="请选择"  @change="select">
                            <el-option
                                    v-for="item in doctors"
                                    :key="item.value"
                                    :label="item.doctorName"
                                    :value="item.doctorPhone">
                                <span style="float: left">{{ item.doctorName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.doctorPhone }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="医师电话" label-width="120px">
                        <el-input v-model="form.doctorPhone"></el-input>
                    </el-form-item>

                    <el-form-item label="验证码" label-width="120px">
                        <el-input v-model="form.verification" style="width: 72%;"  placeholder="输入验证码"></el-input>
                        <el-button  :disabled="display===1?false:true" class="but" @click="getVerification()" style="font-weight: bold">{{content}}</el-button>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="setDoctor">确 定</el-button>
                    <el-button  @click="dialogFormVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </div>


    </div>
</template>

<script>
    export default {
        mounted(){
            this.getDoctor(2);
        },
        data () {
            return {
                list:[], //数据存储
                totalNum:0,
                doctors:[],
                content:'获取验证码',
                value:'',
                doctorCertificates:[],
                dialogFormVisible:false,   //添加弹出框
                ListSearch:"",  //搜索
                editFormVisible: false,  //编辑器弹出框
                ruleForm:{},
                form:{    //需要添加的字段
                    doctorPhone:"",
                    verification:"",
                },
                editForm:{   //编辑需要的字段
                    name:"",
                    date:"",
                    address:""
                },
                addLoading:false,
                display:1,
                currentPage:1, //初始页
                pageSize:5 , //	每页的数据
                runNum:60,
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
        methods:{
            search() {
                this.getDoctor(2);
                this.pageNum = 1;
            },
            setDoctor(){

                if (this.form.doctorPhone != '' && this.form.verification != ''){
                    this.form.doctorBelong = JSON.parse(localStorage.getItem("pharmacy")).pharmacyId;
                    console.log(this.form)
                    this.$axios.post('/api/message/provide/doctor/setDoctor',this.form).then((res)=>{

                        if (res.data.code == 200){
                            this.$message.success(res.data.message)
                            this.getDoctor(2);
                            this.dialogFormVisible = false;
                        } else {
                            this.$message.error(res.data.message)
                        }


                    })
                }else {
                    this.$message.error("请填写完整数据")
                }

            },
            select(event, item) {
                console.log(event)
                console.log(item)
              this.form.doctorPhone = event
                let i = 0;
                for (i =  0;i < this.doctors.length; i++) {
                    if (event == this.doctors[i].doctorPhone) {
                        this.form.doctorId = this.doctors[i].doctorId
                        break;
                    }
                }
            },
            setValue(item){
                console.log(11231)
                console.log(item)
                this.form.doctorId = item.doctorId;
                this.form.doctorBelong = JSON.parse(localStorage.getItem("pharmacy")).pharmacyId;
            },
            addDoctor() {
                this.dialogFormVisible = true;
                this.getDoctor(1);
            },
            showDetail(item) {
                this.doctorCertificates = [];
                this.doctorCertificates.push(item)
            },
            getDoctor(doctorStatus){
                let data = {
                    'content': this.ListSearch,
                    'pageNum': this.currentPage,
                    'pageSize': this.pageSize,
                    'pharmacyId' : JSON.parse(localStorage.getItem("pharmacy")).pharmacyId,
                    'doctorStatus': doctorStatus,
                }
                if (doctorStatus == 1) {
                    data = {
                        'content': this.ListSearch,
                        'pageNum': this.currentPage,
                        'pageSize': this.pageSize,
                        'doctorStatus': doctorStatus,
                    }
                }
                console.log(data)
                this.$axios.post('/api/message/provide/doctor/getAllDoctor',data).then((res)=>{
                    if (doctorStatus == 1) {
                        this.doctors = res.data.data.records
                    } else {
                        this.list = res.data.data.records
                        this.currentPage = res.data.data.current
                        this.totalNum = res.data.data.total;
                        console.log(res.data.data)
                        this.$message.success(res.data.message)
                    }

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
            getVerification(){
                console.log(this.form.doctorPhone)
                if (this.form.doctorPhone != '') {
                    if (!this.checkPhone()) {
                        this.$message.error("请输入正确的手机号")
                    } else {
                        this.$axios.get("/api/message/provide/verification/send/"+this.form.doctorPhone).then((res)=>{
                            this.$message.success(res.data.message)
                        })
                        this.display=2;
                        let that = this;
                        let myTime = setInterval(function () {
                            that.runNum--;
                            if(that.runNum <= 0){
                                that.content = "获取验证码"
                                that.display = 1;
                                that.runNum = 60;
                                clearInterval(myTime);
                            }else {
                                that.content = that.runNum+"s后重发";
                            }
                        },1000);
                        this.content="60s后重发"
                    }

                } else {
                    this.$message.error("请填写手机号！！！")
                }


            },
            checkPhone(){
                let re = /^[1][3,4,5,7,8][0-9]{9}$/;
                let str = this.form.doctorPhone;
                if(re.test(str)){
                    return true;

                }else {
                    return false;
                }
            },
            // 显示编辑弹出框
            handleEdit(index, row){
                let data = {
                    doctorId:row.doctorId,
                    doctorStatus:1,
                    doctorBelong:0,

                }
                this.$axios.post("/api/message/provide/doctor//updateDoctor",data).then((res)=>{
                    this.$message.success("免除成功")
                    this.getDoctor(2)
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
    .but {
        width: 25%;
        height: 40px;
        margin-left: 5px;
    }

</style>

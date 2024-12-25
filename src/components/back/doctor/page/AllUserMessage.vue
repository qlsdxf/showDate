<template>
    <div>
        <div style="width: 60%;text-align: left;margin-left: 20%;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">未读消息</el-menu-item>
                <el-menu-item  index="2">已读消息</el-menu-item >
            </el-menu>
        </div>
        <div v-if="totalNum == 0" >
            <el-empty description="描述文字"></el-empty>
        </div>
        <div v-if="totalNum > 0">
            <div style="width: 60%;margin-left: 20%;min-height: 390px" >
                <div :span="4" v-for="(index, item) in userMessage" :key="item" >
                    <el-card   style="width: 100%;height: 100px;margin-top: 15px;" class="hov" @click.native="goToChat(index)">
                        <div style="float: left;width: 120px">
                            <!--http://124.222.128.245:955/image/head89d95406.jpg-->
                            <el-avatar :src="index.userAvatar" :size="100"></el-avatar>
                        </div>
                        <div style="float: left;width: 450px;">
                            <div style="margin-top: 25px">
                                <h3>{{index.userName}}</h3>
                            </div>
                            <div style="margin-top: 15px;font-size: 12px;color: #B0B0B0">
                                <span>{{index.chatContent}}</span>
                            </div>
                        </div>
                        <div >
                            <div style="width: 100%;text-align: center;height: 20px;margin-top: 30px" v-if="activeIndex == 1">
                                <el-badge :value="index.num" :max="99" :size="100" class="item" v-if="activeIndex == 1">
                                </el-badge>
                            </div>
                            <div style="font-size: 12px;color: #B0B0B0;margin-top: 10px">
                                <span>{{index.chatCreateTime}}</span>
                            </div>

                        </div>
                    </el-card>
                </div>

            </div>
        </div>


        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                style="width: 100%;height: 100px;text-align: center "
                :total="totalNum">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "user-message",
        mounted(){
            this.doctor = JSON.parse(localStorage.getItem("doctor"))
            if (this.doctor == undefined || this.doctor == null) {
                this.$router.push("/doctorLogin")
            }
            this.getAllUserMessage();
        },
        data(){
            return {
                Number2:1,
                activeIndex:"1",
                userMessage:[],
                doctor:{},
                store:[],
                currentPage:1,
                pageSize:5,
                totalNum:0
            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key);
                this.activeIndex = key;
                this.getAllUserMessage();
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
            showDetail(pharmacyId){

            },
            goToChat(item){
                const {href} = this.$router.resolve({
                    path: '/doctorChat',
                    query: {
                        doctorId:  this.doctor.doctorId,
                        userId:item.chatUserId,
                    }
                })
                window.open(href, '_blank')
            },
            getAllUserMessage(){

                let data = {
                    'doctorId': this.doctor.doctorId,
                    'pageNum': this.currentPage,
                    'pageSize':this.pageSize,
                    'type': this.activeIndex,
                }
                this.$axios.post("/api/message/provide/chat/getMessageChat",data).then((res)=>{
                    console.log(res.data.data.records)
                    if (res.data.code == 200) {
                        this.totalNum = res.data.data.total
                        this.userMessage = res.data.data.records
                    }
                })
            }
        }
    }
</script>

<style scoped>

    /**{*/
        /*padding: 0;*/
        /*margin: 0;*/
    /*}*/
    .el-card ::v-deep .el-card__body {
         padding: 5px;
        padding-bottom: 10px;
         /*background-color: powderblue;*/
     }

    .hov:hover{
        cursor: pointer;
    }

</style>
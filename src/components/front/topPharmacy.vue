<template>
    <div style="margin-left: 50px">
        <el-row v-for="(value, index1) in store" :key="index1" >
            <el-col :span="4" v-for="(o, index2) in 4" :key="index2" :offset="1" >
                <el-card :body-style="{ padding: '10px'}" v-if="Number2 > (index1*4+index2)"  style="width: 100%;height: 330px;margin-top: 30px" class="hov" @click.native="showDetail(store[index1 * 4 + index2].pharmacyId)">
                    <img :src = "store[index1 * 4 + index2].pharmacyAvatar"  style="width: 100%;height: 200px">
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>店铺名称: {{store[index1 * 4 + index2].pharmacyName}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>月销量: {{store[index1 * 4 + index2].pharmacyMonthlySales}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>日访问量: {{store[index1 * 4 + index2].pharmacyDailyVisits}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>地址：{{store[index1 * 4 + index2].pharmacyDetailedAddress}}</span>
                    </div>
                </el-card>
            </el-col>

        </el-row>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                style="width: 100%;height: 100px;margin-top: 50px;text-align: center "
                :total="totalNum">
        </el-pagination>


    </div>
</template>

<script>
    export default {
        name: "top-pharmacies",
        props:{
            limit:{
                type:Number,
                default:5,
            },
            content:{
                type:String,
                default:''
            },
            fileList:{
                type:Array,
                default: ()=>{
                    return []
                }
            }
        },
        watch:{
            content(newContent, oldContent) {
                console.log(`Dog changed: ${newContent}`);
                this.getAllPharmacy();
            }

        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            this.getAllPharmacy();
        },
        data(){
            return {
                Number2:1,
                store:[],
                currentPage:1,
                user:{},
                pageSize:20,
                totalNum:50
            }
        },
        methods:{
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.currentPage = size;
                this.getAllPharmacy();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getAllPharmacy();
            },
            showDetail(pharmacyId){
                //do:增加日访问量
                this.$axios.get("/api/message/provide/pharmacy/access/" + pharmacyId + "/" + this.user.userId).then((res)=>{
                    console.log("211"+res.data)
                })
                const {href} = this.$router.resolve({
                    path: '/drugDetail',
                    query: {
                        pharmacyId: pharmacyId,
                    }
                })
                window.open(href, '_blank')

            },
            getAllPharmacy(){
                let data = {
                    'userId': this.user.userId,
                    'province':this.user.userAddress.split("_")[0],
                    'city':this.user.userAddress.split("_")[1],
                    'county':this.user.userAddress.split("_")[2],
                    'content': this.content,
                    'pageSize':this.pageSize,
                    'pageNum':this.currentPage,
                }
                console.log(data)

                    this.$axios.post('/api/message/provide/pharmacy/getAllPha',data).then((res)=>{
                        this.store = res.data.data.records;
                        this.Number2 = res.data.data.total;
                        if (this.Number2 > 20) {
                            this.Number2 = 20
                        }
                        this.totalNum =  res.data.data.total;
                        // this.totalNum = this.totalNum /20;
                        // if (this.totalNum * 20 < res.data.data.total) {
                        //     this.totalNum = this.totalNum + 1;
                        // }
                        // this.totalNum = this.totalNum * 10
                        console.log(111)
                        console.log(res.data.data)
                        console.log(this.Number2)
                    })
            }
        }
    }
</script>

<style scoped>

    .hov:hover{
        cursor: pointer;
    }

</style>
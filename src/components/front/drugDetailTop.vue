<template>
    <div style="margin-left: 50px">
        <el-row v-for="(value, index1) in store" :key="index1" >
            <el-col :span="4" v-for="(o, index2) in 4" :key="index2" :offset="1" >
                <el-card :body-style="{ padding: '10px'}" v-if="Number2 > (index1*4+index2)"  style="width: 100%;height: 350px;margin-top: 30px" class="hov" @click.native="showDrug(store[index1 * 4 + index2])">
                    <img :src = "store[index1 * 4 + index2].drugImage.split(',')[0]"  style="width: 100%;height: 200px">
                    <div style="color: black;font-size:14px;margin-top: 4px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span :title="store[index1 * 4 + index2].drugName+' '+store[index1 * 4 + index2].drugSpecification">{{store[index1 * 4 + index2].drugName}}  {{store[index1 * 4 + index2].drugSpecification}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span :title="store[index1 * 4 + index2].drugFactory">{{store[index1 * 4 + index2].drugFactory}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;">
                        <span style="word-break:keep-all;">效期至: {{store[index1 * 4 + index2].drugExpiredtime}}</span>
                    </div>
                    <!--<div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">-->
                        <!--<span>地址：{{store[index1 * 4 + index2].pharmacyDetailedAddress}}</span>-->
                    <!--</div>-->
                    <div style="color: black;font-size:14px;margin-top: 4px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span style="word-break:keep-all;">规格: {{store[index1 * 4 + index2].drugSpecification}} 1383</span>
                    </div>
                    <div style="color: black;margin-top: 4px;">
                        价格:  <span style="word-break:keep-all;font-weight: bolder;font-size:24px;">{{store[index1 * 4 + index2].drugPrice}}</span>
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
                this.getAllDrug();
            }

        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"));
            if (this.user == undefined) {
                this.$router.push("/login")
            }
            console.log(this.$route.query.pharmacyId)
            if (this.$route.query.pharmacyId == undefined) {
                this.pharmacyId = localStorage.getItem("pharmacyId");
            } else {
                this.pharmacyId = this.$route.query.pharmacyId;
                console.log(this.$route.query.pharmacyId)
                localStorage.setItem("pharmacyId",this.pharmacyId)
            }
            this.getAllDrug();
        },
        data(){
            return {
                Number2:1,
                user:{},
                pharmacyId:'',
                store:[],
                currentPage:1,
                pageSize:20,
                totalNum:10
            }
        },
        methods:{
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.currentPage = size;
                this.getAllDrug();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getAllDrug();
            },
            showDrug(drug){

                const {href} = this.$router.resolve({
                    path: "/drugShow",
                    query: {
                        drug: JSON.stringify(drug),
                    }
                });
                window.open(href, '_blank');
                // this.$axios.get('/provide/provide/dailyVisits');
            },

            getAllDrug(){
                let data = {
                    'pharmacyId': this.pharmacyId,
                    'content':this.content,
                    'pageSize':this.pageSize,
                    'pageNum':this.currentPage

                }

                    this.$axios.post("/api/message/provide/drug/getAllDrugs",data)
                        .then((res)=>{
                            console.log(res.data.data)
                            this.store = res.data.data.records;
                            this.Number2 = 20;
                            console.log(this.Number2 * this.currentPage > res.data.data.records)
                            console.log(res.data.data.total - (this.currentPage - 1)*this.pageSize)
                            if (this.Number2 * this.currentPage > res.data.data.total) {
                                this.Number2 = res.data.data.total - (this.currentPage - 1)*this.pageSize
                            }
                            console.log(223)
                            console.log(this.Number2)
                            this.totalNum =  res.data.data.total;
                            // this.totalNum = Math.ceil(this.totalNum / 20);
                            // // if (this.totalNum * 20 < res.data.data.total) {
                            // //     this.totalNum = this.totalNum + 1;
                            // // }
                            // this.totalNum = this.totalNum * 10;
                            // console.log(this.totalNum)
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
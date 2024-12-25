<template>
    <div class="au_to">
        <div style="width: 100%;height: 50px;font-size: 20px;text-align: center">编辑药品</div>
        <el-form :model="ruleForm"  label-width="100px" style="margin-top: 20px;">
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="药品名称" required >
                            <el-input v-model="ruleForm.drugName"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="药品类型" required style="width: 98%;">
                            <el-select v-model="ruleForm.drugIsPrescription" placeholder="请选择" >
                                <el-option
                                        v-for="item in type"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="价格" required  style="width: 98%;">
                            <el-input v-model="ruleForm.drugPrice"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="生成厂家" required style="width: 98%;">
                            <el-input v-model="ruleForm.drugFactory"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="药品规格" required style="width: 98%;">
                            <el-input v-model="ruleForm.drugSpecification"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="批准文号" required style="width: 98%;">
                            <el-input v-model="ruleForm.drugApprovalNumber"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

            </el-row>

            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="生产日期" style="width: 98%;" required>
                            <div class="block">
                                <el-date-picker
                                        v-model="ruleForm.drugCratetime"
                                        align="right"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="过期日期" style="width: 98%;" required>
                            <div class="block">
                                <el-date-picker
                                        v-model="ruleForm.drugExpiredtime"
                                        align="right"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="商品数目" style="width: 98%;" required>
                            <el-input v-model="ruleForm.drugNum" type="number"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:1%;width: 45%" >
                    <el-form-item label="上架处理" style="width: 98%;" required>
                        <el-select v-model="ruleForm.drugStatus" placeholder="请选择">
                            <el-option
                                    v-for="item in sale"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col style="margin-left:1%;width: 55%" >
                    <div class="grid-content">
                        <el-form-item label="设置热门药品" style="width: 98%;" lable-width="200px" required >
                            <el-select v-model="ruleForm.drugPopular" placeholder="请选择">
                                <el-option
                                        v-for="item in popular"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col style="margin-left:0;width: 100%" >
                    <div class="grid-content">
                        <el-form-item label="商品介绍" style="width: 98%;" required>
                            <el-input   type="textarea"
                                        :rows="5"
                                        v-model="ruleForm.drugIntroduce"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col style="margin-left:0;width: 100%" >
                    <div class="grid-content">

                        <el-form label-width="100px">
                            <el-form-item label="图片(限5)：">
                                <uploadImg :limit="4" :fileList="fileList" :action="action" @submitImg="getImgList" ></uploadImg>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col :span="12" :offset="6">
                    <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button @click="calcan">取消修改</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import uploadImg from '../../../../register/upImageTest'
    export default {
        components:{
            uploadImg
        },
        name: "edit-drug",
        mounted(){
            console.log("修改界面")
            let drug = JSON.parse(localStorage.getItem("editDrug"))
            if(drug != undefined) {
                this.ruleForm = drug
                this.ruleForm.drugStatus = this.ruleForm.drugStatus+"";
            } else {
                this.$router.push('/allDrugs')
            }
            this.fiter();

        },
        data() {
            return{
                dialogImageUrl: '',
                type:[
                    {
                        value: 0,
                        label: '处方药'
                    },
                    {
                        value: 1,
                        label: '非处方药'
                    }
                ],
                popular:[
                    {
                        value:'非热门',
                        label: '非热门'
                    },
                    {
                        value: '热门',
                        label: '热门'
                    }
                ],
                sale:[
                    {
                        value: "0",
                        label: '上架'
                    },
                    {
                        value: "1",
                        label: '不上架'
                    }
                ],

                action:'http://124.222.128.245:955/uploadImageFile',
                dialogVisible: false,
                fileList:[],
                content:'获取验证码',
                choice:'',
                active:0,
                picUrl:'',
                imageUrl:[],
                businessLicensePic:'',
                bankAccountPic:'',
                drugLicensePic:'',
                idCardPic:'',
                runNum:60,
                id:'',
                show:false,
                show2:true,
                merchantTradeUrl:'',
                provinceCode:'',
                date1:'',
                date2:'',
                cityCode:'',
                countryCode:'',
                display:1,
                password2:'1999319xjj',
                area: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
                    31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
                    43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
                    61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
                },
                Wi: [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2 ],
                ValideCode: [1,0,'X',9,8,7,6,5,4,3,2],
                value: '',
                ruleForm: {
                    drugName:'感冒灵颗粒（999）',
                    drugImage:'',
                    drugType:'感冒',
                    drugIsPrescription:1,
                    drugCratetime:'2022-03-21',
                    drugExpiredtime:'2023-03-21',
                    drugSpecification:'10g*9袋',
                    drugPrice:'13.90',
                    drugFactory:'惠州市九惠制药股份有限公司',
                    drugApprovalNumber:'国药准字Z44021940',
                    drugIntroduce:'商品名称：999 感冒灵颗粒规格：10g*9袋生产企业：惠州市九惠制药股份有限公司通用名称：感冒灵颗粒温馨提示：依据《药品经营质量管理规范》，除药品质量原因外，药品一经售出，不得退换。有效期：24个月剂型：颗粒剂批准文号：国药准字Z44021940适应症/功能主治：解热镇痛。用于感冒引起的头痛，发热，鼻塞，流涕，咽痛。用法用量：开水冲服，1次10克(1袋)，一日3次。',
                    drugNum:0,
                    drugStatus: 1,
                    drugMerchantId: JSON.parse(localStorage.getItem("merchant")).merchantId
                },
            }
        },
        methods:{
            getImgList(list){
                console.log('获取子组件的信息传输来父组件')
                console.log(list)
                this.fileList = list
            },
            fiter() {
                console.log(this.ruleForm.drugImage)
                let url = this.ruleForm.drugImage.split(',');

                for (let i = 0;i < url.length; i++) {
                    let data = {
                        name: url[i].substring(33, url[i].length - 1),
                        url: url[i]
                    }

                    this.fileList.push(data)
                }

            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.drugImage = this.ruleForm.drugImage +  res.data + ",";
                console.log(res.data);
                this.show = true;
                this.show2 = false;
                this.imageUrl.push(res.data)
            },
            save() {
                console.log(this.ruleForm)

                this.$axios.post("/api/message/provide/drug/updateDrug",this.ruleForm).then((res)=>{
                    console.log(res.data)
                    this.$message.success(res.data.message)
                    localStorage.setItem("editDrug",JSON.stringify(this.ruleForm))
                })
            },
            calcan() {
                this.$router.push("/allDrugs")
            }
        }
    }
</script>

<style scoped>

    .au_to{
        position: fixed;
        width: 80%;
        height: 80%;
        overflow-y: scroll;
    }
    .avatar {
        width: 278px;
        height: 278px;
        display: block;
    }
    .grid-content {
        border-radius: 10px;
        min-height: 30px;
    }


</style>
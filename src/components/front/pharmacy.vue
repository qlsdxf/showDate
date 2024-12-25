<template>
    <div style="margin-left: 50px">
        <el-row v-for="(value, index1) in drugs" :key="index1" style="margin-top: 30px">
            <el-col :span="4" v-for="(o, index2) in 4" :key="index2" :offset="index2 > 0 ? 1 : 2" >
                <el-card :body-style="{ padding: '10px'}" v-if="Number2 > (index1*4+index2)"  style="width: 100%;height: 320px" class="hov" @click="">
                    <img :src = "drugs[index1 * 4 + index2].imageUrl"  style="width: 100%;height: 200px">
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>店铺名称: {{drugs[index1 * 4 + index2].name}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>月销量: {{drugs[index1 * 4 + index2].sale}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>日访问量: {{drugs[index1 * 4 + index2].watch}}</span>
                    </div>
                    <div style="color: black;font-size:14px;margin-top: 4px;font-weight: bolder">
                        <span>地址：{{drugs[index1 * 4 + index2].address}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "pharmacy",
        mounted(){

        },
        data(){
            return {
                Number2:15,
                drugs:[
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'  https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf',
                        imageUrl:'http://124.222.128.245:955/image/b6a51121小熊药店.png',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    },
                    {
                        name: 'qlsdxf2',
                        imageUrl:'https://static.fotor.com.cn/assets/projects/pages/5339c142-028b-4633-aae9-edf87c029072_ab815a7c-98bb-49fe-ae5c-82511f5d41ca_thumb.jpg',
                        watch:100,
                        sale:10000,
                        address:'吴中区区服路448号'
                    }

                ]
            }
        },
        methods:{
            showDetail(){

            }
        }
    }
</script>

<style scoped>

    .hov:hover{
        cursor: pointer;
    }

</style>
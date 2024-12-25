<template >
    <div class="main">
        <div class="back">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="医生注册" name="user"><DoctorRegister></DoctorRegister></el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
    import DoctorRegister from "../register/DoctorRegister";
    export default {
        name: "RegisterTab",
        components:{
            DoctorRegister,
        },
        mounted() {
            console.log(this.activeName)

        },
        data(){
            return{
                activeName:'user'
            };
        },
        methods:{
            handleClick(tab, event){
                if(tab.name=='back'){
                    this.backLogin()
                }
                console.log(this.activeName)
            },
            backLogin(){
                console.log(1111)
                this.$router.push({
                    path:'/login'
                })
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .back {
        text-align: center;
        margin-top: 5%;
        max-width: 80%;
        margin-left: 10%;
        opacity: 0.9
    }
    .main{
        background: url("../../assets/back.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
</style>
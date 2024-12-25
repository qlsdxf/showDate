<template >
   <div class="main">
       <div class="back">
           <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
               <el-tab-pane label="商家注册" name="merchant"><Merchant></Merchant></el-tab-pane>
           </el-tabs>
       </div>
   </div>

</template>

<script>
    import UserRegister from "../register/userRegister";
    import Merchant from '../register/merchantRegister'
    export default {
        name: "RegisterTab",
        components:{
            UserRegister,
            Merchant
        },
        mounted() {
            // if (this.$route.params.activeName != undefined) {
            //     console.log(this.$route.params.activeName)
            //     this.activeName = this.$route.params.activeName;
            // } else {
            //     this.activeName="user";
            // }
        },
        data(){
          return{
              activeName:'merchant'
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
<template>
    <div class="sidebar">
        <el-menu
            router
            class="sidebar-el-menu"
            background-color="#545c64"
            :default-active="$route.path"
            text-color="#fff"
            :collapse="collapse"
            active-text-color="#ffd04b">
            <!--<el-menu-item index="merchantFront">-->
                <!--<i class="el-icon-setting"></i>-->
                <!--<span slot="title">首页</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="">-->
                <!--<i class="el-icon-tickets"></i>-->
                <!--<span slot="title">增加药品</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/merchant_me">-->
                <!--<i class="el-icon-message"></i>-->
                <!--<span slot="title">店铺数据</span>-->
            <!--</el-menu-item>-->
            <el-submenu index="4" v-if="pharmacy.pharmacyStatus == 1">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">药品管理</span>
                </template>
                    <el-menu-item-group>
                    <el-menu-item index="/addDrugs">增加药品</el-menu-item>
                    <el-menu-item index="/allDrugs">所有药品</el-menu-item>
                    <el-menu-item index="/editDrug">编辑药品</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                    <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">店铺管理</span>
                    </template>
                            <el-menu-item-group>
                                <el-menu-item index="/merMessage">商家店铺信息</el-menu-item>
                            <el-menu-item index="/merAutid">店铺审核</el-menu-item>
                            <el-menu-item index="/merRank" v-if="pharmacy.pharmacyStatus == 1">店铺排名</el-menu-item>
                            <el-menu-item index="/allDoctor" v-if="pharmacy.pharmacyStatus == 1">店铺医生</el-menu-item>
                            <el-menu-item index="/merSysMessage">系统消息</el-menu-item>
                    </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" v-if="pharmacy.pharmacyStatus == 1">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/unPay">未付款订单</el-menu-item>
                    <el-menu-item index="/merPayOrder">待发货订单</el-menu-item>
                    <el-menu-item index="/merSendOrder">已发货订单</el-menu-item>
                    <el-menu-item index="/merfinishOrder">已完成订单</el-menu-item>
                    <el-menu-item index="/merReturnOrder">退货订单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
    mounted(){
        this.pharmacy = JSON.parse(localStorage.getItem('pharmacy'))
        if (this.pharmacy == undefined) {
            this.$router.push("/merchantLogin")
        }
        console.log(this.pharmacy)
    },
  data () {

    return {
      collapse:false,
        pharmacy:{},
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar{
    display: block;
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    height: 100%;
		background-color: rgb(50, 65, 87);
}
.sidebar-el-menu{
    width: 250px;
}
.sidebar>ul{
    height: 100%;
}
</style>
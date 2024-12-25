<template>
    <div class="sidebar">
        <el-menu
            router
            class="sidebar-el-menu"
            background-color="#545c64"
            text-color="#fff"
            :default-active="$route.path"
            :collapse="collapse"
            active-text-color="#ffd04b">
            <!--<el-menu-item index="dashboard">-->
                <!--<i class="el-icon-setting"></i>-->
                <!--<span slot="title">首页</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="table">-->
                <!--<i class="el-icon-tickets"></i>-->
                <!--<span slot="title">用户数据</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="tabs">-->
                <!--<i class="el-icon-message"></i>-->
                <!--<span slot="title">店铺数据</span>-->
            <!--</el-menu-item>-->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">用户管理</span>
                </template>
                    <el-menu-item-group>
                    <el-menu-item index="/allUser">用户数据</el-menu-item>
                    <el-menu-item index="/allReport">用户投诉</el-menu-item>
                    <el-menu-item index="/adminAllOrder">所有订单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                    <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">店铺管理</span>
                    </template>
                            <el-menu-item-group>
                            <el-menu-item index="/allPharmacy">店铺信息</el-menu-item>
                            <el-menu-item index="/allPharmacyRegister">店铺注册申请</el-menu-item>
                            <el-menu-item index="/allPharmacyRank">店铺排名开放</el-menu-item>
                            <el-menu-item index="/allAdminDrug">店铺药品</el-menu-item>
                            <!--<el-menu-item index="orderlist">订单退订</el-menu-item>-->
                    </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">医生管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/doctorRegister">医生注册申请</el-menu-item>
                    <el-menu-item index="/adminAllDoctor">医生信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      collapse:false
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
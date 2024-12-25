<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChange">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">商家后台界面管理</div>
        <!-- 右边内容 -->
        <div class="header-right">
            <div class="header-user-icon">
                <!-- 头像 -->
                <div class="user-avator">
                    <el-avatar :src="merchant.merchantAvatar"></el-avatar>

                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{merchant.merchantName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.merchant = JSON.parse(localStorage.getItem('merchant'))
        if (this.merchant == undefined) {
            this.$router.push("/merchantLogin")
        }

    },
  data () {
    return {
        collpase:false,
        merchant:{},
        name: "暂无昵称"
    }
  },
  methods:{
    //   侧边栏折叠
      collapseChange() {
          this.collpase = !this.collpase
      },
    //   下拉菜单
    handleCommand(command) {
        if(command == 'loginout') {
            this.$router.push('/merchantLogin')
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
    z-index: 0;
}
.collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-icon{
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.user-avator{
    margin-left: 10px;
}
.user-avator img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 999;
		padding-right: 10px;
}
.el-dropdown-link{
    color: white;
    cursor: pointer;
}
a{
    text-decoration: none;
    color: black;
}
</style>

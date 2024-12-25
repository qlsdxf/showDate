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
<!--v-if="doctor.doctorStatus != 0"-->
            <el-submenu index="1" >
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">信息管理</span>
                </template>
                    <el-menu-item-group>
                    <el-menu-item index="/docUserMessage">用户咨询</el-menu-item>
                    <el-menu-item index="/docSysMessage">系统信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                    <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">个人管理</span>
                    </template>
                        <el-menu-item-group>
                            <el-menu-item index="/docRegister">个人信息</el-menu-item>
                            <el-menu-item index="/docChangeMessage">修改信息</el-menu-item>

                        </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    mounted(){
        this.doctor = JSON.parse(localStorage.getItem("doctor"))
        if (this.doctor == undefined || this.doctor == null) {
            this.$router.push("/doctorLogin")
        }
        console.log(this.doctor.doctorStatus)
    },
    data () {
        return {
            collapse:false,
            name: "3221",
            doctor:{},
        }
    },
    methods:{
        //   侧边栏折叠
        collapseChange() {
            this.collapse = !this.collapse
        },
        //     window.addEventListener('storage', event => {
        //     if(event.key === 'calling') {
        //         services.call(event.newValue)
        //     }
        // })
        //   下拉菜单
        handleCommand(command) {
            if(command == 'loginout') {
                this.$router.push('/doctorLogin')
                localStorage.setItem(undefined)
            }
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
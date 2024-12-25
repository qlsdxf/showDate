import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login/login'
import userRegister from '../components/register/userRegister'
import merchantRegister from '../components/register/merchantRegister2'
import registerTab from '../components/register/RegisterTab'
import test from '../components/register/test'
import mainInterface from '../components/front/mainInterface'
import personCenter from '../components/front/personalCenter'
import merchantLogin from '../components/login/merchantLogin'
import drugDetail from '../components/front/drugDetail'
import drugShow from '../components/front/drugDetailShow'
import myMessage from '../components/front/Message'
import merchantRegisterTab from '../components/register/merchantRegisterTab'
import doctorRegisterTab from  '../components/register/doctorRegisterTab'
import adminLogin from '../components/back/admin/page/Login'
import doctorChat from '../components/front/doctorChat'
import showTest from '../components/register/showTest'
import personChat from '../components/front/personChat'
import doctorLogin from '../components/back/doctor/page/Login'
import pharmacyChat from '../components/front/pharmacyDoctorChat'
import showDate from '../components/login/showDate'


Vue.use(VueRouter)

const routes = [
    {
        path: '/pharmacyChat',
        name: 'pharmacyChat',
        component: pharmacyChat
    },
    {
        path: '/doctorLogin',
        name: 'doctorLogin',
        component: doctorLogin
    },
    {
        path: '/showTest',
        name: 'showTest',
        component: showTest
    },
    {
        path: '/personChat',
        name: 'personChat',
        component: personChat
    },
    {
        path: '/doctorChat',
        name: 'doctorChat',
        component: doctorChat
    },
    {
        path: '/adminLogin',
        name: 'adminLogin',
        component: adminLogin
    },
    {
        path: '/doctorRegisterTab',
        name: 'doctorRegisterTab',
        component: doctorRegisterTab
    },
    {
        path: '/showDate',
        name: 'showDate',
        component: showDate
    },
    {
        path: '/registerTab',
        name: 'registerTab',
        component: registerTab
    },
    {
        path: '/drugShow',
        name: 'drugShow',
        component: drugShow
    },

    {
        path: '/merchantRegisterTab',
        name: 'merchantRegisterTab',
        component: merchantRegisterTab
    },
    {
        path: '/drugDetail',
        name: 'drugDetail',
        component: drugDetail
    },
    {
        path: '/merchantLogin',
        name: 'merchantLogin',
        component: merchantLogin
    },
    {
    path: '/mainInterface',
    name: 'mainInterface',
    component: mainInterface
    },
    {
        path: '/mainInterface',
        name: 'mainInterface',
        component: mainInterface,
    },
    {
        path: '/mainInterface',
        name: 'mainInterface',
        component: mainInterface,
    },
    {
        path: '/personCenter',
        name: 'personCenter',
        component: personCenter,
    },
    {
        path: '/test2',
        name: 'test2',
        component: test
    },
    {
        path: '/myMessage',
        name: 'myMessage',
        component: myMessage
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/userRegister',
        name: 'userRegister',
        component: userRegister
    }
    ,
    {
        path: '/merchantRegister',
        name: 'merchantRegister',
        component: merchantRegister
    },

    {
        path: '/adminMain',
        component: resolve => require(['../components/back/admin/common/Home.vue'], resolve),
        meta: { title: '系统后端系统' },
        children:[
            {
                path: '/dashboard',
                component: resolve => require(['../components/back/admin/page/Dashboard.vue'], resolve),
                meta: { title: '首页' },
            },

            {
                path: '/allAdminDrug',
                component: resolve => require(['../components/back/admin/page/adminAllDrug.vue'], resolve),
                meta: { title: '店铺排行信息' },
            },
            {
                path: '/adminAllOrder',
                component: resolve => require(['../components/back/admin/page/adminAllOrder.vue'], resolve),
                meta: { title: '用户数据' },
            },
            {
                path: '/allPharmacyRank',
                component: resolve => require(['../components/back/admin/page/pharmacyRank.vue'], resolve),
                meta: { title: '店铺排行信息' },
            },
            {
                path: '/allPharmacyRegister',
                component: resolve => require(['../components/back/admin/page/allPharmacyRegister.vue'], resolve),
                meta: { title: '店铺注册信息' },
            },
            {
                path: '/allPharmacy',
                component: resolve => require(['../components/back/admin/page/allPharmacy.vue'], resolve),
                meta: { title: '所有店铺' },
            },
            {
                path: '/adminAllDoctor',
                component: resolve => require(['../components/back/admin/page/allDoctor.vue'], resolve),
                meta: { title: '所有医生' },
            },
            {
                path: '/doctorRegister',
                component: resolve => require(['../components/back/admin/page/allDoctorRegister.vue'], resolve),
                meta: { title: '医生注册信息' },
            },
            {
                path: '/allUser',
                component: resolve => require(['../components/back/admin/page/allUser.vue'], resolve),
                meta: { title: '用户数据' },
            },
            {
                path: '/allReport',
                component: resolve => require(['../components/back/admin/page/userReport.vue'], resolve),
                meta: { title: '用户数据' },
            },
            // {
            //     path: '/merchantData',
            //     component: resolve => require(['../components/back/admin/page/user/userMessage.vue'], resolve),
            //     meta: { title: '店铺数据' },
            // },
        ]
    },
    {
        path: '/merchant',
        component: resolve => require(['../components/back/merchant/common/Home'], resolve),
        meta: { title: '系统后端系统' },
        children:[
            // {
            //     path: '/dashboard',
            //     component: resolve => require(['../components/back/admin/page/Dashboard.vue'], resolve),
            //     meta: { title: '首页' },
            // },
            {
                path: '/addDrugs',
                component: resolve => require(['../components/back/merchant/common/page/addDrug.vue'], resolve),
                meta: { title: '增加药品' },
            },
            {
                path: '/merRank',
                component: resolve => require(['../components/back/merchant/common/page/pharmacyRank.vue'], resolve),
                meta: { title: '增加药品' },
            },
            {
                path: '/editDrug',
                component: resolve => require(['../components/back/merchant/common/page/editDrug.vue'], resolve),
                meta: { title: '编辑药品' },
            },
            {
                path: '/allDoctor',
                component: resolve => require(['../components/back/merchant/common/page/allDoctor.vue'], resolve),
                meta: { title: '店铺医生' },
            },
            {
                path: '/allDrugs',
                component: resolve => require(['../components/back/merchant/common/page/allDrug.vue'], resolve),
                meta: { title: '药品信息' },
            },
            {
                path: '/merSysMessage',
                component: resolve => require(['../components/back/merchant/common/page/SysMessage.vue'], resolve),
                meta: { title: '药品信息' },
            },
            {
                path: '/phaMessage',
                component: resolve => require(['../components/back/merchant/common/page/pharmacyMessage.vue'], resolve),
                meta: { title: '店铺信息' },
            },
            {
                path: '/merMessage',
                component: resolve => require(['../components/back/merchant/common/page/merchantMessage.vue'], resolve),
                meta: { title: '商家信息' },
            },
            {
                path: '/merAutid',
                component: resolve => require(['../components/back/merchant/common/page/merAudit.vue'], resolve),
                meta: { title: '店铺审核' },
            },
            {
                path: '/unPay',
                component: resolve => require(['../components/back/merchant/common/page/unpaidOrder.vue'], resolve),
                meta: { title: '未付款订单' },
            },
            {
                path: '/merPayOrder',
                component: resolve => require(['../components/back/merchant/common/page/payOrder.vue'], resolve),
                meta: { title: '未付款订单' },
            },

            {
                path: '/merSendOrder',
                component: resolve => require(['../components/back/merchant/common/page/sendOrder.vue'], resolve),
                meta: { title: '已付款订单' },
            },
            {
                path: '/merReturnOrder',
                component: resolve => require(['../components/back/merchant/common/page/returnOrder.vue'], resolve),
                meta: { title: '退款订单' },
            },
            {
                path: '/merfinishOrder',
                component: resolve => require(['../components/back/merchant/common/page/finishOrder.vue'], resolve),
                meta: { title: '退款订单' },
            },

        ]
    },

    {
        path: '/doctor',
        component: resolve => require(['../components/back/doctor/common/Home.vue'], resolve),
        meta: { title: '医生后端系统' },
        children:[

            {
                path: '/docRegister',
                component: resolve => require(['../components/back/doctor/page/doctorRegister.vue'], resolve),
                meta: { title: '医生注册信息' },
            },
            {
                path: '/docSysMessage',
                component: resolve => require(['../components/back/doctor/page/systemMessage.vue'], resolve),
                meta: { title: '系统消息' },
            },

            {
                path: '/docChangeMessage',
                component: resolve => require(['../components/back/doctor/page/changeMessage.vue'], resolve),
                meta: { title: '医生注册信息' },
            },
            {
                path: '/docUserMessage',
                component: resolve => require(['../components/back/doctor/page/AllUserMessage.vue'], resolve),
                meta: { title: '医生注册信息' },
            }

        ]
    },
    {
        path: '/404',
        component: resolve => require(['../components/back/admin/page/404.vue'], resolve)
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to,from,next)=>{
    var token = localStorage.getItem('token')
    console.log(token)
    if(to.path.indexOf("login") !== -1 || to.path.indexOf("adminMain") !== -1
        || to.path.indexOf("merchant") !== -1 || to.path.indexOf("doctor") !== -1
        || to.path.indexOf("doctorLogin") !== -1 || to.path.indexOf("merchantLogin") !== -1
        || to.path.indexOf("registerTab") !== -1 || to.path.indexOf("merchantRegisterTab") !== -1
        || to.path.indexOf("doctorRegisterTab") !== -1 || to.path.indexOf("showDate") !== -1){ //不是访问后台管理,不用判断,直接可以访问
        console.log(11)
        next()
    }else{ //
        //判断user对象是否为空
        if(token !== '{}' && token != null && token != undefined && token !=''){ //已经登录
            console.log(22)
            next()
        }else{ //没有登录
            console.log(33)
            next({
                path: "/showDate"
            })
        }
    }
});

export default router

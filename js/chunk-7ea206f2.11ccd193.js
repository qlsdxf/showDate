(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ea206f2"],{b510:function(e,t,a){},c9a2:function(e,t,a){"use strict";a("b510")},cfed:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-tickets"},[e._v("未付款订单")])])],1),a("div",{staticClass:"cantainer"},[a("div",{staticClass:"handle-box"},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"筛选关键词",size:"small"},model:{value:e.ListSearch,callback:function(t){e.ListSearch=t},expression:"ListSearch"}}),a("el-button",{staticClass:"handle-del mr10",staticStyle:{"margin-left":"5px",height:"35px","margin-top":"8px"},attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"orderUuid",label:"订单编号",width:"200"}}),a("el-table-column",{attrs:{prop:"orderStartTime",label:"订单开始时间",width:"200"}}),a("el-table-column",{attrs:{prop:"drugName",label:"购买药品名称",width:"200"}}),a("el-table-column",{attrs:{prop:"orderNum",label:"购买数目",width:"100"}}),a("el-table-column",{attrs:{prop:"orderTotal",label:"总金额",sortable:"",width:"100"}}),a("el-table-column",{attrs:{prop:"user.userName",label:"购买用户",width:"110"}}),a("el-table-column",{attrs:{label:"操作",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("提醒用户")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.detectOrder(t.row)}}},[e._v("举报恶意卡库存")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"提醒用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-input",{attrs:{type:"textarea",rows:5},model:{value:e.item.messageContent,callback:function(t){e.$set(e.item,"messageContent",t)},expression:"item.messageContent"}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.sendMessage}},[e._v("确 定")]),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")])],1)],1)],1)},s=[],i={mounted:function(){this.getOrder()},data:function(){return{list:[],dialogFormVisible:!1,totalNum:0,ListSearch:"",editFormVisible:!1,ruleForm:{},item:{},form:{name:"",date:"",address:""},editForm:{name:"",date:"",address:""},addLoading:!1,currentPage:1,pageSize:5,content:""}},created:function(){},filters:{getType:function(e){return 1==e?"非处方药":"处方药"},getStatus:function(e){return 0==e?"上架":"未上架"}},methods:{search:function(){this.content=this.ListSearch,this.getOrder(),this.pageNum=1},getOrder:function(){var e=this;console.log(JSON.parse(localStorage.getItem("pharmacy")).pharmacyId);var t={orderStatus:7,content:this.content,pharmacyId:JSON.parse(localStorage.getItem("pharmacy")).pharmacyId,pageNum:this.currentPage,pageSize:this.pageSize};this.$axios.post("/api/pay/provide/order/merGetOrder",t).then((function(t){e.list=t.data.data.records,e.currentPage=t.data.data.current,e.totalNum=t.data.data.total,console.log(t.data.data),e.$message.success(t.data.message)}))},detectOrder:function(e){var t=this,a={userId:e.user.userId,orderId:e.orderId};this.$axios.post("/api/pay/provide/order/detectOrder",a).then((function(e){200==e.data.code&&(t.$message.success(e.data.data),t.getOrder())}))},sendMessage:function(){var e=this;this.$axios.post("/api/pay/provide/pay/message/allSendMessage",this.item).then((function(t){200==t.data.code&&e.$message.success("提醒用户成功，订单最多存在一天，如果用户未付款的药品数量较大可直接向系统举报该用户"),e.dialogFormVisible=!1}))},handleSizeChange:function(e){this.pageSize=e,this.getOrder()},handleCurrentChange:function(e){this.currentPage=e,this.getOrder()},handleEdit:function(e,t){console.log(t),this.item={messageType:"3",messageSend:JSON.parse(localStorage.getItem("merchant")).merchantId,messageGet:t.user.userId,messageContent:"",messageOther:t.orderId,messageStatus:"0"},this.item.messageContent="亲亲，您在"+JSON.parse(localStorage.getItem("pharmacy")).pharmacyName+"店铺有一笔订单未付款，请您尽快付款",this.dialogFormVisible=!0}}},n=i,o=(a("c9a2"),a("2877")),l=Object(o["a"])(n,r,s,!1,null,"01c78f86",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-7ea206f2.11ccd193.js.map
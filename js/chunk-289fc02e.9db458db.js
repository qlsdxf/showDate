(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-289fc02e"],{"1ff7":function(e,t,a){"use strict";a("3193")},3193:function(e,t,a){},d463:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-tickets"},[e._v("退款订单")])])],1),a("div",{staticClass:"cantainer"},[a("div",{staticClass:"handle-box"},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"筛选关键词",size:"small"},model:{value:e.ListSearch,callback:function(t){e.ListSearch=t},expression:"ListSearch"}}),a("el-button",{staticClass:"handle-del mr10",staticStyle:{"margin-left":"5px",height:"35px","margin-top":"8px"},attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"orderUuid",label:"订单编号",width:"200"}}),a("el-table-column",{attrs:{prop:"orderStartTime",label:"订单下单时间",width:"200"}}),a("el-table-column",{attrs:{prop:"orderUpdateTime",label:"订单退货时间",width:"200"}}),a("el-table-column",{attrs:{prop:"drugName",label:"购买药品名称",width:"200"}}),a("el-table-column",{attrs:{prop:"orderNum",label:"购买数目",width:"100"}}),a("el-table-column",{attrs:{prop:"orderTotal",label:"总金额",sortable:"",width:"100"}}),a("el-table-column",{attrs:{prop:"user.userName",label:"购买用户",width:"110"}}),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.del(t.$index,t.row)}}},[e._v("删除订单")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"提醒用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-input",{attrs:{type:"textarea",rows:5},model:{value:e.item.messageContent,callback:function(t){e.$set(e.item,"messageContent",t)},expression:"item.messageContent"}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.sendMessage}},[e._v("确 定")]),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")])],1)],1)],1)},s=[],i={mounted:function(){this.getOrder()},data:function(){return{list:[],dialogFormVisible:!1,totalNum:0,ListSearch:"",editFormVisible:!1,ruleForm:{},item:{},form:{name:"",date:"",address:""},editForm:{name:"",date:"",address:""},addLoading:!1,currentPage:1,pageSize:5,content:""}},created:function(){},filters:{getType:function(e){return 1==e?"非处方药":"处方药"},getStatus:function(e){return 0==e?"上架":"未上架"}},methods:{search:function(){this.content=this.ListSearch,this.getOrder(),this.pageNum=1},getOrder:function(){var e=this;console.log(JSON.parse(localStorage.getItem("pharmacy")).pharmacyId);var t={orderStatus:8,content:this.content,pharmacyId:JSON.parse(localStorage.getItem("pharmacy")).pharmacyId,pageNum:this.currentPage,pageSize:this.pageSize};this.$axios.post("/api/pay/provide/order/merGetOrder",t).then((function(t){e.list=t.data.data.records,e.currentPage=t.data.data.current,e.totalNum=t.data.data.total,console.log(t.data.data),e.$message.success(t.data.message)}))},sendMessage:function(){var e=this;this.$axios.post("/api/pay/provide/pay/message/allSendMessage",this.item).then((function(t){200==t.data.code&&e.$message.success("提醒用户成功，订单最多存在一天，如果用户未付款的药品数量较大可直接向系统举报该用户"),e.dialogFormVisible=!1}))},handleSizeChange:function(e){this.pageSize=e,this.getDrug()},handleCurrentChange:function(e){this.currentPage=e,this.getDrug()},del:function(e,t){var a=this,r={orderId:t.orderId,orderUuid:t.orderUuid};console.log(r),this.$axios.post("/api/pay/provide/order/delete",r).then((function(e){200==e.data.code&&(a.$message.success("删除成功"),a.getOrder())}))}}},o=i,l=(a("1ff7"),a("2877")),n=Object(l["a"])(o,r,s,!1,null,"518e9d00",null);t["default"]=n.exports}}]);
//# sourceMappingURL=chunk-289fc02e.9db458db.js.map
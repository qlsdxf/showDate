(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad50a3e8"],{"0f40":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-tickets"},[t._v("所有药品")])])],1),a("div",{staticClass:"cantainer"},[a("div",{staticClass:"handle-box"},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"筛选关键词",size:"small"},model:{value:t.ListSearch,callback:function(e){t.ListSearch=e},expression:"ListSearch"}}),a("el-button",{staticClass:"handle-del mr10",staticStyle:{"margin-left":"5px",height:"35px","margin-top":"8px"},attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"drugId",label:"药品编号",width:"200"}}),a("el-table-column",{attrs:{prop:"drugName",label:"药品名称",width:"200"}}),a("el-table-column",{attrs:{prop:"drugType",label:"药品类型","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"drugIsPrescription",label:"处方类型","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("getType")(e.row.drugIsPrescription,e.row.drugIsPrescription))+" ")]}}])}),a("el-table-column",{attrs:{prop:"drugCratetime",label:"生产日期",sortable:"",width:"120"}}),a("el-table-column",{attrs:{prop:"drugExpiredtime",label:"过期日期",sortable:"",width:"120","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"drugNum",label:"药品数量",sortable:"","show-overflow-tooltip":"",width:"110"}}),a("el-table-column",{attrs:{prop:"drugPrice",label:"药品价格","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"drugFactory",label:"药品厂商","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"drugApprovalNumber",label:"批准文号","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"drugStatus",label:"药品状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("getStatus")(e.row.drugStatus,e.row.drugStatus))+" ")]}}])}),a("el-table-column",{attrs:{prop:"drugPopular",label:"热门药品","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.deleteList(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,20,40],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalNum},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},o=[],l=(a("e9c4"),{mounted:function(){this.getDrug()},data:function(){return{list:[],totalNum:0,dialogFormVisible:!1,ListSearch:"",editFormVisible:!1,ruleForm:{},form:{name:"",date:"",address:""},editForm:{name:"",date:"",address:""},addLoading:!1,currentPage:1,pageSize:5,content:"12138"}},created:function(){},filters:{getType:function(t){return 1==t?"非处方药":"处方药"},getStatus:function(t){return 0==t?"上架":"未上架"}},methods:{search:function(){this.content=this.ListSearch,this.getDrug(),this.pageNum=1},getDrug:function(){var t=this;console.log(JSON.parse(localStorage.getItem("pharmacy")).pharmacyId),this.$axios.get("/api/message/provide/drug/getDrugs",{params:{content:this.content,pageNum:this.currentPage,pageSize:this.pageSize,pharmacyId:JSON.parse(localStorage.getItem("pharmacy")).pharmacyId}}).then((function(e){t.list=e.data.data.records,t.currentPage=e.data.data.current,t.totalNum=e.data.data.total,console.log(e.data.data),t.$message.success(e.data.message)}))},handleSizeChange:function(t){this.pageSize=t,this.getDrug()},handleCurrentChange:function(t){this.currentPage=t,this.getDrug()},deleteList:function(t,e){var a=this,r={drugId:e.drugId,drugStatus:2};this.$axios.post("/api/message/provide/drug/updateDrug",r).then((function(t){a.$message.success("删除成功"),a.getDrug()}))},handleEdit:function(t,e){localStorage.setItem("editDrug",JSON.stringify(e)),this.$router.push({path:"/editDrug"})}}}),s=l,i=(a("3a6e"),a("2877")),n=Object(i["a"])(s,r,o,!1,null,"1de9a663",null);e["default"]=n.exports},"1efd":function(t,e,a){},"3a6e":function(t,e,a){"use strict";a("1efd")}}]);
//# sourceMappingURL=chunk-ad50a3e8.0fa2146d.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d969015"],{"0b42":function(t,e,i){var r=i("da84"),l=i("e8b5"),a=i("68ee"),s=i("861d"),o=i("b622"),u=o("species"),n=r.Array;t.exports=function(t){var e;return l(t)&&(e=t.constructor,a(e)&&(e===n||l(e.prototype))?e=void 0:s(e)&&(e=e[u],null===e&&(e=void 0))),void 0===e?n:e}},"1dde":function(t,e,i){var r=i("d039"),l=i("b622"),a=i("2d00"),s=l("species");t.exports=function(t){return a>=51||!r((function(){var e=[],i=e.constructor={};return i[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"40b0":function(t,e,i){"use strict";i("b28e")},4715:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"au_to"},[i("div",{staticStyle:{width:"100%",height:"50px","font-size":"20px","text-align":"center"}},[t._v("编辑药品")]),i("el-form",{ref:"ruleForm",staticStyle:{"margin-top":"20px"},attrs:{model:t.ruleForm,"label-width":"100px"}},[i("el-row",{staticStyle:{width:"100%"}},[i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{attrs:{label:"药品名称",required:""}},[i("el-input",{model:{value:t.ruleForm.drugName,callback:function(e){t.$set(t.ruleForm,"drugName",e)},expression:"ruleForm.drugName"}})],1)],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"药品类型",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ruleForm.drugIsPrescription,callback:function(e){t.$set(t.ruleForm,"drugIsPrescription",e)},expression:"ruleForm.drugIsPrescription"}},t._l(t.type,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"价格",required:""}},[i("el-input",{model:{value:t.ruleForm.drugPrice,callback:function(e){t.$set(t.ruleForm,"drugPrice",e)},expression:"ruleForm.drugPrice"}})],1)],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"生成厂家",required:""}},[i("el-input",{model:{value:t.ruleForm.drugFactory,callback:function(e){t.$set(t.ruleForm,"drugFactory",e)},expression:"ruleForm.drugFactory"}})],1)],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"药品规格",required:""}},[i("el-input",{model:{value:t.ruleForm.drugSpecification,callback:function(e){t.$set(t.ruleForm,"drugSpecification",e)},expression:"ruleForm.drugSpecification"}})],1)],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"批准文号",required:""}},[i("el-input",{model:{value:t.ruleForm.drugApprovalNumber,callback:function(e){t.$set(t.ruleForm,"drugApprovalNumber",e)},expression:"ruleForm.drugApprovalNumber"}})],1)],1)])],1),i("el-row",{staticStyle:{width:"100%"}},[i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"生产日期",required:""}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{align:"right",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:t.ruleForm.drugCratetime,callback:function(e){t.$set(t.ruleForm,"drugCratetime",e)},expression:"ruleForm.drugCratetime"}})],1)])],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"过期日期",required:""}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{align:"right",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:t.ruleForm.drugExpiredtime,callback:function(e){t.$set(t.ruleForm,"drugExpiredtime",e)},expression:"ruleForm.drugExpiredtime"}})],1)])],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"商品数目",required:""}},[i("el-input",{attrs:{type:"number"},model:{value:t.ruleForm.drugNum,callback:function(e){t.$set(t.ruleForm,"drugNum",e)},expression:"ruleForm.drugNum"}})],1)],1)]),i("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"上架处理",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ruleForm.drugStatus,callback:function(e){t.$set(t.ruleForm,"drugStatus",e)},expression:"ruleForm.drugStatus"}},t._l(t.sale,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),i("el-row",{staticStyle:{width:"100%"}},[i("el-col",{staticStyle:{"margin-left":"0",width:"100%"}},[i("div",{staticClass:"grid-content"},[i("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"商品介绍",required:""}},[i("el-input",{attrs:{type:"textarea",rows:5},model:{value:t.ruleForm.drugIntroduce,callback:function(e){t.$set(t.ruleForm,"drugIntroduce",e)},expression:"ruleForm.drugIntroduce"}})],1)],1)])],1),i("el-row",{staticStyle:{width:"100%"}},[i("el-col",{staticStyle:{"margin-left":"0",width:"100%"}},[i("div",{staticClass:"grid-content"},[i("el-form",{attrs:{"label-width":"100px"}},[i("el-form-item",{attrs:{label:"图片(限5)："}},[i("uploadImg",{attrs:{limit:5,fileList:t.fileList,action:t.action},on:{submitImg:t.getImgList}})],1)],1)],1)])],1),i("el-row",{staticStyle:{width:"100%"}},[i("el-col",{attrs:{span:12,offset:6}},[i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("新增")])],1)],1)],1)],1)],1)},l=[],a=(i("ac1f"),i("1276"),i("e9c4"),i("ba37")),s={components:{uploadImg:a["a"]},name:"edit-drug",mounted:function(){console.log("增加界面"),this.ruleForm.drugPharmacyId=JSON.parse(localStorage.getItem("pharmacy")).pharmacyId,console.log(this.ruleForm)},data:function(){return{dialogImageUrl:"",type:[{value:1,label:"非处方药"}],sale:[{value:"0",label:"上架"},{value:"1",label:"不上架"}],action:"http://124.222.128.245:955/uploadImageFile",dialogVisible:!1,fileList:[],content:"获取验证码",choice:"",active:0,picUrl:"",imageUrl:[],businessLicensePic:"",bankAccountPic:"",drugLicensePic:"",idCardPic:"",runNum:60,id:"",show:!1,show2:!0,merchantTradeUrl:"",provinceCode:"",date1:"",date2:"",cityCode:"",countryCode:"",display:1,value:"",ruleForm:{drugName:"乐家老铺 羚羊感冒口服液 10ml*6支/盒",drugImage:"",drugType:"感冒",drugIsPrescription:1,drugCratetime:"2022-05-23",drugExpiredtime:"2023-05-23",drugSpecification:"10ml*6支/盒",drugPrice:"29.00",drugFactory:"南京同仁堂药业有限责任公司",drugApprovalNumber:"国药准字Z19991003",drugIntroduce:"商品名称：乐家老铺 羚羊感冒口服液规格：10ml*6支/盒生产企业：南京同仁堂药业有限责任公司通用名称：羚羊感冒口服液温馨提示：依据《药品经营质量管理规范》，除药品质量原因外，药品一经售出，不得退换。有效期：24个月剂型：合剂批准文号：国药准字Z19991003适应症/功能主治：清热解表。用于流行性感冒，伤风咳嗽，头晕发热，咽喉肿痛。用法用量：口服，每次10ml(1支)，一日3次。请摇匀服用。不良反应：尚不明确。",drugNum:0,drugStatus:"0",drugMerchantId:JSON.parse(localStorage.getItem("merchant")).merchantId}}},methods:{getImgList:function(t){console.log("获取子组件的信息传输来父组件"),console.log(t),this.fileList=t},fiter:function(){console.log(this.ruleForm.drugImage);for(var t=this.ruleForm.drugImage.split(","),e=0;e<t.length;e++){var i={name:t[e].substring(33,t[e].length-1),url:t[e]};this.fileList.push(i)}},handleAvatarSuccess:function(t,e){""!=this.ruleForm.drugImage||null!=this.ruleForm.drugImage?this.ruleForm.drugImage=","+this.ruleForm.drugImage+t.data:this.ruleForm.drugImage=this.ruleForm.drugImage+t.data,console.log(t.data),this.show=!0,this.show2=!1,this.imageUrl.push(t.data)},save:function(){for(var t=this,e=0;e<this.fileList.length;e++)e!=this.fileList.length-1?this.ruleForm.drugImage=this.ruleForm.drugImage+this.fileList[e].url+",":this.ruleForm.drugImage=this.ruleForm.drugImage+this.fileList[e].url;console.log(this.ruleForm),this.$axios.post("/api/message/provide/drug/addDrug",this.ruleForm).then((function(e){console.log(e.data),t.$message.success(e.data.message),localStorage.setItem("editDrug",JSON.stringify(t.ruleForm))}))},calcan:function(){this.$router.push("/allDrugs")}}},o=s,u=(i("9286"),i("2877")),n=Object(u["a"])(o,r,l,!1,null,"0acb55a9",null);e["default"]=n.exports},"65f0":function(t,e,i){var r=i("0b42");t.exports=function(t,e){return new(r(t))(0===e?0:e)}},9286:function(t,e,i){"use strict";i("fa1f")},a434:function(t,e,i){"use strict";var r=i("23e7"),l=i("da84"),a=i("23cb"),s=i("5926"),o=i("07fa"),u=i("7b0b"),n=i("65f0"),d=i("8418"),c=i("1dde"),m=c("splice"),g=l.TypeError,f=Math.max,h=Math.min,p=9007199254740991,b="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!m},{splice:function(t,e){var i,r,l,c,m,v,y=u(this),F=o(y),w=a(t,F),S=arguments.length;if(0===S?i=r=0:1===S?(i=0,r=F-w):(i=S-2,r=h(f(s(e),0),F-w)),F+i-r>p)throw g(b);for(l=n(y,r),c=0;c<r;c++)m=w+c,m in y&&d(l,c,y[m]);if(l.length=r,i<r){for(c=w;c<F-r;c++)m=c+r,v=c+i,m in y?y[v]=y[m]:delete y[v];for(c=F;c>F-r+i;c--)delete y[c-1]}else if(i>r)for(c=F-r;c>w;c--)m=c+r-1,v=c+i-1,m in y?y[v]=y[m]:delete y[v];for(c=0;c<i;c++)y[c+w]=arguments[c+2];return y.length=F-r+i,l}})},b28e:function(t,e,i){},ba37:function(t,e,i){"use strict";var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-upload",{attrs:{action:t.action,"list-type":"picture-card",accept:".jpg,.jpeg,.png","on-success":t.handleSuccess,"file-list":t.fileLists,limit:t.limit,headers:{username:t.username},disabled:t.fileLists.length>=t.limit},scopedSlots:t._u([{key:"file",fn:function(e){var r=e.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:r.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(e){return t.handlePictureCardPreview(r)}}},[i("i",{staticClass:"el-icon-zoom-in"})]),i("span",{staticClass:"el-upload-list__item-edit",on:{click:function(e){return t.handlePictureCardEdit(r)}}},[i("i",{staticClass:"el-icon-edit"})]),i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(e){return t.handleRemove(r)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),i("el-dialog",{attrs:{visible:t.dialogVisible,"append-to-body":""},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})]),i("el-dialog",{attrs:{visible:t.editView,width:"40%","append-to-body":""},on:{"update:visible":function(e){t.editView=e}}},[i("el-input",{attrs:{type:"textarea",rows:4},on:{input:t.editPic},model:{value:t.editForm.url,callback:function(e){t.$set(t.editForm,"url",e)},expression:"editForm.url"}})],1)],1)},l=[],a=(i("a9e3"),i("a434"),i("b0c0"),{props:{limit:{type:Number,default:6},action:{type:String,default:"#"},fileList:{type:Array,default:function(){return[]}}},data:function(){return{dialogImageUrl:"",dialogVisible:!1,fileLists:this.fileList,editForm:{url:"",uid:null},editView:!1,username:"qlsdxf"}},mounted:function(){},methods:{handleRemove:function(t){for(var e in this.fileLists)this.fileLists[e].uid==t.uid&&this.fileLists.splice(e,1);this.submitFile()},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleSuccess:function(t,e,i){console.log(t.data);var r={name:e.name,status:"success",uid:e.uid,url:t.data};this.fileLists.push(r),this.submitFile()},handlePictureCardEdit:function(t){this.editForm.url=t.url,this.editForm.uid=t.uid,this.editView=!0},editPic:function(){for(var t in this.fileLists)this.fileLists[t].uid==this.editForm.uid&&(this.fileLists[t].url=this.editForm.url);this.submitFile()},submitFile:function(){this.$emit("submitImg",this.fileLists)}}}),s=a,o=(i("40b0"),i("2877")),u=Object(o["a"])(s,r,l,!1,null,"6b316728",null);e["a"]=u.exports},e8b5:function(t,e,i){var r=i("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fa1f:function(t,e,i){}}]);
//# sourceMappingURL=chunk-1d969015.0de31137.js.map
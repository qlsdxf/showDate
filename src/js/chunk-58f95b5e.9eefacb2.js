(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58f95b5e"],{"219f":function(t,o,e){"use strict";e("901c")},"901c":function(t,o,e){},b876:function(t,o,e){"use strict";e.r(o);var r=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticStyle:{"margin-top":"5%","text-align":"center",width:"100%"}},[e("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{model:t.form,"label-width":"100px"}},[e("el-row",{staticStyle:{width:"100%"}},[e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"医生昵称"}},[e("el-input",{attrs:{placeholder:"医生昵称"},model:{value:t.form.doctorName,callback:function(o){t.$set(t.form,"doctorName",o)},expression:"form.doctorName"}})],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"身份证"}},[e("el-input",{attrs:{placeholder:"请输入身份证"},model:{value:t.form.doctorIdCard,callback:function(o){t.$set(t.form,"doctorIdCard",o)},expression:"form.doctorIdCard"}})],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"手机号"}},[e("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.form.doctorPhone,callback:function(o){t.$set(t.form,"doctorPhone",o)},expression:"form.doctorPhone"}})],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"验证码"}},[e("el-input",{staticStyle:{width:"72%"},attrs:{placeholder:"输入验证码"},model:{value:t.form.verification,callback:function(o){t.$set(t.form,"verification",o)},expression:"form.verification"}}),e("el-button",{staticClass:"but",staticStyle:{"font-weight":"bold"},attrs:{disabled:1!==t.display},on:{click:function(o){return t.getVerification()}}},[t._v(t._s(t.content))])],1)],1)])],1),e("el-row",{staticStyle:{width:"100%"}},[e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"新密码"}},[e("el-input",{attrs:{type:"password",placeholder:"密码位数不能于8位"},model:{value:t.form.doctorPassword,callback:function(o){t.$set(t.form,"doctorPassword",o)},expression:"form.doctorPassword"}})],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{staticStyle:{width:"98%"},attrs:{label:"重复密码"}},[e("el-input",{attrs:{type:"password",placeholder:"再次输入密码"},model:{value:t.password,callback:function(o){t.password=o},expression:"password"}})],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{attrs:{label:"选择性别"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.doctorSex,callback:function(o){t.$set(t.form,"doctorSex",o)},expression:"form.doctorSex"}},t._l(t.sex,(function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{attrs:{label:"详细地址"}},[e("el-input",{attrs:{placeholder:"请填入详细地址"},model:{value:t.form.doctorAddress,callback:function(o){t.$set(t.form,"doctorAddress",o)},expression:"form.doctorAddress"}})],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content"},[e("el-form-item",{attrs:{label:"上传头像",prop:"avator"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://124.222.128.245:955/uploadImageFile","show-file-list":!1,accept:"image/jpeg,image/gif,image/png,image/jpg","on-success":t.handleAvatarSuccess_avatar}},[t.avatar?e("img",{staticClass:"avatar",staticStyle:{width:"100px",height:"100px"},attrs:{src:t.avatar}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon",attrs:{slot:"trigger"},slot:"trigger"})])],1)],1)]),e("el-col",{staticStyle:{"margin-left":"1%",width:"45%"}},[e("div",{staticClass:"grid-content ",attrs:{disabled:t.dis}},[e("el-form-item",{attrs:{label:"上传执业医师资格证书(具有本人照片的页面的照片)",prop:"avator","label-width":"180px"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://124.222.128.245:955/uploadImageFile","show-file-list":!1,accept:"image/jpeg,image/gif,image/png,image/jpg","on-success":t.handleAvatarSuccess_Li}},[t.doctorsLicense?e("img",{staticClass:"avatar",staticStyle:{width:"100px",height:"100px"},attrs:{src:t.doctorsLicense}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon",attrs:{slot:"trigger"},slot:"trigger"})])],1)],1)])],1),e("el-row",{staticStyle:{width:"100%"}},[e("el-col",{attrs:{span:12,offset:4}},[e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:t.updateMessage}},[t._v("修改信息")])],1)],1)],1)],1)],1)},s=[],a=(e("d3b7"),e("3ca3"),e("ddb0"),e("2b3d"),e("9861"),e("e9c4"),e("ac1f"),e("00b4"),e("1276"),e("8237"),{mounted:function(){void 0==localStorage.getItem("doctor")&&this.$router.push("/doctorLogin"),this.doctor=JSON.parse(localStorage.getItem("doctor")),this.form=JSON.parse(localStorage.getItem("doctor")),this.avatar=this.form.doctorAvatar,this.doctorsLicense=this.form.doctorCertificate,this.form.doctorPassword="",this.form.doctorSex=1,this.password="",1!=this.doctor.doctorStatus&&(this.dis=!1)},data:function(){return{sex:[{value:1,label:"男"},{value:2,label:"女"}],content:"获取验证码",choice:"",avatar:"",doctorsLicense:"",picUrl:"",runNum:60,display:1,dis:!0,doctor:{},form:{},password:"",value:""}},methods:{handleAvatarSuccess_avatar:function(t,o){this.avatar=URL.createObjectURL(o.raw),this.form.doctorAvatar=t.data},handleAvatarSuccess_Li:function(t,o){this.doctorsLicense=URL.createObjectURL(o.raw),this.form.doctorCertificate=t.data},updateMessage:function(){var t=this,o={};this.doctor.doctorPhone!=this.form.doctorPhone&&(null==this.form.verification?this.$message.error("1请填写完数据!!!"):(o.doctorPhone=this.form.doctorPhone,o.verification=this.form.verification)),this.doctor.doctorName!=this.form.doctorName&&(o.doctorName=this.form.doctorName),this.doctor.doctorAvatar!=this.form.doctorAvatar&&(o.doctorAvatar=this.form.doctorAvatar),this.doctor.doctorSex!=this.form.doctorSex&&(o.doctorSex=this.form.doctorSex),this.doctor.doctorCertificate!=this.form.doctorCertificate&&(o.doctorCertificate=this.form.doctorCertificate),this.doctor.doctorIdCard!=this.form.doctorIdCard&&(o.doctorIdCard=this.form.doctorIdCard),this.doctor.doctorSchool!=this.form.doctorSchool&&(o.doctorSchool=this.form.doctorSchool),this.doctor.doctorAddress!=this.form.doctorAddress&&(o.doctorAddress=this.form.doctorAddress),""!=this.form.doctorPassword&&""!=this.password&&(o.doctorPassword=this.$md5(this.form.doctorPassword)),o.doctorId=this.doctor.doctorId,console.log(o),this.$axios.post("/api/message/provide/doctor/updateDoctor",o).then((function(o){200==o.data.code&&(t.$message.success("修改成功!!!"),t.form=o.data.data,t.doctor=o.data.data,localStorage.setItem("doctor",JSON.stringify(o.data.data)),location.reload())}))},getVerification:function(){var t=this;if(console.log(this.form.doctorPhone),""!=this.form.doctorPhone)if(this.checkPhone()){this.$axios.get("/api/message/provide/verification/send/"+this.form.doctorPhone).then((function(o){t.$message.success(o.data.message)})),this.display=2;var o=this,e=setInterval((function(){o.runNum--,o.runNum<=0?(o.content="获取验证码",o.display=1,o.runNum=60,clearInterval(e)):o.content=o.runNum+"s后重发"}),1e3);this.content="60s后重发"}else this.$message.error("请输入正确的手机号");else this.$message.error("请填写手机号！！！")},checkPhone:function(){var t=/^[1][3,4,5,7,8][0-9]{9}$/,o=this.form.doctorPhone;return!!t.test(o)},checkCard:function(){if(this.form.doctorIdCard){var t=this.form.doctorIdCard;if(15!=t.length){if(18==t.length){var o=t.split("");return this.is18Card(t)&&this.is18CardEnd(o)?(this.go(t.length),this.is18Card(t)):this.$message({type:"error",message:"您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！"})}return this.$message({type:"error",message:"您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！"})}if(!this.is15Card(t))return this.$message({type:"error",message:"您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！"});this.go(t.length)}},is18CardEnd:function(t){var o=0;"x"==t[17].toLowerCase()&&(t[17]=10);for(var e=0;e<17;e++)o+=this.Wi[e]*t[e];var r=o%11;return t[17]==this.ValideCode[r]},is18Card:function(t){var o=t.substring(6,10),e=t.substring(10,12),r=t.substring(12,14),s=new Date(o,parseFloat(e)-1,parseFloat(r));return s.getFullYear()==parseFloat(o)&&s.getMonth()==parseFloat(e)-1&&s.getDate()==parseFloat(r)},is15Card:function(t){var o=t.substring(6,8),e=t.substring(8,10),r=t.substring(10,12),s=new Date(o,parseFloat(e)-1,parseFloat(r));return s.getYear()==parseFloat(o)&&s.getMonth()==parseFloat(e)-1&&s.getDate()==parseFloat(r)},sleep:function(t){var o=new Date,e=o.getTime()+t;while(1)if(o=new Date,o.getTime()>e)return},go:function(t){var o=this.form.doctorIdCard,e=new Date,r=e.getMonth()+1,s=e.getDate(),a=0;return 18===t?(a=e.getFullYear()-o.substring(6,10)-1,o.substring(16,17),o.substring(6,10)+"-"+o.substring(10,12)+"-"+o.substring(12,14),(o.substring(10,12)<r||o.substring(10,12)==r&&o.substring(12,14)<=s)&&a++,a>=16&&a<=70):15===t?(a=e.getFullYear()-o.substring(6,8)-1901,o.substring(13,14),"19"+o.substring(6,8)+"-"+o.substring(8,10)+"-"+o.substring(10,12),(o.substring(8,10)<r||o.substring(8,10)==r&&o.substring(10,12)<=s)&&a++,a>=18):void 0}}}),i=a,c=(e("219f"),e("2877")),l=Object(c["a"])(i,r,s,!1,null,"73867cda",null);o["default"]=l.exports}}]);
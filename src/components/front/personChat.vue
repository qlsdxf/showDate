<template>
    <div>
        <div class="chat_head">
            <div style="float: left;margin-left: 50px;">

                <el-image
                        style="width: auto; height: 60px;"
                        src="https://gw.alicdn.com/tfs/TB1cOtCayERMeJjSspiXXbZLFXa-144-143.png"></el-image>
            </div>
            <div style="float: left;line-height: 60px;margin-left: 20px">
                <el-image
                        style="width: 92px; height: 60px;"
                        src="http://124.222.128.245:955/image/小熊医生49c012e8.png"></el-image>
            </div>
            <div style="float: left;" class="im-info">
                <span>专门为你解决各类病情问题，快速响应</span>
            </div>
        </div>
        <div class="chat_main"  id="tp">
            <div v-for="(index,item) in content" :key="item" >

                <div class="right" v-if="index.chatType == 1">
                    <div style="float: top;display: flex;">
                        <div style="float: left;min-width: 138px;margin-top: 20px">
                            <span>{{index.chatContent}}</span>
                        </div>
                        <div style="float: right;margin-left: 2px">
                            <el-avatar :size="60" :src="user.userAvatar"></el-avatar>
                        </div>
                    </div>
                    <div style="margin-top: 10px;float: bottom">
                        <span style="font-size: 12px;color: #B0B0B0;margin-top: 10px">{{index.chatCreateTime| getTime(index.chatCreateTime)}}</span>
                    </div>

                </div>

                <div class="left" v-if="index.chatType == 2">
                    <div style="float: top;display: flex;">
                        <div style="float: right;margin-left: 2px">
                            <el-avatar :size="60" :src="doctor.doctorAvatar"></el-avatar>
                        </div>
                        <div style="float: left;min-width: 138px;margin-top: 20px">
                            <span>{{index.chatContent}}</span>
                        </div>

                    </div>
                    <div style="float: bottom">
                        <span style="font-size: 12px;color: #B0B0B0;margin-top: 10px;float: right">{{index.chatCreateTime| getTime(index.chatCreateTime)}}</span>
                    </div>

                </div>

            </div>
            <div class="empty" >
            </div>

        </div>
        <div class="chat_footer">
            <el-input
                    type="textarea"
                    class="send"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="textarea">
            </el-input>
            <el-button type="text" @click="sendMessage" class="but">发送</el-button>
        </div>
    </div>
</template>


<script>


    export default {

        name: "chat",
        data() {
            return {
                content:[],
                user:{},
                textarea:'',
                doctor:'',
                webSocket:null,
            };
        },
        methods: {
            getAllChat() {
                let data = {
                    chatUserId:this.user.userId,
                    chatDoctorId:10,
                    chatType:1,
                }
                this.$axios.post("/api/message/provide/chat/getAllChat",data).then((res)=>{
                    this.content = res.data.data
                    console.log(res.data.data)
                    setTimeout(() => {
                        let msg = document.getElementById('tp') // 获取对象
                        console.log(msg.scrollHeight)
                        msg.scrollTop = msg.scrollHeight;
                    }, 0);
                })
            },

            getRandDoctor() {
                let data = {
                    doctorStatus: 3,
                    type:1,
                };
                this.$axios.post("/api/message/provide/doctor/getRandDoctor",data).then((res)=>{
                    this.doctor = res.data.data;
                    console.log("doctor: " + res.data.data)
                })
            },
            initWebSocket(){ //初始化weosocket
                this.textarea = "";
                let msg = document.getElementById('tp') // 获取对象
                msg.scrollTop = msg.scrollHeight
                let that = this;
                this.webSocket = new WebSocket("ws://127.0.0.1:8002/websocket/"+this.user.userId + "_" + this.doctor.doctorId);
                this.webSocket.onopen = this.websocketOnopen;
                this.webSocket.onerror = this.websocketOnerror;
                this.webSocket.onmessage = this.websocketOnmessage;
                this.webSocket.onclose = this.websocketOnclose;


                //窗口关闭时，关闭连接
                window.unload=function() {
                    this.webSocket.close();
                };
            },
            websocketOnopen: function () {
                console.log("WebSocket连接成功");
            },
            websocketOnerror: function (e) {
                console.log("WebSocket连接发生错误");
            },
            websocketOnmessage: function (e) {
                this.getAllChat();
            },
            websocketOnclose: function (e) {
                console.log("connection closed (" + e.code + ")");
            },
            sendMessage() {
                if (this.textarea.length == 0) {
                    this.$message.error("请输入内容！！！")
                } else {
                    let data ={
                        chatUserId: this.user.userId,
                        chatDoctorId: this.doctor.doctorId,
                        chatContent: this.textarea,
                        chatType: 1,
                    }
                    this.webSocket.send(JSON.stringify(data))
                    this.textarea = "";
                }

            }

        },
        filters: {
            getTime:(msg)=>{
                if (msg != null) {
                    return msg.replaceAll("T"," ");
                }

            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem("user"))
            console.log(this.user)
            if (this.user == null || this.user == undefined) {
                this.$router.push("/login")
            }
            this.getAllChat();
            this.getRandDoctor();
            this.initWebSocket();
            setTimeout(() => {
                let msg = document.getElementById('tp') // 获取对象
                console.log(msg.scrollHeight)
                msg.scrollTop = msg.scrollHeight;
            }, 1000);

        }
    };
</script>

<style scoped>
    .chat_head{
        width: 100%;
        height: 60px;
    }
    .chat_main{
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 126px;
        width: 100%;
        outline: none;
        box-sizing: border-box;
        min-height: 300px;
        background-color: #f5f5f5;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .el-textarea{
        resize:none;
        border:solid 1px #f3e1e1
    }



    .but{
        background-color: #e9ecee;
        color: #999;
        padding: 6px 25px;
        border-radius: 20px;
        margin-right: 50px;
        margin-top: 40px;
        float: right;
    }
    .send {
        margin-top: 20px;
        resize: none;
        float: left;
        width: 90%;
        border: none;
        outline: none;
        box-shadow: none;

    }
    /*.J_Field{*/
    /*opacity: 0;*/
    /*visibility: hidden;*/
    /*position: absolute;*/
    /*top: 10px;*/
    /*left: 0;*/
    /*z-index: -1;*/
    /*width: 100%;*/
    /*height: 100px;*/
    /*}*/
    .chat_footer{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 2;
        height: 126px;

    }
    .right{

        max-width: 620px;
        min-width: 200px;
        border-radius: 20px 20px 4px 20px;
        padding: 8px 15px;
        margin: 0 0 0 50%;
        background-color: #ffdd8c;
        border: none;
        box-shadow: none;
        float: right;
        margin-top: 50px;
        font-size: 14px;
    }
    .empty{
        width: 100%;
        height: 10px;
        box-sizing: border-box;
        float: left;
        border-radius: 12px;
        position: relative;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        text-align: left;
        padding: 12px;
        background-color: #f5f5f5;
    }
    .left{
        max-width: 620px;
        min-width: 200px;
        border-radius: 20px 20px 4px 20px;
        padding: 8px 15px;
        margin: 0 0 0 0;
        background-color: #fff;
        border: none;
        position: relative;
        box-shadow: none;
        float: left;
        margin-right: 50% ;
        margin-top: 50px;
        font-size: 14px;

    }

    .im-info {
        position: relative;
        top: 25px;
        float: left;
        margin-left: 40px;
        font-size: 12px;
        max-width: 27em;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
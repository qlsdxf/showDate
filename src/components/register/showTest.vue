<template>
    <div style="margin-top: 200px">
        <el-popover placement="top-start" width="400" trigger="click">
            <div class="emojis">
                <div v-for="item in emojiName" class="emoji" :key="item" >
                    <img  :src="emojiUrl + emojiMap[item]" style="width: 30px; height: 30px" @click="chooseEmoji(emojiUrl + emojiMap[item])"/>
                </div>
            </div>
            <el-image style="width: 50px;height: auto;" slot="reference" src="http://124.222.128.245:955/image/表情2c399cabc.png"></el-image>
        </el-popover>


        <el-input v-html="textarea" ></el-input>


    </div>
</template>
<script>
    import { emojiMap, emojiName, emojiUrl } from "../../assets/emojiMap";
    export default{
        data(){
            return{
                emojiMap: emojiMap,
                emojiName: emojiName,
                emojiUrl: emojiUrl,
                textarea:''
            }
        },
        methods:{
            chooseEmoji(item){
                console.log(item)
                let ht = "<img src='"+item+"'>"
                this.textarea = this.textarea + ht
            }
        }
    }
</script>
<style scoped>
    .emojis {
        height: 160px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
    }

    .emoji {
        height: 40px;
        width: 40px;
        box-sizing: border-box;
        cursor: pointer;
    }
</style>

<template>
    <div>
        <el-upload
                :action="action"
                list-type="picture-card"
                accept=".jpg,.jpeg,.png"
                :on-success="handleSuccess"
                :file-list="fileLists"
                :limit="limit"
                :headers="{username:username}"
                :disabled="fileLists.length >= limit">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-edit" @click="handlePictureCardEdit(file)">
                        <i class="el-icon-edit"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog :visible.sync="editView" width="40%" append-to-body>
            <el-input type="textarea" :rows="4" v-model="editForm.url" @input="editPic"></el-input>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:{
            limit:{
                type:Number,
                default:6,
            },
            action:{
                type:String,
                default:'#'
            },
            fileList:{
                type:Array,
                default: ()=>{
                    return []
                }
            }
        },
        data(){
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                fileLists:this.fileList,
                editForm:{
                    url:'',
                    uid:null
                },
                editView:false,
                username:'qlsdxf'
            }
        },
        mounted(){
        },
        methods:{
            // 移除图片
            handleRemove(file) {
                for(let i in this.fileLists){
                    if(this.fileLists[i].uid == file.uid){
                        this.fileLists.splice(i,1)
                    }
                }
                this.submitFile()
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response,file,fileList){
                console.log(response.data)
                let obj = {
                    name: file.name,
                    status: "success",
                    uid: file.uid,
                    url: response.data,
                }
                this.fileLists.push(obj)
                this.submitFile()
            },
            // 编辑图片弹窗
            handlePictureCardEdit(file){
                this.editForm.url = file.url
                this.editForm.uid = file.uid
                this.editView = true
            },
            // 编辑图片
            editPic(){
                for(let i in this.fileLists){
                    if(this.fileLists[i].uid == this.editForm.uid){
                        this.fileLists[i].url = this.editForm.url
                    }
                }
                this.submitFile()
            },
            // 将图片文件传回给父组件
            submitFile(){
                this.$emit('submitImg',this.fileLists)
            },
        }
    }
</script>

<style scoped>
    .el-icon-plus{
        font-size: 30px!important;
    }
    .el-icon-edit{
        font-size: 18px !important;
    }
    .el-icon-zoom-in{
        font-size: 18px !important;
    }
    .el-icon-delete{
        font-size: 18px !important;
        color:rgb(243, 143, 130);
    }
    .el-input>>> .el-textarea__inner{
        font-size:18px!important;
    }
    .el-upload--picture-card{
        width: 100px;
        height: 100px;
        font-size: 16px !important;
    }
    el-upload-list__item-actions{
        width: 100px;
        height: 100px;
        font-size: 16px !important;
    }
</style>

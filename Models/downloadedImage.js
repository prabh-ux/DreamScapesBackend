import mongoose from "mongoose";


const Schema=mongoose.Schema;
const DownloadedImg= new Schema({

url:{type:String,required:true},
userID:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
}





});


export const DownloadedImgModel=mongoose.model("userDownloadedImage",DownloadedImg);
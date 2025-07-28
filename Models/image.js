import mongoose from "mongoose";

const Schema=mongoose.Schema;
const imageSchema=new Schema({

url:{type:String,required:true},
userID:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
}


})


export const imageModel=mongoose.model("Uplodedimages",imageSchema);
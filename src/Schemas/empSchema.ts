import mongoose from "mongoose";

const empSchema=new mongoose.Schema({
    empno:{
        type:Number
    },
    ename:{
        type:String
    },
    sal:{
        type:Number
    }
}) 


export const eschema=mongoose.model('emp',empSchema);

